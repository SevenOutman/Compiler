/**
 * Created by Doma on 16/3/15.
 */

function FileManager() {
    var self = this;
    self.files = ko.observableArray([]);
    var cached = [];
    self.newFile = function () {
        var file = new File();
        cached.push(file);
        return file;
    };

    self.findFile = function (fileName) {
        for (var i = 0, files = self.files(), len = files.length; i < len; i++) {
            if (files[i].fileName() == fileName) {
                return files[i];
            }
        }
    };

    self.saveFile = function (file) {
        if (file.isNew()) {
            self.files.push(cached.pop());
            file.isNew(false);
        }
        Storage.setItem(file.fileName(), file.serialize());
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
    self.load();

    function File(name, content, isNew) {
        var self = this;
        self.isNew = ko.observable($defined(isNew) ? isNew : true);
        self.name = ko.observable($defined(name) ? name.replace(/(\.toy)$/, "") : "untitled");
        self.content = ko.observable(content || "");

        self.fileName = ko.computed(function () {
            return self.isNew() ? self.name() : self.name() + ".toy";
        });

        self.serialize = function () {
            return JSON.stringify({
                name: self.name(),
                content: self.content()
            });
        };
    }
}
function EditorViewModel(fileManager) {
    var self = this;
    self.renameDialog = new RenameDialog(fileManager, self);
    self.cm = CodeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers: true,
        mode: "toy",
        indentUnit: 4,
        theme: "monokai-so",
        autoCloseBrackets: true,
        matchBrackets: true,
        styleActiveLine: true,
        showCursorWhenSelecting: true,
        scrollbarStyle: "overlay",
        selectionPointer: true,
        styleSelectedText: true
    });
    self.cm.on("change", function (cm, change) {
        var tab = self.activeTab();
        if (tab) {
            tab.cachedContent(self.getEditorContent());
        }
    });

    self.cm.on("cursorActivity", function (cm) {
        var tab = self.activeTab();
        if (tab) {
            tab.cursorPosition(cm.doc.getCursor());
        }
    });

    self.getEditorContent = function () {
        return self.cm.getValue();
    };
    self.setEditorContent = function (content) {
        return self.cm.setValue(content);
    };

    self.tabs = ko.observableArray([]);
    self.activeTab = ko.observable();
    self.setActive = function (tab) {
        var activeTab = self.activeTab();
        if (activeTab != tab) {
            if (activeTab) {
                activeTab.cursorPosition(self.cm.doc.getCursor());
                activeTab.history = self.cm.doc.getHistory();
                activeTab.cachedContent(self.getEditorContent());
                activeTab.isActive(false);
            }
            self.activeTab(tab);
            if (tab) {
                tab.isActive(true);
                self.setEditorContent(tab.cachedContent());
                self.cm.doc.setHistory(tab.history);
                self.cm.doc.setCursor(tab.cursorPosition());
                self.cm.focus();
            }
        }
    };
    self.unsaved = ko.computed(function () {
        var t = self.activeTab();
        return t && t.unsaved();
    });

    self.saveActiveTab = function () {
        var tab = self.activeTab();
        if (tab.unsaved() || tab.file.isNew()) {
            if (tab.file.isNew()) {
                self.renameDialog.rename(tab.file);
            } else {
                tab.cachedContent(self.getEditorContent());
                tab.file.content(tab.cachedContent());
                fileManager.saveFile(tab.file);
            }
        }
    };

    CodeMirror.commands.save = function () {
        self.saveActiveTab();
    };

    self.openNewFile = function () {
        self.openFile(fileManager.newFile());
    };

    self.openFile = function (file) {
        for (var i = 0, tabs = self.tabs(), len = tabs.length; i < len; i++) {
            var tab = tabs[i];
            if (tab.file == file) {
                self.setActive(tab);
                return;
            }
        }

        var tab = new EditorTab(file);
        self.tabs.push(tab);
        self.setActive(tab);
    };
    self.closeTab = function (tab) {
        self.tabs.remove(tab);
        if (self.activeTab() == tab) {
            self.setActive(self.tabs().rear());
        }
    };

    self.cursorPosText = ko.computed(function () {
        var tab = self.activeTab();
        if (tab) {
            var pos = tab.cursorPosition();
            return (pos.line + 1) + ":" + (pos.ch + 1);
        }
        return "";
    });


    self.load = function () {
        var openedFiles = JSON.parse(Storage.getItem("opened-files") || "[]"),
            lastEditing = Storage.getItem("last-editing");
        openedFiles.push(lastEditing);
        for (var i = 0, len = openedFiles.length; i < len; i++) {
            var fileName = openedFiles[i];
            var file = fileManager.findFile(fileName);
            if (file) {
                self.openFile(file);
            }
        }
    };
    self.save = function () {
        var openedFiles = [];
        for (var i = 0, tabs = self.tabs(), len = tabs.length; i < len; i++) {
            var tab = tabs[i];
            openedFiles[openedFiles.length] = tab.file.fileName();
            if (tab.isActive()) {
                Storage.setItem("last-editing", tab.file.fileName());
            }
        }
        Storage.setItem("opened-files", JSON.stringify(openedFiles));
    };

    self.load();

    function EditorTab(file) {
        var self = this;
        self.file = file;
        self.isActive = ko.observable(false);
        self.cachedContent = ko.observable(self.file.content());

        self.unsaved = ko.computed(function () {
            return self.cachedContent() != self.file.content();
        });
        self.cursorPosition = ko.observable({line: 0, ch: 0});
        self.history = {done: [], undone: []};
    }

    function RenameDialog(fileManager, editor) {
        var self = this;
        self.isOpen = ko.observable(false);
        var renaming = null;
        self.name = ko.observable("");
        self.rename = function (file) {
            renaming = file;
            self.name(renaming.name());
            self.isOpen(true);
            $("#filename").select();

        };
        self.reset = function () {
            renaming = null;
            self.name("");
        };
        self.cancel = function () {
            self.isOpen(false);
            self.reset();
        };
        self.confirm = function () {
            var name = self.name();
            if (fileManager.findFile(name + ".toy")) {
                if (!confirm("File '" + name + ".toy' already exists. Want to overwrite?")) {
                    $("#filename").select();
                    return false;
                }
            }
            renaming.name(self.name());
            fileManager.saveFile(renaming);

            var tab = editor.activeTab();
            if (tab && renaming == tab.file) {
                tab.cachedContent(editor.getEditorContent());
                tab.file.content(tab.cachedContent());
                fileManager.saveFile(tab.file);
            }

            self.isOpen(false);
            self.reset();
        }
    }
}

function WorkspaceViewModel(fileManager, editor) {
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


    self.importFile = function () {
        var fr = new FileReader(),
            tmpFile = null;
        fr.onload = function () {
            if (null !== tmpFile) {
                tmpFile.content(this.result);
                fileManager.files.push(tmpFile);
                self.openFileInEditor(tmpFile);
                tmpFile = null;
            }
        };
        var $fileInput = $(document.createElement("input"))
            .attr({
                "type": "file"
            });
        $fileInput.on("change", function () {
            var file = $(this)[0].files[0];
            tmpFile = new ToyFile(file.name.replace(/(\.\w+)?$/, ".toy"));
            tmpFile.isNew(false);
            fr.readAsText(file);
        });
        $fileInput.trigger("click");
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

function Openable() {
    var self = this;
    self.isOpen = ko.observable(false);
    self.open = function () {
        self.isOpen(true);
    };
    self.close = function () {
        self.isOpen(false);
    }
}
function ConsoleViewModel() {
    var self = this;
    self.cm = CodeMirror.fromTextArea(document.getElementById("console"), {
        theme: "monokai-so",
        mode: "console",
        readOnly: "nocursor",
        scrollbarStyle: "overlay",
        viewportMargin: Infinity
    });

    self.scollToEnd = function () {
        self.cm.scrollIntoView(self.cm.doc.lastLine(), 1);
    };

    self.cm.on("change", function (cm) {
        cm.scrollIntoView(cm.doc.lastLine(), 1);
    });

    function _preoutput(addon, para) {
        return addon + para.replace(/\s*\n/g, "\n  ") + "\n";
    }

    function _lastNLines(str, n) {
        return str.split("\n").slice(-n).join("\n");
    }

    self.log = function (str) {
        if (self.cm) {
            self.cm.setValue(_lastNLines(self.cm.getValue() + _preoutput(": ", str), 1000));
        } else {
            window.console.log(str);
        }
    };

    self.error = function (str) {
        if (str) {
            if (self.cm) {
                if (str instanceof Object) {
                    str = str.toString();
                }
                self.cm.setValue(_lastNLines(self.cm.getValue() + _preoutput("- ", str), 1000));
            } else {
                window.console.log(str);
            }
        }
    };

    self.success = function (str) {
        if (str) {

            if (self.cm) {
                self.cm.setValue(_lastNLines(self.cm.getValue() + _preoutput("+ ", str), 1000));
            } else {
                window.console.log(str);
            }

        }
    };
    self.warn = function (str) {
        if (str) {

            if (self.cm) {
                self.cm.setValue(_lastNLines(self.cm.getValue() + _preoutput("@ ", str), 1000));
            } else {
                window.console.log(str);
            }

        }
    };

    self.popup = function () {
        $("#box-opener-console").trigger("click");
    };

}
function MainViewModel() {
    var self = this;
    var fileManager = self.fileManager = new FileManager();
    var editor = self.editor = new EditorViewModel(fileManager);
    self.workspace = new WorkspaceViewModel(fileManager, editor);
    self.console = new ConsoleViewModel();


    self.aboutCard = new Openable();
}