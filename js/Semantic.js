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
    };

    function _recursive(node) {
        //console.log(node);
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
                if (!symbol.type) {
                    _errors.push(new SemanticError("Undeclared identifier '" + symbol.name, symbol.positions[symbol.occurance]));
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
        eat: _eat
    }
}

function SemanticError(msg, position) {

}