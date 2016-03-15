/**
 * Created by Doma on 15/11/27.
 */

const Pattern = {
    keyword: /^(int|real|if|then|else|while)$/,
    identifier: /^[a-zA-Z][a-zA-Z0-9]*$/,
    operator:   /^(\+|\-|\*|\/|>=?|<=?|==?)$/,
    delimiter:  /^(\(|\)|\{|}|;|\$)$/,
    numberInt: /^[0-9]+$/,
    numberReal: /^([0-9]+(E|e)?[0-9]+)|([0-9]+\.[0-9]+)|([0-9]+\.[0-9]+(E|e)(\+|\-)?[0-9]+)$/
};

function LexicalError(desc, token) {
    this.description = desc;
    this.token = token;
}
LexicalError.prototype.toString = function () {
    return this.description + ": " + this.token.name + " at " + this.token.position.toString();
};

function LexicalAnalyzer() {
    var _errors = [];

    function _preprocess(code) {
        var findOperatorReg = /(\+|\-|\*|\/|!=|>=?|<=?|==?)/g,
            findDelimiterReg = /(\(|\)|\{|}|;|\$)/g;
        return code
            .replace(findOperatorReg, " $1 ")
            .replace(findDelimiterReg, " $1 ")
            .replace(/[ ]+/g, " ")
            .trim() + "\n$ ";
    }

    function _analyze(word, line, column) {

        var token = new Token(word, TokenType.ID, new TokenPosition(line, column)),
            res = word;

        if (Pattern.keyword.test(word)) {
            token.type = TokenType.Keyword;
        } else if (Pattern.operator.test(word)) {
            token.type = TokenType.Operator;
        } else if (Pattern.delimiter.test(word)) {
            token.type = TokenType.Delimiter;
        } else if (Pattern.numberInt.test(word) || Pattern.numberReal.test(word)) {
            token.type = TokenType.NUM;
            if (Pattern.numberInt.test(word)) {
                token.value = parseInt(word)
            } else {
                token.value = parseFloat(word);
            }
            res = "NUM";
        } else {    //gonna be identifier
            //token.type = TokenType.ID; already
            if (!Pattern.identifier.test(word)) {  //invalid identifier
                throw new LexicalError("Invalid identifier", token);
            }
            res = "ID";
        }

        SymbolTable.pushToken(token);

        return res;
    }

    function _displayErrors() {
        [].forEach.call(_errors, function(error) {
            console.error(error.toString());
        });
    }

    this.run = function(code) {
        var _code = _preprocess(code),
            _line = 1,
            _column = 1;
        var buffer = "",
            wordLine = 1,
            wordColumn = 1,
            processed = "";

        SymbolTable.clear();

        for (var i = 0; i < _code.length; i++) {

            var char = _code[i];

            if (!(char == " " || char == "\n")) {   //building words

                buffer += char;
                _column++;

            } else {

                var word = buffer;
                buffer = "";

                try {
                    processed += _analyze(word, wordLine, wordColumn);
                } catch (error) {
                    _errors.push(error);
                } finally {
                    if (char == " ") {
                        _column++;
                    } else if (char == "\n") {
                        _line++;
                        _column = 1;
                    }

                    wordLine = _line;
                    wordColumn = _column;
                }

                processed += " ";

            }
        }

        //SymbolTable.pushToken(Token.$);
        console.log(SymbolTable.all());

        return processed.replace(/[ ]+/g, " ").trim();
        //_displayErrors();
    };
}