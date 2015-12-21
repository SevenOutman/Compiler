/**
 * Created by Doma on 15/12/16.
 */
function SemanticAnalyzer() {
    var symboltable = null;

    var nodeStack = [],
        IDStack = [],
        NUMStack = [],
        symbolStack = [],
        opStack = [];

    var activeType = null,
        activeID = null,
        activeNUM = null;

    var _errors = [];
    var _assembly = [],
        _assemblyStack = [];
    var _t = 0;


    var _eat = function (tree, st) {
        _t = 0;
        _errors = [];
        _assembly = [];
        var root = tree;
        symboltable = st;
        symboltable.get = function (name) {
            for (var i = 0; i < symboltable.length; i++) {
                if (symboltable[i].name == name) {
                    return symboltable[i];
                }
            }
        };
        activeID = null;
        //_recursive(root);
        _r(root);
        console.log(root);

        P("symboltablechanged", symboltable);
        //if (!!_errors.length) {
        //    P("semantichaserror", _errors);
        //}
    };

    function l(type, ad1, ad2, ad3) {
        var a1 = ad1 || "",
            a2 = ad2 || "",
            a3 = ad3 || "";
        return type + " " + a1 + ", " + a2 + ", " + a3;
    }

    function _r(node) {
        var father = nodeStack.rear();
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
                _assembly.push(l("mov", id, null, node.value));
                console.log(_assembly);
                break;
            }
            case "arithexpr":
            {
                var first = _r(node.subNodes[0]),
                    second = _r(node.subNodes[1]);
                if (second.type) {
                    switch (second.type) {
                        case "+":
                        {
                            node.value = "t" + _t++;
                            _assembly.push(l("add", node.value, first.value, second.value));
                            break;
                        }
                        case "-":
                        {
                            node.value = "t" + _t++;
                            _assembly.push(l("sub", node.value, first.value, second.value));
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
                var first = _r(node.subNodes[0]),
                    second = _r(node.subNodes[1]);
                if (second.type) {
                    switch (second.type) {
                        case "*":
                        {
                            node.value = "t" + _t++;
                            _assembly.push(l("mul", node.value, first.value, second.value));
                            break;
                        }
                        case "/":
                        {
                            node.value = "t" + _t++;
                            _assembly.push(l("div", node.value, first.value, second.value));
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
                    var first = _r(node.subNodes[1]),
                        second = _r(node.subNodes[2]);
                    if (second.type) {
                        switch (second.type) {
                            case "+":
                            {
                                node.value = "t" + _t++;
                                _assembly.push(l("add", node.value, first.value, second.value));
                                break;
                            }
                            case "-":
                            {
                                node.value = "t" + _t++;
                                _assembly.push(l("sub", node.value, first.value, second.value));
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
                    switch (node.subNodes[0].abstract) {
                        case "ID":
                        {
                            node.value = node.subNodes[0].name;
                            break;
                        }
                        case "NUM":
                        {
                            node.value = node.subNodes[0].value;
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
                    var first = _r(node.subNodes[1]),
                        second = _r(node.subNodes[2]);
                    if (second.type) {
                        switch (second.type) {
                            case "*":
                            {
                                node.value = "t" + _t++;
                                _assembly.push(l("mult", node.value, first.value, second.value));
                                break;
                            }
                            case "/":
                            {
                                node.value = "t" + _t++;
                                _assembly.push(l("div", node.value, first.value, second.value));
                                break;
                            }
                        }
                    } else {
                        node.value = first.value;
                    }
                }
                break;
            }
            default:
                break;
        }
        nodeStack.pop();
        return node;
    }


    function _recursive(node) {
        console.log(node);
        if (node.abstract == "ID") {
            var symbol = symboltable.get(node.name);
            if (undefined === symbol.occurance) {
                symbol.occurance = 0;
            } else {
                symbol.occurance++;
            }
            symbolStack.push(symbol);
        } else if (node.abstract == "int" || node.abstract == "real") {
            activeType = node.abstract;
        } else if (node.abstract == "NUM") {
            NUMStack.push(node.value);
        }

        if (nodeStack.rear() && nodeStack.rear().abstract == "assgstmt") {
            if (node.abstract == ";") {
                var asbly = "mov " + symbolStack.rear().name + ", , " + NUMStack.rear();
                _assembly.push(asbly);
                console.log(_assembly);
            }
        }


        // try declare
        if (nodeStack.rear() && nodeStack.rear().abstract == "list") {
            if (node.abstract == "ID") {
                var symbol = symbolStack.rear();
                if (activeType !== null) {
                    if (symbol.type) {
                        _errors.push(new SemanticError("Duplicated declaration of '" + symbol.name + "'", symbol.positions[symbol.occurance]));
                    }
                    symbol.type = activeType;
                }
            }
        }
        if (nodeStack.rear() && nodeStack.rear().abstract != "list") {
            if (node.abstract == "ID") {
                var symbol = symbolStack.rear();
                if (!symbol.type && symbol.occurance == 0) {
                    _errors.push(new SemanticError("Undeclared identifier '" + symbol.name + "'", symbol.positions[symbol.occurance]));
                }
            }
        }

        if (node.abstract == ";") {
            activeType = null;
            NUMStack.pop();
            symbolStack.pop();
        }

        nodeStack.push(node);
        for (var i = 0; i < node.subNodes.length; i++) {
            _recursive(node.subNodes[i]);
        }
        nodeStack.pop();
    }

    return {
        eat: _eat,
        hasError: function () {
            return !!_errors.length;
        },
        getErrors: function () {
            return _errors;
        },
        getErrorMsg: function () {
            if (!!_errors.length) {
                var msg = "";
                for (var i = 0; i < _errors.length; i++) {
                    msg += _errors[i].toString() + "\n";
                }
                return msg;
            }
        }
    }
}

function SemanticError(msg, position) {
    this.msg = msg;
    this.position = position;
}
SemanticError.prototype.toString = function () {
    return "Error: " + this.msg + " at line: " + this.position.first_row + ", ch: " + this.position.first_col;
};
