/**
 * Created by Doma on 15/12/19.
 */
var Benchmark = (function (window) {
    var marks = {};
    var _mark = function (name) {
            marks[name] = window.performance ? window.performance.now() : (new Date()).getTime();
        },
        _measure = function (name) {
            var now = window.performance ? window.performance.now() : (new Date()).getTime();
            return now - marks[name];
        },
        _test = function (func, repeat, self) {
            _mark("test");
            for (var i = 0; i < repeat; i++) {
                func.apply(self || this, Array.prototype.slice.call(arguments, 3));
            }
            var result = _measure("test");
            _clear("test");
            return result;
        },
        _clear = function (name) {
            delete marks[name];
        };
    return {
        mark: _mark,
        measure: _measure,
        test: _test,
        clear: _clear
    };
})(window);
/**
 * Created by Doma on 15/11/27.
 */
const Invalid = undefined;

Array.prototype.has = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
            return true;
        }
    }
    return false;
};

Array.prototype.rear = function () {
    return this[this.length - 1];
};

Array.prototype.front = function () {
    return this[0];
};

Array.prototype.remove = function (elem) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === elem) {
            return this.splice(i, 1);
        }
    }
};
if (!String.prototype.repeat) {
    String.prototype.repeat = function (n) {
        "use strict";
        var o = '', s = this;
        if (n < 1) return o;
        while (n > 1) {
            if (n & 1) o += s;
            n >>= 1;
            s += s;
        }
        return o + s;
    };
}


Math.mid = function (x, y, z) {
    if (arguments.length != 3) {
        throw new Error("Math.mid requires exactly 3 arguments.");
    }
    return [x, y, z].sort(function (a, b) {
        return a - b;
    })[1];
};

var _randomString = function (len) {
    if (len > 5) {
        return _randomString(len - 5) + _randomString(5);
    }
    var result = "",
        l = Math.pow(64, len),
        r = Math.floor(Math.random() * l),
        m = 51 / 63,
        mod,
        letter;
    while (result.length < len) {
        mod = r % 64;
        letter = Math.floor(mod * m);
        r = (r - mod) / 64;
        result += String.fromCharCode(65 + (letter > 25 ? letter + 6 : letter));
    }
    return result;
};
function extend(a, b) {
    for (var i in b) {
        if (b.hasOwnProperty(i)) {
            a[i] = b[i];
        }
    }
    return a;
}
function $defined(a) {
    return undefined !== a;
}
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
/**
 * Created by Doma on 15/12/3.
 */

(function (mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
    {
        mod(require("../../lib/codemirror"));
    } else if (typeof define == "function" && define.amd) // AMD
    {
        define(["../../lib/codemirror"], mod);
    } else // Plain browser env
    {
        mod(CodeMirror);
    }
})(function (CodeMirror) {
    "use strict";

    CodeMirror.defineMode("toy", function (config, parserConfig) {
        var indentUnit = config.indentUnit;
        var wordReg = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
        var keywordReg = /\b(int|real|if|else|then|while)\b/;

        var intReg = /^[0-9]+$/;
        var realReg = /^([0-9]+(E|e)?[0-9]+)|([0-9]+\.[0-9]+)|([0-9]+\.[0-9]+(E|e)(\+|\-)?[0-9]+)$/;
        var numReg = /^\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+$/;
        var operatorReg = /^(\+|\-|\*|\/|>=?|<=?|==?)$/;


        function tokenize(stream, state) {
            var char = stream.next();

            if (operatorReg.test(char)) {

                stream.eatWhile(/^[*+\-<>!=\/]/);
                if (/^\/\//.test(stream.current())) {
                    stream.skipToEnd();
                    return "comment";
                }
                return "operator";
            }
            else if (/\d/.test(char)) {
                stream.match(/^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/);
                return "number";
            } else if (wordReg.test(char)) {
                stream.eatWhile(wordReg);
                if (keywordReg.test(stream.current())) {
                    return "keyword";
                } else {
                    return "variable";
                }
            }
            return null;
        }

        return {
            startState: function () {
                return {
                    indentStack: []
                };
            },
            token: function (stream, state) {
                if (stream.eatSpace()) {
                    return null;
                }
                var style = tokenize(stream, state);
                var type = stream.current();
                if (["{", "then", "else"].has(type)) {
                    if (type == "{" && state.indentStack.rear() != "{") {
                        state.indentStack.pop();
                    }
                    state.indentStack.push(type);
                } else if ("}" === type) {
                    if (state.indentStack.rear() == "{") {
                        state.indentStack.pop();
                    }
                } else if (";" === type) {
                    if (["else", "then"].has(state.indentStack.rear())) {
                        state.indentStack.pop();
                    }
                }
                return style;
            },
            indent: function (state, textAfter) {
                var ch = textAfter && textAfter.charAt(0);
                if (ch == "}") {
                    if (state.indentStack.rear() == "{") {
                        state.indentStack.pop();
                    }
                }
                return state.indentStack.length * indentUnit;
            },
            electricInput: /^\s*(?:\{|})$/
        };
    });
});
/**
 * Created by Doma on 15/12/8.
 */

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
    {
        mod(require("../../lib/codemirror"));
    } else if (typeof define == "function" && define.amd) // AMD
    {
        define(["../../lib/codemirror"], mod);
    } else // Plain browser env
    {
        mod(CodeMirror);
    }
})(function(CodeMirror) {
    "use strict";

    CodeMirror.defineMode("console", function(config, parserConfig) {

        var TOKEN_NAMES = {
            '+': 'positive',
            '-': 'negative',
            ':': 'comment',
            '@': 'def'
        };

        return {
            startState: function () {
                return {
                    ctx: TOKEN_NAMES[":"]
                };
            },
            token: function(stream, state) {
                var tw_pos = stream.string.search(/[\t ]+?$/);

                if (!stream.sol() || tw_pos === 0) {
                    stream.skipToEnd();
                    return state.ctx;
                    //return ("error " + (
                    //TOKEN_NAMES[stream.string.charAt(0)] || '')).replace(/ $/, '');
                }

                var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();

                if (tw_pos === -1) {
                    stream.skipToEnd();
                } else {
                    stream.pos = tw_pos;
                }

                var type = state.ctx = token_name || state.ctx;
                return type;
            }
        };
    });
});
/**
 * Created by Doma on 15/12/13.
 */

(function (window) {
    var _topics = {},
        _publish = function (type, args) {
            if (type && _topics[type]) {
                for (var i = 0; i < _topics[type].length; i++) {
                    setTimeout((function (act, self) {
                        return function () {
                            act.apply(self, args);
                        };
                    })(_topics[type][i], this), 0);
                }
            }
        },
        _subscribe = function (type, act) {
            if (typeof act === typeof function () {
                }) {

                if (!_topics[type]) {
                    _topics[type] = [];
                }
                _topics[type].push(act);
            }
        };

    window.P = function (type) {
        _publish(type, Array.prototype.slice.call(arguments, 1));
        return {
            p: P
        };
    };

    window.S = function (type, act) {
        _subscribe(type, act);
        return {
            s: S
        };
    };
})(window);
/**
 * Created by Doma on 15/12/5.
 */
var Storage = (function() {
    var testKey = "test";
    var storage = window.localStorage;

    try {
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return storage;
    } catch (error) {
        storage = (function() {
            var _data = {};

            return {
                setItem: function(id, val) {
                    _data[id] = String(val);
                    return _data[id];
                },

                getItem: function(id) {
                    return _data.hasOwnProperty(id) ? this._data[id] : undefined;
                },

                removeItem: function(id) {
                    return delete _data[id];
                },

                clear: function() {
                    _data = {};
                    return _data;
                }
            };
        })();
        return storage;
    }
})();

/**
 * Created by Doma on 15/12/10.
 */
var Cache = {};

/**
 * Created by Doma on 15/12/10.
 */
function ToyFile(name, content, isNew) {
    this.isNewFile = undefined !== isNew ? isNew : true;
    this.name = undefined !== name ? name.replace(/(\.toy)$/, "") : "untitled";
    this.content = content || "";
    this.tree = null;
    this.assembly = null;
}

ToyFile.prototype.extension = ".toy";

ToyFile.prototype.fileName = function () {
    return this.isNewFile ? this.name : this.name + this.extension;
};

ToyFile.prototype.serialize = function () {
    return JSON.stringify({
        name: this.name,
        content: this.content
    });
};
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
        selectionPointer: true,
        styleSelectedText: true
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
                        };
                    })(session));
                    $li.on("click", (function (session) {
                        return function () {
                            _editor.bringSessionToFront(session);
                        };
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
        };
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
        return;
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
        _editor.openFile(new ToyFile());
    };

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
                        };
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
        return str.split("\n").slice(-n).join("\n");
    }

    _console.log = function (str) {
        if (_console.cm) {
            _console.cm.setValue(_lastNLines(_console.cm.getValue() + _preoutput(": ", str), 1000));
        } else {
            window.console.log(str);
        }
    };

    _console.error = function (str) {
        if (str) {
            if (_console.cm) {
                if (str instanceof Object) {
                    str = str.toString();
                }
                _console.cm.setValue(_lastNLines(_console.cm.getValue() + _preoutput("- ", str), 1000));
            } else {
                window.console.log(str);
            }
        }
    };

    _console.success = function (str) {
        if (str) {

            if (_console.cm) {
                _console.cm.setValue(_lastNLines(_console.cm.getValue() + _preoutput("+ ", str), 1000));
            } else {
                window.console.log(str);
            }

        }
    };
    _console.warn = function (str) {
        if (str) {

            if (_console.cm) {
                _console.cm.setValue(_lastNLines(_console.cm.getValue() + _preoutput("@ ", str), 1000));
            } else {
                window.console.log(str);
            }

        }
    };

    _console.popup = function () {
        $("#box-opener-console").trigger("click");
    };

    var _control = {};
    _control.compiling = null;
    _control.compilie = function (file) {
        _control.compiling = file;
        _control.enterCompileMode();
    };

    _control.enterCompileMode = function () {
        if (_control.compiling !== null) {
            $("body").addClass("compiling");
            $("#compiling-filename").text(_control.compiling.fileName());
            $("#editing-btn-group").hide();
            $("#compiling-btn-group").show();
            $(".tab-bar-cover").show();
            $(".tree-box").removeClass("assembly");
            _assembly.cm.setValue("");
            $("#box-opener-tree").trigger("click");
            $("#box-opener-structure").trigger("click");
            //$("#box-opener-console").trigger("click", true);

            var $box = $(".bottom-box");
            if ($box.hasClass("hidden")) {
                $box.removeClass("hidden");
            }
            $box.css("height", "30%");
            $(".upper-box").css("height", "70%");
            _treePen.clear().setOptions({
                width: $(".tree-box .box-body").width(),
                height: $(".tree-box .box-body").height()
            });
            _treePen.setSource([
                ["0", "program", 1, "", "1", "0"],
            ]);
            _treePen.render();
            $(".tree-box .placeholder").hide();
            $(".left-box .box-caret").trigger("click");
            _editor.cm.setOption("readOnly", "nocursor");
            _console.cm.setValue("");
        }
    };

    _control.exitCompileMode = function () {
        $("body").removeClass("compiling");

        $("#compiling-btn-group").hide();
        $("#editing-btn-group").show();
        $(".tab-bar-cover").hide();
        //$("#btn-compile").prop("disabled", false);
        $("#box-opener-workspace").trigger("click");
        $(".right-box .box-caret").trigger("click");
        $(".tree-box .box-caret").trigger("click");
        //$(".bottom-box .box-caret").trigger("click");
        if (!$(".bottom-box").hasClass("hidden")) {
            $(".bottom-box").css("height", "30%");
            $(".upper-box").css("height", "70%");
        }
        _editor.cm.setOption("readOnly", false);
        _control.compiling = null;
        $("#compiling-filename").text("");
    };

    var _treePen = new Tree("tree-pane", {
        radius: 10
    });
    _treePen.clear = function () {
        _treePen.canvas.clear();
        return _treePen;
    };

    S("treeboxresized", function () {
        _treePen.render({
            width: $(".tree-box .box-body").width(),
            height: $(".tree-box .box-body").height()
        });
    });

    var _assembly = {};
    _assembly.cm = CodeMirror.fromTextArea(document.getElementById("assembly"), {
        theme: "monokai-so",
        mode: "console",
        readOnly: "nocursor",
        scrollbarStyle: "overlay",
        viewportMargin: Infinity
    });

    return {
        assembly: _assembly,
        editor: _editor,
        console: _console,
        control: _control,
        treePen: _treePen
    };
})();
var SymbolTable = {
    new: function () {
        var symbolTable = {};
        //var tableD;
        var tableA, indexA;
        var count = 0;
        symbolTable.handle = function (token) {
            function addSymbol(token) {
                var symbol = {
                    name:      token.lexeme,
                    type:      undefined,
                    value:     undefined,
                    positions: [token.position]
                };
                tableA.push(symbol);
                indexA[token.lexeme] = count;
                //tableD[token.lexeme] = symbol;
                count += 1;
            }
            function updateSymbol(token) {
                //tableD[token.lexeme].positions.push(token.position);
                tableA[indexA[token.lexeme]].positions.push(token.position);
            }
            if (!tableA.hasOwnProperty(indexA[token.lexeme])) {
                addSymbol(token);
            } else {
                updateSymbol(token);
            }
        };
        symbolTable.reset = function () {
            //tableD = {};
            tableA = [];
            indexA = {};
            count  = 0;
        };
        symbolTable.get = function () {

            return tableA.slice();
        };
        symbolTable.getD = function () {

            //return tableD;
        };
        symbolTable.getLength = function () {

            return count;
        };
        return symbolTable;
    }
};
var Lexer = {
    new: function () {
        var rules = [
            {regExp: /^int$/,                   abstract: 'int',    containValue: 'false'},
            {regExp: /^real$/,                  abstract: 'real',   containValue: 'false'},
            {regExp: /^if$/,                    abstract: 'if',     containValue: 'false'},
            {regExp: /^then$/,                  abstract: 'then',   containValue: 'false'},
            {regExp: /^else$/,                  abstract: 'else',   containValue: 'false'},
            {regExp: /^while$/,                 abstract: 'while',  containValue: 'false'},
            {regExp: /^\($/,                    abstract: '(',      containValue: 'true'},
            {regExp: /^\)$/,                    abstract: ')',      containValue: 'true'},
            {regExp: /^\{$/,                    abstract: '{',      containValue: 'true'},
            {regExp: /^\}$/,                    abstract: '}',      containValue: 'true'},
            {regExp: /^,$/,                     abstract: ',',      containValue: 'true'},
            {regExp: /^;$/,                     abstract: ';',      containValue: 'true'},
            {regExp: /^\+$/,                    abstract: '+',      containValue: 'true'},
            {regExp: /^-$/,                     abstract: '-',      containValue: 'true'},
            {regExp: /^\*$/,                    abstract: '*',      containValue: 'true'},
            {regExp: /^\/$/,                    abstract: '/',      containValue: 'true'},
            {regExp: /^[a-zA-Z][a-zA-Z0-9]*$/,  abstract: 'ID',     containValue: 'true'},
            {regExp: /^<=$/,                    abstract: '<=',     containValue: 'true'},
            {regExp: /^<$/,                     abstract: '<',      containValue: 'true'},
            {regExp: /^\=\=$/,                  abstract: '==',     containValue: 'true'},
            {regExp: /^>=$/,                    abstract: '>=',     containValue: 'true'},
            {regExp: /^>$/,                     abstract: '>',      containValue: 'true'},
            {regExp: /^!=$/,                    abstract: '!=',     containValue: 'true'},
            {regExp: /^\=$/,                    abstract: '=',      containValue: 'true'},
            {regExp: /^[0-9]*\.[0-9]+$/,        abstract: 'NUM',    containValue: 'true'},
            {regExp: /^[0-9]+\.?$/,             abstract: 'NUM',    containValue: 'true'}
        ];
        var Pointer = {
            new: function () {
                var pointer = {};
                var first_row, first_col, last_row, last_col;
                pointer.reset = function () {
                    first_row = 1;
                    last_row  = 1;
                    first_col = 1;
                    last_col  = 1;
                };
                pointer.shift = function (step) {

                    last_col += step;
                };
                pointer.newLine = function () {
                    last_col = 1;
                    last_row++;
                };
                pointer.reduce = function () {
                    first_row = last_row;
                    first_col = last_col;
                };
                pointer.get = function () {
                    return {
                        first_row: first_row,
                        last_row:  last_row,
                        first_col: first_col,
                        last_col:  last_col
                    };
                };
                return pointer;
            }
        };
        var pointer = Pointer.new();
        var symbolTable = SymbolTable.new();
        var lexer = {};
        var status = ['NORMAL', 'ERROR', 'DONE'];
        var curStatus;
        var lexSequence;
        var errorMsg;
        var input;
        var curLexeme;
        var matched, next, token;
        var needBlank = false;
        var lexing = 0;
        lexer.getErrMsg = function () {

            return errorMsg;
        };
        lexer.getStatus = function () {

            return curStatus;
        };
        lexer.getSymbolTable = function () {

            return symbolTable.get();
        };
        lexer.setInput = function (_input) {
            lexer.reset();
            input = _input;
            curStatus = status[0];
        };
        lexer.reset = function () {
            symbolTable.reset();
            pointer.reset();
            errorMsg = "";
            lexSequence = [];
            curLexeme = "";
            lexing = 0;
            curStatus = status[2];
            needBlank = false;
        };
        lexer.lexDone = function () {

            return curStatus == status[2];
        };
        lexer.lex = function (singleStepping) {
            function tryMatch (input) {
                var i;
                for (i = 0; i < rules.length; i += 1) {
                    if (rules.hasOwnProperty(i)) {
                        if (input.match(rules[i].regExp)) {
                            return {
                                lexeme:       input,
                                abstract:     rules[i].abstract,
                                position:     pointer.get(),
                                containValue: rules[i].containValue
                            };
                        }
                    }
                }
                return false;
            }
            if (curStatus != status[0]) {
                return false;
            }
            curLexeme = '';
            while (lexing < input.length) {
                next = input[lexing];
                matched = tryMatch(curLexeme + next);
                if (!matched) {
                    if (tryMatch(curLexeme).abstract == 'NUM' && tryMatch(next).abstract == 'ID') {
                            errorMsg = "UNDEFINED SYMBOL '"+curLexeme+next+"' AT ROW "+pointer.get().first_row+", COL "+pointer.get().first_col;
                            curStatus = status[1];
                            return false;
                    }
                    if (curLexeme=='') {
                        if (next.match(/\ /) != null)
                            pointer.shift(1);
                        else if (next.match(/\t/) != null)
                            pointer.shift(4);
                        else if (next.match(/\n/) != null)
                            pointer.newLine();
                        else {
                            errorMsg = "UNDEFINED SYMBOL '"+next+"' AT ROW "+pointer.get().first_row+", COL "+pointer.get().first_col;
                            curStatus = status[1];
                            return false;
                        }
                    } else {
                        lexing -= 1;
                        token = tryMatch(curLexeme);
                        lexSequence.push(token);
                        if (token.abstract == 'ID')
                            symbolTable.handle(token);
                        if (singleStepping) {
                            pointer.reduce();
                            curLexeme = "";
                            lexing += 1;
                            return true;
                        }
                    }
                    pointer.reduce();
                    curLexeme = "";
                } else {
                    curLexeme += next;
                    pointer.shift(1);
                }
                lexing += 1;
            }
            token = tryMatch(curLexeme);
            if (token) {
                lexSequence.push(token);
                return true;
            }
            pointer.reduce();
            token = {
                lexeme:    "$",
                abstract:  "$",
                position: pointer.get()
            };
            lexSequence.push(token);
            curStatus = status[2];
            return true;
        };
        lexer.getToken = function () {

            return token;
        };
        lexer.getSequence = function () {

            return lexSequence;
        };
        lexer.getSequenceByAbstract = function () {
            var str = "";
            var i;
            for (i = 0; i < lexSequence.length; i += 1) {
                str += lexSequence[i].abstract + ' ';
            }
            return str;
        };
        lexer.getSequenceByLexeme = function () {
            var str = "";
            var i;
            for (i = 0; i < lexSequence.length; i += 1) {
                str += lexSequence[i].lexeme + ' ';
            }
            return str;
        };
        return lexer;
    }
};
var Parser = {
    new: function () {
        var rules = [
            {},
            {interminal: 'program',          product: ['compoundstmt'                                            ]}, //  1
            {interminal: 'stmt',             product: ['decl'                                                    ]}, //  2
            {interminal: 'stmt',             product: ['ifstmt'                                                  ]}, //  3
            {interminal: 'stmt',             product: ['whilestmt'                                               ]}, //  4
            {interminal: 'stmt',             product: ['assgstmt'                                                ]}, //  5
            {interminal: 'stmt',             product: ['compoundstmt'                                            ]}, //  6
            {interminal: 'compoundstmt',     product: ['{', 'stmts', '}'                                         ]}, //  7
            {interminal: 'stmts',            product: ['stmt', 'stmts'                                           ]}, //  8
            {interminal: 'stmts',            product: [                                                          ]}, //  9
            {interminal: 'ifstmt',           product: ['if', '(', 'boolexpr', ')', 'then', 'stmt', 'else', 'stmt']}, //  0
            {interminal: 'whilestmt',        product: ['while', '(', 'boolexpr', ')', 'stmt'                     ]}, // 11
            {interminal: 'assgstmt',         product: ['ID', '=', 'arithexpr', ';'                               ]}, // 12
            {interminal: 'decl',             product: ['type', 'list', ';'                                       ]}, // 13
            {interminal: 'type',             product: ['int'                                                     ]}, // 14
            {interminal: 'type',             product: ['real'                                                    ]}, // 15
            {interminal: 'list',             product: ['ID', 'list1'                                             ]}, // 16
            {interminal: 'list1',            product: [',', 'list'                                               ]}, // 17
            {interminal: 'list1',            product: [                                                          ]}, // 18
            {interminal: 'boolexpr',         product: ['arithexpr', 'boolop', 'arithexpr'                        ]}, // 19
            {interminal: 'boolop',           product: ['<'                                                       ]}, // 20
            {interminal: 'boolop',           product: ['>'                                                       ]}, // 21
            {interminal: 'boolop',           product: ['<='                                                      ]}, // 22
            {interminal: 'boolop',           product: ['>='                                                      ]}, // 23
            {interminal: 'boolop',           product: ['=='                                                      ]}, // 24
            {interminal: 'arithexpr',        product: ['multexpr', 'arithexprprime'                              ]}, // 25
            {interminal: 'arithexprprime',   product: ['+', 'multexpr', 'arithexprprime'                         ]}, // 26
            {interminal: 'arithexprprime',   product: ['-', 'multexpr', 'arithexprprime'                         ]}, // 27
            {interminal: 'arithexprprime',   product: [                                                          ]}, // 28
            {interminal: 'multexpr',         product: ['simpleexpr', 'multexprprime'                             ]}, // 29
            {interminal: 'multexprprime',    product: ['*', 'simpleexpr', 'multexprprime'                        ]}, // 30
            {interminal: 'multexprprime',    product: ['/', 'simpleexpr', 'multexprprime'                        ]}, // 31
            {interminal: 'multexprprime',    product: [                                                          ]}, // 32
            {interminal: 'simpleexpr',       product: ['ID'                                                      ]}, // 33
            {interminal: 'simpleexpr',       product: ['NUM'                                                     ]}, // 34
            {interminal: 'simpleexpr',       product: ['(', 'arithexpr', ')'                                     ]}  // 35
        ];
        var table = {
            program        : {'{':  1, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            stmt           : {'{':  6, '}':  0, 'if':  3, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  4, 'int':  2, 'real':  2, 'ID':  5, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            compoundstmt   : {'{':  7, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            stmts          : {'{':  8, '}':  9, 'if':  8, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  8, 'int':  8, 'real':  8, 'ID':  8, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            ifstmt         : {'{':  0, '}':  0, 'if': 10, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            whilestmt      : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while': 11, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            assgstmt       : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 12, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            decl           : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int': 13, 'real': 13, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            type           : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int': 14, 'real': 15, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            list           : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 16, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            list1          : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',': 17, ';': 18, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            boolexpr       : {'{':  0, '}':  0, 'if':  0, '(': 19, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 19, 'NUM': 19, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            boolop         : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<': 20, '>': 21, '<=': 22, '>=': 23, '==': 24, '$':  0},
            arithexpr      : {'{':  0, '}':  0, 'if':  0, '(': 25, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 25, 'NUM': 25, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            arithexprprime : {'{':  0, '}':  0, 'if':  0, '(':  0, ')': 28, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';': 28, '+': 26, '-': 27, '*':  0, '/':  0, '=':  0, '<': 28, '>': 28, '<=': 28, '>=': 28, '==': 28, '$':  0},
            multexpr       : {'{':  0, '}':  0, 'if':  0, '(': 29, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 29, 'NUM': 29, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            multexprprime  : {'{':  0, '}':  0, 'if':  0, '(':  0, ')': 32, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';': 32, '+': 32, '-': 32, '*': 30, '/': 31, '=':  0, '<': 32, '>': 32, '<=': 32, '>=': 32, '==': 32, '$':  0},
            simpleexpr     : {'{':  0, '}':  0, 'if':  0, '(': 35, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 33, 'NUM': 34, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0}
        };
        var Node = {
            new: function (abstract, fatherNode) {
                var node = {};
                var subNodes = [];
                node.fatherNode = fatherNode;
                node.abstract = abstract;
                node.name = Invalid;
                node.value = Invalid;
                node.type = Invalid;
                node.formula = Invalid;
                node.new = true;
                node.parsed = false;
                node.addSubNode = function (sNode) {
                    subNodes.unshift(sNode);
                };
                node.getSubNodes = function () {
                    return subNodes.slice();
                };
                node.setPosition = function (position) {
                    node.position = position;
                };
                node.assign = function (token, formula) {
                    if (token.containValue) {
                        switch (token.abstract) {
                            case 'ID':
                                node.name = token.lexeme;
                                node.type = undefined;
                                node.value = undefined;
                                break;
                            case 'NUM':
                                node.type = undefined;
                                node.value = Number(token.lexeme);
                                break;
                            case 'type':
                                node.value = token.lexeme.toLowerCase();
                                break;
                            default:
                                break;
                        }
                    }
                    node.formula = formula;
                };
                node.shiftSubNode = function () {
                    subNodes.shift();
                };
                newNodes.push(node);
                return node;
            },
            epsilon: function () {
                var node      = {};
                var subNodes  = [];
                node.abstract = 'ε';
                node.name     = Invalid;
                node.value    = Invalid;
                node.type     = Invalid;
                node.parsed   = false;
                node.getSubNodes = function () {
                    return subNodes.slice();
                }
                return node;
            }
        };
        var parser = {};
        var status = ['NORMAL', 'WARNING', 'ERROR', 'DONE'];
        var curStatus;
        var movements;
        var root;
        var errorMsg;
        var warningMsgs;
        var curWarningMsg;
        var stack, input;
        var curMovement;
        var toBuild;
        var building;
        var lastPos;
        var singleSpot;
        var newNodes = [];
        var curFormula;
        var lastStmtsNode;
        var recovering;
        parser.getStatus = function () {

            return curStatus;
        };
        parser.reset = function () {
            parseErr      = false;
            stack         = ['$', 'program'];
            input         = [];
            movements     = [];
            errorMsg      = "";
            warningMsgs   = [];
            curWarningMsg = "";
            newNodes      = [];
            root          = Node.new('program', Node.new());
            toBuild       = [root];
            singleSpot    = 0;
            curStatus     = status[3];
            curMovement   = [stack.slice(), input.slice(), {}];
            recovering    = false;
        };
        parser.setInput = function (_input) {
            parser.reset();
            input = _input;
            curStatus = status[0];
        };
        parser.pushToken = function (token) {
            nextT = token;
            next = nextT.abstract;
            input.push(token);
        };
        parser.parse = function (singleStepping) {
            function isTerminal(symbol) {
                var i;
                for (i = 0; i < rules.length; i += 1) {
                    if (rules[i].interminal == symbol) {
                        return false;
                    }
                }
                return true;
            }
            function tryParse (stack, input) {
                var top, next;
                while(top != '$' && input.length > 0){
                    next = input[0].abstract;
                    top = stack.pop();
                    if (top == next) {
                        input.shift();
                    } else if (isTerminal(top)) {
                        return false;
                    } else if (table[top][next] == 0) {
                        return false;
                    } else if (table[top][next] > 0) {
                        rule = table[top][next];
                        var product = rules[rule].product.slice();
                        while(product.length > 0) {
                            stack.push(product.pop());
                        }
                    }
                }
                return input.length == 0;
            }
            function cleanNewNodes () {
                for (var i = 0; i < newNodes.length; i++) {
                    newNodes[i].new = false;
                }
                newNodes = [];
            }
            if (curStatus != status[0] && curStatus != status[1]) return false;

            curMovement = [stack.slice(), input.slice(), {}];
            var top = stack.pop(), nextT = input[0], next = nextT.abstract;
            building = toBuild.pop();
            while (top != '$' && input.length > 0) {
                cleanNewNodes();
                if (top == next && !recovering) {
                    lastPos = nextT.position;
                    building.setPosition(nextT.position);
                    building.parsed = true;
                    building.assign(nextT, curFormula);
                    input.shift();
                } else if (recovering && top != 'stmts'){
                    curStatus = status[1];
                    curWarningMsg = ['UNEXPECTED', nextT.lexeme, 'AT', 'ROW', lastPos.last_row + ',', 'COL', lastPos.last_col + '.', 'POPPED', 'OUT', '\'' + top + '\''].join(' ');
                    curMovement[2] = curWarningMsg;
                    warningMsgs.push(curWarningMsg);
                    building.parsed = true;
                } else if (recovering && top == 'stmts') {
                    toBuild.push(lastStmtsNode);
                    stack.push('stmts');
                    if (building != lastStmtsNode) {
                        while (lastStmtsNode.getSubNodes().length > 0) {
                            lastStmtsNode.shiftSubNode();
                        }
                    }
                    if (table[top][next] > 0) {
                        recovering = false;
                        curWarningMsg = 'RECOVERY DONE';
                        curMovement[2] = curWarningMsg;
                        warningMsgs.push(curWarningMsg);
                    } else {
                        input.shift();
                        curStatus = status[1];
                        curWarningMsg = 'SKIPPED ' + '\'' + next + '\'' + ' AT ROW ' + nextT.position.first_row + ', COL ' + nextT.position.first_col;
                        curMovement[2] = curWarningMsg;
                        warningMsgs.push(curWarningMsg);
                    }
                } else if (isTerminal(top)) {
                    recovering = true;
                    curStatus = status[1];
                    curWarningMsg = ['UNEXPECTED', nextT.lexeme, 'AT', 'ROW', lastPos.last_row + ',', 'COL', lastPos.last_col + '.', 'POPPED', 'OUT', '\'' + top + '\''].join(' ');
                    curMovement[2] = curWarningMsg;
                    warningMsgs.push(curWarningMsg);
                    building.parsed = true;
                } else if (table[top][next] == 0) {
                    if (Number(nextT.position.first_row)>Number(lastPos.last_row)) {
                        curStatus = status[1];
                        curWarningMsg = ['EXPECTED', ';', 'AT', 'ROW', lastPos.last_row + ',', 'COL', lastPos.last_col].join(' ');
                        curMovement[2] = curWarningMsg;
                        warningMsgs.push(curWarningMsg);
                        input.unshift({
                            lexeme: ';',
                            abstract: ';',
                            position: lastPos,
                            containValue: true
                        });
                    } else {
                        if (top!='stmts') {
                            recovering = true;
                        }
                        stack.push(top);
                        toBuild.push(building);
                        input.shift();
                        curStatus = status[1];
                        curWarningMsg = 'SKIPPED ' + '\'' + next + '\'' + ' AT ROW ' + nextT.position.first_row + ', COL ' + nextT.position.first_col;
                        curMovement[2] = curWarningMsg;
                        warningMsgs.push(curWarningMsg);
                    }
                } else if (table[top][next] > 0) {
                    curFormula = table[top][next];
                    var rule = table[top][next];
                    var product = rules[rule].product.slice();
                    var item, newNode;
                    if (product.length == 0) {
                        building.addSubNode(Node.epsilon());
                        building.parsed = true;
                    } else {
                        if (rules[rule].interminal == 'stmts') {
                            lastStmtsNode = building;
                        }
                    }
                    while(product.length > 0) {
                        item = product.pop();
                        stack.push(item);
                        newNode = Node.new(item, building);
                        building.addSubNode(newNode);
                        toBuild.push(newNode);
                    }
                    curMovement[2] = rules[rule];
                }
                if (curStatus != status[2]) {
                    movements.push(curMovement);
                }
                if (curStatus == status[2] || singleStepping) {
                    singleSpot += 1;
                    return curStatus != status[2];
                }
                if (!singleStepping) {
                    curMovement = [stack.slice(), input.slice(), {}];
                    top         = stack.pop();
                    nextT       = input[0];
                    next        = nextT.abstract;
                }
            }
            if (top == next) {
                input.shift();
            }
            if (input.length == 0) {
                movements.push(curMovement);
                curStatus = status[3];
                return true;
            } else {
                curStatus = status[2];
                errorMsg = 'CAME UP WITH UNEXPECTED TERMINAL \'' + nextT.lexeme + '\' AT ROW ' + nextT.position.first_row + ', COL ' + nextT.position.first_col;
                return false;
            }
        };
        parser.parseDone = function () {

            return curStatus == status[3];
        };
        parser.needPush = function () {

            return input.length == 0;
        };
        parser.getRootS = function () {
            function filterNode (node, fatherNode) {
                var nodeS = {};
                var subNodesS = [];
                var subNodes = node.getSubNodes();
                nodeS.abstract = node.abstract;
                nodeS.name = node.name;
                nodeS.value = node.value;
                nodeS.type = node.type;
                nodeS.subNodes = subNodesS;
                nodeS.fatherNode = fatherNode;
                if (node.position != undefined) {
                    nodeS.position = node.position;
                }
                var i;
                for (i = 0; i < subNodes.length; i++) {
                    subNodesS.push(filterNode(subNodes[i], nodeS));
                }
                return nodeS;
            }
            return filterNode(root, undefined);
        };
        parser.getSequentialNodes = function () {
            function checkParsed (node) {
                var subNodes = node.getSubNodes();
                if (subNodes.length > 0) {
                    var allParsed = true;
                    for (var i = 0; i < subNodes.length; i++) {
                        if (!subNodes[i].parsed) {
                            checkParsed(subNodes[i]);
                            if (!subNodes[i].parsed) {
                                allParsed = false;
                            }
                        }
                    }
                    node.parsed = allParsed;
                }
            }
            function generateSequentialNodes () {
                function digNode(fartherID, node, onParsingBranch) {
                    var thisID = countNode.toString();
                    countNode += 1;
                    if (typeof(node) === typeof(Node.new())) {
                        var sequentialNodes = [];
                        var cur = [thisID, node.abstract, 0, fartherID, onParsingBranch ? '1':'0', node.new ? '1':'0'];
                        var subSqu, subNodes = node.getSubNodes();
                        var countUnparsed = 0;
                        var i, j;
                        for (i = 0; i < subNodes.length; i += 1) {
                            if (!subNodes[i].parsed) {
                                countUnparsed += 1;
                                subSqu = digNode(thisID, subNodes[i], countUnparsed == 1 && onParsingBranch);
                                for (j = 0; j < subSqu.length; j += 1) {
                                    sequentialNodes.push(subSqu[j]);
                                }
                                if (subSqu.length > 0) {
                                    cur[2] += subSqu[0][2] + 1;
                                }
                            }
                        }
                        sequentialNodes.unshift(cur);
                        return sequentialNodes;
                    }
                }
                var countNode = 0;
                return digNode('', root, true);
            }
            checkParsed(root);
            return generateSequentialNodes();
        };
        parser.treeChanged = function () {

            return true;
        };
        parser.getErrMsg = function () {

            return errorMsg;
        };
        parser.getWarningMsg = function () {

            return warningMsgs.join('\n');
        };
        parser.getMovementsF = function () {
            function padBlank(str, length) {
                while(str.length < length){
                    str += ' ';
                }
                return str;
            }
            var arrMovements = [];
            var length0 = 0, length1 = 0, length2 = 0;
            var move, thisMove;
            var sSTACK, sINPUT, sACTION;
            var i, j;
            var inputLimit = 22;
            for (i = 0; i < movements.length; i += 1) {
                move = movements[i];
                thisMove = [];

                sSTACK = move[0].join(' ');
                length0 = Math.max(length0, sSTACK.length);
                thisMove.push(sSTACK);

                sINPUT = "| ";
                for (j = 0; j < move[1].length; j += 1) {
                    sINPUT += move[1][j].lexeme + ' ';
                }
                if (sINPUT.indexOf(';') > -1)
                    sINPUT = sINPUT.split(';')[0] + ';';
                else
                    sINPUT = sINPUT.split(';')[0];
                if (sINPUT.length > inputLimit) {
                    sINPUT = sINPUT.substring(0, inputLimit) + ' ...';
                }
                length1 = Math.max(length1, sINPUT.length);
                thisMove.push(sINPUT);

                sACTION = "| ";
                if (move[2].hasOwnProperty('interminal')) {
                    sACTION += move[2].interminal + ' -> ';
                    if (move[2].product.length > 0)
                        sACTION += move[2].product.join(' ');
                    else
                        sACTION += 'ε';
                    length2 = Math.max(length2, sACTION.length);
                } else if (typeof(move[2]) == typeof('')) {
                    sACTION += move[2];
                }
                thisMove.push(sACTION);

                arrMovements.push(thisMove);
            }
            var i;
            for (i = 0; i < arrMovements.length; i += 1) {
                arrMovements[i][0] = padBlank(arrMovements[i][0], length0);
                arrMovements[i][1] = padBlank(arrMovements[i][1], length1);
                arrMovements[i][2] = padBlank(arrMovements[i][2], length2);
            }
            var sMovements = '\n' + ([padBlank('STACK', length0), padBlank('INPUT', length1), padBlank('ACTION', length2)]).join('    ') + '\n';
            var i;
            for (i = 0; i < arrMovements.length; i += 1) {
                sMovements += ([arrMovements[i][0], arrMovements[i][1], arrMovements[i][2]]).join('    ') + '\n';
            }
            return sMovements;
        };
        parser.getCurMovementF = function () {
            var sSTACK = curMovement[0].join(' ');
            var sINPUT = '';
            var i;
            for (i = 0; i < curMovement[1].length; i++) {
                sINPUT += curMovement[1][i].lexeme + ' ';
            }
            if (sINPUT.length > 20) {
                sINPUT = sINPUT.substring(0, 17) + ' ...';
            }
            var sACTION = '';
            if (curMovement[2].hasOwnProperty('interminal')) {
                sACTION = curMovement[2].interminal + ' -> ';
                if (curMovement[2].hasOwnProperty('product')) {
                    if (curMovement[2].product.length == 0) {
                        sACTION += 'ε';
                    }
                    for (var i = 0; i < curMovement[2].product.length; i++) {
                        sACTION += curMovement[2].product[i] + ' ';
                    }
                }
            } else if (typeof(curMovement[2]) == typeof('')) {
                sACTION += curMovement[2];
            }
            return [sSTACK, sINPUT, sACTION].join('  |  ');
        };
        return parser;
    }
};

var Paxer = {
    new: function () {
        var paxer  = {};
        var parser = Parser.new();
        var lexer  = Lexer.new();
        var status = ['NORMAL', 'WARNING', 'ERROR', 'DONE'];
        var curStatus;
        var errorMsg;
        var warningMsg;
        paxer.reset = function () {
            errorMsg = "";
            warningMsg = "";
            curStatus = status[3];
            lexer.reset();
            parser.reset();
        };
        paxer.setInput = function (input) {
            function prepare (input) {
                var output = "";
                var commenting = false;
                var count = 0;
                var c;
                for (var i = 0; i < input.length; i++) {
                    c = input[i];
                    if (c == '/') count += 1;
                    else count = 0;
                    if (c == '\n') commenting = false;
                    if (count == 2) commenting = true;
                    if (!commenting) output += c;
                }
                return output;
            }
            paxer.reset();
            lexer.setInput(prepare(input));
            parser.setInput([]);
            curStatus = status[0];
        };
        paxer.go = function() {
            if (curStatus != status[0] && curStatus != status[1]) return;
            curStatus = status[0];
            var singleStepping = true;
            if (parser.needPush()) {
                switch (lexer.getStatus()) {
                    case 'DONE':
                        return;
                    case 'ERROR':
                        errorMsg = lexer.getErrMsg();
                        curStatus = status[2];
                        return;
                    case 'NORMAL':
                        lexer.lex(singleStepping);
                        parser.pushToken(lexer.getToken());
                        break;
                    default:
                        console.log('UNEXPECTED LEXER STATUS');
                        curStatus = status[2];
                        return;
                }
            }
            parser.parse(singleStepping);
            switch (parser.getStatus()) {
                case 'DONE':
                    break;
                case 'ERROR':
                    errorMsg = parser.getErrMsg();
                    curStatus = status[2];
                    return;
                case 'WARNING':
                    warningMsg = parser.getWarningMsg();
                    curStatus = status[1];
                case 'NORMAL':
                    break;
                default:
                    console.log('UNEXPECTED PARSER STATUS');
                    curStatus = status[2];
                    break;
            }
            if (lexer.lexDone() != parser.parseDone()) {
                curStatus = status[2];
            }
            if (lexer.lexDone() && parser.parseDone()) {
                curStatus = status[3];
            }
        };
        paxer.getStatus = function () {

            return curStatus;
        };
        paxer.getErrMsg = function () {

            return errorMsg;
        };
        paxer.getWarningMsg      = parser.getWarningMsg;
        paxer.getSymbolTable     = lexer.getSymbolTable;
        paxer.getSequentialNodes = parser.getSequentialNodes;
        paxer.getMovementsF      = parser.getMovementsF;
        paxer.getCurMovementF    = parser.getCurMovementF;
        paxer.getRootS           = parser.getRootS;
        paxer.getTreeChanged     = parser.getTreeChanged;
        return paxer;
    }
}
/**
 * Created by Doma on 15/12/16.
 */
function SemanticAnalyzer() {
    var symboltable, nodeStack, _assembly;
    var _errors;

    var _t = 0,
        _f = 0,
        f = function (_F) {
            return "f" + _F;
        },
        t = function (_T) {
            return "t" + _T;
        };

    var _reset = function () {
            symboltable = null;
            nodeStack = [];
            _errors = [];
            _assembly = [];
            _t = 0;
            _f = 0;
        },
        _eat = function (tree, st) {
            _reset();
            symboltable = st;
            symboltable.get = function (name) {
                for (var i = 0; i < symboltable.length; i++) {
                    if (symboltable[i].name == name) {
                        return symboltable[i];
                    }
                }
            };
            _r(tree);
            if (_f > 0) {
                _assembly[_assembly.length] = f(_f);
            }

            P("symboltablechanged", symboltable);
        };


    function l(type, ad1, ad2, ad3) {
        var a1 = ad1 === null ? "" : ad1,
            a2 = ad2 === null ? "" : ad2,
            a3 = ad3 === null ? "" : ad3;
        return "    " + type + " " + a1 + ", " + a2 + ", " + a3;
    }


    function _r(node) {
        var father = nodeStack.rear(),
            first, second, boolop;
        nodeStack.push(node);
        switch (node.abstract) {
            case "program":
            {
                _r(node.subNodes[0]);
                break;
            }
            case "compoundstmt":
            {
                _r(node.subNodes[1]);
                break;
            }
            case "stmts":
            {
                _r(node.subNodes[0]);
                if (node.subNodes[1]) {
                    _r(node.subNodes[1]);
                }
                break;
            }
            case "stmt":
            {
                _r(node.subNodes[0]);
                break;
            }
            case "decl":
            {
                node.value = _r(node.subNodes[0]).value;
                _r(node.subNodes[1]);
                break;
            }
            case "type":
            {
                node.value = node.subNodes[0].abstract;
                break;
            }
            case "list":
            {
                node.value = father.value;
                _r(node.subNodes[0]);
                _r(node.subNodes[1]);
                break;
            }
            case "ID":
            {
                var symbol = symboltable.get(node.name);
                if (undefined === symbol.occurance) {
                    symbol.occurance = 0;
                } else {
                    symbol.occurance++;
                }
                switch (father.abstract) {
                    case "list":
                    {
                        node.type = father.value;
                        if (symbol.type) {
                            _errors.push(new SemanticError("Duplicated declaration of '" + symbol.name + "'", symbol.positions[symbol.occurance]));
                        }
                        symbol.type = node.type;
                        break;
                    }
                    default:
                    {
                        if (!symbol.type && 0 === symbol.occurance) {
                            _errors.push(new SemanticError("Undeclared identifier '" + symbol.name + "'", symbol.positions[symbol.occurance]));
                        }
                        break;
                    }
                }
                break;
            }
            case "list1":
            {
                node.value = father.value;
                if (node.subNodes[1]) {
                    _r(node.subNodes[1]);
                }
                break;
            }
            case "assgstmt":
            {
                node.value = _r(node.subNodes[2]).value;
                var id = _r(node.subNodes[0]).name;
                _assembly[_assembly.length] = l("mov", id, null, node.value);
                break;
            }
            case "arithexpr":
            {
                first = _r(node.subNodes[0]);
                second = _r(node.subNodes[1]);
                if (second.type) {
                    switch (second.type) {
                        case "+":
                        {
                            node.value = t(_t++);
                            _assembly[_assembly.length] = l("add", node.value, first.value, second.value);
                            break;
                        }
                        case "-":
                        {
                            node.value = t(_t++);
                            _assembly[_assembly.length] = l("sub", node.value, first.value, second.value);
                            break;
                        }
                    }
                } else {
                    node.value = first.value;
                }
                break;
            }
            case "multexpr":
            {
                first = _r(node.subNodes[0]);
                second = _r(node.subNodes[1]);
                if (second.type) {
                    switch (second.type) {
                        case "*":
                        {
                            node.value = t(_t++);
                            _assembly[_assembly.length] = l("mul", node.value, first.value, second.value);
                            break;
                        }
                        case "/":
                        {
                            node.value = t(_t++);
                            if (0 === second.value) {
                                _errors.push(new SemanticError("Cannot be divided by 0"));
                                _assembly[_assembly.length] = l("*div", node.value, first.value, second.value);
                            } else {
                                _assembly[_assembly.length] = l("div", node.value, first.value, second.value);
                            }
                            break;
                        }
                    }
                } else {
                    node.value = first.value;
                }
                break;
            }
            case "arithexprprime":
            {
                if (node.subNodes[2]) {
                    node.type = node.subNodes[0].abstract;
                    first = _r(node.subNodes[1]);
                    second = _r(node.subNodes[2]);
                    if (second.type) {
                        switch (second.type) {
                            case "+":
                            {
                                node.value = t(_t++);
                                _assembly[_assembly.length] = l("add", node.value, first.value, second.value);
                                break;
                            }
                            case "-":
                            {
                                node.value = t(_t++);
                                _assembly[_assembly.length] = l("sub", node.value, first.value, second.value);
                                break;
                            }
                        }
                    } else {
                        node.value = first.value;
                    }
                }
                break;
            }
            case "simpleexpr":
            {
                if (node.subNodes[1]) {
                    node.value = _r(node.subNodes[1]).value;
                } else {
                    var ID_NUM = _r(node.subNodes[0]);
                    switch (ID_NUM.abstract) {
                        case "ID":
                        {
                            node.value = ID_NUM.name;
                            break;
                        }
                        case "NUM":
                        {
                            node.value = ID_NUM.value;
                            break;
                        }
                    }
                }
                break;
            }
            case "multexprprime":
            {
                if (node.subNodes[2]) {
                    node.type = node.subNodes[0].abstract;
                    first = _r(node.subNodes[1]);
                    second = _r(node.subNodes[2]);
                    if (second.type) {
                        switch (second.type) {
                            case "*":
                            {
                                node.value = t(_t++);
                                _assembly[_assembly.length] = l("mult", node.value, first.value, second.value);
                                break;
                            }
                            case "/":
                            {
                                node.value = t(_t++);
                                if (0 === second.value) {
                                    _errors.push(new SemanticError("Cannot be divided by 0"));
                                    _assembly[_assembly.length] = l("*div", node.value, first.value, second.value);
                                } else {
                                    _assembly[_assembly.length] = l("div", node.value, first.value, second.value);
                                }
                                break;
                            }
                        }
                    } else {
                        node.value = first.value;
                    }
                }
                break;
            }
            case "whilestmt":
            {
                var boolexpr = node.subNodes[2],
                    stmt = node.subNodes[4];
                _assembly[_assembly.length] = f(_f++);
                _r(boolexpr);
                _r(stmt);
                _assembly[_assembly.length] = l("jmp", null, null, "f" + (_f - 1));
                break;
            }
            case "boolexpr":
            {
                node.value = "t" + _t++;
                boolop = node.subNodes[1];
                var arithexpr1 = node.subNodes[0],
                    arithexpr2 = node.subNodes[2];
                first = _r(arithexpr1);
                second = _r(arithexpr2);
                switch (_r(boolop).value) {
                    case "<":
                    {
                        _assembly[_assembly.length] = l("lt", node.value, first.value, second.value);
                        break;
                    }
                    case ">":
                    {
                        _assembly[_assembly.length] = l("gt", node.value, first.value, second.value);
                        break;
                    }
                    case "<=":
                    {
                        _assembly[_assembly.length] = l("le", node.value, first.value, second.value);
                        break;
                    }
                    case ">=":
                    {
                        _assembly[_assembly.length] = l("ge", node.value, first.value, second.value);
                        break;
                    }
                    case "==":
                    {
                        _assembly[_assembly.length] = l("eq", node.value, first.value, second.value);
                        break;
                    }
                }
                _assembly[_assembly.length] = l("jmpf", node.value, null, "f" + _f);
                break;
            }
            case "boolop":
            {
                node.value = node.subNodes[0].abstract;
                break;
            }
            case "ifstmt":
            {
                boolop = node.subNodes[2];
                var stmt1 = node.subNodes[5],
                    stmt2 = node.subNodes[7];

                _assembly[_assembly.length] = f(_f++);
                _r(boolop);
                _r(stmt1);
                _assembly[_assembly.length] = l("jmp", null, null, "f" + (_f + 1));
                _assembly[_assembly.length] = f(_f++);
                _r(stmt2);
                break;
            }
            default:
                break;
        }
        nodeStack.pop();
        return node;
    }

    return {
        eat: _eat,
        getErrorMsg: function () {
            return _errors.join("\n");
        },
        getAssembly: function () {
            return _assembly.join("\n");
        }
    };
}

function SemanticError(msg, position) {
    this.msg = msg;
    this.position = position;
}
SemanticError.prototype.toString = function () {
    var msg = "Error: " + this.msg;
    if (this.position) {
        msg = [msg, " at line: ", this.position.first_row, ", ch: ", this.position.first_col].join("");
    }
    return msg;
};

$(function () {
    ko.applyBindings(mainView = new MainViewModel());
    window.onbeforeunload = function () {
        if (mainView.editor.unsaved()) {
            return "未保存的修改将丢失";
        }
    };

    window.onunload = function () {
        mainView.editor.save();
        mainView.fileManager.save();
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
