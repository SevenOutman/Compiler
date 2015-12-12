/**
 * Created by Doma on 15/12/13.
 */

(function(window) {
    var _members   = [],
        _subscribe = function(obj, type, act) {
            if ("function" === typeof act) {
                var mem = null;
                for (var i = 0; i < _members.length; i++) {
                    if (_members[i].target === obj) {
                        mem = _members[i];
                        break;
                    }
                }
                if (mem === null) {
                    mem = {
                        target: obj,
                        subs:   {}
                    };
                    _members.push(mem);
                }
                mem.subs[type] = mem.subs[type] || [];
                mem.subs[type].push(act.bind(obj));
            }
        },
        _publish   = function(obj, type) {
            for (var i = 0; i < _members.length; i++) {
                var mem = _members[i];
                if (mem.target === obj) {
                    if (mem.subs[type] && mem.subs[type] instanceof Array) {
                        for (var j = 0; j < mem.subs[type].length; j++) {
                            mem.subs[type][j]();
                        }
                    }
                }
            }
        };

    window.Sub = function(obj) {
        return {
            to: function(type, act) {
                _subscribe(obj, type, act);
            }
        }
    };
    window.Pub = function(type) {
        return {
            on: function(obj) {
                _publish(obj, type);
            }
        }
    };
})(window);