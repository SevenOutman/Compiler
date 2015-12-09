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

    _editor.getContent = function() {
        return _editor.cm.getValue();
    };

    _editor.setContent = function(content) {
        return _editor.cm.setValue(content);
    };

    _editor.save = function() {
        if (!_editor.cm.doc.isClean()) {
            var code = _editor.getContent();
            Storage.setItem("code", code);
            _editor.cm.doc.markClean();
            document.getElementById("btn-save").classList.remove("unsaved");
        }
    };

    _editor.needSave = function() {
        return !_editor.cm.doc.isClean();
    };

    _editor.cm.on("change", function(cm, change) {
        if (_editor.needSave()) {
            document.getElementById("btn-save").classList.add("unsaved");
        }
    });

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