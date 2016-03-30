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
        };


    function l(type, ad1, ad2, ad3) {
        var a1 = ad1 === null ? "" : ad1,
            a2 = ad2 === null ? "" : ad2,
            a3 = ad3 === null ? "" : ad3;
        if (type.length == 3) {
            type += " ";
        } else if (type.length == 2) {
            type += "  ";
        }
        return ["    ", type, " ", a1, ", ", a2, ", ", a3].join("");
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
                var startf = _f++;
                _assembly[_assembly.length] = f(startf);
                _r(boolexpr);
                _r(stmt);
                _assembly[_assembly.length] = l("jmp", null, null, "f" + (startf));
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

                // _assembly[_assembly.length] = f(_f++);
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
