/**
 * Created by Doma on 15/12/19.
 */
var Benchmark = (function () {
    var marks = {};
    var _mark = function (name) {
            marks[name] = window.performance ? window.performance.now() : (new Date()).getTime();
        },
        _measure = function (name) {
            var now = window.performance ? window.performance.now() : (new Date()).getTime();
            return now - marks[name];
        },
        _test = function (func, repeat, self) {
            _mark("test");
            for (var i = 0; i < repeat; i++) {
                func.apply(self || this, Array.prototype.slice.call(arguments, 3));
            }
            var result = _measure("test");
            _clear("test");
            return result;
        },
        _clear = function (name) {
            delete marks[name];
        };
    return {
        mark: _mark,
        measure: _measure,
        test: _test,
        clear: _clear
    };
})();