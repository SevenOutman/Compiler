var SymbolTable = {
    new: function () {
        var symbolTable = {};
        var tableD = {};
        var tableA = [], indexA = {};
        var count = 0;
        symbolTable.handle = function (token) {
            if (tableD[token.lexeme] == undefined) {
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
            tableD[token.lexeme] = symbol;
            tableA.push(symbol);
            indexA[token.lexeme] = count;
            count += 1;
        }
        function updateSymbol(token) {
            tableD[token.lexeme].positions.push(token.position);
            tableA[indexA[token.lexeme]].positions.push(token.position);
        }
        symbolTable.reset = function () {
            tableD = {};
            tableA = [];
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
            {regExp: /^int$/,                   abstract: 'int'     },
            {regExp: /^real$/,                  abstract: 'real'    },
            {regExp: /^if$/,                    abstract: 'if'      },
            {regExp: /^then$/,                  abstract: 'then'    },
            {regExp: /^else$/,                  abstract: 'else'    },
            {regExp: /^while$/,                 abstract: 'while'   },
            {regExp: /^\($/,                    abstract: '('       },
            {regExp: /^\)$/,                    abstract: ')'       },
            {regExp: /^\{$/,                    abstract: '{'       },
            {regExp: /^\}$/,                    abstract: '}'       },
            {regExp: /^,$/,                     abstract: ','       },
            {regExp: /^;$/,                     abstract: ';'       },
            {regExp: /^\+$/,                    abstract: '+'       },
            {regExp: /^-$/,                     abstract: '-'       },
            {regExp: /^\*$/,                    abstract: '*'       },
            {regExp: /^\/$/,                    abstract: '/'       },
            {regExp: /^[a-zA-Z][a-zA-Z0-9]*$/,  abstract: 'ID'      },
            {regExp: /^<=$/,                    abstract: '<='      },
            {regExp: /^<$/,                     abstract: '<'       },
            {regExp: /^\=\=$/,                  abstract: '=='      },
            {regExp: /^>=$/,                    abstract: '>='      },
            {regExp: /^>$/,                     abstract: '>'       },
            {regExp: /^!=$/,                    abstract: '!='      },
            {regExp: /^\=$/,                    abstract: '='       },
            {regExp: /^[0-9]*\.[0-9]+$/,        abstract: 'NUM'     },
            {regExp: /^[0-9]+\.?$/,             abstract: 'NUM'     }
        ];
        var Pointer = {
            new: function () {
                var pointer = {};
                var first_row, first_col, last_row, last_col;
                pointer.reset = function () {
                    first_row = 1;
                    first_col = 0;
                    last_row  = 0;
                    last_col  = 0;
                };
                pointer.shift = function (step) {
                    last_col += step;
                };
                pointer.newLine = function () {
                    last_col = 0;
                    last_row++;
                };
                pointer.reduce = function () {
                    first_col = last_col;
                    first_row = last_row;
                };
                pointer.get = function () {
                    return {
                        first_row: first_row,
                        first_col: first_col,
                        last_row:  last_row,
                        last_col:  last_col
                    };
                };
                return pointer;
            }
        };
        var pointer = Pointer.new();
        function tryMatch (input) {
            var i;
            for (i = 0; i < rules.length; i += 1) {
                if (rules.hasOwnProperty(i)) {
                    if (input.match(rules[i].regExp)) {
                        return {
                            lexeme:   input,
                            abstract: rules[i].abstract,
                            position: pointer.get()
                        };
                    }
                }
            }
            return false;
        }
        function nextNonBlank (input, i) {
            while(i < input.length && input[i].match(/\s/) != null){
                if (null != input[i].match(/\n/)) {
                    pointer.newLine();
                }
                if (null != input[i].match(/\ /)) {
                    pointer.shift(1);
                    pointer.reduce();
                }
                if (null != input[i].match(/\t/)) {
                    pointer.shift(4);
                    pointer.reduce();
                }
                i += 1;
            }
            return i;
        }
        var symbolTable = SymbolTable.new();
        var lexSequence;
        var errorMsg = "";
        var lexer = {};
        lexer.getErrMsg = function () {

            return errorMsg;
        };
        lexer.getSymbolTable = function () {
            return symbolTable.get();
        };
        lexer.lex = function (input) {
            symbolTable.reset();
            errorMsg = "";
            pointer.reset();
            lexSequence = [];
            var curLexeme = "";
            var matched, next, token;
            var i = 0;
            while (i < input.length) {
                next = input[i];
                matched = tryMatch(curLexeme + next);
                if (!matched) {
                    if (curLexeme=='') {
                        errorMsg = "UNDEFINED SYMBOL '"+next+"' AT ROW "+pointer.get().first_row+", COL "+pointer.get().first_col;
                        return false;
                    }
                    token = tryMatch(curLexeme);
                    if (token.abstract == 'ID') {
                        symbolTable.handle(token);
                    };
                    lexSequence.push(token);
                    pointer.reduce();
                    curLexeme = "";
                    i = nextNonBlank(input, i);
                } else {
                    i += 1;
                    curLexeme+=next;
                    pointer.shift(1);
                }
            }
            if (curLexeme) {
                token = tryMatch(curLexeme);
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
                str+=lexSequence[i].abstract + ' ';
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
        function isTerminal(symbol) {
            var i;
            for (i = 0; i < rules.length; i += 1) {
                if (rules[i].interminal == symbol) {
                    return false;
                }
            }
            return true;
        }
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
            new: function (nodeName) {
                var node = {};
                var subNodes = [];
                node.name = nodeName;
                node.pushSubNode = function (sNode) {
                    subNodes.unshift(sNode);
                };
                node.getSubNodes = function () {
                    return subNodes;
                };
                return node;
            }
        };
        var parser = {};
        var movements = [];
        var errorMsg;
        var root;
        parser.parse = function (input) {
            var stack = [];
            var next, top;
            root = Node.new('program');
            var toBuild = [root];
            movements = [];
            stack = ['$', 'program'];
            top = stack[stack.length-1];
            next = input[0].abstract;
            var shifted;
            var expected;
            var curMovement;
            while(top != '$'){
                curMovement = [stack.slice(), input.slice(), {}];
                if (top == next) {
                    stack.pop();
                    shifted = toBuild[0];
                    shifted.symbol = input.shift();
                    toBuild.shift();
                    next = input[0].abstract;
                } else if (isTerminal(top)) {
                    console.log('CAME UP WITH UNEXPECTED TERMINAL ' + input[0].lexeme);
                    console.log(stack);
                    console.log(input);
                    return false;
                } else if (table[top][next] == 0) {
                    expected = "";
                    var i;
                    for (i in Object.keys(table[top])) {
                        if (table[top][i] != 0) {
                            expected += '\'' + i + '\'/';
                        }
                    }
                    expected = expected.substring(0, expected.length - 1);
                    errorMsg = 'EXPECTING ' + expected + ' AT ROW ' + input[0].position.first_row + ', COL ' + input[0].position.first_col;
                    return false;
                } else if (table[top][next] > 0) {
                    stack.pop();
                    rule = table[top][next];
                    shifted = toBuild.shift();
                    var i;
                    for (i = rules[rule].product.length - 1; i >= 0; i -= 1) {
                        stack.push(rules[rule].product[i]);
                        var newNode = Node.new(rules[rule].product[i]);
                        shifted.pushSubNode(newNode);
                        toBuild.unshift(newNode);
                    }
                    curMovement[2] = rules[rule];
                }
                movements.push(curMovement);
                top = stack[stack.length-1];
            }
            movements.push([stack.slice(), input.slice(), {}]);
            return true;
        };
        parser.getRoot = function () {

            return root;
        };
        parser.getErrMsg = function () {

            return errorMsg;
        };
        parser.getMovements = function () {

            return movements;
        };
        function padBlank(str, length) {
            while(str.length < length){
                str += ' ';
            }
            return str;
        }
        parser.getMovementsF = function () {
            var arr = [];
            var len0 = 0, len1 = 0, len2 = 0;
            var move, _move, str;
            var i;
            for (i = 0; i < movements.length; i += 1) {
                move = movements[i];
                _move = [];

                str = move[0].join(' ');
                len0 = len0 < str.length ? str.length : len0;
                _move.push(str);

                str = "";
                var j;
                for (j = 0; j < move[1].length; j += 1) {
                    str += move[1][j].lexeme + ' ';
                }
                var tail = str.indexOf(';') > -1 ? ';' : '';
                str = str.split(';')[0] + tail;
                if (str.length > 20) {
                    str = str.substring(0, 20) + ' ...';
                }
                len1 = len1 < str.length ? str.length : len1;
                _move.push(str);

                str = "";
                if (move[2].hasOwnProperty('interminal')) {
                    str += move[2].interminal + ' -> ';
                    str += move[2].product.join(' ');
                    len2 = len2 < str.length ? str.length : len2;
                }
                _move.push(str);

                arr.push(_move);
            }
            var i;
            for (i = 0; i < arr.length; i += 1) {
                arr[i][0] = padBlank(arr[i][0], len0);
                arr[i][1] = padBlank(arr[i][1], len1);
                arr[i][2] = padBlank(arr[i][2], len2);
            }
            var s = '\n' + ([padBlank('STACK', len0), padBlank('INPUT', len1), padBlank('ACTION', len2)]).join('     ') + '\n';
            var i;
            for (i = 0; i < arr.length; i += 1) {
                s += ([arr[i][0], arr[i][1], arr[i][2]]).join('     ') + '\n';
            }
            return s;
        };
        parser.generateSequentialNodes = function () {
            var countNode = 0;
            return digNode(null, parser.getRoot());
        };
        function digNode(fartherID, node) {
            var thisID = countNode;
            countNode += 1;
            if (typeof(node) === typeof(Node.new())) {
                var sequentialNodes = [];
                var cur = [thisID, node.name, 0, fartherID];
                var subNodes = node.subNodes;
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
        return parser;
    }
};
