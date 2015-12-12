var SymbolTable = {
    new: function() {
        var symbolTable = {};
        var table = {};
        symbolTable.handle = function(symbol) {
            if (table[symbol.lexem]==undefined) {
                addSymbol(symbol);
            } else {
                updateSymbol(symbol);
            }
        }
        addSymbol = function(symbol) {
            table[symbol.lexem] = {
                'lexem': symbol.lexem,
                'type': symbol.type,
                'positions': [symbol.position]
            };
        }
        updateSymbol = function(symbol) {
            table[symbol.lexem].positions.push(symbol.position);
        }
        symbolTable.reset = function() {
            table = {};
        }
        symbolTable.get = function() {
            return table;
        }
        return symbolTable;
    }
}
var Lexer = {
    new: function() {
        var rules = [
            {'regExp': /^int$/                       ,    'type': 'int'          },
            {'regExp': /^real$/                      ,    'type': 'real'         },
            {'regExp': /^if$/                        ,    'type': 'if'           },
            {'regExp': /^then$/                      ,    'type': 'then'         },
            {'regExp': /^else$/                      ,    'type': 'else'         },
            {'regExp': /^while$/                     ,    'type': 'while'        },
            {'regExp': /^\($/                        ,    'type': '('            },
            {'regExp': /^\)$/                        ,    'type': ')'            },
            {'regExp': /^{$/                         ,    'type': '{'            },
            {'regExp': /^}$/                         ,    'type': '}'            },
            {'regExp': /^,$/                         ,    'type': ','            },
            {'regExp': /^;$/                         ,    'type': ';'            },
            {'regExp': /^\+$/                        ,    'type': '+'            },
            {'regExp': /^-$/                         ,    'type': '-'            },
            {'regExp': /^\*$/                        ,    'type': '*'            },
            {'regExp': /^\/$/                        ,    'type': '/'            },
            {'regExp': /^[a-zA-Z][a-zA-Z0-9]*$/      ,    'type': 'ID'           },
            {'regExp': /^<=$/                        ,    'type': '<='           },
            {'regExp': /^<$/                         ,    'type': '<'            },
            {'regExp': /^\=\=$/                      ,    'type': '=='           },
            {'regExp': /^>=$/                        ,    'type': '>='           },
            {'regExp': /^>$/                         ,    'type': '>'            },
            {'regExp': /^!=$/                        ,    'type': '!='           },
            {'regExp': /^\=$/                        ,    'type': '='            },
            {'regExp': /^[0-9]*\.[0-9]+$/            ,    'type': 'NUM'          },
            {'regExp': /^[0-9]+\.?$/                 ,    'type': 'NUM'          }
        ];
        var Pointer = {
            new: function() {
                var pointer = {};
                var first_row = 0, first_col = 0, last_row = 0, last_col = 0;
                pointer.shift = function() {
                    last_col++;
                }
                pointer.newLine = function() {
                    last_col=0;
                    last_row++;
                }
                pointer.reduce = function() {
                    first_col = last_col;
                    first_row = last_row;
                }
                pointer.get = function() {
                    return {
                        'first_row': first_row,
                        'first_col': first_col,
                        'last_row':  last_row,
                        'last_col':  last_col,
                    }
                }
                return pointer;
            }
        }
        var pointer = Pointer.new();
        function tryMatch (input) {
            for (var i=0; i<rules.length; i++) {
                if (rules.hasOwnProperty(i)) {
                    if (input.match(rules[i].regExp)) {
                        return {
                            "lexem": input,
                            "type": rules[i].type,
                            "position": pointer.get()
                        }
                    }
                }
            }
            return false;
        }
        function nextNonblank (input, i) {
            while(i<input.length && input[i].match(/\s/)!=null){
                if (null != input[i].match(/\n/)) {
                    pointer.newLine();
                };
                if (null != input[i].match(/ /)) {
                    pointer.shift();
                    pointer.reduce();
                };
                i++;
            }
            return i;
        }
        var symbolTable = SymbolTable.new();
        var lexSequence;
        var errorMsg = "";
        var lexer = {};
        lexer.getErrMsg = function() {
            return errorMsg;
        }
        lexer.lex = function (input) {
            errorMsg = "";
            symbolTable.reset();
            lexSequence = [];
            var curLexem = "";
            var matched;
            var next;
            var i = 0;
            while (i < input.length) {
                next = input[i];
                matched = tryMatch(curLexem + next);
                if (!matched) {
                    if (curLexem=='') {
                        errorMsg = "UNDEFINED SYMBOL '"+next+"' AT ROW "+pointer.get().first_row+", COL "+pointer.get().first_col;
                        return false;
                    };
                    var symbol = tryMatch(curLexem);
                    lexSequence.push(symbol);
                    symbolTable.handle(symbol);
                    pointer.reduce();
                    curLexem = "";
                    i = nextNonblank(input, i);
                } else {
                    i++;
                    curLexem+=next;
                    pointer.shift();
                }
            }
            if (curLexem) {
                var symbol = tryMatch(curLexem);
                symbolTable.handle(symbol);
                lexSequence.push(symbol);
            };
            pointer.reduce();
            lexSequence.push({
                "lexem": "$",
                "type": "$",
                "position": pointer.get()
            });
            return true;
        }
        lexer.getSequence = function () {
            return lexSequence;
        }
        lexer.getSymbolTable = function () {
            return symbolTable.get();
        }
        lexer.getSequenceByType = function () {
            var str = "", s;
            for (var i = 0; i < lexSequence.length; i++) {
                str+=lexSequence[i].type+' '
            }
            return str;
        }
        lexer.getSequenceByLexem = function () {
            var str = "", s;
            for (var i = 0; i < lexSequence.length; i++) {
                str+=lexSequence[i].lexem+' '
            }
            return str;
        }
        return lexer;
    }
}
var Parser = {
    new: function() {
        var rules = [
            {},
            {'interminal': 'program'        ,             'product': ['compoundstmt'                                               ]},  //  1
            {'interminal': 'stmt'           ,             'product': ['decl'                                                       ]},  //  2
            {'interminal': 'stmt'           ,             'product': ['ifstmt'                                                     ]},  //  3
            {'interminal': 'stmt'           ,             'product': ['whilestmt'                                                  ]},  //  4
            {'interminal': 'stmt'           ,             'product': ['assgstmt'                                                   ]},  //  5
            {'interminal': 'stmt'           ,             'product': ['compoundstmt'                                               ]},  //  6
            {'interminal': 'compoundstmt'   ,             'product': ['{', 'stmts', '}'                                            ]},  //  7
            {'interminal': 'stmts'          ,             'product': ['stmt', 'stmts'                                              ]},  //  8
            {'interminal': 'stmts'          ,             'product': [                                                             ]},  //  9
            {'interminal': 'ifstmt'         ,             'product': ['if', '(', 'boolexpr', ')', 'then', 'stmt', 'else', 'stmt'   ]},  //  0
            {'interminal': 'whilestmt'      ,             'product': ['while', '(', 'boolexpr', ')', 'stmt'                        ]},  // 11
            {'interminal': 'assgstmt'       ,             'product': ['ID', '=', 'arithexpr', ';'                                  ]},  // 12
            {'interminal': 'decl'           ,             'product': ['type', 'list', ';'                                          ]},  // 13
            {'interminal': 'type'           ,             'product': ['int'                                                        ]},  // 14
            {'interminal': 'type'           ,             'product': ['real'                                                       ]},  // 15
            {'interminal': 'list'           ,             'product': ['ID', 'list1'                                                ]},  // 16
            {'interminal': 'list1'          ,             'product': [',', 'list'                                                  ]},  // 17
            {'interminal': 'list1'          ,             'product': [                                                             ]},  // 18
            {'interminal': 'boolexpr'       ,             'product': ['arithexpr', 'boolop', 'arithexpr'                           ]},  // 19
            {'interminal': 'boolop'         ,             'product': ['<'                                                          ]},  // 20
            {'interminal': 'boolop'         ,             'product': ['>'                                                          ]},  // 21
            {'interminal': 'boolop'         ,             'product': ['<='                                                         ]},  // 22
            {'interminal': 'boolop'         ,             'product': ['>='                                                         ]},  // 23
            {'interminal': 'boolop'         ,             'product': ['=='                                                         ]},  // 24
            {'interminal': 'arithexpr'      ,             'product': ['multexpr', 'arithexprprime'                                 ]},  // 25
            {'interminal': 'arithexprprime' ,             'product': ['+', 'multexpr', 'arithexprprime'                            ]},  // 26
            {'interminal': 'arithexprprime' ,             'product': ['-', 'multexpr', 'arithexprprime'                            ]},  // 27
            {'interminal': 'arithexprprime' ,             'product': [                                                             ]},  // 28
            {'interminal': 'multexpr'       ,             'product': ['simpleexpr', 'multexprprime'                                ]},  // 29
            {'interminal': 'multexprprime'  ,             'product': ['*', 'simpleexpr', 'multexprprime'                           ]},  // 30
            {'interminal': 'multexprprime'  ,             'product': ['/', 'simpleexpr', 'multexprprime'                           ]},  // 31
            {'interminal': 'multexprprime'  ,             'product': [                                                             ]},  // 32
            {'interminal': 'simpleexpr'     ,             'product': ['ID'                                                         ]},  // 33
            {'interminal': 'simpleexpr'     ,             'product': ['NUM'                                                        ]},  // 34
            {'interminal': 'simpleexpr'     ,             'product': ['(', 'arithexpr', ')'                                        ]}   // 35
        ]
        function isTerminal(symbol) {
            for (var i = 0; i < rules.length; i++) {
                if (rules[i].interminal==symbol) {
                    return false;
                };
            }
            return true;
        }
        var table = {
            'program'        : {'{':  1, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'stmt'           : {'{':  6, '}':  0, 'if':  3, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  4, 'int':  2, 'real':  2, 'ID':  5, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'compoundstmt'   : {'{':  7, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'stmts'          : {'{':  8, '}':  9, 'if':  8, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  8, 'int':  8, 'real':  8, 'ID':  8, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'ifstmt'         : {'{':  0, '}':  0, 'if': 10, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'whilestmt'      : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while': 11, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'assgstmt'       : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 12, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'decl'           : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int': 13, 'real': 13, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'type'           : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int': 14, 'real': 15, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'list'           : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 16, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'list1'          : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',': 17, ';': 18, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'boolexpr'       : {'{':  0, '}':  0, 'if':  0, '(': 19, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 19, 'NUM': 19, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'boolop'         : {'{':  0, '}':  0, 'if':  0, '(':  0, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<': 20, '>': 21, '<=': 22, '>=': 23, '==': 24, '$':  0},
            'arithexpr'      : {'{':  0, '}':  0, 'if':  0, '(': 25, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 25, 'NUM': 25, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'arithexprprime' : {'{':  0, '}':  0, 'if':  0, '(':  0, ')': 28, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';': 28, '+': 26, '-': 27, '*':  0, '/':  0, '=':  0, '<': 28, '>': 28, '<=': 28, '>=': 28, '==': 28, '$':  0},
            'multexpr'       : {'{':  0, '}':  0, 'if':  0, '(': 29, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 29, 'NUM': 29, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
            'multexprprime'  : {'{':  0, '}':  0, 'if':  0, '(':  0, ')': 32, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID':  0, 'NUM':  0, ',':  0, ';': 32, '+': 32, '-': 32, '*': 30, '/': 31, '=':  0, '<': 32, '>': 32, '<=': 32, '>=': 32, '==': 32, '$':  0},
            'simpleexpr'     : {'{':  0, '}':  0, 'if':  0, '(': 35, ')':  0, 'then':  0, 'else':  0, 'while':  0, 'int':  0, 'real':  0, 'ID': 33, 'NUM': 34, ',':  0, ';':  0, '+':  0, '-':  0, '*':  0, '/':  0, '=':  0, '<':  0, '>':  0, '<=':  0, '>=':  0, '==':  0, '$':  0},
        }
        var Node = {
            new: function(nodeName) {
                var node = {};
                node.subNodes = [];
                node.name = nodeName;
                node.pushSubNode = function(sNode) {
                    node.subNodes.unshift(sNode);
                }
                node.getSubNodes = function() {
                    return node.subNodes;
                }
                return node;
            }
        }
        var parser = {};
        var movements = [];
        var errorMsg;
        var root;
        parser.getRoot = function() {
            return root;
        }
        parser.getErrMsg = function() {
            return errorMsg;
        }
        parser.getMovements = function() {
            return movements;
        }
        function setLength(str, length) {
            while(str.length < length){
                str+=' '
            }
            return str;
        }
        parser.getMovementsF = function() {
            var arr = [];
            var len0 = 0,len1 = 0,len2 = 0;
            var move, _move, str;
            for (var i = 0; i < movements.length; i++) {
                move = movements[i];
                _move = [];
                str = "";
                for (var j = 0; j < move[0].length; j++) {
                    str+=move[0][j]+' ';
                }
                len0 = len0<str.length?str.length:len0;
                _move.push(str);
                str = "";
                for (var j = 0; j < move[1].length; j++) {
                    str+=move[1][j].lexem+' ';
                }
                len1 = len1<str.length?str.length:len1;
                _move.push(str)
                str = "";
                if (move[2].interminal!=undefined) {
                    str += move[2].interminal+' -> '
                    if (move[2].product.length == 0) {
                        str+='*nothing'
                    };
                    for (var j = 0; j < move[2].product.length; j++) {
                        str += move[2].product[j]+' '
                    };
                    len2 = len2<str.length?str.length:len2;
                }
                _move.push(str)
                arr.push(_move)
            }
            for (var i = 0; i < arr.length; i++) {
                arr[i][0] = setLength(arr[i][0], len0)
                arr[i][1] = setLength(arr[i][1], len1)
                arr[i][2] = setLength(arr[i][2], len2)
            }
            var s='\n'+setLength('STACK', len0)+' | '+setLength('INPUT', len1)+' | '+setLength('ACTION', len2)+'\n';
            for (var i = 0; i < arr.length; i++) {
                s=s + arr[i][0] + ' | ' + arr[i][1] + ' | ' + arr[i][2] + '  ' + '\n';
            }
            return s;
        }
        parser.generateSequentialNodes = function () {
            var countNode = 0;
            return digNode(null, parser.getRoot());
        }
        function digNode(fartherID, node) {
            var thisID = countNode++;
            if (typeof(node)==typeof(Node.new())) {
                var sequentialNodes = [];
                var cur = [thisID, node.name, 0, fartherID];
                var subNodes = node.subNodes;
                for (var i = 0; i < subNodes.length; i++) {
                    var subSqu = digNode(thisID, subNodes[i]);
                    for (var j = 0; j < subSqu.length; j++) {
                        sequentialNodes.push(subSqu[j]);
                    }
                    cur[2]+=subSqu[0][2] + 1;
                }
                sequentialNodes.unshift(cur);
                return sequentialNodes;
            } else {
                var cur = [thisID, node, 0, fartherID];
                return [cur];
            }
        }
        parser.parse = function(input) {
            var stack = [];
            var next, top;
            root = Node.new('program');
            var toBuild = [root];
            movements = [];
            stack = ['$', 'program'];
            top = stack[stack.length-1];
            next = input[0].type;

            var limit = 50;
            var debug = false;
            while(top!='$'){
                if (debug && limit--==0) {
                    return;
                };
                if (debug) {
                    console.log(stack)
                    console.log(top+'  '+next)
                    console.log('')
                };
                movements.push([stack.slice(), input.slice(), {}])
                if (top==next) {
                    stack.pop();
                    var shifted = toBuild[0];
                    shifted.symbol = input.shift();
                    toBuild.shift();
                    next = input[0].type;
                } else if (isTerminal(top)) {
                    console.log('CAME UP WITH UNEXPECTED TERMINAL '+input.lexem)
                    console.log(stack)
                    console.log(input)
                    return false;
                } else if (table[top][next] == 0) {
                    var expected = "";
                    for (var i in table[top]) {
                        if (table[top][i]!=0) {
                            expected+='\''+i+'\'/';
                        };
                    };
                    expected = expected.substring(0, expected.length - 1)
                    errorMsg = 'EXPECTING '+expected+' AT ROW '+input[0].position.first_row+', COL '+input[0].position.first_col;
                    return false;
                } else if (table[top][next] > 0) {
                    stack.pop();
                    rule = table[top][next];
                    var shifted = toBuild.shift();
                    for (var i = rules[rule].product.length - 1; i>=0; i--) {
                        stack.push(rules[rule].product[i]);

                        var newNode = Node.new(rules[rule].product[i]);
                        shifted.pushSubNode(newNode);
                        toBuild.unshift(newNode);
                    };
                    movements[movements.length-1][2] = rules[rule]
                }
                top = stack[stack.length-1];
            }
            return true;
        }
        return parser;
    }
}
