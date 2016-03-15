/**
 * Created by Doma on 15/11/27.
 */

const TokenType = {
    Keyword:   1,
    ID:        2,
    Operator:  3,
    Delimiter: 4,
    NUM:       5,
    Unknown:   6,
    End:       7
};


function TokenPosition(l, c) {
    this.line = l;
    this.column = c;
}
TokenPosition.prototype.toString = function() {
    return "line: " + this.line + ", column: " + this.column;
};

function Token(name, type, pos) {
    this.name = name;
    this.type = type;
    this.value = Invalid;
    this.position = pos;
}
Token.$ = new Token("$", TokenType.End);

function Symbol(token) {
    this.name = token.name;
    this.type = token.type;
    this.value = token.value;
    this.positions = [token.position];
}
Symbol.prototype.pushPosition = function(position) {
    this.positions.push(position);
};

var SymbolTable = window["SymbolTable"] = function() {
    var _symbols = [];
    return {
        all:       function() {
            return _symbols;
        },
        find:      function(name) {
            for (var i = 0; i < _symbols.length; i++) {
                if (_symbols[i].name === name) {
                    return _symbols[i];
                }
            }
        },
        pushToken: function(token) {
            var symbol = this.find(token.name);
            if (undefined !== symbol) {
                symbol.pushPosition(token.position);
            } else {
                var newSymbol = new Symbol(token);
                _symbols.push(newSymbol);
            }
        },
        clear:     function() {
            _symbols = [];
        }
    };
}();