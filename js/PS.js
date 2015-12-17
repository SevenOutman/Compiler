/**
 * Created by Doma on 15/12/17.
 */
(function (window) {
    var _topics = {},
        _publish = function (type, args) {
            if (_topics[type]) {
                for (var i = 0; i < _topics[type].length; i++) {
                    _topics[type][i](args);
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