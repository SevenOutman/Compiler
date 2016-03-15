/**
 * Created by Doma on 15/11/27.
 */
const Invalid = undefined;

Array.prototype.has = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
            return true;
        }
    }
    return false;
};

Array.prototype.rear = function () {
    return this[this.length - 1];
};

Array.prototype.front = function () {
    return this[0];
};

Array.prototype.remove = function (elem) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === elem) {
            return this.splice(i, 1);
        }
    }
};
if (!String.prototype.repeat) {
    String.prototype.repeat = function (n) {
        "use strict";
        var o = '', s = this;
        if (n < 1) return o;
        while (n > 1) {
            if (n & 1) o += s;
            n >>= 1;
            s += s;
        }
        return o + s;
    };
}


Math.mid = function (x, y, z) {
    if (arguments.length != 3) {
        throw new Error("Math.mid requires exactly 3 arguments.");
    }
    return [x, y, z].sort(function (a, b) {
        return a - b;
    })[1];
};

var _randomString = function (len) {
    if (len > 5) {
        return _randomString(len - 5) + _randomString(5);
    }
    var result = "",
        l = Math.pow(64, len),
        r = Math.floor(Math.random() * l),
        m = 51 / 63,
        mod,
        letter;
    while (result.length < len) {
        mod = r % 64;
        letter = Math.floor(mod * m);
        r = (r - mod) / 64;
        result += String.fromCharCode(65 + (letter > 25 ? letter + 6 : letter));
    }
    return result;
};
function extend(a, b) {
    for (var i in b) {
        if (b.hasOwnProperty(i)) {
            a[i] = b[i];
        }
    }
    return a;
}
function $defined(a) {
    return undefined !== a;
}