/**
 * Created by Doma on 2016/11/7.
 */
const Invalid = undefined
var SymbolTable = {
  new: function () {
    var symbolTable = {};
    //var tableD;
    var tableA, indexA;
    var count = 0;
    symbolTable.handle = function (token) {
      function addSymbol(token) {
        var symbol = {
          name:      token.lexeme,
          type:      undefined,
          value:     undefined,
          positions: [token.position]
        };
        tableA.push(symbol);
        indexA[token.lexeme] = count;
        //tableD[token.lexeme] = symbol;
        count += 1;
      }
      function updateSymbol(token) {
        //tableD[token.lexeme].positions.push(token.position);
        tableA[indexA[token.lexeme]].positions.push(token.position);
      }
      if (!tableA.hasOwnProperty(indexA[token.lexeme])) {
        addSymbol(token);
      } else {
        updateSymbol(token);
      }
    };
    symbolTable.reset = function () {
      //tableD = {};
      tableA = [];
      indexA = {};
      count  = 0;
    };
    symbolTable.get = function () {

      return tableA.slice();
    };
    symbolTable.getD = function () {

      //return tableD;
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
    var status = ['NORMAL', 'ERROR', 'DONE'];
    var curStatus;
    var lexSequence;
    var errorMsg;
    var input;
    var curLexeme;
    var matched, next, token;
    var needBlank = false;
    var lexing = 0;
    lexer.getErrMsg = function () {

      return errorMsg;
    };
    lexer.getStatus = function () {

      return curStatus;
    };
    lexer.getSymbolTable = function () {

      return symbolTable.get();
    };
    lexer.setInput = function (_input) {
      lexer.reset();
      input = _input;
      curStatus = status[0];
    };
    lexer.reset = function () {
      symbolTable.reset();
      pointer.reset();
      errorMsg = "";
      lexSequence = [];
      curLexeme = "";
      lexing = 0;
      curStatus = status[2];
      needBlank = false;
    };
    lexer.lexDone = function () {

      return curStatus == status[2];
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
      if (curStatus != status[0]) {
        return false;
      }
      curLexeme = '';
      while (lexing < input.length) {
        next = input[lexing];
        matched = tryMatch(curLexeme + next);
        if (!matched) {
          if (tryMatch(curLexeme).abstract == 'NUM' && tryMatch(next).abstract == 'ID') {
            errorMsg = "UNDEFINED SYMBOL '"+curLexeme+next+"' AT ROW "+pointer.get().first_row+", COL "+pointer.get().first_col;
            curStatus = status[1];
            return false;
          }
          if (curLexeme=='') {
            if (next.match(/\ /) != null)
              pointer.shift(1);
            else if (next.match(/\t/) != null)
              pointer.shift(4);
            else if (next.match(/\n/) != null)
              pointer.newLine();
            else {
              errorMsg = "UNDEFINED SYMBOL '"+next+"' AT ROW "+pointer.get().first_row+", COL "+pointer.get().first_col;
              curStatus = status[1];
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
        return true;
      }
      pointer.reduce();
      token = {
        lexeme:    "$",
        abstract:  "$",
        position: pointer.get()
      };
      lexSequence.push(token);
      curStatus = status[2];
      return true;
    };
    lexer.getToken = function () {

      return token;
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
      new: function (abstract, fatherNode) {
        var node = {};
        var subNodes = [];
        node.fatherNode = fatherNode;
        node.abstract = abstract;
        node.name = Invalid;
        node.value = Invalid;
        node.type = Invalid;
        node.formula = Invalid;
        node.new = true;
        node.parsed = false;
        node.addSubNode = function (sNode) {
          subNodes.unshift(sNode);
        };
        node.getSubNodes = function () {
          return subNodes.slice();
        };
        node.setPosition = function (position) {
          node.position = position;
        };
        node.assign = function (token, formula) {
          if (token.containValue) {
            switch (token.abstract) {
              case 'ID':
                node.name = token.lexeme;
                node.type = undefined;
                node.value = undefined;
                break;
              case 'NUM':
                node.type = undefined;
                node.value = Number(token.lexeme);
                break;
              case 'type':
                node.value = token.lexeme.toLowerCase();
                break;
              default:
                break;
            }
          }
          node.formula = formula;
        };
        node.shiftSubNode = function () {
          subNodes.shift();
        };
        newNodes.push(node);
        return node;
      },
      epsilon: function () {
        var node      = {};
        var subNodes  = [];
        node.abstract = 'ε';
        node.name     = Invalid;
        node.value    = Invalid;
        node.type     = Invalid;
        node.parsed   = false;
        node.getSubNodes = function () {
          return subNodes.slice();
        }
        return node;
      }
    };
    var parser = {};
    var status = ['NORMAL', 'WARNING', 'ERROR', 'DONE'];
    var curStatus;
    var movements;
    var root;
    var errorMsg;
    var warningMsgs;
    var curWarningMsg;
    var stack, input;
    var curMovement;
    var toBuild;
    var building;
    var lastPos;
    var singleSpot;
    var newNodes = [];
    var curFormula;
    var lastStmtsNode;
    var recovering;
    var parseErr;
    var nextT;
    var next;
    parser.getStatus = function () {

      return curStatus;
    };
    parser.reset = function () {
      parseErr      = false;
      stack         = ['$', 'program'];
      input         = [];
      movements     = [];
      errorMsg      = "";
      warningMsgs   = [];
      curWarningMsg = "";
      newNodes      = [];
      root          = Node.new('program', Node.new());
      toBuild       = [root];
      singleSpot    = 0;
      curStatus     = status[3];
      curMovement   = [stack.slice(), input.slice(), {}];
      recovering    = false;
    };
    parser.setInput = function (_input) {
      parser.reset();
      input = _input;
      curStatus = status[0];
    };
    parser.pushToken = function (token) {
      nextT = token;
      next = nextT.abstract;
      input.push(token);
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
        while(top != '$' && input.length > 0){
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
      function cleanNewNodes () {
        for (var i = 0; i < newNodes.length; i++) {
          newNodes[i].new = false;
        }
        newNodes = [];
      }
      if (curStatus != status[0] && curStatus != status[1]) return false;

      curMovement = [stack.slice(), input.slice(), {}];
      var top = stack.pop(), nextT = input[0], next = nextT.abstract;
      building = toBuild.pop();
      while (top != '$' && input.length > 0) {
        cleanNewNodes();
        if (top == next && !recovering) {
          lastPos = nextT.position;
          building.setPosition(nextT.position);
          building.parsed = true;
          building.assign(nextT, curFormula);
          input.shift();
        } else if (recovering && top != 'stmts'){
          curStatus = status[1];
          curWarningMsg = ['UNEXPECTED', nextT.lexeme, 'AT', 'ROW', lastPos.last_row + ',', 'COL', lastPos.last_col + '.', 'POPPED', 'OUT', '\'' + top + '\''].join(' ');
          curMovement[2] = curWarningMsg;
          warningMsgs.push(curWarningMsg);
          building.parsed = true;
        } else if (recovering && top == 'stmts') {
          toBuild.push(lastStmtsNode);
          stack.push('stmts');
          if (building != lastStmtsNode) {
            while (lastStmtsNode.getSubNodes().length > 0) {
              lastStmtsNode.shiftSubNode();
            }
          }
          if (table[top][next] > 0) {
            recovering = false;
            curWarningMsg = 'RECOVERY DONE';
            curMovement[2] = curWarningMsg;
            warningMsgs.push(curWarningMsg);
          } else {
            input.shift();
            curStatus = status[1];
            curWarningMsg = 'SKIPPED ' + '\'' + next + '\'' + ' AT ROW ' + nextT.position.first_row + ', COL ' + nextT.position.first_col;
            curMovement[2] = curWarningMsg;
            warningMsgs.push(curWarningMsg);
          }
        } else if (isTerminal(top)) {
          recovering = true;
          curStatus = status[1];
          curWarningMsg = ['UNEXPECTED', nextT.lexeme, 'AT', 'ROW', lastPos.last_row + ',', 'COL', lastPos.last_col + '.', 'POPPED', 'OUT', '\'' + top + '\''].join(' ');
          curMovement[2] = curWarningMsg;
          warningMsgs.push(curWarningMsg);
          building.parsed = true;
        } else if (table[top][next] == 0) {
          if (Number(nextT.position.first_row)>Number(lastPos.last_row)) {
            curStatus = status[1];
            curWarningMsg = ['EXPECTED', ';', 'AT', 'ROW', lastPos.last_row + ',', 'COL', lastPos.last_col].join(' ');
            curMovement[2] = curWarningMsg;
            warningMsgs.push(curWarningMsg);
            input.unshift({
              lexeme: ';',
              abstract: ';',
              position: lastPos,
              containValue: true
            });
          } else {
            if (top!='stmts') {
              recovering = true;
            }
            stack.push(top);
            toBuild.push(building);
            input.shift();
            curStatus = status[1];
            curWarningMsg = 'SKIPPED ' + '\'' + next + '\'' + ' AT ROW ' + nextT.position.first_row + ', COL ' + nextT.position.first_col;
            curMovement[2] = curWarningMsg;
            warningMsgs.push(curWarningMsg);
          }
        } else if (table[top][next] > 0) {
          curFormula = table[top][next];
          var rule = table[top][next];
          var product = rules[rule].product.slice();
          var item, newNode;
          if (product.length == 0) {
            building.addSubNode(Node.epsilon());
            building.parsed = true;
          } else {
            if (rules[rule].interminal == 'stmts') {
              lastStmtsNode = building;
            }
          }
          while(product.length > 0) {
            item = product.pop();
            stack.push(item);
            newNode = Node.new(item, building);
            building.addSubNode(newNode);
            toBuild.push(newNode);
          }
          curMovement[2] = rules[rule];
        }
        if (curStatus != status[2]) {
          movements.push(curMovement);
        }
        if (curStatus == status[2] || singleStepping) {
          singleSpot += 1;
          return curStatus != status[2];
        }
        if (!singleStepping) {
          curMovement = [stack.slice(), input.slice(), {}];
          top         = stack.pop();
          nextT       = input[0];
          next        = nextT.abstract;
        }
      }
      if (top == next) {
        input.shift();
      }
      if (input.length == 0) {
        movements.push(curMovement);
        curStatus = status[3];
        return true;
      } else {
        curStatus = status[2];
        errorMsg = 'CAME UP WITH UNEXPECTED TERMINAL \'' + nextT.lexeme + '\' AT ROW ' + nextT.position.first_row + ', COL ' + nextT.position.first_col;
        return false;
      }
    };
    parser.parseDone = function () {

      return curStatus == status[3];
    };
    parser.needPush = function () {

      return input.length == 0;
    };
    parser.getRootS = function () {
      function filterNode (node, fatherNode) {
        var nodeS = {};
        var subNodesS = [];
        var subNodes = node.getSubNodes();
        nodeS.abstract = node.abstract;
        nodeS.name = node.name;
        nodeS.value = node.value;
        nodeS.type = node.type;
        nodeS.subNodes = subNodesS;
        nodeS.fatherNode = fatherNode;
        if (node.position != undefined) {
          nodeS.position = node.position;
        }
        var i;
        for (i = 0; i < subNodes.length; i++) {
          subNodesS.push(filterNode(subNodes[i], nodeS));
        }
        return nodeS;
      }
      return filterNode(root, undefined);
    };
    parser.getSequentialNodes = function () {
      function checkParsed (node) {
        var subNodes = node.getSubNodes();
        if (subNodes.length > 0) {
          var allParsed = true;
          for (var i = 0; i < subNodes.length; i++) {
            if (!subNodes[i].parsed) {
              checkParsed(subNodes[i]);
              if (!subNodes[i].parsed) {
                allParsed = false;
              }
            }
          }
          node.parsed = allParsed;
        }
      }
      function generateSequentialNodes () {
        function digNode(fartherID, node, onParsingBranch) {
          var thisID = countNode.toString();
          countNode += 1;
          if (typeof(node) === typeof(Node.new())) {
            var sequentialNodes = [];
            var cur = [thisID, node.abstract, 0, fartherID, onParsingBranch ? '1':'0', node.new ? '1':'0'];
            var subSqu, subNodes = node.getSubNodes();
            var countUnparsed = 0;
            var i, j;
            for (i = 0; i < subNodes.length; i += 1) {
              if (!subNodes[i].parsed) {
                countUnparsed += 1;
                subSqu = digNode(thisID, subNodes[i], countUnparsed == 1 && onParsingBranch);
                for (j = 0; j < subSqu.length; j += 1) {
                  sequentialNodes.push(subSqu[j]);
                }
                if (subSqu.length > 0) {
                  cur[2] += subSqu[0][2] + 1;
                }
              }
            }
            sequentialNodes.unshift(cur);
            return sequentialNodes;
          }
        }
        var countNode = 0;
        return digNode('', root, true);
      }
      checkParsed(root);
      return generateSequentialNodes();
    };
    parser.treeChanged = function () {

      return true;
    };
    parser.getErrMsg = function () {

      return errorMsg;
    };
    parser.getWarningMsg = function () {

      return warningMsgs.join('\n');
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
      for (i = 0; i < movements.length; i += 1) {
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
        } else if (typeof(move[2]) == typeof('')) {
          sACTION += move[2];
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
          if (curMovement[2].product.length == 0) {
            sACTION += 'ε';
          }
          for (var i = 0; i < curMovement[2].product.length; i++) {
            sACTION += curMovement[2].product[i] + ' ';
          }
        }
      } else if (typeof(curMovement[2]) == typeof('')) {
        sACTION += curMovement[2];
      }
      return [sSTACK, sINPUT, sACTION].join('  |  ');
    };
    return parser;
  }
};

var Paxer = {
  new: function () {
    var paxer  = {};
    var parser = Parser.new();
    var lexer  = Lexer.new();
    var status = ['NORMAL', 'WARNING', 'ERROR', 'DONE'];
    var curStatus;
    var errorMsg;
    var warningMsg;
    paxer.reset = function () {
      errorMsg = "";
      warningMsg = "";
      curStatus = status[3];
      lexer.reset();
      parser.reset();
    };
    paxer.setInput = function (input) {
      function prepare (input) {
        var output = "";
        var commenting = false;
        var count = 0;
        var c;
        for (var i = 0; i < input.length; i++) {
          c = input[i];
          if (c == '/') count += 1;
          else count = 0;
          if (c == '\n') commenting = false;
          if (count == 2) commenting = true;
          if (!commenting) output += c;
        }
        return output;
      }
      paxer.reset();
      lexer.setInput(prepare(input));
      parser.setInput([]);
      curStatus = status[0];
    };
    paxer.go = function() {
      if (curStatus != status[0] && curStatus != status[1]) return;
      curStatus = status[0];
      var singleStepping = true;
      if (parser.needPush()) {
        switch (lexer.getStatus()) {
          case 'DONE':
            return;
          case 'ERROR':
            errorMsg = lexer.getErrMsg();
            curStatus = status[2];
            return;
          case 'NORMAL':
            lexer.lex(singleStepping);
            parser.pushToken(lexer.getToken());
            break;
          default:
            console.log('UNEXPECTED LEXER STATUS');
            curStatus = status[2];
            return;
        }
      }
      parser.parse(singleStepping);
      switch (parser.getStatus()) {
        case 'DONE':
          break;
        case 'ERROR':
          errorMsg = parser.getErrMsg();
          curStatus = status[2];
          return;
        case 'WARNING':
          warningMsg = parser.getWarningMsg();
          curStatus = status[1];
        case 'NORMAL':
          break;
        default:
          console.log('UNEXPECTED PARSER STATUS');
          curStatus = status[2];
          break;
      }
      if (lexer.lexDone() != parser.parseDone()) {
        curStatus = status[2];
      }
      if (lexer.lexDone() && parser.parseDone()) {
        curStatus = status[3];
      }
    };
    paxer.getStatus = function () {

      return curStatus;
    };
    paxer.getErrMsg = function () {

      return errorMsg;
    };
    paxer.getWarningMsg      = parser.getWarningMsg;
    paxer.getSymbolTable     = lexer.getSymbolTable;
    paxer.getSequentialNodes = parser.getSequentialNodes;
    paxer.getMovementsF      = parser.getMovementsF;
    paxer.getCurMovementF    = parser.getCurMovementF;
    paxer.getRootS           = parser.getRootS;
    paxer.getTreeChanged     = parser.getTreeChanged;
    return paxer;
  }
}
export default Paxer
