$(function () {

    var paxer = Paxer.new();
    var semantic = new SemanticAnalyzer();

    ko.applyBindings(mainView = new MainViewModel());
    window.onbeforeunload = function () {
        if (mainView.editor.unsaved()) {
            return "未保存的修改将丢失";
        }
    };

    window.onunload = function () {
        mainView.editor.save();
        mainView.fileManager.save();
    };

    document.getElementById("btn-tidy").onclick = function () {
        var code = mainView.editor.getEditorContent();
        mainView.editor.setEditorContent(_preprocesscode(code));
        for (var i = 0; i < mainView.editor.cm.doc.lastLine(); i++) {
            mainView.editor.cm.indentLine(i, "smart");
        }
        mainView.editor.cm.focus();
    };
    function _preprocesscode(code) {
        var processed;
        var findOperatorReg = /(\+|\-|\*|\/|!=|>=?|<=?|==?)/g,
            findDelimiterReg = /(\(|\)|\{|}|;|,|\$)/g;
        code = code.replace(/\n/g, " ")
                .replace(findOperatorReg, " $1 ")
                .replace(findDelimiterReg, " $1 ")
                .replace(/[ ]+/g, " ")
                .replace(/(else|then)\s+\{/g, "$1{")
                .replace(/}\s+(else)/, "}$1")
                .trim() + " ";
        processed = code.replace(/(then|else|then\{|else\{|}else\{|\{|}|;)\s/g, "$1\n")
            .replace(/\s+(,|;|\))/g, "$1")
            .replace(/\(\s+/g, "(")
            .replace(/(then|else)\{/g, "$1 {")
            .replace(/}(else)/, "} $1")
            .replace(/([^\n]+)(?=else)/g, "$1\n");
        return processed;
    }

    document.getElementById("btn-compile").onclick = function () {
        var session = View.editor.currentSession();
        if (null !== session) {

            Cache.st = {};
            P("symboltablechanged", []);

            var code;
            View.control.compilie(session.file);
            if (!session.file.isNewFile) {
                View.editor.save();
                mainView.console.log("Compile '" + session.file.fileName() + "'...");
                code = View.editor.currentSession().content;
            } else {
                mainView.console.log("Compile 'untitled'...");
                code = View.editor.getContent();
            }
            paxer.setInput(_preprocesscode(code));
        }
    };



    var moving_resizer = null,
        mouseOffsetY = 0,
        mouseOffsetX = 0;
    $.each($(".resizer"), function (index, el) {
        $(el).on("mousedown", function (e) {
            moving_resizer = el;
            mouseOffsetY = $(moving_resizer).offset().top - e.clientY;
            mouseOffsetX = $(moving_resizer).offset().left - e.clientX;
            $("#resizing-mask").css("cursor", $(moving_resizer).css("cursor")).show();

        });
    });
    $(document).on("mouseup", function () {
        var $box = $(moving_resizer).parent(".resizable");
        if ($box.hasClass("bottom-box") || $box.hasClass("tree-box")) {
            P("treeboxresized");
        }
        moving_resizer = null;
        $("#resizing-mask").hide();
    });
    document.getElementById("resizing-mask").addEventListener("mousemove", function (e) {
        if (moving_resizer instanceof HTMLElement) {
            var $box = $(moving_resizer).parent(".resizable");
            if ($box[0] instanceof HTMLElement) {
                var $main = $("#main"),
                    $left = $(".left-box"),
                    $right = $(".right-box"),
                    $center = $(".center-box"),
                    $upper = $(".upper-box"),
                    $bottom = $(".bottom-box"),
                    $editor = $(".editor-box"),
                    $tree = $(".tree-box");
                if ($box.hasClass("left-box")) {
                    var mouseX = e.clientX,
                        leftWidth = Math.mid(mouseX + mouseOffsetX + 5,
                            1, $main.width() - $right.width() - 1);

                    $box.width(leftWidth - 1);
                    $center.css("margin-left", leftWidth + "px");

                }
                if ($box.hasClass("right-box")) {
                    var mouseX = e.clientX,
                        rightWidth = Math.mid($main.width() - (mouseX + mouseOffsetX + 5),
                            1, $main.width() - $tree.width() - 1);
                    $box.width(rightWidth - 1);
                    $center.css("margin-right", rightWidth + "px");
                }
                if ($box.hasClass("bottom-box")) {
                    var mouseY = e.clientY,
                        upperHeight = Math.mid(mouseY + mouseOffsetY + 5 - $(".navbar").height(),
                            0, $main.height() - $box.children(".box-header").height() - 1);
                    $box.height($main.height() - upperHeight);
                    $upper.height(upperHeight);
                }
                if ($box.hasClass("tree-box")) {
                    var mouseX = e.clientX,
                        rightWidth = Math.mid($center.width() - (mouseX + mouseOffsetX + 5),
                            1, $center.width() - 1);
                    $box.width(rightWidth - 1);
//                        $box.children(".box-body").css("padding-left", Math.max(0, (rightWidth - 551) / 2) + "px");
                    $editor.css("margin-right", rightWidth + "px");
                }
            }
        }
    }, false);
    $(document).on("contextmenu", function () {
        return false;
    });
    context.init({
        fadeSpeed: 0,
        above: "auto",
        preventDoubleContext: true
    });
    context.attach("#file-list", [
        {
            text: "New File...",
            action: function (e) {
                View.editor.newFile();
            }
        },
        {
            divider: true
        },
        {
            text: "Rename",
            action: function (e) {
                var $li = $("#file-list").children("li.active"),
                    name = $li.attr("id"),
                    fileName = name.replace(/^toy\-/, "") + ".toy";
                View.editor.dialogRenameFile(Cache.files.find(fileName));
            }
        },
        {
            text: "Delete",
            action: function (e) {
                var $li = $("#file-list li.active"),
                    name = $li.attr("id").replace(/^toy\-/, ""),
                    fileName = name + ".toy",
                    file = Cache.files.find(fileName);
                if (confirm("Are you sure to delete '" + file.fileName() + "'?")) {
                    if (file) {
                        Cache.files.remove(file);
                    }
                    $li.remove();
                    var session = View.editor.openedSessions.findFile(fileName);
                    if (session) {
                        View.editor.closeSession(session);
                    }
                    Storage.removeItem(fileName);
                }
            }
        }
    ]);
    $(document).on("click", function (e) {
        $(".box-open-menu").hide();
    });
    $("#box-opener").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".box-open-menu").show();
    });
    $.each($(".box-open-menu").find("a"), function (index, el) {
        $(el).on("click", function (e, prevent) {
            e.preventDefault();
            e.stopPropagation();
            $(".box-open-menu").hide();
            var id = $(this).attr("id");
            if (id == "box-opener-console") {
                var $box = $(".bottom-box");
                if ($box.hasClass("hidden")) {
                    $box.removeClass("hidden").css("height", "30%");
                    $(".upper-box").css("height", "70%");
                    if (!prevent) {
                        P("treeboxresized");
                    }
                }
            }
            if (id == "box-opener-workspace") {
                var $box = $(".left-box");
                if ($box.hasClass("hidden")) {
                    $box.removeClass("hidden").css("width", "200px");
                    $(".center-box").css("margin-left", "200px");
                }
            }
            if (id == "box-opener-structure") {
                var $box = $(".right-box");
                if ($box.hasClass("hidden")) {
                    $box.removeClass("hidden").css("width", "350px");
                    $(".center-box").css("margin-right", "350px");
                }
            }
            if (id == "box-opener-tree") {
                var $box = $(".tree-box");
                if ($box.hasClass("hidden")) {
                    $box.removeClass("hidden").css("width", "550px");
                    $(".editor-box").css("margin-right", "550px");
                }
            }
        });
    });
    $.each($(".box-caret"), function (index, el) {
        $(el).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $box = $(this).parents(".resizable");
            if ($box.hasClass("bottom-box")) {
                if (!$box.hasClass("hidden")) {
                    $box.addClass("hidden");
                    $(".upper-box").css("height", "100%");
                    P("treeboxresized");
                }
            }
            if ($box.hasClass("left-box")) {
                if (!$box.hasClass("hidden")) {
                    $box.addClass("hidden");
                    $(".center-box").css("margin-left", "0");
                }
            }
            if ($box.hasClass("right-box")) {
                if (!$box.hasClass("hidden")) {
                    $box.addClass("hidden");
                    $(".center-box").css("margin-right", "0");
                }
            }
            if ($box.hasClass("tree-box")) {
                if (!$box.hasClass("hidden")) {
                    $box.addClass("hidden");
                    $box.children(".box-body").css("padding-left", "0");
                    $(".editor-box").css("margin-right", "0");
                }
            }
        });
    });
    $.each($(".box-expand"), function (index, el) {
        $(el).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $box = $(this).parents(".resizable");
            if ($box.hasClass("bottom-box")) {
                if (!$box.hasClass("hidden")) {
                    $(".upper-box").css("height", "0");
                    $box.css("height", "100%");
                }
            }
        });
    });
    $("#btn-stop").on("click", function () {
        View.control.exitCompileMode();
    });
    S("symboltablechanged", function (st) {
        var $body = $(".right-box .box-body"),
            $placeholder = $(".right-box .placeholder"),
            $ul,
            showmap = {},
            activemap = {};

        if ($("#symbol-list").length < 1) {
            $ul = $("<ul></ul>").attr("id", "symbol-list").addClass("list").appendTo($body);
        } else {
            $ul = $("#symbol-list");
            $.each($ul.children("li"), function (index, el) {
                var $li = $(el),
                    id = $li.attr("data-id"),
                    show = $li.children(".li-caret").hasClass("glyphicon-triangle-bottom"),
                    active = $li.hasClass("active");
                showmap[id] = show;
                activemap[id] = active;
            });
            $ul.empty();
        }

        if (st.length < 1) {
            $ul.hide();
            $placeholder.show();
        } else {
            for (var i = 0; i < st.length; i++) {
                var symbol = st[i],
                    id = "symbol-" + symbol.name,
                    $li = $("<li></li>").attr("data-id", id).html(symbol.name),
                    $caret = $("<span></span>").addClass("glyphicon li-caret")
                        .addClass(showmap[id] ? "glyphicon-triangle-bottom" : "glyphicon-triangle-right").prependTo($li),
                    extraText = "type: " + symbol.type + ", occurance: " + symbol.positions.length,
                    $extra = $("<span></span>").addClass("extra").text(extraText).appendTo($li);

                $caret.on("click", function () {
                    var $self = $(this),
                        $li = $self.parent(),
                        show = $self.hasClass("glyphicon-triangle-right");

                    $.each($("[data-pos='" + $li.attr("data-id") + "']"), function (index, el) {
                        if (show) {
                            $(el).show();
                        } else {
                            $(el).hide();
                        }
                    });
                    $self.toggleClass("glyphicon-triangle-right glyphicon-triangle-bottom");
                });
                $li.on("click", function () {
                    var $self = $(this);
                    if (!$self.hasClass("active")) {
                        $self.siblings(".active").removeClass("active");
                        $self.addClass("active");
                    }
                }).on("dblclick", function () {
                    $(this).trigger("click");
                    $(this).children(".li-caret").trigger("click");
                }).on("click", (function (symbol) {
                    return function () {
                        return;

                        for (var k = 0; k < symbol.positions.length; k++) {
                            var pos = symbol.positions[k];
                            if (0 === k) {
                                View.editor.cm.doc.setSelection({
                                    line: pos.first_row - 1,
                                    ch: pos.first_col - 1
                                }, {line: pos.last_row - 1, ch: pos.last_col - 1});
                            } else {
                                View.editor.cm.doc.addSelection({
                                    line: pos.first_row - 1,
                                    ch: pos.first_col - 1
                                }, {line: pos.last_row - 1, ch: pos.last_col - 1});
                            }
                        }
                    };
                })(symbol)).appendTo($ul);
                if (activemap[id]) {
                    $li.trigger("click");
                }
                for (var j = 0; j < symbol.positions.length; j++) {
                    var pos = symbol.positions[j],
                        liText = "[" + (j + 1) + "] line: " + pos.first_row + ", ch: " + pos.first_col,
                        $posli = $("<li></li>").attr("data-id", "pos-" + symbol.name + "-" + j).attr("data-pos", id).text(liText).css("margin-left", "30px");
                    if (!showmap[id]) {
                        $posli.hide();
                    }
                    $posli.on("click", function () {
                        var $self = $(this);
                        if (!$self.hasClass("active")) {
                            $self.siblings(".active").removeClass("active");
                            $self.addClass("active");
                        }
                    }).on("click", (function (pos) {
                        return function () {
                            return;
                            View.editor.cm.doc.setSelection({
                                line: pos.first_row - 1,
                                ch: pos.first_col - 1
                            }, {line: pos.last_row - 1, ch: pos.last_col - 1});
                        };
                    })(pos)).appendTo($ul);
                    if (activemap[$posli.attr("data-id")]) {
                        $posli.trigger("click");
                    }
                }
            }
            $ul.show();
            $placeholder.hide();
        }
    });
    var stEquals = function (nst) {
        if (!Cache.st) {
            Cache.st = {};
            return false;
        }
        for (var i = 0, len = nst.length; i < len; i++) {
            if (Cache.st[nst[i].name] != nst[i].positions.length) {
                return false;
            }
        }
        return true;
    };
    $("#btn-next").on("click", function () {
        if (paxer.getStatus() == 'DONE' || paxer.getStatus() == 'ERROR') {
            return;
        }
        paxer.go();
        switch (paxer.getStatus()) {
            case "DONE":
                semantic.eat(paxer.getRootS(), paxer.getSymbolTable());
                mainView.console.success(paxer.getCurMovementF());
                mainView.console.success('code parsed.');
                mainView.console.warn(paxer.getWarningMsg());
                mainView.console.error(semantic.getErrorMsg());
                $(".tree-box").addClass("assembly");
                View.assembly.cm.setValue(semantic.getAssembly());
                return;
            case "ERROR":
                mainView.console.error(paxer.getErrMsg());
                return;
            case "WARNING":
            case "NORMAL":
                mainView.console.success(paxer.getCurMovementF());
                View.treePen.setSource(paxer.getSequentialNodes());
                View.treePen.render();
        }
        var tst = paxer.getSymbolTable();
        if (!stEquals(tst)) {
            for (var i = 0, len = tst.length; i < len; i++) {
                Cache.st[tst[i].name] = tst[i].positions.length;
            }
            P("symboltablechanged", tst);
        }
    });

    S("semantichaserror", function (errors) {
        for (var i = 0; i < errors.length; i++) {
            mainView.console.error(errors[i].toString());
        }
    });

    $("#btn-ff").on("click", function () {
        if (paxer.getStatus() == "DONE") {
            mainView.console.success('code parsed.');
        } else if (paxer.getStatus() == "ERROR") {
            mainView.console.error(paxer.getErrMsg());
        } else {
            Benchmark.mark("parse");
            while (paxer.getStatus() != "DONE" && paxer.getStatus() != "ERROR") {
                paxer.go();
            }
            switch (paxer.getStatus()) {
                case 'DONE':
                    semantic.eat(paxer.getRootS(), paxer.getSymbolTable());
                    var parseTime = Benchmark.measure("parse");
                    $(".tree-box").addClass("assembly");
                    View.assembly.cm.setValue(semantic.getAssembly());
                    mainView.console.success(paxer.getMovementsF());
                    mainView.console.warn(paxer.getWarningMsg());
                    mainView.console.error(semantic.getErrorMsg());
                    mainView.console.success("Compile finished in " + parseTime.toFixed(4) + " millisecs.");
                    mainView.console.success("Can we make it faster?");
                    break;
                case 'ERROR':
                    mainView.console.error(paxer.getErrMsg());
                    break;
            }
        }
    });
    mainView.console.log("Compiler lauched at " + new Date().toTimeString());
    $(".loading-mask").remove();
});
