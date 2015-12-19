/**
 * Created by Doma on 15/12/8.
 */
var View = (function () {
    var _editor = {};
    _editor.cm = CodeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers: true,
        mode: "toy",
        indentUnit: 4,
        theme: "monokai-so",
        autoCloseBrackets: true,
        matchBrackets: true,
        styleActiveLine: true,
        showCursorWhenSelecting: true,
        scrollbarStyle: "overlay",
        selectionPointer: true
    });
    _editor.cm.on("change", function (cm, change) {
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

    _editor.cm.on("cursorActivity", function (cm) {
        var pos = cm.doc.getCursor();
        $("#current-line").text(pos.line + 1);
        $("#current-ch").text(pos.ch + 1);
    });

    _editor.getContent = function () {
        return _editor.cm.getValue();
    };

    _editor.setContent = function (content) {
        return _editor.cm.setValue(content);
    };

    function FileSession(file) {
        this.id = _randomString(8);
        this.file = file;
        this.saved = true;
        this.content = file.content;
        this.history = {done: [], undone: []};
        this.cursorPosition = {line: 0, ch: 0};
    }

    _editor.openedSessions = [];
    _editor.openedSessions.find = function (sessionId) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].id === sessionId) {
                return this[i];
            }
        }
        return null;
    }.bind(_editor.openedSessions);

    _editor.openedSessions.findFile = function (fileName) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].file.fileName() === fileName) {
                return this[i];
            }
        }
        return null;
    }.bind(_editor.openedSessions);

    _editor.currentSession = (function () {
        var _current = null;
        return function (session) {
            if (session && session !== _current) {
                if (null !== _current) {
                    _current.content = _editor.getContent();
                    _current.history = _editor.cm.doc.getHistory();
                    _current.cursorPosition = _editor.cm.doc.getCursor();
                }
                _current = session;
                _editor.setContent(_current.content);
                _editor.cm.doc.setHistory(_current.history);
                _editor.cm.doc.setCursor(_current.cursorPosition);
                var id = "session-" + _current.id,
                    $li = $("#" + id);


                if ($li.length < 1) {
                    var $a = $("<a></a>").text(session.file.fileName()),
                        $span = $("<span></span>").addClass("tab-dismiss").html("&times;");
                    $li = $("<div></div>").attr("id", id).addClass("tab-cell");
                    $span.on("click", (function (session) {
                        return function () {
                            View.editor.closeSession(session);
                            return false;
                        }
                    })(session));
                    $li.on("click", (function (session) {
                        return function () {
                            _editor.bringSessionToFront(session);
                        }
                    })(session));
                    $(".tab-group").append($li.append($a.append($span)));
                }

                if (!$li.hasClass("active")) {
                    $li.siblings(".active").removeClass("active");
                    $li.addClass("active");
                }
            } else if (null === session) {
                _current = null;
                _editor.setContent("");
                $(".editor-placeholder").show();
                $("#cursor-position").hide();
            }
            return _current;
        }
    })();

    _editor.bringSessionToFront = function (session) {
        var saved = session.saved;
        _editor.currentSession(session);
        _editor.cm.focus();

        if (saved) {
            View.editor.save(true);
        }
    };

    _editor.closeSession = function (session) {
        _editor.openedSessions.remove(session);
        var id = "session-" + session.id,
            $li = $("#" + id);
        $li.remove();
        if (_editor.currentSession() == session) {
            var s = _editor.openedSessions.front();
            if (undefined === s) {
                _editor.currentSession(null);
            } else {
                _editor.bringSessionToFront(s);
            }
        }
    };

    _editor.openFile = function (file) {
        $(".editor-placeholder").hide();
        $("#cursor-position").show();
        var session = file.isNewFile ? null : _editor.openedSessions.findFile(file.fileName());

        if (null === session) {
            session = new FileSession(file);
            _editor.openedSessions.push(session);
        }


        var id = "toy-" + file.name,
            $li = $("#" + id);
        $li.trigger("click");
        _editor.bringSessionToFront(session);
    };

    _editor.newFile = function () {
        _editor.openFile(new ToyFile);
    };

    var dialog = document.createElement("div"),
        input = document.createElement("input"),
        span = document.createElement("span");
    dialog.id = "dialog-save";
    dialog.innerHTML = "File name: ";
    input.size = "untitled".length;
    input.value = "untitled";
    input.oninput = function () {
        input.size = Math.max(input.value.length, 1);
    };
    span.innerHTML = ".toy";
    dialog.appendChild(input);
    dialog.appendChild(span);

    _editor.save = function (force) {
        var session = _editor.currentSession();
        if (session) {
            if (!force) {
                if (session.file.isNewFile) {
                    _editor.dialogRenameFile(session.file);
                    return;
                }
            }

            if (force || !session.saved) {
                session.file.content = session.content = _editor.getContent();
                Storage.setItem(session.file.fileName(), session.file.serialize());
                if (!force) {
                    _console.log("Saved to '" + session.file.fileName() + "'");
                }
                session.saved = true;
                //_editor.cm.doc.markClean();
                document.getElementById("btn-save").classList.remove("unsaved");
            }
        }
    };

    _editor.needSave = function () {
        if (!_editor.currentSession()) {
            return false;
        }
        return !_editor.currentSession().saved;
    };

    var renaming = null;
    _editor.dialogRenameFile = function (file) {
        renaming = file;
        if (renaming !== null) {

            $("#filename").val(file.name);
            $("#dialog-mask").show();
            $("#filename").select();

        }
    };

    _editor.confirmRename = function () {
        if (renaming !== null) {
            var newName = $("#filename").val();
            if (null !== Cache.files.find(newName + ".toy")) {
                if (!confirm("File '" + newName + ".toy' already exists. Want to overwrite?")) {
                    $("#filename").select();
                    return false;
                }
            }
            $("#dialog-mask").hide();
            $("#filename").val("");
            var id = "toy-" + renaming.name;

            renaming.name = newName;
            //file.content = _editor.getContent();
            if (renaming.isNewFile) {
                renaming.isNewFile = false;
                //session.saved = false;
                _editor.save();
                Cache.files.push(renaming);
                id = "toy-" + newName;
                if ($("#" + id).length < 1) {
                    var $li = $("<li></li>").attr("id", id).text(renaming.fileName()),
                        $icon = $("<span></span>").addClass("glyphicon glyphicon-file");
                    $li.on("click", function () {
                        var $self = $(this);
                        if (!$self.hasClass("active")) {
                            $self.siblings(".active").removeClass("active");
                            $self.addClass("active");
                        }
                    }).on("contextmenu", function () {
                        $(this).trigger("click");
                    }).on("dblclick", (function (file) {
                        return function () {
                            View.editor.openFile(file);
                        }
                    })(renaming));
                    $("#file-list").append($li.prepend($icon));
                }
            } else {
                var $li = $("#" + id),
                    $icon = $("<span></span>").addClass("glyphicon glyphicon-file");
                $li.attr("id", "toy-" + newName).text(renaming.fileName()).prepend($icon);
            }
            var session = _editor.openedSessions.findFile(renaming.fileName());
            if (session) {
                var cursor = _editor.cm.doc.getCursor();
                _editor.closeSession(session);
                _editor.openFile(renaming);
                _editor.cm.doc.setCursor(cursor);
            }
            renaming = null;
        }
    };


    var _console = {};

    _console.cm = CodeMirror.fromTextArea(document.getElementById("console"), {
        theme: "monokai-so",
        mode: "console",
        readOnly: "nocursor",
        scrollbarStyle: "overlay",
        viewportMargin: Infinity
    });

    _console.scollToEnd = function () {
        _console.cm.scrollIntoView(_console.cm.doc.lastLine(), 1);
    };

    _console.cm.on("change", function (cm) {
        cm.scrollIntoView(cm.doc.lastLine(), 1);
    });

    function _preoutput(addon, para) {
        return addon + para.replace(/\s*\n/g, "\n  ") + "\n";
    }

    function _lastNLines(str, n) {
        return lines = str.split("\n").slice(-n).join("\n");
    }

    _console.log = function (str) {
        if (_console.cm) {
            _console.cm.setValue(_lastNLines(_console.cm.getValue() + _preoutput(": ", str), 1000));
        } else {
            window.console.log(str);
        }
    };

    _console.error = function (str) {
        if (_console.cm) {
            if (str instanceof Object) {
                str = str.toString();
            }
            _console.cm.setValue(_lastNLines(_console.cm.getValue() + _preoutput("- ", str), 1000));
        } else {
            window.console.log(str);
        }
    };

    _console.success = function (str) {
        if (_console.cm) {
            _console.cm.setValue(_lastNLines(_console.cm.getValue() + _preoutput("+ ", str), 1000));
        } else {
            window.console.log(str);
        }
    };

    _console.popup = function () {
        $("#box-opener-console").trigger("click");
    };

    _console.fold = function () {
    };

    var _control = {};
    _control.compiling = null;
    _control.compilie = function (file) {
        //return;
        _control.compiling = file;
        _control.enterCompileMode();
    };

    _control.enterCompileMode = function () {
        if (_control.compiling !== null) {
            $("#compiling-filename").text(_control.compiling.fileName());
            $("#editing-btn-group").hide();
            $("#compiling-btn-group").show();
            $(".tab-bar-cover").show();
            $("#box-opener-tree").trigger("click");
            $("#box-opener-structure").trigger("click");
            $("#box-opener-console").trigger("click");
            $(".tree-box .placeholder").hide();
            _treePen.clear().setOptions({
                width: 550,
                height: $(".tree-box .box-body").height()
            });
            $(".left-box .box-caret").trigger("click");
            _editor.cm.setOption("readOnly", true);
        }
    };

    _control.exitCompileMode = function () {
        $("#compiling-btn-group").hide();
        $("#editing-btn-group").show();
        $(".tab-bar-cover").hide();
        //$("#btn-compile").prop("disabled", false);
        $("#box-opener-workspace").trigger("click");
        $(".right-box .box-caret").trigger("click");
        $(".tree-box .box-caret").trigger("click");
        $(".bottom-box .box-caret").trigger("click");
        _editor.cm.setOption("readOnly", false);
        _control.compiling = null;
        $("#compiling-filename").text("");
        _console.cm.setValue("");
    };

    var _treePen = new Tree("tree-pane", {
            radius: 15
        });
    _treePen.clear = function () {
        _treePen.canvas.clear();
        return _treePen;
    };

    return {
        editor: _editor,
        console: _console,
        control: _control,
        treePen: _treePen
    };
})
();