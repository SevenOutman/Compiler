/**
 * Created by Doma on 15/12/17.
 */
(function (window) {
    var _topics = {},
        _publish = function () {
            if (arguments.length > 0) {
                var type = arguments[0],
                    args = arguments.slice(1);
                if (_topics[type]) {
                    for (var i = 0; i < _topics[type].length; i++) {
                        console.log(_topics[type][i])
                        setTimeout(_topics[type][i].bind(this, args), 0);
                    }
                }
            }
        },
        _subscribe = function (type, act) {
            if (typeof act === typeof function () {
                }) {

                if (!_topics[type]) {
                    _topics[type] = [];
                }
                _topics[type].push(act);
            }
        };

    window.P = function (type, args) {
        _publish(type, args);
        return {
            p: P
        };
    };

    window.S = function (type, act) {
        _subscribe(type, act);
        return {
            s: S
        };
    };
})(window);