/**
 * Created by Doma on 15/12/8.
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

    CodeMirror.defineMode("console", function(config, parserConfig) {

        var TOKEN_NAMES = {
            '+': 'positive',
            '-': 'negative',
            ':': 'comment'
        };

        return {
            startState: function () {
                return {
                    ctx: TOKEN_NAMES[":"]
                }
            },
            token: function(stream, state) {
                var tw_pos = stream.string.search(/[\t ]+?$/);

                if (!stream.sol() || tw_pos === 0) {
                    stream.skipToEnd();
                    return state.ctx;
                    //return ("error " + (
                    //TOKEN_NAMES[stream.string.charAt(0)] || '')).replace(/ $/, '');
                }

                var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();

                if (tw_pos === -1) {
                    stream.skipToEnd();
                } else {
                    stream.pos = tw_pos;
                }

                var type = state.ctx = token_name || state.ctx;
                return type;
            }
        }
    });
});