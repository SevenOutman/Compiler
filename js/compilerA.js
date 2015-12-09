const Invalid = -9999999;
const TokenType = {
    Keyword:   1,
    ID:        2,
    Operator:  3,
    Delimiter: 4,
    NUM:       5,
    Unknown:   6,
    End:       7
};

function Symbol(idname, initialline, initialcolumn) {
    this.name = "";
    this.tokentype = TokenType.ID;
    this.attributevalue = Invalid;
    this.linenumbers = new Array(100);
    this.linepositions = new Array(100);
    this.count = 0;
    if (undefined !== idname) {
        this.name = idname;
        this.linenumbers[0] = initialline;
        this.linepositions[0] = initialcolumn;
    }
}

function Token(tk, tkn, l, c) {
    this.tokentype = tk;
    this.tokenname = tkn;
    this.linenumber = l;
    this.lineposition = c;
}

function LL(s, i) {
    this.TNT = s;
    this.tabCount = i;
}

var LLtree = [];

function ParserNode(n, f, fin, l) {
    this.child = new Array(8);
    this.father = -1;
    this.finish = fin;
    this.name = n;
    this.fomular = f;
    this.level = l;
    this.value = Invalid;
    this.place = "";
    this.label = -1;
}

function PositionNode(x1, y1) {
    this.x = x1;
    this.y = y1;
}

var TokenHaveError = false;

var fileout, sr, sw, Buff, sourcePath, threeAddressPath;

var SymbolTable = new Array(100);
var Delimiter = "", splitContent = "";
var flag            = false, isSplit = false, isBetween = true,
    isSplitAndBlank = false, isDouble = false, isEnd = false;
var indexST = 0, indexBuff, lineNo = 1, columnNo = 1;

var KeyWords = ["int", "real", "if", "then", "else", "while"];
var Operators = ["+", "-", "*", "/", "=", "==", "<", "<=", ">", ">=", "!="];
var Delimeters = ["(", ")", "{", "}", ";", "$"];
var RegIdentifier = /^[a-zA-Z][a-zA-Z0-9]*$/;
var RegIntNumber = /^[0-9]+$/;
var RegRealNumber = /^([0-9]+(E|e)?[0-9]+)|([0-9]+\.[0-9]+)|([0-9]+\.[0-9]+(E|e)(\+|\-)?[0-9]+)$/;

var errorCount = 0;
var saved = false;
var finished = false;
var oldtk;
var ParserHaveError = false;
var KuoHaoCount = 0;
var HaveUnknowToken = false;

var isInIfstmt = false;
var ifstmtHasHao = false;
var ifstmtDoElse = false;
var IfstmtTabCount = 0;

var isInWhilestmt = false;
var whilestmtHasHao = false;
var WhilestmtTabCount = 0;

var isroot = true;
var isStartNT = true;

var T = [
    "{", "}", "if", "(", ")", "then", "else", "while", "ID", "=",
    ";", "<", ">", "<=", ">=", "==", "+", "-", "*", "/", "NUM", "$"
];
var NT = [
    "program", "stmt", "compoundstmt", "stmts", "ifstmt", "whilestmt", "assgstmt",
    "boolexpr", "boolop", "arithexpr", "arithexprprime", "multexpr", "multexprprime", "simpleexpr"
];

var grammar = [
    ["compoundstmt"],
    ["ifstmt"],
    ["whilestmt"],
    ["assgstmt"],
    ["compoundstmt"],
    ["{", "stmts", "}"],
    ["stmt", "stmts"],
    ["ε"],
    ["if", "(", "boolexpr", ")", "then", "stmt", "else", "stmt"],
    ["while", "(", "boolexpr", ")", "stmt"],
    ["ID", "=", "arithexpr", ";"],
    ["arithexpr", "boolop", "arithexpr"],
    ["<"],
    [">"],
    ["<="],
    [">="],
    ["=="],
    ["multexpr", "arithexprprime"],
    ["+", "multexpr", "arithexprprime"],
    ["-", "multexpr", "arithexprprime"],
    ["ε"],
    ["simpleexpr", "multexprprime"],
    ["*", "simpleexpr", "multexprprime"],
    ["/", "simpleexpr", "multexprprime"],
    ["ε"],
    ["ID"],
    ["NUM"],
    ["(", "arithexpr", ")"]
];

var table = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 2, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [7, 8, 7, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 18, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0],
    [21, 21, 21, 0, 21, 0, 21, 21, 21, 0, 21, 21, 21, 21, 21, 21, 19, 20, 0, 0, 0, 0],
    [0, 0, 0, 22, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0],
    [25, 25, 25, 0, 25, 0, 25, 25, 25, 0, 25, 25, 25, 25, 25, 25, 25, 25, 23, 24, 0, 0],
    [0, 0, 0, 28, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0]
];

var SemanticHaveError = false;

var AllFinish = true;
var IsThisLevel = false;

var GrammarForSema = [
    ["program", "compoundstmt"],
    ["stmt", "ifstmt"],
    ["stmt", "whilestmt"],
    ["stmt", "assgstmt"],
    ["stmt", "compoundstmt"],
    ["compoundstmt", "{", "stmts", "}"],
    ["stmts", "stmt", "stmts"],
    ["stmts", "ε"],
    ["ifstmt", "if", "(", "boolexpr", ")", "then", "stmt", "else", "stmt"],
    ["whilestmt", "while", "(", "boolexpr", ")", "stmt"],
    ["assgstmt", "ID", "=", "arithexpr", ";"],
    ["boolexpr", "arithexpr", "boolop", "arithexpr"],
    ["boolop", "<"],
    ["boolop", ">"],
    ["boolop", "<="],
    ["boolop", ">="],
    ["boolop", "=="],
    ["arithexpr", "multexpr", "arithexprprime"],
    ["arithexprprime", "+", "multexpr", "arithexprprime"],
    ["arithexprprime", "-", "multexpr", "arithexprprime"],
    ["arithexprprime", "ε"],
    ["multexpr", "simpleexpr", "multexprprime"],
    ["multexprprime", "*", "simpleexpr", "multexprprime"],
    ["multexprprime", "/", "simpleexpr", "multexprprime"],
    ["multexprprime", "ε"],
    ["simpleexpr", "ID"],
    ["simpleexpr", "NUM"],
    ["simpleexpr", "(", "arithexpr", ")"]
];
/*
 Tree tree = new Tree();
 Color gray = Color.FromArgb(215,228,242);
 Brush grayBrush = new SolidBrush(Color.FromArgb(215, 228, 242));//填充颜色
 Brush whiteBrush = new SolidBrush(Color.White);//填充颜色
 Brush yellowBrush = new SolidBrush(Color.FromArgb(255,165,0));//填充颜色
 Brush blackBrush = new SolidBrush(Color.FromArgb(54,100,139));//填充颜色
 Brush pinkBrush = new SolidBrush(Color.PapayaWhip);//填充颜色
 Brush redpinkBrush = new SolidBrush(Color.PaleVioletRed);
 Brush slateBrush = new SolidBrush(Color.SlateBlue);
 Brush skyBrush = new SolidBrush(Color.SkyBlue);
 Pen whitepen = new Pen(Color.White, 5);//线条颜色
 */

var mid = 80;
var hmid = 40;
var w = 80;
var h = 30;

var ParserCount = 0;
var ParserTree = [];
var Level = [];
var position = new Array(500);
var Plevel;

var ThreeAddress = [];
var ThreeAddressCount = 0;
var RegisterNo = 0;
var EndIsEmpty = false;

function isIdentifier(str) {
    return RegIdentifier.test(str);
}

function isInSymbolTable(str) {
    [].forEach.call(SymbolTable, function(item) {
        if (str == item.name) {
            return item;
        }
    });
    return null;
}

function isIntNumber(inputData) {
    return RegIntNumber.test(inputData);
}

function isRealNumber(inputData) {
    return RegRealNumber.test(inputData);
}

function isKeyWord(str) {
    [].forEach.call(KeyWords, function(item) {
        if (str == item) {
            return true;
        }
    });
    return false;
}

function isDelimeter(str) {
    [].forEach.call(Delimeters, function(item) {
        if (str == item) {
            return true;
        }
    });
    return false;
}

function isDelOrOper(str) {
    [].forEach.call([].concat(Delimeters, Operators), function(item) {
        if (str == item) {
            return true;
        }
    });
    return false;
}

var richTextBox1 = {
    Lines: []
};

function getNextToken() {
    var i = 0, j = 0,
        current, next,
        Continue;
    if (isSplit && splitContent != "") {
        isSplit = false;
        var tk = TokenType.Operator;
        if (isDelimeter(splitContent)) {
            tk = TokenType.Delimiter;
        }

        if (isBetween) {
            next = Buff.substr(0, 1);
        } else {
            next = Buff.substr(1, 1);
        }

        if (isDelOrOper(next)) {
            if (isDouble) {
                if (isBetween) {
                    return PrintToken(tk, splitContent, lineNo, columnNo - 2, 1);
                } else {
                    return PrintToken(tk, splitContent, lineNo, columnNo - 1, 1);
                }
            } else {
                if (isBetween) {
                    return PrintToken(tk, splitContent, lineNo, columnNo - 1, 0);
                } else {
                    return PrintToken(tk, splitContent, lineNo, columnNo, 0);
                }
            }
        }

        if (columnNo == 1) {
            if (isDouble) {
                return PrintToken(tk, splitContent, lineNo, columnNo - 1, 1);
            } else {
                return PrintToken(tk, splitContent, lineNo, columnNo, 0);
            }
        } else {
            if (isDouble) {
                isDouble = false;
                if (isSplitAndBlank) {
                    isSplitAndBlank = false;
                    return PrintToken(tk, splitContent, lineNo, columnNo - 1, 1);
                } else {
                    if (isBetween) {
                        return PrintToken(tk, splitContent, lineNo, columnNo - 2, 1);
                    } else {
                        return PrintToken(tk, splitContent, lineNo, columnNo - 1, 1);
                    }
                }
            } else {
                if (isSplitAndBlank) {
                    isSplitAndBlank = false;
                    return PrintToken(tk, splitContent, lineNo, columnNo, 0);
                } else {
                    if (isBetween) {
                        return PrintToken(tk, splitContent, lineNo, columnNo - 1, 0);
                    } else {
                        return PrintToken(tk, splitContent, lineNo, columnNo, 0);
                    }
                }
            }
        }
    }

    while (Continue) {
        current = Buff.substr(i, 1);
        switch (current) {
            case "\n":
            {
                var tempCol = columnNo;
                var tempStr = Buff.substr(0, i);
                columnNo = 1;
                Buff = Buff.substr(i + 1, Buff.length - i - 1);

                if (tempStr == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(tempStr, lineNo++, tempCol, i);
            }
            case ";":
            {
                isSplit = true;
                splitContent = ";";
                isDouble = false;
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "(":
            {
                isSplit = true;
                splitContent = "(";
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case ")":
            {
                isSplit = true;
                splitContent = ")";
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "{":
            {
                isSplit = true;
                splitContent = "{";
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "}":
            {
                isSplit = true;
                splitContent = "}";
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "+":
            {
                isSplit = true;
                splitContent = "+";
                if (Buff.substr(j - 1, 1) == "E") {
                    i++;
                    j++;
                    break;
                }
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "-":
            {
                isSplit = true;
                splitContent = "-";
                if (Buff.substr(j - 1, 1) == "E") {
                    i++;
                    j++;
                    break;
                }
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "*":
            {
                isSplit = true;
                splitContent = "*";
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "/":
            {
                isSplit = true;
                splitContent = "/";
                next = Buff.substr(i + 1, 1);
                if (next == "/") {
                    isSplit = false;
                    Buff = "";

                    var start = 0;
                    for (var ii = 0; ii < lineNo - 1; ii++) {
                        start += richTextBox1.Lines[ii].length + 1;
                    }
                    start += columnNo - 1;

                    for (var ii = 0; ii < lineNo - 1; ii++) {
                        start += richTextBox1.Lines[ii].length + 1;
                    }

                    for (var k = lineNo; k < richTextBox1.Lines.length; k++) {
                        Buff += richTextBox1.Lines[k];
                    }

                    return null;
                }
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "<":
            {
                isSplit = true;
                splitContent = "<";
                next = Buff.substr(i + 1, 1);
                if (next == "=") {
                    isDouble = true;
                    splitContent += "=";
                }
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case ">":
            {
                isSplit = true;
                splitContent = ">";
                next = Buff.substr(i + 1, 1);
                if (next == "=") {
                    isDouble = true;
                    splitContent += "=";
                }
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "=":
            {
                isSplit = true;
                splitContent = "=";
                next = Buff.substr(i + 1, 1);
                if (next == "=") {
                    isDouble = true;
                    splitContent += "=";
                }
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "!":
            {
                isSplit = true;
                splitContent = "!";
                next = Buff.substr(i + 1, 1);
                if (next == "=") {
                    isDouble = true;
                    splitContent += "=";
                }
                return null;
            }
            case " ":
            {
                isSplit = true;
                splitContent = "";
                if (Buff.substr(0, j) == "") {
                    isBetween = false;
                    Buff = Buff.substr(1, Buff.length - 1);
                    columnNo++;
                    next = Buff.substr(i, 1);
                    if (IsDelOrOper(next.ToString())) {
                        isSplitAndBlank = true;
                    }
                }
                else {
                    isBetween = true;
                    next = Buff.substr(i + 1, 1);
                    if (isDelOrOper(next)) {
                        isSplitAndBlank = true;
                    }
                }
                return ID_Num(Buff.substr(0, j), lineNo, columnNo, i);
            }
            case "$":
            {
                isSplit = true;
                splitContent = "";
                var tempStr = Buff.substr(0, j);
                Buff = "";
                if (tempStr == "") {
                    isBetween = false;
                } else {
                    isBetween = true;
                }
                return ID_Num(tempStr, lineNo, columnNo, i);
            }
        }
    }
    return null;
}

function PrintToken(t, attr, line, cl, len) {
    if (!isSplit && isBetween) {

    } else {
        if (len + 1 > Buff.length) {
            Buff = "";
        } else {
            if (isDouble) {
                Buff = Buff.substr(len + 2, Buff.length - len - 2);
                columnNo += len + 2;
            } else {
                Buff = Buff.substr(len + 1, Buff.length - len - 1);
                columnNo += len + 1;
            }
        }
    }
    var currentToken = new Token(t, attr, line, cl);
    return currentToken;
}

function ID_Num(str, line, col, len) {
    if (str != "") {
        if (isKeyWord(str)) {
            return PrintToken(TokenType.Keyword, str, line, col, len);
        } else if (isIdentifier(str)) {
            var found = isInSymbolTable(str);
            if (found !== null) {
                found.linenumbers[found.count] = line;
                found.linepositions[found.count] = col;
                found.count++;
            } else {
                var newid = new Symbol(str, line, col);
                SymbolTable[indexST++] = newid;
            }
            return PrintToken(TokenType.ID, str, line, col, len);
        } else if (isIntNumber(str)) {
            return PrintToken(TokenType.NUM, str, line, col, len);
        } else if (isRealNumber(str)) {
            return PrintToken(TokenType.NUM, str, line, col, len);
        } else {
            PrintErrorView(str + "is illegal", line, col);
            TokenHaveError = true;
            return PrintToken(TokenType.Unknown, str, line, col, len);
        }
    }
    else {
        return null;
    }
}

function parser(tk) {
    var tnt,
        token = "",
        ln    = tk.linenumber,
        col   = tk.lineposition;

    if (tk.tokentype == TokenType.ID || tk.tokentype == TokenType.NUM) {
        token = tk.tokentype;
    } else {
        token = token.tokenname;
    }

    while (true) {
        tnt = LLtree.pop();

        if (tnt.TNT == "$") {
            if (token == "$") {
                console.log(ln + ", " + col + ": " + "--Finish--");
            } else {
                var str = "";
                while (token != "$") {
                    str += tk.tokenname + ",";
                    tk = getNextToken();
                    token = tk.tokenname;
                }
                console.log(ln + ", " + col + ": " + "[Overinput]" + str);
                PrintErrorView("[Overinput]" + str, tk.linenumber, tk.lineposition);

                ParserHaveError = true;
            }
            return true;
        } else if (token == "$") {
            var str = "";
            while (LLtree.length > 1) {
                str += LLtree.pop().TNT + ",";
            }
            console.log(ln + ", " + col + ": " + "[Underinput]" + str);
            PrintErrorView("[Underinput]" + str, tk.linenumber, tk.lineposition);
            ParserHaveError = true;
            return true;
        } else if (tnt.TNT == "ε") {
            var output = ln + ", " + col + ": ";
            for (var x = 0; x < tnt.tabCount; x++) {
                output += "    ";
            }
            console.log(output + "ε");
            continue;
        } else {
            var inputIsT = false;
            var n = 0;
            for (n = 0; n < Delimeters.length; n++) {
                if (token == Delimeters[n]) {
                    inputIsT = true;
                    break;
                }
            }

            if (inputIsT) {
                if (tnt.TNT == token) {
                    var output = ln + ", " + col + ": ";
                    for (var x = 0; x < tnt.tabCount; x++) {
                        output += "    ";
                    }
                    console.log(output + tnt.TNT);

                    if (token == "{") {
                        KuoHaoCount++;
                    } else if (token == "}") {
                        KuoHaoCount--;
                    }

                    if (!SemanticHaveError) {
                        if (token == ";" && !isInWhilestmt && !isInIfstmt) {
                            if (isStartNT) {
                                CalculateParserTree(5);
                                if (!SemanticHaveError) {
                                    CalculateThreeAddress(5);
                                }
                                isStartNT = false;
                            } else {
                                CalculateParserTree(1);
                                if (!SemanticHaveError) {
                                    CalculateThreeAddress(1);
                                }
                            }

                            for (var hehe = 0; hehe < ThreeAddress.length; hehe++) {
                                console.log(ThreeAddress[hehe])
                            }
                            if (EndIsEmpty) {
                                console.log(ThreeAddress.length);
                            }

                            ParserTree = [];
                            Level = [];
                            isroot = true;
                            ParserCount = 0;
                            RegisterNo = 0;
                        } else if (isInWhilestmt) {
                            if (token == "{") {
                                whilestmtHasHao = true;
                            } else if ((!whilestmtHasHao
                                        && token == ";" && tnt.tabCount == WhilestmtTabCount + 3)
                                       || (whilestmtHasHao && token == "}" && tnt.tabCount == WhilestmtTabCount + 3)) {
                                CalculateParserTree(1);
                                if (!SemanticHaveError) {
                                    CalculateThreeAddress(1);
                                }

                                for (var hehe = 0; hehe < ThreeAddress.length; hehe++) {
                                    console.log(ThreeAddress[hehe])
                                }
                                if (EndIsEmpty) {
                                    console.log(ThreeAddress.length);
                                }

                                ParserTree = [];
                                Level = [];
                                isroot = true;
                                ParserCount = 0;
                                isInWhilestmt = false;
                                whilestmtHasHao = false;
                                WhilestmtTabCount = 0;
                                RegisterNo = 0;
                            }
                        } else if (isInIfstmt) {
                            if (token == "else" && tnt.tabCount == IfstmtTabCount + 1) {
                                ifstmtDoElse = true;
                            } else if (ifstmtDoElse && token == "{") {
                                ifstmtHasHao = true;
                            } else if ((ifstmtDoElse && !ifstmtHasHao
                                        && token == ";" && tnt.tabCount == IfstmtTabCount + 3)
                                       || (ifstmtDoElse && ifstmtHasHao
                                           && token == "}" && tnt.tabCount == IfstmtTabCount + 3)) {
                                CalculateParserTree(1);
                                if (!SemanticHaveError) {
                                    CalculateThreeAddress(1);
                                }

                                for (var hehe = 0; hehe < ThreeAddress.length; hehe++) {
                                    console.log(ThreeAddress[hehe])
                                }
                                if (EndIsEmpty) {
                                    console.log(ThreeAddress.length);
                                }

                                ParserTree = [];
                                Level = [];
                                isroot = true;
                                ParserCount = 0;
                                isInIfstmt = false;
                                ifstmtDoElse = false;
                                ifstmtHasHao = false;
                                IfstmtTabCount = 0;
                                RegisterNo = 0;
                            }
                        }
                    }
                    return false;

                } else {
                    var stackIsT = false;
                    for (var xx = 0; xx < T.length; x++) {
                        if (tnt.TNT == T[xx]) {
                            stackIsT = true;
                            break;
                        }
                    }

                    if (stackIsT) {
                        // TODO Error parsing
                        if (tnt.TNT == "=") {
                            PrintErrorView("Cannot input ID alone: " +
                                           oldtk.tokenname, oldtk.linenumber, oldtk.lineposition);
                            ParserHaveError = true;

                            LLtree.pop();
                            if (token != ";") {
                                LLtree.pop();
                            }


                            var strr = ln + ", " + col + ": ";
                            for (var xxx = 0; xxx < tnt.tabCount; xxx++) {
                                strr += "    ";
                            }
                            console.log(strr + "Cannot input ID alone: " + oldtk.tokenname);
                            BuildParserTree(oldtk, 25, false);
                            continue;
                        } else if (tnt.TNT == ";") {
                            PrintErrorView("Missing ';'", oldtk.linenumber, oldtk.lineposition);
                            ParserHaveError = true;

                            var strr = ln + ", " + col + ": ";
                            for (var xxx = 0; xxx < tnt.tabCount; xxx++) {
                                strr += "    ";
                            }
                            console.log(strr + "Missing ';'");

                            if (!SemanticHaveError) {
                                if (token == ";" && !isInWhilestmt && !isInIfstmt) {
                                    if (isStartNT) {
                                        CalculateParserTree(5);
                                        if (!SemanticHaveError) {
                                            CalculateThreeAddress(5);
                                        }
                                        isStartNT = false;
                                    } else {
                                        CalculateParserTree(1);
                                        if (!SemanticHaveError) {
                                            CalculateThreeAddress(1);
                                        }
                                    }

                                    for (var hehe = 0; hehe < ThreeAddress.length; hehe++) {
                                        console.log(ThreeAddress[hehe])
                                    }
                                    if (EndIsEmpty) {
                                        console.log(ThreeAddress.length);
                                    }

                                    ParserTree = [];
                                    Level = [];
                                    isroot = true;
                                    ParserCount = 0;
                                    RegisterNo = 0;
                                } else if (isInWhilestmt) {
                                    if (token == "{") {
                                        whilestmtHasHao = true;
                                    } else if ((!whilestmtHasHao
                                                && token == ";" && tnt.tabCount == WhilestmtTabCount + 3)
                                               || (whilestmtHasHao && token == "}" &&
                                                   tnt.tabCount == WhilestmtTabCount + 3)) {
                                        CalculateParserTree(1);
                                        if (!SemanticHaveError) {
                                            CalculateThreeAddress(1);
                                        }

                                        for (var hehe = 0; hehe < ThreeAddress.length; hehe++) {
                                            console.log(ThreeAddress[hehe])
                                        }
                                        if (EndIsEmpty) {
                                            console.log(ThreeAddress.length);
                                        }

                                        ParserTree = [];
                                        Level = [];
                                        isroot = true;
                                        ParserCount = 0;
                                        isInWhilestmt = false;
                                        whilestmtHasHao = false;
                                        WhilestmtTabCount = 0;
                                        RegisterNo = 0;
                                    }
                                } else if (isInIfstmt) {
                                    if (token == "else" && tnt.tabCount == IfstmtTabCount + 1) {
                                        ifstmtDoElse = true;
                                    } else if (ifstmtDoElse && token == "{") {
                                        ifstmtHasHao = true;
                                    } else if ((ifstmtDoElse && !ifstmtHasHao
                                                && token == ";" && tnt.tabCount == IfstmtTabCount + 3)
                                               || (ifstmtDoElse && ifstmtHasHao
                                                   && token == "}" && tnt.tabCount == IfstmtTabCount + 3)) {
                                        CalculateParserTree(1);
                                        if (!SemanticHaveError) {
                                            CalculateThreeAddress(1);
                                        }

                                        for (var hehe = 0; hehe < ThreeAddress.length; hehe++) {
                                            console.log(ThreeAddress[hehe])
                                        }
                                        if (EndIsEmpty) {
                                            console.log(ThreeAddress.length);
                                        }

                                        ParserTree = [];
                                        Level = [];
                                        isroot = true;
                                        ParserCount = 0;
                                        isInIfstmt = false;
                                        ifstmtDoElse = false;
                                        ifstmtHasHao = false;
                                        IfstmtTabCount = 0;
                                        RegisterNo = 0;
                                    }
                                }
                            }
                            continue;
                        } else if (tnt.TNT == "else") {
                            PrintErrorView("Missing 'else'", oldtk.linenumber, oldtk.lineposition);
                            ParserHaveError = true;

                            var strr = ln + ", " + col + ": ";
                            for (var xxx = 0; xxx < tnt.tabCount; xxx++) {
                                strr += "    ";
                            }
                            console.log(strr + "Missing 'else'" + oldtk.tokenname);

                            continue;
                        } else if (tnt.TNT == "}") {
                            PrintErrorView("Missing '}'", oldtk.linenumber, oldtk.lineposition);
                            ParserHaveError = true;

                            var strr = ln + ", " + col + ": ";
                            for (var xxx = 0; xxx < tnt.tabCount; xxx++) {
                                strr += "    ";
                            }
                            console.log(strr + "Missing '}'" + oldtk.tokenname);

                            continue;
                        } else {
                            var strr = ln + ", " + col + ": ";
                            for (var xxx = 0; xxx < tnt.tabCount; xxx++) {
                                strr += "    ";
                            }
                            console.log(strr + "[Error]" + tk.tokenname + "does not match" + tnt.TNT);

                            PrintErrorView("[Error]" + tk.tokenname + "does not match" +
                                           tnt.TNT, tk.linenumber, tk.lineposition);
                            ParserHaveError = true;
                            LLtree.push(tnt);

                            return false;
                        }
                    } else {
                        var isNT = false;
                        var j = 0;
                        for (j = 0; j < NT.length; j++) {
                            if (tnt.TNT == NT[j]) {
                                isNT = true;
                                break;
                            }
                        }

                        if (isNT) {
                            var strr = ln + ", " + col + ": ";
                            for (var xxx = 0; xxx < tnt.tabCount; xxx++) {
                                strr += "    ";
                            }
                            console.log(strr + tnt.TNT);

                            if (table[j, n] != 0) {
                                for (var m = grammar[table[j, n] - 1].length - 1; m >= 0; m--) {
                                    LLtree.push(new LL(grammar[table[j, n] = 1][m], tnt.tabCount + 1));
                                }

                                BuildParserTree(tk, table[j, n] - 1, isroot);
                                isroot = false;
                                if (table[j, n] == 2) {
                                    if (!isInIfstmt || !isInWhilestmt) {
                                        isInIfstmt = true;
                                        IfstmtTabCount = tnt.tabCount + 1;
                                    }
                                } else if (table[j, n] == 3) {
                                    if (!isInIfstmt || !isInWhilestmt) {
                                        isInWhilestmt = true;
                                        WhilestmtTabCount = tnt.tabCount + 1;
                                    }
                                }

                                continue;
                            } else {
                                var strr = ln + ", " + col + ": ";
                                for (var xxx = 0; xxx < tnt.tabCount; xxx++) {
                                    strr += "    ";
                                }
                                console.log(strr + "[Error]" + tk.tokenname + "does not match " + tnt.TNT);
                                LLtree.push(tnt);
                                PrintErrorView(tk.tokenname + "does not match " +
                                               tnt.TNT, tk.linenumber, tk.lineposition);
                                ParserHaveError = true;
                                return false;
                            }
                        } else {
                            var strr = ln + ", " + col + ": ";
                            console.log(strr + "[Error]Invalid element in stack");
                            PrintErrorView("[Error]Invalid element in stack", tk.linenumber, tk.lineposition);

                            continue;
                        }
                    }
                }
            } else {
                // TODO Error parsing
                var strr = ln + ", " + col + ": ";
                console.log(strr + "[Error]Unknown input");
                LLtree.push(tnt);
                PrintErrorView("[Error]Unknown input", tk.linenumber, tk.lineposition);
                HaveUnknowToken = true;

                return false;
            }
        }
    }
}

function BuildParserTree(tk, FomularNumber, isroot) {
    if (isroot) {
        ParserTree.push(new ParserNode(GrammarForSema[FomularNumber][0], FomularNumber, false, 0));
        Level.push([]);
        Level[0].push(0);
        Plevel = 0;
    }

    Level.push([]);
    for (var i = 0; i < Level[Plevel].length; i++) {
        var fatherindex = Level[Plevel][i];
        IsThisLevel = false;
        if (ParserTree[fatherindex].finish == false) {
            ParserTree[fatherindex].fomular = FomularNumber;
            var TempCount = ParserCount;
            var j = 1;
            for (j = 1; j < GrammarForSema[FomularNumber].length; j++) {
                TempCount++;
                ParserTree.push(new ParserNode(GrammarForSema[FomularNumber][j],
                    FomularNumber, false, Plevel + 1));

                Level[Plevel + 1].push(TempCount);
                ParserTree[fatherindex].child[j - 1] = TempCount;
                ParserTree[TempCount].father = fatherindex;

                var isT = false;
                for (var n = 0; n < T.length; n++) {
                    if (ParserTree[TempCount].name == T[n]) {
                        isT = true;
                        break;
                    }
                }

                if (isT || ParserTree[TempCount].name == "ε") {
                    ParserTree[TempCount].finish = true;
                    ParserTree[TempCount].child[0] = -1;
                    if (FomularNumber + 1 == 26) {
                        var found = isInSymbolTable(tk.tokenname);
                        ParserTree[TempCount].name = tk.tokenname;
                        ParserTree[TempCount].value = found.attributevalue;
                    } else if (FomularNumber + 1 == 27) {
                        ParserTree[TempCount].name = tk.tokenname;
                        ParserTree[TempCount].value = parseFloat(tk.tokenname);
                    } else if (FomularNumber + 1 == 11 && ParserTree[TempCount].name == "ID") {
                        ParserTree[TempCount].name = tk.tokenname;
                    }
                }
            }

            ParserCount = ParserCount + j - 1;
            var tempfather = fatherindex;
            AllFinish = true;
            while (tempfather != 0) {
                var m = 1;
                while (m < GrammarForSema[ParserTree[tempfather].fomular].length) {
                    if (ParserTree[ParserTree[tempfather].child[m - 1]].finish == false) {
                        AllFinish = false;
                        break;
                    }
                    m++;
                }
                if (AllFinish == true) {
                    ParserTree[tempfather].finish = true;
                } else {
                    break;
                }
                tempfather = ParserTree[tempfather].father;
            }
            IsThisLevel = true;
            Plevel++;
            break;
        }
    }
    if (IsThisLevel == false) {
        if (Plevel > 0) {
            Plevel--;
            BuildParserTree(tk, FomularNumber, false);
        } else {
            return;
        }
    }
}


function CalculateParserTree(root) {
    var fomular = ParserTree[root].fomular + 1;
    switch (fomular) {
        case 9:
        { //ifstmt -> if ( boolexpr ) then stmt else stmt
            CalculateParserTree(ParserTree[root].child[2]);
            if (ParserTree[ParserTree[root].child[2]].value > 0) {
                CalculateParserTree(ParserTree[root].child[5]);
            } else {
                CalculateParserTree(ParserTree[root].child[7]);
            }
            break;
        }
        case 10:
        {  //whilestmt -> while ( boolexpr ) stmt
            CalculateParserTree(ParserTree[root].child[2]);
            while (ParserTree[ParserTree[root].child[2]].value > 0) {
                CalculateParserTree(ParserTree[root].child[4]);
                CalculateParserTree(ParserTree[root].child[2]);
            }
            break;
        }
        case 26:
        {  //simpleexpr -> ID
            var found = isInSymbolTable(ParserTree[ParserTree[root].child[0]].name);
            if (HaveUnknowToken && found.attributevalue == Invalid) {
                HaveUnknowToken = false;
            } else if (found.attributevalue == Invalid) {
                PrintErrorView("Variable " + found.name +
                               " not assigned", found.linenumbers[0], found.linepositions[0]);
            }
            ParserTree[root].value = found.attributevalue;
            break;
        }
        case 27:
        {  //simpleexpr -> NUM
            ParserTree[root].value = ParserTree[ParserTree[root].child[0]].value;
            break;
        }
        case 11:
        {  //assgstmt -> ID = arithexpr
            CalculateParserTree(ParserTree[root].child[2]);
            ParserTree[ParserTree[root].child[0]].value = ParserTree[ParserTree[root].child[2]].value;

            var found = isInSymbolTable(ParserTree[ParserTree[root].child[0]].name);
            found.attributevalue = ParserTree[ParserTree[root].child[0]].value;
            break;
        }
        case 1:
        {   //program -> compoundstmt
            CalculateParserTree(ParserTree[root].child[0]);
            break;
        }
        case 2:
        {   //stmt -> ifstmt
            CalculateParserTree(ParserTree[root].child[0]);
            break;
        }
        case 3:
        {   //stmt -> whilestmt
            CalculateParserTree(ParserTree[root].child[0]);
            break;
        }
        case 4:
        {   //stmt -> assgstmt
            CalculateParserTree(ParserTree[root].child[0]);
            break;
        }
        case 5:
        {   //stmt -> compoundstmt
            CalculateParserTree(ParserTree[root].child[0]);
            break;
        }
        case 6:
        {   //compoundstmt -> { stmts }
            CalculateParserTree(ParserTree[root].child[1]);
            break;
        }
        case 7:
        {   //stmts -> stmt stmts
            CalculateParserTree(ParserTree[root].child[0]);
            CalculateParserTree(ParserTree[root].child[1]);
            break;
        }
        case 8:
        {   //stmts -> ε
            break;
        }
        case 12:
        {  //boolexpr -> arithexpr boolop arithexpr
            CalculateParserTree(ParserTree[root].child[0]);
            CalculateParserTree(ParserTree[root].child[1]);
            CalculateParserTree(ParserTree[root].child[2]);

            if (ParserTree[ParserTree[root].child[1]].name == ">") {
                if (ParserTree[ParserTree[root].child[0]].value
                    > ParserTree[ParserTree[root].child[2]].value) {
                    ParserTree[root].value = 1;
                } else {
                    ParserTree[root].value = 0;
                }
            } else if (ParserTree[ParserTree[root].child[1]].name == ">=") {
                if (ParserTree[ParserTree[root].child[0]].value
                    > ParserTree[ParserTree[root].child[2]].value) {
                    ParserTree[root].value = 1;
                } else {
                    ParserTree[root].value = 0;
                }
            } else if (ParserTree[ParserTree[root].child[1]].name == "==") {
                if (ParserTree[ParserTree[root].child[0]].value
                    > ParserTree[ParserTree[root].child[2]].value) {
                    ParserTree[root].value = 1;
                } else {
                    ParserTree[root].value = 0;
                }
            } else if (ParserTree[ParserTree[root].child[1]].name == "<=") {
                if (ParserTree[ParserTree[root].child[0]].value
                    > ParserTree[ParserTree[root].child[2]].value) {
                    ParserTree[root].value = 1;
                } else {
                    ParserTree[root].value = 0;
                }
            } else if (ParserTree[ParserTree[root].child[1]].name == "<") {
                if (ParserTree[ParserTree[root].child[0]].value
                    > ParserTree[ParserTree[root].child[2]].value) {
                    ParserTree[root].value = 1;
                } else {
                    ParserTree[root].value = 0;
                }
            }

            break;
        }
        case 13:
        {  //boolop -> <
            ParserTree[root].name = "<";
            break;
        }
        case 14:
        {  //boolop -> >
            ParserTree[root].name = ">";
            break;
        }
        case 15:
        {  //boolop -> <=
            ParserTree[root].name = "<=";
            break;
        }
        case 16:
        {  //boolop -> >=
            ParserTree[root].name = ">=";
            break;
        }
        case 17:
        {  //boolop -> ==
            ParserTree[root].name = "==";
            break;
        }
        case 18:    //arithexpr -> multexpre arithexprprime
        {
            CalculateParserTree(ParserTree[root].child[0]);
            CalculateParserTree(ParserTree[root].child[1]);
            if (ParserTree[ParserTree[root].child[1]].fomular + 1 == 21) {
                ParserTree[root].value = ParserTree[ParserTree[root].child[0]].value;
            } else {
                ParserTree[root].value = ParserTree[ParserTree[root].child[0]].value
                                         + ParserTree[ParserTree[root].child[1]].value;
            }
            break;
        }
        case 19:    //arithexprprime -> + multexpr arithexprprime
        {
            CalculateParserTree(ParserTree[root].child[1]);
            CalculateParserTree(ParserTree[root].child[2]);
            if (ParserTree[ParserTree[root].child[2]].fomular + 1 == 21) {
                ParserTree[root].value = ParserTree[ParserTree[root].child[1]].value;
            } else {
                ParserTree[root].value = ParserTree[ParserTree[root].child[1]].value
                                         + ParserTree[ParserTree[root].child[2]].value;
            }
            break;
        }
        case 20:    //arithexprprime -> - multexpr arithexprprime
        {
            CalculateParserTree(ParserTree[root].child[1]);
            CalculateParserTree(ParserTree[root].child[2]);
            if (ParserTree[ParserTree[root].child[2]].fomular + 1 == 21) {
                ParserTree[root].value = -ParserTree[ParserTree[root].child[1]].value;
            } else {
                ParserTree[root].value = -ParserTree[ParserTree[root].child[1]].value
                                         + ParserTree[ParserTree[root].child[2]].value;
            }
            break;
        }
        case 21:    //arithexprprime -> ε
        {
            break;
        }
        case 22:    //multexpr -> simpleexpr multexprprime
        {
            CalculateParserTree(ParserTree[root].child[0]);
            CalculateParserTree(ParserTree[root].child[1]);

            if (ParserTree[ParserTree[root].child[1]].fomular + 1 == 25) {
                ParserTree[root].value = ParserTree[ParserTree[root].child[0]].value;
            } else {
                ParserTree[root].value = ParserTree[ParserTree[root].child[0]].value
                                         * ParserTree[ParserTree[root].child[1]].value;
            }
            break;
        }
        case 23:    //multexprprime -> * simpleexpr multexprprime
        {
            CalculateParserTree(ParserTree[root].child[1]);
            CalculateParserTree(ParserTree[root].child[2]);
            if (ParserTree[ParserTree[root].child[2]].fomular + 1 == 25) {

                ParserTree[root].value = ParserTree[ParserTree[root].child[1]].value;
            } else {
                ParserTree[root].value = ParserTree[ParserTree[root].child[1]].value
                                         * ParserTree[ParserTree[root].child[2]].value;
            }
            break;
        }
        case 24:    //multexprprime -> / simpleexpr multexprprime
        {
            CalculateParserTree(ParserTree[root].child[1]);
            CalculateParserTree(ParserTree[root].child[2]);
            if (ParserTree[ParserTree[root].child[1]].value == 0) {
                PrintErrorView("Cannot be divided by 0", oldtk.linenumber, oldtk.lineposition);
                SemanticHaveError = true;
                ParserTree[ParserTree[root].child[1]].value = 1;
            }
            if (ParserTree[ParserTree[root].child[2]].fomular + 1 == 25) {

                ParserTree[root].value = 1 / ParserTree[ParserTree[root].child[1]].value;
            } else {
                ParserTree[root].value = 1 / ParserTree[ParserTree[root].child[1]].value
                                         * ParserTree[ParserTree[root].child[2]].value;
            }
            break;
        }
        case 25:    //multexprprime -> ε
        {
            break;
        }
        case 28:    //simpleexpr -> ( arithexpr )
        {
            CalculateParserTree(ParserTree[root].child[1]);
            ParserTree[root].value = ParserTree[ParserTree[root].child[1]].value;
            break;
        }

    }
    return;
}

function CalculateThreeAddress(root) {
    EndIsEmpty = false;
    var fomular = ParserTree[root].fomular + 1;
}
function PrintErrorView(s, r, c) {

}