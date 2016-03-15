$(function () {
    CodeMirror.commands.save = function () {
        View.editor.save();
    };

    var paxer = Paxer.new();
    var semantic = new SemanticAnalyzer();

    document.getElementById("cover-open").onclick = function () {
        View.editor.newFile();
    };
    Cache.files = [];
    Cache.files.find = function (fileName) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i].fileName() === fileName) {
                return this[i];
            }
        }
        return null;
    }.bind(Cache.files);


    //for (var i = 0, len = Cache.storedFileNames.length; i < len; i++) {
    //if ($("#file-list").length < 1 && Cache.files.length > 0) {
    //    var $ul = $("<ul></ul>").attr("id", "file-list").addClass("list");
    //    $(".left-box .placeholder").remove();
    //    $ul.appendTo($(".left-box .box-body"));
    //}
    //var item = Storage.getItem(Cache.storedFileNames[i]);
    //if (item) {
    //    var fileInfo = JSON.parse(item),
    //        file = new ToyFile(fileInfo.name, fileInfo.content, false);
    //    Cache.files.push(file);
    //if ($("#" + id).length < 1) {
    //    var $li = $("<li></li>").attr("id", id).text(file.fileName()),
    //        $icon = $("<span></span>").addClass("glyphicon glyphicon-file");
    //    $li.on("click", function () {
    //        var $self = $(this);
    //        if (!$self.hasClass("active")) {
    //            $self.siblings(".active").removeClass("active");
    //            $self.addClass("active");
    //        }
    //    }).on("contextmenu", function () {
    //        $(this).trigger("click");
    //    }).on("dblclick", (function (file) {
    //        return function () {
    //            View.editor.openFile(file);
    //        };
    //    })(file));
    //}
    //}
    //}


    var last = Storage.getItem("last-editing");
    if (last) {
        var file = Cache.files.find(last);
        if (file) {
            View.editor.openFile(file);
            $("#toy-" + file.name).trigger("click");
        }
    }

    document.getElementById("btn-tidy").onclick = function () {
        var code = View.editor.getContent();
        View.editor.setContent(_preprocesscode(code));
        for (var i = 0; i < View.editor.cm.doc.lastLine(); i++) {
            View.editor.cm.indentLine(i, "smart");
        }
        View.editor.cm.focus();
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
                View.console.log("Compile '" + session.file.fileName() + "'...");
                code = View.editor.currentSession().content;
            } else {
                View.console.log("Compile 'untitled'...");
                code = View.editor.getContent();
            }
            if (session.file.fileName() == "test.toy") {
                code = _preprocesscode(code);
                //code = "{\n\treal i, j;\n\t\ti = 10;\n\t\tj = 100;\n\t\twhile (i > 0) {\n\t\t\tif (i > 5) then\n\t\t\ti = i + 2\n\t\telse\n\t\t\tj = j - 5;\n\t\t\ti = i1;\n\t}\n}";
            }
            paxer.setInput(code);

        }
    };

    $(".tab-new").on("click", function () {
        View.editor.newFile();
    });

    var fr = new FileReader(),
        tmpFile = null;
    fr.onload = function () {
        if (null !== tmpFile) {
            tmpFile.content = this.result;
            Cache.files.push(tmpFile);
            var id = "toy-" + tmpFile.name;
            if ($("#" + id).length < 1) {
                var $li = $("<li></li>").attr("id", id).text(tmpFile.fileName()),
                    $icon = $("<span></span>").addClass("glyphicon glyphicon-file");
                $li.on("dblclick", (function (file) {
                    return function () {
                        View.editor.openFile(file);
                    };
                })(tmpFile));
                $("#file-list").append($li.prepend($icon));
            }
            View.editor.openFile(tmpFile);
            tmpFile = null;
        }
    };
    document.getElementById("source_file").onchange = function () {
        var file = this.files[0];
        tmpFile = new ToyFile(file.name.replace(/(\.\w+)?$/, ".toy"));
        tmpFile.isNewFile = false;
        fr.readAsText(file);
    };
    document.getElementById("btn-save").onclick = function () {
        View.editor.save();
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
    $("#rename-cancel").on("click", function (e) {
        $("#dialog-mask").hide();
        $("#filename").val("");
    });
    $("#rename-confirm").on("click", function (e) {
        View.editor.confirmRename();
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
                View.console.success(paxer.getCurMovementF());
                View.console.success('code parsed.');
                View.console.warn(paxer.getWarningMsg());
                View.console.error(semantic.getErrorMsg());
                $(".tree-box").addClass("assembly");
                View.assembly.cm.setValue(semantic.getAssembly());
                return;
            case "ERROR":
                View.console.error(paxer.getErrMsg());
                return;
            case "WARNING":
            case "NORMAL":
                View.console.success(paxer.getCurMovementF());
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
            View.console.error(errors[i].toString());
        }
    });

    $("#btn-ff").on("click", function () {
        if (paxer.getStatus() == "DONE") {
            View.console.success('code parsed.');
        } else if (paxer.getStatus() == "ERROR") {
            View.console.error(paxer.getErrMsg());
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
                    View.console.success(paxer.getMovementsF());
                    View.console.warn(paxer.getWarningMsg());
                    View.console.error(semantic.getErrorMsg());
                    View.console.success("Compile finished in " + parseTime.toFixed(4) + " millisecs.");
                    View.console.success("Can we make it faster?");
                    break;
                case 'ERROR':
                    View.console.error(paxer.getErrMsg());
                    break;
            }
        }
    });
    $("#about-mask").on("click", function () {
        $(this).hide();
    });
    $("#about-dialog").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    $("#btn-about").on("click", function () {
        $("#about-mask").show();
    });
    View.console.log("Compiler lauched at " + new Date().toTimeString());

    function FileManager() {
        var self = this;
        self.files = ko.observableArray([]);
        var cached = [];
        self.newFile = function () {
            var file = new File();
            cached.push(file);
            return file;
        };
        self.load = function () {
            var storedFileNames = JSON.parse(Storage.getItem("stored-files") || "[]");
            for (var i = 0, len = storedFileNames.length; i < len; i++) {
                var item = Storage.getItem(storedFileNames[i]);

                if (item) {
                    var fileInfo = JSON.parse(item);
                    self.files.push(new File(fileInfo.name, fileInfo.content, false));
                }
            }
        };
        self.save = function () {
            var storedFiles = [];
            for (var i = 0, files = self.files(), len = files.length; i < len; i++) {
                self.saveFile(files[i]);
                storedFiles[storedFiles.length] = files[i].fileName();
            }
            Storage.setItem("stored-files", JSON.stringify(storedFiles));
        };
        self.saveFile = function (file) {
            Storage.setItem(file.fileName, file.toyfile.serialize());
        };

        self.load();

        function File(name, content, isNew) {
            var self = this;
            self.isNew = ko.observable($defined(isNew) ? isNew : true);
            self.name = ko.observable($defined(name) ? name.replace(/(\.toy)$/, "") : "untitled");
            self.content = content || "";

            self.open = function () {
                View.editor.openFile(toyfile);
            };

            self.fileName = ko.computed(function () {
                return self.isNew() ? self.name() : self.name() + ".toy";
            });

        }
    }

    function Editor(fileManager) {
        var self = this;
        self.tabs = ko.observableArray([]);
        self.activeTab = ko.observable();
        self.setActive = function (tab) {
            var activeTab = self.activeTab();
            if (activeTab != tab) {
                !!activeTab && activeTab.isActive(false);
                !!tab && tab.isActive(true);
            }
            self.activeTab(tab);
        };
        self.unsaved = ko.computed(function () {
            var t = self.activeTab();
            return t && t.unsaved();
        });

        self.openNewFile = function () {
            self.openFile(fileManager.newFile());
        };

        self.openFile = function (file) {
            var tab = new EditorTab(file);
            self.tabs.push(tab);
            self.setActive(tab);
        };
        self.closeTab = function (tab) {
            self.tabs.remove(tab);
            self.setActive(self.tabs().rear());
        };

        self.cursorPos = ko.observable({line: 1, ch: 1});
        self.cursorPosText = ko.computed(function () {
            var pos = self.cursorPos();
            return pos.line + ":" + pos.ch;
        });


        self.load = function () {

        };
        self.save = function () {
        };

        self.load();

        function EditorTab(file) {
            var self = this;
            self.file = file;
            self.isActive = ko.observable(false);
            self.unsaved = ko.observable(false);
            self.cachedContent = ko.observable(file.content);
        }
    }

    function Workspace(fileManager, editor) {
        var self = this;

        self.rows = ko.computed(function () {
            return $.map(fileManager.files(), function (file) {
                return new FileRow(file);
            });
        });

        var activeRow = null;
        self.setActive = function (row) {
            if (activeRow) {
                activeRow.isActive(false);
            }
            (activeRow = row).isActive(true);
        };

        self.openFileInEditor = function (row) {
            editor.openFile(row.file);
        };

        function FileRow(file) {
            var self = this;
            self.file = file;
            self.attrId = ko.computed(function () {
                return "toy-" + self.file.name();
            });
            self.isActive = ko.observable(false);
        }
    }

    function MainViewModel() {
        var self = this;
        var fileManager = self.fileManager = new FileManager();
        var editor = self.editor = new Editor(fileManager);
        self.workspace = new Workspace(fileManager, editor);
    }

    ko.applyBindings(mainView = new MainViewModel());

    window.onbeforeunload = function () {
        if (View.editor.needSave()) {
            return "未保存的修改将丢失";
        }
    };

    window.onunload = function () {
        var session = View.editor.currentSession();
        if (session && session.file) {
            Storage.setItem("last-editing", session.file.fileName());
        } else {
            Storage.removeItem("last-editing");
        }
        //mainView.fileManager.save();
    };
    $(".loading-mask").remove();
});
