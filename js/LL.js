/**
 * Created by Doma on 15/11/28.
 */

const Grammar = {
    reserved: [
        "int", "real",
        "ID", "NUM",
        "if", "then", "else", "while",
        "(", ")", "{", "}", ";",
        "<", ">", "<=", ">=", "=="
    ],
    fomulas:  {
        1:  ["program", "compoundstmt"],
        2:  ["stmt", "decl"],
        3:  ["stmt", "ifstmt"],
        4:  ["stmt", "whilestmt"],
        5:  ["stmt", "assgstmt"],
        6:  ["stmt", "compoundstmt"],
        7:  ["compoundstmt", "{", "stmts", "}"],
        8:  ["stmts", "stmt", "stmts"],
        9:  ["stmts", "ε"],
        10: ["ifstmt", "if", "(", "boolexpr", ")", "then", "stmt", "else", "stmt"],
        11: ["whilestmt", "while", "(", "boolexpr", ")", "stmt"],
        12: ["assgstmt", "ID", "=", "arithexpr", ";"],
        13: ["decl", "type", "list", ";"],
        14: ["type", "int"],
        15: ["type", "real"],
        16: ["list", "ID", "list1"],
        17: ["list1", ",", "list"],
        18: ["list1", "ε"],
        19: ["boolexpr", "arithexpr", "boolop", "arithexpr"],
        20: ["boolop", "<"],
        21: ["boolop", ">"],
        22: ["boolop", "<="],
        23: ["boolop", ">="],
        24: ["boolop", "=="],
        25: ["arithexpr", "multexpr", "arithexprprime"],
        26: ["arithexprprime", "+", "multexpr", "arithexprprime"],
        27: ["arithexprprime", "-", "multexpr", "arithexprprime"],
        28: ["arithexprprime", "ε"],
        29: ["multexpr", "simpleexpr", "multexprprime"],
        30: ["multexprprime", "*", "simpleexpr", "multexprprime"],
        31: ["multexprprime", "/", "simpleexpr", "multexprprime"],
        32: ["multexprprime", "ε"],
        33: ["simpleexpr", "ID"],
        34: ["simpleexpr", "NUM"],
        35: ["simpleexpr", "(", "arithexpr", ")"]
    }
};
const LLTable = {
    "program":        {
        "{": 1
    },
    "stmt":           {
        "{":     6,
        "if":    3,
        "while": 4,
        "int":   2,
        "real":  2,
        "ID":    5
    },
    "compoundstmt":   {
        "{": 7
    },
    "stmts":          {
        "{":     8,
        "}":     9,
        "if":    8,
        "while": 8,
        "int":   8,
        "real":  8,
        "ID":    8
    },
    "ifstmt":         {
        "if": 10
    },
    "whilestmt":      {
        "while": 11
    },
    "assgstmt":       {
        "ID": 12
    },
    "decl":           {
        "int":  13,
        "real": 13
    },
    "type":           {
        "int":  14,
        "real": 15
    },
    "list":           {
        "ID": 16
    },
    "list1":          {
        ",": 17,
        ";": 18
    },
    "boolexpr":       {
        "(":   19,
        "ID":  19,
        "NUM": 19
    },
    "boolop":         {
        "<":  20,
        ">":  21,
        "<=": 22,
        ">=": 23,
        "==": 24
    },
    "arithexpr":      {
        "(":   25,
        "ID":  25,
        "NUM": 25
    },
    "arithexprprime": {
        ")":  28,
        ";":  28,
        "<":  28,
        ">":  28,
        "<=": 28,
        ">=": 28,
        "==": 28,
        "+":  26,
        "-":  27
    },
    "multexpr":       {
        "(":   29,
        "ID":  29,
        "NUM": 29
    },
    "multexprprime":  {
        ")":  32,
        ";":  32,
        "<":  32,
        ">":  32,
        "<=": 32,
        ">=": 32,
        "==": 32,
        "+":  32,
        "-":  32,
        "*":  30,
        "/":  31
    },
    "simpleexpr":     {
        "(":   35,
        "ID":  33,
        "NUM": 34
    }
};


function LLNode(name, father, id) {
    this.id = id;
    this.name = name;
    this.father = father;
    this.children = [];
}

function LLTree() {
    this.root = new LLNode("root", null);
}

function LLParser() {
    this.run = function(processed) {
        var _stack  = [],
            _errors = [];

        var _code   = processed,
            _tokens = processed.split(" ");

        var _tree    = new LLTree(),
            _treeArr = [],
            _treeId  = 1,
            _cwn     = _tree.root;

        var _program = {key: "program", node: new LLNode("program", null, _treeId)},
            _$       = {key: "$", node: "$"};
        _stack.push(_$, _program);
        _cwn.children.push(_program.node);
        _program.node.children.push(_$.node);
        _treeArr.push([_treeId++, "program", ,]);

        //var datavTree = new Tree("other_div", {width: 1200, height: 1500, radius: 10});

        while (_stack.length > 0) {
        //setTimeout(_next, 0);
            var token = _tokens.shift();
            while (_stack.rear().key != token) {
                var key = _stack.rear().key;
                if (!LLTable.hasOwnProperty(key)) {
                    throw "Syntax error: " + token + " does not match " + key;
                } else if (!LLTable[key].hasOwnProperty(token)) {
                    throw "Syntax error: " + key + " cannot deal with " + token;
                } else {
                    var fomula = Grammar.fomulas[LLTable[key][token]];

                    _cwn = _stack.pop().node;
                    var bufferArr = [];
                    for (var i = fomula.length - 1; i > 0; i--) {
                        if (fomula[i] != "ε") {
                            var node = new LLNode(fomula[i], _cwn, _treeId++);
                            _stack.push({key: fomula[i], node: node});
                            _cwn.children.push(Grammar.reserved.has(node.name) ? node.name : node);
                            bufferArr.push([node.id, node.name, 100, _cwn.id.toString()]);
                        }
                    }
                    _treeArr = _treeArr.concat(bufferArr.reverse());
                    _cwn.children.reverse();
                }
            }
            _stack.pop();
        }

        function _next() {
            if (_stack.length > 0) {

                var token = _tokens.shift();
                while (_stack.rear().key != token) {
                    var key = _stack.rear().key;
                    if (!LLTable.hasOwnProperty(key)) {
                        throw "Syntax error: " + token + " does not match " + key;
                    } else if (!LLTable[key].hasOwnProperty(token)) {
                        throw "Syntax error: " + key + " cannot deal with " + token;
                    } else {
                        var fomula = Grammar.fomulas[LLTable[key][token]];

                        _cwn = _stack.pop().node;
                        var bufferArr = [];
                        for (var i = fomula.length - 1; i > 0; i--) {
                            if (fomula[i] != "ε") {
                                var node = new LLNode(fomula[i], _cwn, _treeId++);
                                _stack.push({key: fomula[i], node: node});
                                _cwn.children.push(Grammar.reserved.has(node.name) ? node.name : node);
                                bufferArr.push([node.id, node.name, 100, _cwn.id.toString()]);
                            }
                        }
                        _treeArr = _treeArr.concat(bufferArr.reverse());
                        _cwn.children.reverse();
                    }
                }
                _stack.pop();
                setTimeout(_next, 0);

            }
        }


        console.log("Parsing finished", _tree.root, _treeArr);

        //datavTree.setSource(_treeArr);
        //datavTree.render();
    }
}