var SymbolTable = {
    new: function () {
        var symbolTable = {};
        var tableD = {};
        var tableA = [], indexA = {};
        var count = 0;
        symbolTable.handle = function (token) {
            if (!tableD.hasOwnProperty(token.lexeme) && !tableA.hasOwnProperty(indexA[token.lexeme])) {
                addSymbol(token);
            } else {
                updateSymbol(token);
            }
        };
        function addSymbol(token) {
            var symbol = {
                name:      token.lexeme,
                type:      undefined,
                value:     undefined,
                positions: [token.position]
            };
            tableA.push(symbol);
            indexA[token.lexeme] = count;
            tableD[token.lexeme] = symbol;
            count += 1;
        }
        function updateSymbol(token) {
            tableD[token.lexeme].positions.push(token.position);
            tableA[indexA[token.lexeme]].positions.push(token.position);
        }
        symbolTable.reset = function () {
            tableD = {};
            tableA = [];
            indexA = {};
            count  = 0;
        };
        symbolTable.get = function () {

            return tableA;
        };
        symbolTable.getD = function () {

            return tableD;
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
        var lexSequence;
        var errorMsg;
        var input;
        var curLexeme;
        var matched, next, token;
        var lexing = 0;
        lexer.getErrMsg = function () {

            return errorMsg;
        };
        lexer.getSymbolTable = function () {

            return symbolTable.get();
        };
        lexer.setInput = function (_input) {
            lexer.reset();
            input = _input;
        };
        lexer.reset = function () {
            symbolTable.reset();
            pointer.reset();
            errorMsg = "";
            lexSequence = [];
            curLexeme = "";
            matched, next, token;
            lexing = 0;
        };
        lexer.lexDone = function () {

            return lexing >= input.length;
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
            curLexeme = '';
            while (lexing < input.length) {
                next = input[lexing];
                matched = tryMatch(curLexeme + next);
                if (!matched) {
                    if (curLexeme=='') {
                        if (next.match(/\ /) != null)
                            pointer.shift(1);
                        else if (next.match(/\t/) != null)
                            pointer.shift(4);
                        else if (next.match(/\n/) != null)
                            pointer.newLine();
                        else {
                            errorMsg = "UNDEFINED SYMBOL '"+next+"' AT ROW "+pointer.get().first_row+", COL "+pointer.get().first_col;
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
            }
            pointer.reduce();
            lexSequence.push({
                lexeme:    "$",
                abstract:  "$",
                position: pointer.get()
            });
            return true;
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
            new: function (abstract) {
                var node = {};
                var subNodes = [];
                node.abstract = abstract;
                node.name = Invalid;
                node.value = Invalid;
                node.type = Invalid;
                node.formula = Invalid;
                node.pushSubNode = function (sNode) {
                    subNodes.unshift(sNode);
                };
                node.getSubNodes = function () {
                    return subNodes;
                };
                node.assign = function (token, formula) {
                    if (token.containValue) {
                        switch(token.abstract){
                            case 'ID':
                                node.name = token.lexeme;
                                node.type = undefined;
                                node.value = undefined;
                                break;
                            case 'NUM':
                                node.type = undefined;
                                node.value = Number(token.lexeme);
                            case 'type':
                                node.value = token.lexeme.toLowerCase();
                            default:
                                break;
                        }
                    }
                    node.formula = formula;
                }
                return node;
            },
            epsilon: function () {
                var node = {};
                node.abstract = 'ε';
                node.name = Invalid;
                node.value = Invalid;
                node.type = Invalid;
                node.getSubNodes = function () {
                    return [];
                }
                return node;
            }
        };
        var parser = {};
        var movements = [];
        var root;
        var errorMsg;
        var warningMsg;
        var stack = [], input = [];
        var curMovement;
        var toBuild;
        var building;
        var lastPos;
        var curFormula;
        var singleSpot;
        parser.reset = function () {
            stack      = ['$', 'program'];
            input      = [];
            movements  = [];
            errorMsg   = "";
            warningMsg = "";
            root       = Node.new('program');
            toBuild    = [root];
            singleSpot = 0;
        };
        parser.setInput = function (_input) {
            parser.reset();
            input = _input;
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
                while(top != '$'){
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
            curMovement = [stack.slice(), input.slice(), {}];
            var top = stack.pop(), nextT = input.shift(), next = nextT.abstract;
            var stepPass = false;
            while (top != '$') {
                if (top == next) {
                    lastPos = input[0].position;
                    building = toBuild[0];
                    building.assign(input[0], curFormula);
                    toBuild.shift();
                    stepPass = true;
                } else if (isTerminal(top)) {
                    errorMsg = 'CAME UP WITH UNEXPECTED TERMINAL \'' + input[0].lexeme + '\', EXPECTING ' + top;
                } else if (table[top][next] == 0) {
                    //RECOVERY START
                    //TRY ADDING EVERY EXPECTED
                    stack.push(top);
                    input.unshift(nextT);
                    var possibleItem, recoveried = false;
                    for (i in table[top]) {
                        if (table[top][i] != 0) {
                            possibleItem = {'abstract': i, 'lexeme': '*'+i, 'position': {}};
                            var _input = input.slice();
                            _input.unshift(possibleItem);
                            if (tryParse(stack.slice(), _input)){
                                recoveried = true;
                                break;
                            }
                        }
                    }
                    //TRY POPING UNTIL MATCH
                    //...
                    //RECOVERY END
                    if (recoveried) {
                        input.unshift(possibleItem);
                        next = input[0].abstract;
                        warningMsg = 'MISSING \'' + next + '\' AT ROW ' + lastPos.last_row + ', COL ' + lastPos.last_col;
                        stepPass = true;
                    } else {
                        var expected = "";
                        var i;
                        for (i in table[top]) {
                            if (table[top][i] != 0) {
                                expected += '\'' + i + '\'|';
                            }
                        }
                        expected = expected.substring(0, expected.length - 1);
                        errorMsg = 'EXPECTING ' + expected + ' AT ROW ' + lastPos.last_row + ', COL ' + lastPos.last_col;
                    }
                } else if (table[top][next] > 0) {
                    input.unshift(nextT);
                    curFormula = table[top][next];
                    var rule = table[top][next];
                    var i;
                    var product = rules[rule].product.slice();
                    var item;
                    var newNode;
                    building = toBuild.shift();
                    if (product.length == 0) {
                        building.pushSubNode(Node.epsilon());
                    }
                    while(product.length > 0) {
                        item = product.pop();
                        stack.push(item);
                        newNode = Node.new(item);
                        building.pushSubNode(newNode);
                        toBuild.unshift(newNode);
                    }
                    curMovement[2] = rules[rule];
                    stepPass = true;
                }
                movements.push(curMovement);
                if (!stepPass || singleStepping) {
                    singleSpot += 1;
                    return stepPass;
                }
                if (!singleStepping) {
                    curMovement = [stack.slice(), input.slice(), {}];
                    top = stack.pop();
                    nextT = input.shift();
                    next = nextT.abstract;
                }
            }
            if (input.length == 0) {
                movements.push(curMovement);
                return true;
            } else {
                errorMsg = 'CAME UP WITH UNEXPECTED TERMINAL \'' + input[0].lexeme + '\' AT ROW ' + input[0].position.first_row + ', COL ' + input[0].position.first_col;
                return false;
            }
        };
        parser.parseDone = function () {

            return input.length == 0;
        };
        parser.getRoot = function () {

            return root;
        }
        parser.getRootS = function () {
            function filterNode (node) {
                var nodeS = {};
                var subNodesS = [];
                var subNodes = node.getSubNodes();
                var i;
                for (i = 0; i < subNodes.length; i++) {
                    subNodesS.push(filterNode(subNodes[i]));
                }
                nodeS.abstract = node.abstract;
                nodeS.name = node.name;
                nodeS.value = node.value;
                nodeS.type = node.type;
                nodeS.subNodes = subNodesS;
                return nodeS;
            }
            return filterNode(root);
        };
        parser.generateSequentialNodes = function () {
            function digNode(fartherID, node) {
                var thisID = countNode.toString();
                countNode += 1;
                if (typeof(node) === typeof(Node.new())) {
                    var sequentialNodes = [];
                    var cur = [thisID, node.name, 0, fartherID];
                    var subNodes = node.getSubNodes();
                    var i;
                    for (i = 0; i < subNodes.length; i += 1) {
                        var subSqu = digNode(thisID, subNodes[i]);
                        var j;
                        for (j = 0; j < subSqu.length; j += 1) {
                            sequentialNodes.push(subSqu[j]);
                        }
                        cur[2] += subSqu[0][2] + 1;
                    }
                    sequentialNodes.unshift(cur);
                    return sequentialNodes;
                } else {
                    var cur = [thisID, node, 0, fartherID];
                    return [cur];
                }
            }
            var countNode = 0;
            return digNode('', parser.getRoot());
        };
        parser.getErrMsg = function () {

            return errorMsg;
        };
        parser.getWarningMsg = function () {

            return warningMsg;
        };
        parser.getMovements = function () {

            return movements;
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
            for (i = singleSpot; i < movements.length; i += 1) {
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
                    for (var i = 0; i < curMovement[2].product.length; i++) {
                        sACTION += curMovement[2].product[i] + ' ';
                    }
                } else {
                    sACTION += 'ε';
                }
            }
            return [sSTACK, sINPUT, sACTION].join('  |  ');
        };
        return parser;
    }
};
