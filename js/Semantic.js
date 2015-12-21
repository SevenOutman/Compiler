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

    var _eat = function (tree, st) {
        _errors = [];
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
        _recursive(root);
        P("symboltablechanged", symboltable);
        //if (!!_errors.length) {
        //    P("semantichaserror", _errors);
        //}
    };

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
        }

        if (node.abstract == ";") {
            activeType = null;
            NUMStack.pop();
            symbolStack.pop();// activeID = activeNUM = null;
        }

        if (nodeStack.rear() && nodeStack.rear().abstract == "list") {
            if (node.abstract == "ID") {
                var symbol = symbolStack.rear();
                if (activeType !== null) {
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
