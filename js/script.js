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
    S("semantichaserror", function (errors) {
        for (var i = 0; i < errors.length; i++) {
            mainView.console.error(errors[i].toString());
        }
    });

    mainView.console.log("Compiler lauched at " + new Date().toTimeString());
    $(".loading-mask").remove();
});
