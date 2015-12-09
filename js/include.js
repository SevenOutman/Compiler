/**
 * Created by Doma on 15/11/27.
 */


Array.prototype.has = function(element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
            return true;
        }
    }
    return false;
};

Array.prototype.rear = function() {
    return this[this.length - 1];
};

Array.prototype.front = function() {
    return this[0];
};

Object.prototype.clone = function () {
    var o = this instanceof Array ? [] : {};
    for (var prop in this) {
        var val = this[prop];
        if (typeof {} === typeof val && null !== val) {
            o[prop] = arguments.callee.apply(val);
        } else {
            o[prop] = val;
        }
    }
    return o;
};

//var _safe = function(V) {
//    var v = V;
//    return function(V) {
//        return v = undefined !== V ? V : v;
//    }
//};

var _ = function (_) {
    var _ = _;
    return function(__) {
        return _ = undefined !== __ ? __ : _;
    }
}