/**
 * Created by Doma on 15/11/27.
 */
const Invalid = undefined;

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

Array.prototype.remove = function (elem) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === elem) {
            this.splice(i, 1);
        }
    }
};


Math.mid = function(x, y, z) {
    if (arguments.length != 3) {
        throw new Error("Math.mid requires exactly 3 arguments.");
    }
    return [x, y, z].sort(function(a, b) {
        return a - b;
    })[1];
};

function _randomString(len) {
    var result = "";
    while (result.length < len) {
        var letter = Math.floor(Math.random() * 26),
            ca     = Math.random() < 0.5 ? 0 : 1;
        result += String.fromCharCode(65 + letter + ca * 32)
    }
    return result;
}

var _safe = function(V) {
    var v = V;
    return function(V) {
        return v = undefined !== V ? V : v;
    }
};