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
        var session = _editor.currentSession();
        if (null === session) {
            document.getElementById("btn-save").classList.remove("unsaved");
            return;
        }
        if (session.saved) {
            session.saved = false;
        }
        if (!document.getElementById("btn-save").classList.hasOwnProperty("unsaved")) {
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

    function FileSession(file) {
        this.id = _randomString(8);
        this.file = file;
        this.saved = true;
        this.content = file.content;
        this.cursorPosition = {line: 0, ch: 0};
    }

    _editor.openedSessions = [];
    _editor.openedSessions.find = function(sessionId) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].id === sessionId) {
                return this[i];
            }
        }
        return null;
    }.bind(_editor.openedSessions);

    _editor.openedSessions.findFile = function(fileName) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].file.fileName() === fileName) {
                return this[i];
            }
        }
        return null;
    }.bind(_editor.openedSessions);

    _editor.openedSessions.sub("change", function() {
        for (var i = 0; i < this.length; i++) {
            var session = this[i],
                id      = "session-" + session.id;
            if ($("#" + id).length < 1) {
                var $a    = $("<a></a>").text(session.file.fileName()),
                    $span = $("<span></span>").addClass("tab-dismiss").html("&times;"),
                    $li   = $("<div></div>").attr("id", id).addClass("tab-cell");
                $span.on("click", (function(session) {
                    return function() {
                        View.editor.closeSession(session);
                        return false;
                    }
                })(session));
                $li.on("click", (function(session) {
                    return function() {
                        View.editor.bringSessionToFront(session);
                    }
                })(session));
                $(".tab-group").append($li.append($a.append($span)));
            }
        }
    });
    _editor.currentSession = (function() {
        var _current = null;
        return function(session) {
            if (session && session !== _current) {
                if (null !== _current) {
                    _current.content = _editor.getContent();
                    _current.cursorPosition = _editor.cm.doc.getCursor();
                }
                _current = session;
                _editor.setContent(_current.content);
                _editor.cm.doc.setCursor(_current.cursorPosition);
                var id  = "session-" + _current.id,
                    $li = $("#" + id);
                if (!$li.hasClass("active")) {
                    $li.siblings(".active").removeClass("active");
                    $li.addClass("active");
                }
            } else if (null === session) {
                _current = null;
                _editor.setContent("");
            }
            return _current;
        }
    })();

    _editor.bringSessionToFront = function(session) {
        var saved = session.saved;
        _editor.currentSession(session);
        _editor.cm.focus();

        if (saved) {
            View.editor.save(true);
        }
    };

    _editor.closeSession = function(session) {
        _editor.openedSessions.remove(session);
        var id  = "session-" + session.id,
            $li = $("#" + id),
            li  = $li[0];
        li.parentNode.removeChild(li);
        if (_editor.currentSession() == session) {
            var s = _editor.openedSessions.front();
            _editor.currentSession(undefined === s ? null : s);
        }
    };

    _editor.openFile = function(file) {
        var session = file.isNewFile ? null : _editor.openedSessions.findFile(file.fileName());

        if (null === session) {
            session = new FileSession(file);
            _editor.openedSessions.push(session);
            _editor.openedSessions.pub("change");
        }

        _editor.bringSessionToFront(session);
    };

    _editor.newFile = function() {
        _editor.openFile(new ToyFile);
    };

    _editor.save = function(force) {
        var session = _editor.currentSession();
        if (session) {
            if (!force) {
                if (session.file.isNewFile) {
                    if (session.saved) {

                    }
                    return;
                }
            }

            if (!_editor.cm.doc.isClean()) {
                session.file.content = session.content = _editor.getContent();
                Storage.setItem(session.file.fileName(), session.file.serialize());
                session.saved = true;
                _editor.cm.doc.markClean();
                document.getElementById("btn-save").classList.remove("unsaved");
            }
        }
    };

    _editor.needSave = function() {
        if (!_editor.currentSession()) {
            return false;
        }
        return !_editor.currentSession().saved;
    };


    var _console = {};

    _console.cm = CodeMirror.fromTextArea(document.getElementById("console"), {
        theme:          "monokai-so",
        mode:           "console",
        readOnly:       "nocursor",
        scrollbarStyle: null

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
            result += (i == 0 ? addon : "  ") + lines[i].replace(/\s+$/, "") + "\n";
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