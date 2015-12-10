/**
 * Created by Doma on 15/12/8.
 */
var View = (function() {
    var _editor = {};
    _editor.cm = CodeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers:       true,
        mode:              "toy",
        indentUnit:        4,
        theme:             "monokai-so",
        autoCloseBrackets: true,
        matchBrackets:     true,
        autofocus:         true,
        styleActiveLine:   true,
        scrollbarStyle:    "overlay"
    });
    _editor.cm.on("change", function(cm, change) {
        if (_editor.needSave()) {
            document.getElementById("btn-save").classList.add("unsaved");
        }
    });

    _editor.cm.on("cursorActivity", function(cm) {
        var pos = cm.doc.getCursor();
        $("#current-line").text(pos.line + 1);
        $("#current-ch").text(pos.ch + 1);
    });

    _editor.getContent = function() {
        return _editor.cm.getValue();
    };

    _editor.setContent = function(content) {
        return _editor.cm.setValue(content);
    };


    _editor.openedFiles = [];
    _editor.openedFiles.find = function(fileId) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].id === fileId) {
                return this[i];
            }
        }
        return null;
    }.bind(_editor.openedFiles);

    _editor.openedFiles.sub("change", function() {
        for (var i = 0; i < this.length; i++) {
            var file = this[i],
                id   = "opentoy-" + file.id;
            if ($("#" + id).length < 1) {
                var $a  = $("<a></a>").attr("id", id).text(file.fileName()),
                    $li = $("<div></div>").addClass("tab-cell");
                $li.on("click", (function(file) {
                    return function() {
                        View.editor.bringFileToFront(file);
                    }
                })(file));
                $(".tab-group").append($li.append($a));
            }
        }
    });

    _editor.currentFile = (function() {
        var _current = null;
        return function(file) {
            if (file) {
                _current = file;
                _editor.setContent(_current.content);
                var id  = "opentoy-" + file.id,
                    $a  = $("#" + id),
                    $li = $a.parents(".tab-cell");
                if (!$li.hasClass("active")) {
                    $li.siblings(".active").removeClass("active");
                    $li.addClass("active");
                }
            }
            return _current;
        }
    })();

    _editor.bringFileToFront = function(file, force) {
        if (!force && null === _editor.openedFiles.find(file.id)) {
            _editor.openFile(file);
        }
        _editor.currentFile(file);
        _editor.cm.focus();
    };


    _editor.openFile = function(file) {
        if (null === _editor.openedFiles.find(file.id)) {
            _editor.openedFiles.push(file);
            _editor.openedFiles.pub("change");
        }
        _editor.bringFileToFront(file, true);
    };

    _editor.newFile = function() {
        _editor.openFile(new ToyFile);
    };


    _editor.save = function() {
        if (!_editor.cm.doc.isClean()) {
            var file = _editor.currentFile();
            if (file) {
                file.content = _editor.getContent();
                Storage.setItem(file.fileName(), file.serialize());
            }
            _editor.cm.doc.markClean();
            document.getElementById("btn-save").classList.remove("unsaved");
        }
    };

    _editor.needSave = function() {
        return !_editor.cm.doc.isClean();
    };


    var _console = {};

    _console.cm = CodeMirror.fromTextArea(document.getElementById("console"), {
        theme:             "monokai-so",
        mode:              "console",
        lineWrapping:      true,
        autoCloseBrackets: true,
        matchBrackets:     true,
        readOnly:          "nocursor",
        scrollbarStyle:    null

    });

    _console.scollToEnd = function() {
        _console.cm.scrollIntoView(_console.cm.doc.lastLine(), 1);
    };

    _console.cm.on("change", function(cm) {
        cm.scrollIntoView(cm.doc.lastLine(), 1);
    });


    function _preoutput(addon, para) {
        var lines  = para.split("\n"),
            result = "";
        for (var i = 0; i < lines.length; i++) {
            result += addon + lines[i].replace(/\s+$/, "") + "\n";
        }
        return result;
    }

    _console.log = function(str) {
        if (_console.cm) {
            _console.cm.setValue(_console.cm.getValue() + _preoutput(": ", str));
        } else {
            window.console.log(str);
        }
    };

    _console.error = function(str) {
        if (_console.cm) {
            if (str instanceof Object) {
                str = str.toString();
            }
            _console.cm.setValue(_console.cm.getValue() + _preoutput("- ", str));
        } else {
            window.console.log(str);
        }
    };

    _console.success = function(str) {
        if (_console.cm) {
            _console.cm.setValue(_console.cm.getValue() + _preoutput("+ ", str));
        } else {
            window.console.log(str);
        }
    };
    return {
        editor:  _editor,
        console: _console
    };
})();