/**
 * Created by Doma on 16/3/15.
 */

function FileManager() {
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

    File.example = function () {
        return new File("example",
            "{\n" +
            "    int a;\n" +
            "    real b;\n" +
            "    a = 1;\n" +
            "    b = 2.0;\n" +
            "    if (a > b) then {\n" +
            "        b = a;\n" +
            "    }\n" +
            "    else {\n" +
            "        b = b - a;\n" +
            "    }\n" +
            "}", false);
    };
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
        if (!self.files().length) {
            self.files.push(File.example());
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

    self.lock = function () {
        self.cm.setOption("readOnly", "nocursor");
    };
    self.unlock = function () {
        self.cm.setOption("readOnly", false);
    };


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
    var $box = $(".left-box");
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

    self.isOpen = ko.observable(true);
    self.open = function () {
        if ($box.hasClass("hidden")) {
            self.isOpen(true);
            $box.css("width", "200px");
            $(".center-box").css("margin-left", "200px");
        }
    };
    self.close = function () {
        self.isOpen(false);
        $(".center-box").css("margin-left", "0");
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
    var $box = $(".bottom-box");

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

    self.clear = function () {
        self.cm.setValue("");
    };

    self.isOpen = ko.observable(false);
    self.open = function (prevent) {
        self.isOpen(true);
        $box.css("height", "30%");
        $(".upper-box").css("height", "70%");
        if (!prevent) {
            P("treeboxresized");
        }
    };

    self.close = function () {
        self.isOpen(false);
        $(".upper-box").css("height", "100%");
        P("treeboxresized");
    };

    self.expand = function () {
        $(".upper-box").css("height", "0");
        $box.css("height", "100%");
    }
}
function UIViewModel(editor, workspace, console, treePen, symbolTable) {
    var self = this;
    var compileMode = ko.observable(false);
    self.compileMode = ko.computed({
        read: function () {
            return compileMode();
        },
        write: function (value) {
            compileMode(value);
            if (value) {
                editor.lock();
                workspace.close();
                symbolTable.open();
                treePen.open();
                console.open();
                console.clear();
            } else {
                treePen.close();
                symbolTable.close();
                workspace.open();
                editor.unlock();
            }
        }
    });
}
function ParseTreeViewModel() {
    var self = this;
    var $box = $(".tree-box");
    var $boxBody = $box.find(".box-body");

    var _treePen = new Tree("tree-pane", {
        radius: 10
    });
    _treePen.clear = function () {
        _treePen.canvas.clear();
        return _treePen;
    };
    _treePen.reset = function () {
        _treePen.setSource([
            ["0", "program", 1, "", "1", "0"],
        ]);
    };
    _treePen.resize = function () {
        _treePen.render({
            width: $boxBody.width(),
            height: $boxBody.height()
        });
    };

    S("treeboxresized", function () {
        _treePen.resize();
    });

    self.pen = _treePen;
    self.showAssembly = ko.observable(false);

    var _assembly = {};
    _assembly.cm = CodeMirror.fromTextArea(document.getElementById("assembly"), {
        theme: "monokai-so",
        mode: "console",
        readOnly: "nocursor",
        scrollbarStyle: "overlay",
        viewportMargin: Infinity
    });
    self.assembly = {
        setContent: function (content) {
            _assembly.cm.setValue(content);
        }
    };

    self.isOpen = ko.observable(false);
    self.open = function () {
        self.isOpen(true);
        $box.css("width", "550px");
        $(".editor-box").css("margin-right", "550px");
        self.pen.reset();
        self.pen.resize();
    };
    self.close = function () {
        self.isOpen(false);
        $box.children(".box-body").css("padding-left", "0");
        $(".editor-box").css("margin-right", "0");
    };
}
function SymbolTableViewModel() {
    var self = this;
    var $box = $(".right-box");


    self.symbols = ko.observable([]);
    self.rows = ko.computed(function () {
        return $.map(self.symbols(), function (symbol) {
            return new SymbolRow(symbol);
        });
    });

    var activeRow = null;
    self.setActive = function (row) {
        if (activeRow) {
            activeRow.isActive(false);
        }
        (activeRow = row).isActive(true);
    };

    self.isOpen = ko.observable(false);

    self.open = function () {
        self.isOpen(true);
        $box.css("width", "350px");
        $(".center-box").css("margin-right", "350px");
    };
    self.close = function () {
        self.isOpen(false);
        $(".center-box").css("margin-right", "0");
    };

    function SymbolRow(symbol) {
        var self = this;
        self.symbol = symbol;
        self.attrId = "symbol-" + symbol.name;
        self.rowText = "type: " + symbol.type + ", occurance: " + symbol.positions.length;
        self.isActive = ko.observable(false);
        self.isOpen = ko.observable(false);
        self.toggle = function () {
            self.isOpen(!self.isOpen());
        };
    }

    function PositionRow(position) {
        var self = this;
    }
}
function Processor(console, parseTree, symbolTable) {
    var self = this;
    var paxer = self.paxer = Paxer.new();
    var semantic = self.semantic = new SemanticAnalyzer();

    self.compilee = ko.observable(null);

    self.compile = function (file) {
        self.compilee(file);
        if (file) {
            Cache.st = {};
            symbolTable.symbols([]);
            console.log("Compile '" + file.fileName() + "'...");
            self.paxer.setInput(self.preprocesscode(file.content()));
        }
    };

    self.preprocesscode = function (code) {
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
    };

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
    self.compileNext = function () {
        var status = paxer.getStatus();
        if (status == 'DONE' || status == 'ERROR') {
            return;
        }
        paxer.go();
        switch (status = paxer.getStatus()) {
            case "DONE":
                semantic.eat(paxer.getRootS(), paxer.getSymbolTable());
                console.success(paxer.getCurMovementF());
                console.success('code parsed.');
                console.warn(paxer.getWarningMsg());
                console.error(semantic.getErrorMsg());
                $(".tree-box").addClass("assembly");
                parseTree.assembly.setContent(semantic.getAssembly());
                return;
            case "ERROR":
                console.error(paxer.getErrMsg());
                return;
            case "WARNING":
            case "NORMAL":
                console.success(paxer.getCurMovementF());
                parseTree.pen.setSource(paxer.getSequentialNodes());
                parseTree.pen.render();
        }
        symbolTable.symbols(paxer.getSymbolTable());
        return status;
    };
    self.compileFF = function () {
        var status = paxer.getStatus();
        if (status == "DONE") {
            console.success('code parsed.');
        } else if (paxer.getStatus() == "ERROR") {
            console.error(paxer.getErrMsg());
        } else {
            Benchmark.mark("parse");
            while (paxer.getStatus() != "DONE" && paxer.getStatus() != "ERROR") {
                paxer.go();
            }
            switch (status = paxer.getStatus()) {
                case 'DONE':
                    semantic.eat(paxer.getRootS(), paxer.getSymbolTable());
                    var parseTime = Benchmark.measure("parse");
                    $(".tree-box").addClass("assembly");
                    parseTree.assembly.setContent(semantic.getAssembly());
                    console.success(paxer.getMovementsF());
                    console.warn(paxer.getWarningMsg());
                    console.error(semantic.getErrorMsg());
                    console.success("Compile finished in " + parseTime.toFixed(4) + " millisecs.");
                    console.success("Can we make it faster?");
                    break;
                case 'ERROR':
                    console.error(paxer.getErrMsg());
                    break;
            }
        }
        return status;
    };
}
function ControlsViewModel(fileManager, editor, workspace, console, processor, ui) {
    var self = this;
    self.needSave = ko.computed(function () {
        return editor.unsaved();
    });
    self.save = function () {
        editor.saveActiveTab();
    };
    self.tidy = function () {
        var code = editor.getEditorContent();
        editor.setEditorContent(processor.preprocesscode(code));
        for (var i = 0; i < editor.cm.doc.lastLine(); i++) {
            editor.cm.indentLine(i, "smart");
        }
        editor.cm.focus();
    };
    self.importFile = function () {
        workspace.importFile();
    };
    self.compile = function () {
        var tab = editor.activeTab();
        if (tab) {
            editor.saveActiveTab();
            var file = tab.file;
            if (file.isNew()) {
                return;
            }
            processor.compile(file);
            ui.compileMode(true);
        }
    };
    self.stop = function () {
        processor.compile(null);
        ui.compileMode(false);
    };
    self.next = function () {
        processor.compileNext();
    };
    self.ff = function () {
        processor.compileFF();
    };
}
function MainViewModel() {
    var self = this;
    var fileManager = self.fileManager = new FileManager();
    var editor = self.editor = new EditorViewModel(fileManager);
    var workspace = self.workspace = new WorkspaceViewModel(fileManager, editor);
    var console = self.console = new ConsoleViewModel();
    var treePen = self.parseTree = new ParseTreeViewModel();
    var symbolTable = self.symbolTable = new SymbolTableViewModel();
    var processor = self.processor = new Processor(console, treePen, symbolTable);
    var ui = self.ui = new UIViewModel(editor, workspace, console, treePen, symbolTable);
    var controls = self.controls = new ControlsViewModel(fileManager, editor, workspace, console, processor, ui);

    self.aboutCard = new Openable();
}