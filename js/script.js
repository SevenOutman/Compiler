$(function () {
    ko.applyBindings(window.mainView = new MainViewModel());
    window.onbeforeunload = function () {
        if (mainView.editor.unsaved()) {
            return "未保存的修改将丢失";
        }
    };
    window.onunload = function () {
        mainView.editor.save();
        mainView.fileManager.save();
    };

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
                mainView.editor.openNewFile();
            }
        },
        {
            divider: true
        },
        {
            text: "Rename",
            action: function (e) {
                var $li = $("#file-list").children(".active"),
                    name = $li.attr("id"),
                    fileName = name.replace(/^toy\-/, "") + ".toy";
                mainView.workspace.renameFile(fileName);
            }
        },
        {
            text: "Delete",
            action: function (e) {
                var $li = $("#file-list").children(".active"),
                    name = $li.attr("id").replace(/^toy\-/, ""),
                    fileName = name + ".toy";
                mainView.workspace.confirmDeleteFile(fileName);
            }
        }
    ]);
    context.attach(".left-box .box-body", [
        {
            text: "New File...",
            action: function (e) {
                mainView.editor.openNewFile();
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
        });
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
                        $posli = $("<li></li>").attr("data-id", "pos-" + symbol.name + "-" + j).attr("data-pos", id).text(liText).css("padding-left", "30px");
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
    S("semantichaserror", function (errors) {
        for (var i = 0; i < errors.length; i++) {
            mainView.console.error(errors[i].toString());
        }
    });

    mainView.console.log("Compiler lauched at " + new Date().toTimeString());
    $(".loading-mask").remove();
});
