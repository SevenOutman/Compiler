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
        lineWrapping:      true,
        autoCloseBrackets: true,
        matchBrackets:     true,
        autofocus:         true
    });

    _editor.getContent = function () {
        return _editor.cm.getValue();
    };

    _editor.setContent = function (content) {
        return _editor.cm.setValue(content);
    };

    _editor.save = function () {
        if (!_editor.cm.doc.isClean()) {
            var code = _editor.getContent();
            Storage.setItem("code", code);
            _editor.cm.doc.markClean();
            document.getElementById("btn-save").classList.remove("unsaved");
        }
    };

    _editor.needSave = function () {
        return !_editor.cm.doc.isClean();
    };

    _editor.cm.on("change", function(cm, change) {
        if (_editor.needSave()) {
            document.getElementById("btn-save").classList.add("unsaved");
        }
    });

    var _console = {};

    _console.cm = CodeMirror.fromTextArea(document.getElementById("console"), {
        theme:             "base16-dark",
        mode:              "console",
        lineNumbers:       true,
        lineWrapping:      true,
        autoCloseBrackets: true,
        matchBrackets:     true,
        readOnly:          "nocursor"
    });

    _console.log = function(str) {
        if (_console.cm) {
            _console.cm.setValue(_console.cm.getValue() + ":" + str + "\n");
        } else {
            window.console.log(str);
        }
    };

    _console.error = function (str) {
        if (_console.cm) {
            _console.cm.setValue(_console.cm.getValue() + "-" + str + "\n");
        } else {
            window.console.log(str);
        }
    };

    _console.success = function(str) {
        if (_console.cm) {
            _console.cm.setValue(_console.cm.getValue() + "+" + str + "\n");
        } else {
            window.console.log(str);
        }
    };
    return {
        editor:  _editor,
        console: _console
    };
})();