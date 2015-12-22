/**
 * Created by Doma on 15/12/22.
 */


//
//function _padString(str, len) {
//    while (str.length < len) {
//        str += " ";
//    }
//    return str;
//}
//
//function _padStringS(str, len) {
//    return str + Array(len - str.length + 1).join(" ");
//}
//function _padStringSS(str, len) {
//    return "        ".replace(RegExp("^[ ]{" + str.length + "}"), str);
//}
//
////function _padStringR(str, len) {
////    const ten = "          ";
////    const five = "     ";
////    const one = " ";
////    while (str.length < len) {
////        str += " ";
////    }
////    return str;
////}
//function _padStringR(str, len) {
//    var arr = [];
//    for (var i = 0, l = len - str; i < l; i++) {
//        arr[arr.length] = "";
//    }
//    return str + arr.join(" ");
//}
//
//function _padStringRS(str, len) {
//    var arr = [];
//    for (var i = 0, l = len - str; i < l; i++) {
//        arr[arr.length] = " ";
//    }
//    return str + arr.join("");
//}
//
//function edoubling2(count, ch) {
//    if (count == 0) {
//        return "";
//    }
//    var count2 = count / 2;
//    var txt = ch;
//    while (txt.length <= count2) {
//        txt += txt;
//    }
//    return txt + txt.substring(0, count - txt.length);
//}
//
//function nreps(s, n) {
//    var o = '';
//    if (n < 1) return o;
//    while (n > 1) {
//        if (n & 1) o += s;
//        n >>= 1;
//        s += s;
//    }
//    return o + s;
//}
//
//function repeatStr(orig, count) {
//    var str = '' + orig;
//    count = +count;
//    if (count != count) {
//        count = 0;
//    }
//    count = Math.floor(count);
//    if (str.length == 0 || count == 0) {
//        return '';
//    }
//    // Ensuring count is a 31-bit integer allows us to heavily optimize the
//    // main part. But anyway, most current (August 2014) browsers can't handle
//    // strings 1 << 28 chars or longer, so:
//    if (str.length * count >= 1 << 28) {
//        throw new RangeError('repeat count must not overflow maximum string size');
//    }
//    var rpt = '';
//    for (; ;) {
//        if ((count & 1) == 1) {
//            rpt += str;
//        }
//        count >>>= 1;
//        if (count == 0) {
//            break;
//        }
//        str += str;
//    }
//    return rpt;
//}
//
//console.log("for: " + Benchmark.test(_padString, 10000, window, "Doma", 1000));
////console.log("join: " + Benchmark.test(_padStringS, 10000, window, "Doma", 1000));
////console.log("reg: " + Benchmark.test(_padStringSS, 10000, window, "Doma", 1000));
//console.log("joinR: " + Benchmark.test(_padStringR, 10000, window, "Doma", 1000));
//console.log("joinRS: " + Benchmark.test(_padStringRS, 10000, window, "Doma", 1000));
//console.log("edoubling2: " + Benchmark.test(edoubling2, 10000, window, 1000, " "));
//
//console.log("nreps: " + Benchmark.test(nreps, 10000, window, " ", 1000));
//
//console.log("repeat: " + Benchmark.test(repeatStr, 10000, window, " ", 1000));
function nreps(s, n) {
    var o = '';
    if (n < 1) return o;
    while (n > 1) {
        if (n & 1) o += s;
        n >>= 1;
        s += s;
    }
    return o + s;
}

function _padStringRS(len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr[arr.length] = " ";
    }
    return arr.join("");
}

if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (;;) {
            if ((count & 1) == 1) {
                rpt += str;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            str += str;
        }
        return rpt;
    }
}

var n = 10000;
var length = 10000;
console.time('repeat');
for (var i = 0; i < n; i++) {
    ' '.repeat(length);
}
console.timeEnd('repeat');

console.time('nreps');
for (var i = 0; i < n; i++) {
    nreps(' ', length);
}
console.timeEnd('nreps');

console.time('padStringRS');
for (var i = 0; i < n; i++) {
    _padStringRS(length);
}
console.timeEnd('padStringRS');
