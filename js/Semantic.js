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
    var _t = 0,
        _f = 0;


    var _eat = function (tree, st) {
        _t = 0;
        _f = 0;
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
        _assembly.push(f(_f++));
        console.log(_assembly);

        P("symboltablechanged", symboltable);
        //if (!!_errors.length) {
        //    P("semantichaserror", _errors);
        //}
    };

    function l(type, ad1, ad2, ad3) {
        var a1 = ad1 === null ? "" : ad1,
            a2 = ad2 === null ? "" : ad2,
            a3 = ad3 === null ? "" : ad3;
        return "    " + type + " " + a1 + ", " + a2 + ", " + a3;
    }

    function f(_F) {
        return "f" + _F;
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
                    case "assgstmt":
                    {
                        if (!symbol.type && 0 == symbol.occurance) {
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
                _assembly.push(l("mov", id, null, node.value));
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
            case "whilestmt":
            {
                var boolexpr = node.subNodes[2],
                    stmt = node.subNodes[4];
                _assembly.push(f(_f++));
                _r(boolexpr);
                _r(stmt);
                _assembly.push(l("jmp", null, null, "f" + (_f - 1)));
                //_assembly.push(f(_f++));
                break;
            }
            case "boolexpr":
            {
                node.value = "t" + _t++;
                var arithexpr1 = node.subNodes[0],
                    boolop = node.subNodes[1],
                    arithexpr2 = node.subNodes[2];
                var first = _r(arithexpr1),
                    second = _r(arithexpr2);
                switch (_r(boolop).value) {
                    case "<": {
                        _assembly.push(l("lt", node.value, first.value, second.value));
                        break;
                    }
                    case ">": {
                        _assembly.push(l("gt", node.value, first.value, second.value));
                        break;
                    }
                    case "<=": {
                        _assembly.push(l("le", node.value, first.value, second.value));
                        break;
                    }
                    case ">=": {
                        _assembly.push(l("ge", node.value, first.value, second.value));
                        break;
                    }
                    case "==": {
                        _assembly.push(l("eq", node.value, first.value, second.value));
                        break;
                    }
                }
                _assembly.push(l("jmpf", node.value, null, "f" + _f));
                break;
            }
            case "boolop":
            {
                node.value = node.subNodes[0].abstract;
                break;
            }
            case "ifstmt":
            {
                var boolop = node.subNodes[2],
                    stmt1 = node.subNodes[5],
                    stmt2 = node.subNodes[7];

                _assembly.push(f(_f++));
                _r(boolop);
                _r(stmt1);
                _assembly.push(l("jmp", null, null, "f" + (_f + 1)));
                _assembly.push(f(_f++));
                _r(stmt2);
                //_assembly.push(f(_f++));
                break;
            }
            default:
                break;
        }
        nodeStack.pop();
        return node;
    }


    function _recursive(node) {
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
        },
        getAssembly: function () {
            var result = "";
            for (var i = 0; i < _assembly.length; i++ ) {
                result += _assembly[i] + "\n";
            }
            return result;
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
