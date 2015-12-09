/**
 * Created by Doma on 15/12/3.
 */

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
    {
        mod(require("../../lib/codemirror"));
    } else if (typeof define == "function" && define.amd) // AMD
    {
        define(["../../lib/codemirror"], mod);
    } else // Plain browser env
    {
        mod(CodeMirror);
    }
})(function(CodeMirror) {
    "use strict";

    CodeMirror.defineMode("toy", function(config, parserConfig) {
        var indentUnit = config.indentUnit;
        var wordReg = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
        var keywordReg = /\b(int|real|if|else|then|while)\b/;

        var intReg = /^[0-9]+$/;
        var realReg = /^([0-9]+(E|e)?[0-9]+)|([0-9]+\.[0-9]+)|([0-9]+\.[0-9]+(E|e)(\+|\-)?[0-9]+)$/;
        var numReg = /^\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+$/;
        var operatorReg = /^(\+|\-|\*|\/|>=?|<=?|==?)$/;

        function tokenize(stream, state) {
            var char = stream.next();
            if (state.indentEnter) {
                if (char == "}") {
                    state.indentLevel = Math.max(0, state.indentLevel - 1);
                }
                state.indentEnter = false;
            }
            if (operatorReg.test(char)) {
                stream.eatWhile(/^[*+\-<>!=]/);
                return "operator";
            }
            else if (/\d/.test(char)) {
                stream.match(/^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/);
                return "number";
            } else if (wordReg.test(char)) {
                stream.eatWhile(wordReg);
                if (keywordReg.test(stream.current())) {
                    return "keyword";
                } else {
                    return "variable";
                }
            }
            return null;
        }
        return {
            startState: function() {
                return {
                    indentLevel: 0,
                    indentEnter: false,
                    indentExit: false,
                };
            },
            token:      function(stream, state) {
                if (stream.sol()) {
                    state.indentEnter = state.indentExit = false;
                }
                if (stream.eatSpace()) {
                    return null;
                }
                var style = tokenize(stream, state);
                if (["{", "then", "else"].has(stream.current()) && !state.indentEnter) {
                    state.indentEnter = true;
                    state.indentLevel++;
                }
                return style;
            },
            indent:     function(state, textAfter) {
                var ch = textAfter && textAfter.charAt(0);
                if (ch == "}") {
                    state.indentLevel = Math.max(0, state.indentLevel - 1);
                }
                return state.indentLevel * indentUnit;
            },
            electricInput: /^\s*(?:\{|})$/
        };
    });
});