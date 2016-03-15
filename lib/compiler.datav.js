
Array.prototype.map||(Array.prototype.map=function(w,G){var h,r,t;if(null==this)throw new TypeError(" this is null or not defined");var B=Object(this),y=B.length>>>0;if("[object Function]"!={}.toString.call(w))throw new TypeError(w+" is not a function");G&&(h=G);r=Array(y);for(t=0;t<y;){var P;t in B&&(P=B[t],P=w.call(h,P,t,B),r[t]=P);t++}return r});
Array.prototype.reduce||(Array.prototype.reduce=function(w){var G=0,h=this.length>>0,r;if(typeof w!=="function")throw new TypeError("First argument is not callable");if(arguments.length<2){if(h===0)throw new TypeError("Array length is 0 and no second argument");r=this[0];G=1}else r=arguments[1];for(;G<h;){G in this&&(r=w.call(void 0,r,this[G],G,this));++G}return r});
Array.prototype.forEach||(Array.prototype.forEach=function(w,G){var h,r;if(this==null)throw new TypeError(" this is null or not defined");var t=Object(this),B=t.length>>>0;if({}.toString.call(w)!="[object Function]")throw new TypeError(w+" is not a function");G&&(h=G);for(r=0;r<B;){var y;if(r in t){y=t[r];w.call(h,y,r,t)}r++}});
Array.prototype.filter||(Array.prototype.filter=function(w,G){if(this==null)throw new TypeError;var h=Object(this),r=h.length>>>0;if(typeof w!="function")throw new TypeError;for(var t=[],B=0;B<r;B++)if(B in h){var y=h[B];w.call(G,y,B,h)&&t.push(y)}return t});Array.prototype.every||(Array.prototype.every=function(w,G){if(this==null)throw new TypeError;var h=Object(this),r=h.length>>>0;if(typeof w!="function")throw new TypeError;for(var t=0;t<r;t++)if(t in h&&!w.call(G,h[t],t,h))return false;return true});
var JSON;JSON||(JSON={});
(function(){function w(h){return h<10?"0"+h:h}function G(h){t.lastIndex=0;return t.test(h)?'"'+h.replace(t,function(h){var r=P[h];return typeof r==="string"?r:"\\u"+("0000"+h.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+h+'"'}function h(r,t){var K,w,W,da,P=B,L,E=t[r];E&&(typeof E==="object"&&typeof E.toJSON==="function")&&(E=E.toJSON(r));typeof M==="function"&&(E=M.call(t,r,E));switch(typeof E){case "string":return G(E);case "number":return isFinite(E)?String(E):"null";case "boolean":case "null":return String(E);
    case "object":if(!E)return"null";B=B+y;L=[];if(Object.prototype.toString.apply(E)==="[object Array]"){da=E.length;for(K=0;K<da;K=K+1)L[K]=h(K,E)||"null";W=L.length===0?"[]":B?"[\n"+B+L.join(",\n"+B)+"\n"+P+"]":"["+L.join(",")+"]";B=P;return W}if(M&&typeof M==="object"){da=M.length;for(K=0;K<da;K=K+1)if(typeof M[K]==="string"){w=M[K];(W=h(w,E))&&L.push(G(w)+(B?": ":":")+W)}}else for(w in E)if(Object.prototype.hasOwnProperty.call(E,w))(W=h(w,E))&&L.push(G(w)+(B?": ":":")+W);W=L.length===0?"{}":B?"{\n"+
    B+L.join(",\n"+B)+"\n"+P+"}":"{"+L.join(",")+"}";B=P;return W}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+w(this.getUTCMonth()+1)+"-"+w(this.getUTCDate())+"T"+w(this.getUTCHours())+":"+w(this.getUTCMinutes())+":"+w(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var r=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    t=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,B,y,P={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},M;if(typeof JSON.stringify!=="function")JSON.stringify=function(r,t,w){var G;y=B="";if(typeof w==="number")for(G=0;G<w;G=G+1)y=y+" ";else typeof w==="string"&&(y=w);if((M=t)&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number"))throw Error("JSON.stringify");return h("",{"":r})};
    if(typeof JSON.parse!=="function")JSON.parse=function(h,t){function w(h,r){var B,y,E=h[r];if(E&&typeof E==="object")for(B in E)if(Object.prototype.hasOwnProperty.call(E,B)){y=w(E,B);y!==void 0?E[B]=y:delete E[B]}return t.call(h,r,E)}var B,h=String(h);r.lastIndex=0;r.test(h)&&(h=h.replace(r,function(h){return"\\u"+("0000"+h.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(h.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){B=eval("("+h+")");return typeof t==="function"?w({"":B},""):B}throw new SyntaxError("JSON.parse");}})();
(function(){function w(a){for(var c=-1,e=a.length,g=[];++c<e;)g.push(a[c]);return g}function G(){return this}function h(a,c,e){return function(){var g=e.apply(c,arguments);return arguments.length?a:g}}function r(a){return a!=null&&!isNaN(a)}function t(a){return a.length}function B(a){return a==null}function y(a){return a.replace(/(^\s+)|(\s+$)/g,"").replace(/\s+/g," ")}function P(){}function M(a){function c(){for(var c=e,g=-1,v=c.length,D;++g<v;)(D=c[g].on)&&D.apply(this,arguments);return a}var e=
    [],g={};c.on=function(c,l){var v,D;if(arguments.length<2)return(v=g[c])&&v.on;if(v=g[c]){v.on=null;e=e.slice(0,D=e.indexOf(v)).concat(e.slice(D+1));delete g[c]}l&&e.push(g[c]={on:l});return a};return c}function ja(a,c){return c-(a?1+Math.floor(Math.log(a+Math.pow(10,1+Math.floor(Math.log(a)/Math.LN10)-c))/Math.LN10):1)}function $(a){return a+""}function K(a){for(var c=a.lastIndexOf("."),e=c>=0?a.substring(c):(c=a.length,""),g=[];c>0;)g.push(a.substring(c=c-3,c+3));return g.reverse().join(",")+e}function aa(a){return function(c){return 1-
    a(1-c)}}function W(a){return function(c){return 0.5*(c<0.5?a(2*c):2-a(2-2*c))}}function da(a){return a}function Da(a){return function(c){return Math.pow(c,a)}}function L(a){return 1-Math.cos(a*Math.PI/2)}function E(a){return Math.pow(2,10*(a-1))}function ka(a){return 1-Math.sqrt(1-a*a)}function Wa(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a=a-1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a=a-2.25/2.75)*a+0.9375:7.5625*(a=a-2.625/2.75)*a+0.984375}function ba(){d3.event.stopPropagation();d3.event.preventDefault()}
    function va(a,c){c=c-(a=+a)?1/(c-a):0;return function(e){return(e-a)*c}}function Xa(a,c){c=c-(a=+a)?1/(c-a):0;return function(e){return Math.max(0,Math.min(1,(e-a)*c))}}function ea(a,c,e){return new Y(a,c,e)}function Y(a,c,e){this.r=a;this.g=c;this.b=e}function fa(a){return a<16?"0"+Math.max(0,a).toString(16):Math.min(255,a).toString(16)}function Ea(a,c,e){var g=0,i=0,l=0,v,D;if(v=/([a-z]+)\((.*)\)/i.exec(a)){D=v[2].split(",");switch(v[1]){case "hsl":return e(parseFloat(D[0]),parseFloat(D[1])/100,
        parseFloat(D[2])/100);case "rgb":return c(wa(D[0]),wa(D[1]),wa(D[2]))}}if(e=Ya[a])return c(e.r,e.g,e.b);if(a!=null&&a.charAt(0)==="#"){if(a.length===4){g=a.charAt(1);g=g+g;i=a.charAt(2);i=i+i;l=a.charAt(3);l=l+l}else if(a.length===7){g=a.substring(1,3);i=a.substring(3,5);l=a.substring(5,7)}g=parseInt(g,16);i=parseInt(i,16);l=parseInt(l,16)}return c(g,i,l)}function Fa(a,c,e){var g=Math.min(a=a/255,c=c/255,e=e/255),i=Math.max(a,c,e),l=i-g,v=(i+g)/2;if(l){g=v<0.5?l/(i+g):l/(2-i-g);a=(a==i?(c-e)/l+(c<
        e?6:0):c==i?(e-a)/l+2:(a-c)/l+4)*60}else g=a=0;return ga(a,g,v)}function wa(a){var c=parseFloat(a);return a.charAt(a.length-1)==="%"?Math.round(c*2.55):c}function ga(a,c,e){return new J(a,c,e)}function J(a,c,e){this.h=a;this.s=c;this.l=e}function ra(a,c,e){function g(a){a>360?a=a-360:a<0&&(a=a+360);return a<60?i+(l-i)*a/60:a<180?l:a<240?i+(l-i)*(240-a)/60:i}var i,l,a=a%360;a<0&&(a=a+360);c=c<0?0:c>1?1:c;e=e<0?0:e>1?1:e;l=e<=0.5?e*(1+c):e+c-e*c;i=2*e-l;return ea(Math.round(g(a+120)*255),Math.round(g(a)*
        255),Math.round(g(a-120)*255))}function Q(a){vb(a,I);return a}function la(a){return function(){return ib(a,this)}}function sa(a){return function(){return Pb(a,this)}}function ta(a,c){function e(){if(c=this.classList)return c.add(a);var c=this.className,e=c.baseVal!=null,g=e?c.baseVal:c;l.lastIndex=0;if(!l.test(g)){g=y(g+" "+a);e?c.baseVal=g:this.className=g}}function g(){if(c=this.classList)return c.remove(a);var c=this.className,e=c.baseVal!=null,g=e?c.baseVal:c,g=y(g.replace(l," "));e?c.baseVal=
        g:this.className=g}function i(){(c.apply(this,arguments)?e:g).call(this)}var l=RegExp("(^|\\s+)"+d3.requote(a)+"(\\s+|$)","g");if(arguments.length<2){var v=this.node();if(D=v.classList)return D.contains(a);var D=v.className;l.lastIndex=0;return l.test(D.baseVal!=null?D.baseVal:D)}return this.each(typeof c==="function"?i:c?e:g)}function xa(a){if(!arguments.length)a=d3.ascending;return function(c,e){return a(c&&c.__data__,e&&e.__data__)}}function ya(a,c,e){vb(a,Z);var g={},i=d3.dispatch("start","end"),
        l=oc;a.id=c;a.time=e;a.tween=function(c,e){if(arguments.length<2)return g[c];e==null?delete g[c]:g[c]=e;return a};a.ease=function(c){if(!arguments.length)return l;l=typeof c==="function"?c:d3.ease.apply(d3,arguments);return a};a.each=function(c,e){if(arguments.length<2)return p.call(a,c);i.on(c,e);return a};d3.timer(function(v){a.each(function(D,b,k){function f(a){if(S.active>c)return n();S.active=c;for(var l in g)(l=g[l].call(q,D,b))&&m.push(l);i.start.call(q,D,b);j(a)||d3.timer(j,0,e);return 1}
        function j(a){if(S.active!==c)return n();for(var a=(a-C)/p,e=l(a),g=m.length;g>0;)m[--g].call(q,e);if(a>=1){n();Oa=c;i.end.call(q,D,b);Oa=0;return 1}}function n(){--S.count||delete q.__transition__;return 1}var m=[],q=this,C=a[k][b].delay,p=a[k][b].duration,S=q.__transition__||(q.__transition__={active:0,count:0});++S.count;C<=v?f(v):d3.timer(f,C,e)});return 1},0,e);return a}function Za(a,c,e){return e!=""&&$a}function b(a,c){function e(a,e,g){a=c.call(this,a,e);return a==null?g!=""&&$a:g!=a&&i(g,
        a)}function g(a,e,g){return g!=c&&i(g,c)}var i=a=="transform"?d3.interpolateTransform:d3.interpolate;return typeof c==="function"?e:c==null?Za:(c=c+"",g)}function p(a){for(var c=0,e=this.length;c<e;c++)for(var g=this[c],i=0,l=g.length;i<l;i++){var v=g[i];if(v)a.call(v=v.node,v.__data__,i,c)}return this}function o(){for(var a,c=Date.now(),e=Ha;e;){a=c-e.then;if(a>=e.delay)e.flush=e.callback(a);e=e.next}a=ha()-c;if(a>24){if(isFinite(a)){clearTimeout(jb);jb=setTimeout(o,a)}kb=0}else{kb=1;Qb(o)}}function ha(){for(var a=
        null,c=Ha,e=Infinity;c;)if(c.flush)c=a?a.next=c.next:Ha=c.next;else{e=Math.min(e,c.then+c.delay);c=(a=c).next}return e}function U(a){var c=[a.a,a.b],e=[a.c,a.d],g=ma(c),i=c[0]*e[0]+c[1]*e[1],l=-i;e[0]=e[0]+l*c[0];e[1]=e[1]+l*c[1];l=ma(e)||0;if(c[0]*e[1]<e[0]*c[1]){c[0]=c[0]*-1;c[1]=c[1]*-1;g=g*-1;i=i*-1}this.rotate=(g?Math.atan2(c[1],c[0]):Math.atan2(-e[0],e[1]))*Rb;this.translate=[a.e,a.f];this.scale=[g,l];this.skew=l?Math.atan2(i,l)*Rb:0}function ma(a){var c=Math.sqrt(a[0]*a[0]+a[1]*a[1]);if(c){a[0]=
        a[0]/c;a[1]=a[1]/c}return c}function za(a){var c=a[0],a=a[a.length-1];return c<a?[c,a]:[a,c]}function Ia(a){return a.rangeExtent?a.rangeExtent():za(a.range())}function Pa(a,c){var e=0,g=a.length-1,i=a[e],l=a[g],v;if(l<i){v=e;e=g;g=v;v=i;i=l;l=v}if(v=l-i){c=c(v);a[e]=c.floor(i);a[g]=c.ceil(l)}return a}function ab(){return Math}function k(a,c,e,g){function i(){var i=a.length==2?n:C,b=g?Xa:va;v=i(a,c,b,e);D=i(c,a,b,d3.interpolate);return l}function l(a){return v(a)}var v,D;l.invert=function(a){return D(a)};
        l.domain=function(c){if(!arguments.length)return a;a=c.map(Number);return i()};l.range=function(a){if(!arguments.length)return c;c=a;return i()};l.rangeRound=function(a){return l.range(a).interpolate(d3.interpolateRound)};l.clamp=function(a){if(!arguments.length)return g;g=a;return i()};l.interpolate=function(a){if(!arguments.length)return e;e=a;return i()};l.ticks=function(c){return d3.range.apply(d3,m(a,c))};l.tickFormat=function(c){return q(a,c)};l.nice=function(){Pa(a,j);return i()};l.copy=function(){return k(a,
            c,e,g)};return i()}function f(a,c){return d3.rebind(a,c,"range","rangeRound","interpolate","clamp")}function j(a){a=Math.pow(10,Math.round(Math.log(a)/Math.LN10)-1);return{floor:function(c){return Math.floor(c/a)*a},ceil:function(c){return Math.ceil(c/a)*a}}}function m(a,c){var e=za(a),g=e[1]-e[0],i=Math.pow(10,Math.floor(Math.log(g/c)/Math.LN10)),g=c/g*i;g<=0.15?i=i*10:g<=0.35?i=i*5:g<=0.75&&(i=i*2);e[0]=Math.ceil(e[0]/i)*i;e[1]=Math.floor(e[1]/i)*i+i*0.5;e[2]=i;return e}function q(a,c){return d3.format(",."+
        Math.max(0,-Math.floor(Math.log(m(a,c)[2])/Math.LN10+0.01))+"f")}function n(a,c,e,g){var i=e(a[0],a[1]),l=g(c[0],c[1]);return function(a){return l(i(a))}}function C(a,c,e,g){var i=[],l=[],v=0,D=a.length-1;if(a[D]<a[0]){a=a.slice().reverse();c=c.slice().reverse()}for(;++v<=D;){i.push(e(a[v-1],a[v]));l.push(g(c[v-1],c[v]))}return function(c){var e=d3.bisect(a,c,1,D)-1;return l[e](i[e](c))}}function S(a,c){function e(e){return a(c(e))}var g=c.pow;e.invert=function(c){return g(a.invert(c))};e.domain=
        function(i){if(!arguments.length)return a.domain().map(g);c=i[0]<0?s:X;g=c.pow;a.domain(i.map(c));return e};e.nice=function(){a.domain(Pa(a.domain(),ab));return e};e.ticks=function(){var e=za(a.domain()),l=[];if(e.every(isFinite)){var v=Math.floor(e[0]),D=Math.ceil(e[1]),b=g(e[0]),e=g(e[1]);if(c===s)for(l.push(g(v));v++<D;)for(var k=9;k>0;k--)l.push(g(v)*k);else{for(;v<D;v++)for(k=1;k<10;k++)l.push(g(v)*k);l.push(g(v))}for(v=0;l[v]<b;v++);for(D=l.length;l[D-1]>e;D--);l=l.slice(v,D)}return l};e.tickFormat=
        function(a,l){arguments.length<2&&(l=pc);if(arguments.length<1)return l;var v=a/e.ticks().length,D=c===s?(b=-1E-12,Math.floor):(b=1E-12,Math.ceil),b;return function(a){return a/g(D(c(a)+b))<v?l(a):""}};e.copy=function(){return S(a.copy(),c)};return f(e,a)}function X(a){return Math.log(a<0?0:a)/Math.LN10}function s(a){return-Math.log(a>0?0:-a)/Math.LN10}function u(a,c){function e(c){return a(g(c))}var g=x(c),i=x(1/c);e.invert=function(c){return i(a.invert(c))};e.domain=function(c){if(!arguments.length)return a.domain().map(i);
        a.domain(c.map(g));return e};e.ticks=function(a){var c=e.domain();return d3.range.apply(d3,m(c,a))};e.tickFormat=function(a){return q(e.domain(),a)};e.nice=function(){return e.domain(Pa(e.domain(),j))};e.exponent=function(a){if(!arguments.length)return c;var v=e.domain();g=x(c=a);i=x(1/c);return e.domain(v)};e.copy=function(){return u(a.copy(),c)};return f(e,a)}function x(a){return function(c){return c<0?-Math.pow(-c,a):Math.pow(c,a)}}function Sb(a,c){function e(c){return l[((i[c]||(i[c]=a.push(c)))-
    1)%l.length]}function g(c,e){return d3.range(a.length).map(function(a){return c+e*a})}var i,l,v;e.domain=function(g){if(!arguments.length)return a;a=[];i={};for(var l=-1,v=g.length,b;++l<v;)if(!i[b=g[l]])i[b]=a.push(b);return e[c.t](c.x,c.p)};e.range=function(a){if(!arguments.length)return l;l=a;v=0;c={t:"range",x:a};return e};e.rangePoints=function(i,b){arguments.length<2&&(b=0);var k=i[0],f=i[1],j=(f-k)/(a.length-1+b);l=g(a.length<2?(k+f)/2:k+j*b/2,j);v=0;c={t:"rangePoints",x:i,p:b};return e};e.rangeBands=
        function(i,b){arguments.length<2&&(b=0);var k=i[0],f=(i[1]-k)/(a.length+b);l=g(k+f*b,f);v=f*(1-b);c={t:"rangeBands",x:i,p:b};return e};e.rangeRoundBands=function(i,b){arguments.length<2&&(b=0);var k=i[0],f=i[1],j=Math.floor((f-k)/(a.length+b));l=g(k+Math.round((f-k-(a.length-b)*j)/2),j);v=Math.round(j*(1-b));c={t:"rangeRoundBands",x:i,p:b};return e};e.rangeBand=function(){return v};e.rangeExtent=function(){return c.t==="range"?za(c.x):c.x};e.copy=function(){return Sb(a,c)};return e.domain(a)}function z(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    c){function e(){var e=0,v=c.length;for(i=[];++e<v;)i[e-1]=d3.quantile(a,e/v);return g}function g(a){return isNaN(a=+a)?NaN:c[d3.bisect(i,a)]}var i;g.domain=function(c){if(!arguments.length)return a;a=c.filter(function(a){return!isNaN(a)}).sort(d3.ascending);return e()};g.range=function(a){if(!arguments.length)return c;c=a;return e()};g.quantiles=function(){return i};g.copy=function(){return z(a,c)};return e()}function F(a,c,e){function g(c){return e[Math.max(0,Math.min(v,Math.floor(l*(c-a))))]}function i(){l=
        e.length/(c-a);v=e.length-1;return g}var l,v;g.domain=function(e){if(!arguments.length)return[a,c];a=+e[0];c=+e[e.length-1];return i()};g.range=function(a){if(!arguments.length)return e;e=a;return i()};g.copy=function(){return F(a,c,e)};return i()}function A(a){return a.innerRadius}function H(a){return a.outerRadius}function na(a){return a.startAngle}function R(a){return a.endAngle}function N(a){function c(c){return c.length<1?null:"M"+l(a(ia(this,c,e,g)),v)}var e=Ja,g=V,i="linear",l=wb[i],v=0.7;
        c.x=function(a){if(!arguments.length)return e;e=a;return c};c.y=function(a){if(!arguments.length)return g;g=a;return c};c.interpolate=function(a){if(!arguments.length)return i;l=wb[i=a];return c};c.tension=function(a){if(!arguments.length)return v;v=a;return c};return c}function ia(a,c,e,g){var i=[],l=-1,v=c.length,b=typeof e==="function",k=typeof g==="function",f;if(b&&k)for(;++l<v;)i.push([e.call(a,f=c[l],l),g.call(a,f,l)]);else if(b)for(;++l<v;)i.push([e.call(a,c[l],l),g]);else if(k)for(;++l<v;)i.push([e,
        g.call(a,c[l],l)]);else for(;++l<v;)i.push([e,g]);return i}function Ja(a){return a[0]}function V(a){return a[1]}function lb(a){return a<1E-4?Math.round(a*1E4)/1E4:a}function Aa(a){for(var c=0,e=a.length,g=a[0],i=[lb(g[0]),",",lb(g[1])];++c<e;)i.push("L",lb((g=a[c])[0]),",",lb(g[1]));return i.join("")}function xb(a){for(var c=0,e=a.length,g=a[0],i=[g[0],",",g[1]];++c<e;)i.push("V",(g=a[c])[1],"H",g[0]);return i.join("")}function yb(a){for(var c=0,e=a.length,g=a[0],i=[g[0],",",g[1]];++c<e;)i.push("H",
        (g=a[c])[0],"V",g[1]);return i.join("")}function mb(a,c){if(c.length<1||a.length!=c.length&&a.length!=c.length+2)return Aa(a);var e=a.length!=c.length,g="",i=a[0],l=a[1],v=c[0],b=v,k=1;if(e){g=g+("Q"+(l[0]-v[0]*2/3)+","+(l[1]-v[1]*2/3)+","+l[0]+","+l[1]);i=a[1];k=2}if(c.length>1){b=c[1];l=a[k];k++;g=g+("C"+(i[0]+v[0])+","+(i[1]+v[1])+","+(l[0]-b[0])+","+(l[1]-b[1])+","+l[0]+","+l[1]);for(i=2;i<c.length;i++,k++){l=a[k];b=c[i];g=g+("S"+(l[0]-b[0])+","+(l[1]-b[1])+","+l[0]+","+l[1])}}if(e){e=a[k];g=
        g+("Q"+(l[0]+b[0]*2/3)+","+(l[1]+b[1]*2/3)+","+e[0]+","+e[1])}return g}function zb(a,c){for(var e=[],g=(1-c)/2,i,l=a[0],b=a[1],k=1,Ga=a.length;++k<Ga;){i=l;l=b;b=a[k];e.push([g*(b[0]-i[0]),g*(b[1]-i[1])])}return e}function Tb(a){if(a.length<3)return Aa(a);var c=1,e=a.length,g=a[0],i=g[0],l=g[1],b=[i,i,i,(g=a[1])[0]],k=[l,l,l,g[1]],i=[i,",",l];for(bb(i,b,k);++c<e;){g=a[c];b.shift();b.push(g[0]);k.shift();k.push(g[1]);bb(i,b,k)}for(c=-1;++c<2;){b.shift();b.push(g[0]);k.shift();k.push(g[1]);bb(i,b,k)}return i.join("")}
    function oa(a,c){return a[0]*c[0]+a[1]*c[1]+a[2]*c[2]+a[3]*c[3]}function bb(a,c,e){a.push("C",oa(Ub,c),",",oa(Ub,e),",",oa(Vb,c),",",oa(Vb,e),",",oa(Qa,c),",",oa(Qa,e))}function Ab(a,c){return(c[1]-a[1])/(c[0]-a[0])}function Wb(a){for(var c,e=-1,g=a.length,i,l;++e<g;){c=a[e];i=c[0];l=c[1]+Ka;c[0]=i*Math.cos(l);c[1]=i*Math.sin(l)}return a}function Xb(a){function c(c){if(c.length<1)return null;var b=ia(this,c,e,i),c=ia(this,c,e===g?function(a,c){return b[c][0]}:g,i===l?function(a,c){return b[c][1]}:
        l);return"M"+k(a(c),f)+"L"+Ga(a(b.reverse()),f)+"Z"}var e=Ja,g=Ja,i=0,l=V,b,k,Ga,f=0.7;c.x=function(a){if(!arguments.length)return g;e=g=a;return c};c.x0=function(a){if(!arguments.length)return e;e=a;return c};c.x1=function(a){if(!arguments.length)return g;g=a;return c};c.y=function(a){if(!arguments.length)return l;i=l=a;return c};c.y0=function(a){if(!arguments.length)return i;i=a;return c};c.y1=function(a){if(!arguments.length)return l;l=a;return c};c.interpolate=function(a){if(!arguments.length)return b;
        k=wb[b=a];Ga=k.reverse||k;return c};c.tension=function(a){if(!arguments.length)return f;f=a;return c};return c.interpolate("linear")}function Yb(a){return a.source}function Zb(a){return a.target}function qc(a){return a.radius}function $b(a){return[a.x,a.y]}function ac(a,c){var e=(a.ownerSVGElement||a).createSVGPoint();if(Bb<0&&(window.scrollX||window.scrollY)){var g=d3.select(document.body).append("svg").style("position","absolute").style("top",0).style("left",0),i=g[0][0].getScreenCTM();Bb=!(i.f||
    i.e);g.remove()}if(Bb){e.x=c.pageX;e.y=c.pageY}else{e.x=c.clientX;e.y=c.clientY}e=e.matrixTransform(a.getScreenCTM().inverse());return[e.x,e.y]}function rc(){return 64}function sc(){return"circle"}function bc(a,c){a.attr("transform",function(a){return"translate("+c(a)+",0)"})}function cc(a,c){a.attr("transform",function(a){return"translate(0,"+c(a)+")"})}function dc(a,c){a.select(".extent").attr("x",c[0][0]);a.selectAll(".n,.s,.w,.nw,.sw").attr("x",c[0][0]-2);a.selectAll(".e,.ne,.se").attr("x",c[1][0]-
        3);a.selectAll(".extent,.n,.s").attr("width",c[1][0]-c[0][0])}function ec(a,c){a.select(".extent").attr("y",c[0][1]);a.selectAll(".n,.e,.w,.nw,.ne").attr("y",c[0][1]-3);a.selectAll(".s,.se,.sw").attr("y",c[1][1]-4);a.selectAll(".extent,.e,.w").attr("height",c[1][1]-c[0][1])}function tc(){if(d3.event.keyCode==32&&La&&!ua){pa=null;O[0]=O[0]-T[1][0];O[1]=O[1]-T[1][1];ua=2;ba()}}function uc(){if(d3.event.keyCode==32&&ua==2){O[0]=O[0]+T[1][0];O[1]=O[1]+T[1][1];ua=0;ba()}}function Cb(){if(O){var a=d3.svg.mouse(La),
        c=d3.select(La);if(!ua)if(d3.event.altKey){pa||(pa=[(T[0][0]+T[1][0])/2,(T[0][1]+T[1][1])/2]);O[0]=T[+(a[0]<pa[0])][0];O[1]=T[+(a[1]<pa[1])][1]}else pa=null;if(nb){fc(a,nb,0);dc(c,T)}if(ob){fc(a,ob,1);ec(c,T)}cb("brush")}}function fc(a,c,e){var g=Ia(c),c=g[0],i=g[1],g=O[e],l=T[1][e]-T[0][e];if(ua){c=c-g;i=i-(l+g)}a=Math.max(c,Math.min(i,a[e]));if(ua)c=(a=a+g)+l;else{pa&&(g=Math.max(c,Math.min(i,2*pa[e]-a)));if(g<a){c=a;a=g}else c=g}T[0][e]=a;T[1][e]=c}function vc(){if(O){Cb();d3.select(La).selectAll(".resize").style("pointer-events",
        Db.empty()?"none":"all");cb("brushend");Db=cb=La=nb=ob=T=ua=Ra=pa=O=null;ba()}}function Eb(a){var c=gc(),e=d3.event,g=d3.event={type:a};if(c){g.x=c[0]+Ba[0];g.y=c[1]+Ba[1];g.dx=c[0]-Ma[0];g.dy=c[1]-Ma[1];Na=Na|g.dx|g.dy;Ma=c}try{Fb[a].apply(Ca,pb)}finally{d3.event=e}e.stopPropagation();e.preventDefault()}function gc(){var a=Ca.parentNode,c=d3.event.changedTouches;return a&&(c?d3.svg.touches(a,c)[0]:d3.svg.mouse(a))}function hc(){if(Ca){if(!Ca.parentNode)return Gb();Eb("drag");ba()}}function Gb(){if(Ca){Eb("dragend");
        if(Na){ba();Na=d3.event.target===Hb}Fb=Hb=Ca=pb=Ba=Ma=null}}function wc(){if(Na){ba();Na=0}}function qb(a){return[a[0]-ca[0],a[1]-ca[1],ca[2]]}function ic(){for(var a=d3.svg.touches(qa),c=-1,e=a.length,g;++c<e;)db[(g=a[c]).identifier]=qb(g);return a}function xc(){var a=d3.svg.touches(qa);switch(a.length){case 1:a=a[0];Sa(ca[2],a,db[a.identifier]);break;case 2:var c=a[0],e=a[1],a=[(c[0]+e[0])/2,(c[1]+e[1])/2],c=db[c.identifier],e=db[e.identifier],e=[(c[0]+e[0])/2,(c[1]+e[1])/2,c[2]];Sa(Math.log(d3.event.scale)/
        Math.LN2+c[2],a,e)}}function yc(){rb=null;if(eb){Ta=1;Sa(ca[2],d3.svg.mouse(qa),eb)}}function zc(){if(eb){if(Ta){ba();Ta=Ib===d3.event.target}ca=Jb=Kb=Ib=qa=Lb=eb=null}}function Ac(){if(Ta){ba();Ta=0}}function Sa(a,c,e){function g(a,c,e){a.domain(a.range().map(function(g){return a.invert((g-e)*i/l+c)}))}var a=Mb(a,2),i=Math.pow(2,ca[2]),l=Math.pow(2,a),a=Math.pow(2,(ca[2]=a)-e[2]),b=ca[0],k=ca[1],Ga=ca[0]=Mb(c[0]-e[0]*a,0,l),f=ca[1]=Mb(c[1]-e[1]*a,1,l),c=d3.event;d3.event={scale:l,translate:[Ga,f],
        transform:function(a,c){a&&g(a,b,Ga);c&&g(c,k,f)}};try{Kb.apply(qa,Lb)}finally{d3.event=c}c.preventDefault()}function Mb(a,c,e){var g=Jb[c],i=g[0],g=g[1];return arguments.length===3?Math.max(g*(g===Infinity?-Infinity:1/e-1),Math.min(i===-Infinity?Infinity:i,a/e))*e:Math.max(i,Math.min(g,a))}if(!Date.now)Date.now=function(){return+new Date};try{document.createElement("div").style.setProperty("opacity",0,"")}catch(Tc){if(typeof CSSStyleDeclaration!=="undefined"){var jc=CSSStyleDeclaration.prototype,
        Bc=jc.setProperty;jc.setProperty=function(a,c,e){Bc.call(this,a,c+"",e)}}}d3={version:"2.7.4"};var fb=function(a){return Array.prototype.slice.call(a)};try{fb(document.documentElement.childNodes)[0].nodeType}catch(Uc){fb=w}var vb=[].__proto__?function(a,c){a.__proto__=c}:function(a,c){for(var e in c)a[e]=c[e]};d3.functor=function(a){return typeof a==="function"?a:function(){return a}};d3.rebind=function(a,c){for(var e=1,g=arguments.length,i;++e<g;)a[i=arguments[e]]=h(a,c,c[i]);return a};d3.ascending=
        function(a,c){return a<c?-1:a>c?1:a>=c?0:NaN};d3.descending=function(a,c){return c<a?-1:c>a?1:c>=a?0:NaN};d3.mean=function(a,c){var e=a.length,g,i=0,l=-1,b=0;if(arguments.length===1)for(;++l<e;){if(r(g=a[l]))i=i+(g-i)/++b}else for(;++l<e;)if(r(g=c.call(a,a[l],l)))i=i+(g-i)/++b;return b?i:void 0};d3.median=function(a,c){arguments.length>1&&(a=a.map(c));a=a.filter(r);return a.length?d3.quantile(a.sort(d3.ascending),0.5):void 0};d3.min=function(a,c){var e=-1,g=a.length,i,l;if(arguments.length===1){for(;++e<
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 g&&((i=a[e])==null||i!=i);)i=void 0;for(;++e<g;)if((l=a[e])!=null&&i>l)i=l}else{for(;++e<g&&((i=c.call(a,a[e],e))==null||i!=i);)i=void 0;for(;++e<g;)if((l=c.call(a,a[e],e))!=null&&i>l)i=l}return i};d3.max=function(a,c){var e=-1,g=a.length,i,l;if(arguments.length===1){for(;++e<g&&((i=a[e])==null||i!=i);)i=void 0;for(;++e<g;)if((l=a[e])!=null&&l>i)i=l}else{for(;++e<g&&((i=c.call(a,a[e],e))==null||i!=i);)i=void 0;for(;++e<g;)if((l=c.call(a,a[e],e))!=null&&l>i)i=l}return i};d3.extent=function(a,c){var e=
        -1,g=a.length,i,l,b;if(arguments.length===1){for(;++e<g&&((i=b=a[e])==null||i!=i);)i=b=void 0;for(;++e<g;)if((l=a[e])!=null){i>l&&(i=l);b<l&&(b=l)}}else{for(;++e<g&&((i=b=c.call(a,a[e],e))==null||i!=i);)i=void 0;for(;++e<g;)if((l=c.call(a,a[e],e))!=null){i>l&&(i=l);b<l&&(b=l)}}return[i,b]};d3.random={normal:function(a,c){arguments.length<2&&(c=1);arguments.length<1&&(a=0);return function(){var e,g;do{e=Math.random()*2-1;g=Math.random()*2-1;g=e*e+g*g}while(!g||g>1);return a+c*e*Math.sqrt(-2*Math.log(g)/
            g)}}};d3.sum=function(a,c){var e=0,g=a.length,i,l=-1;if(arguments.length===1)for(;++l<g;){if(!isNaN(i=+a[l]))e=e+i}else for(;++l<g;)if(!isNaN(i=+c.call(a,a[l],l)))e=e+i;return e};d3.quantile=function(a,c){var e=(a.length-1)*c+1,g=Math.floor(e),i=a[g-1];return(e=e-g)?i+e*(a[g]-i):i};d3.transpose=function(a){return d3.zip.apply(d3,a)};d3.zip=function(){if(!(i=arguments.length))return[];for(var a=-1,c=d3.min(arguments,t),e=Array(c);++a<c;)for(var g=-1,i,l=e[a]=Array(i);++g<i;)l[g]=arguments[g][a];return e};
    d3.bisectLeft=function(a,c,e,g){arguments.length<3&&(e=0);if(arguments.length<4)g=a.length;for(;e<g;){var i=e+g>>1;a[i]<c?e=i+1:g=i}return e};d3.bisect=d3.bisectRight=function(a,c,e,g){arguments.length<3&&(e=0);if(arguments.length<4)g=a.length;for(;e<g;){var i=e+g>>1;c<a[i]?g=i:e=i+1}return e};d3.first=function(a,c){var e=0,g=a.length,i=a[0],l;if(arguments.length===1)c=d3.ascending;for(;++e<g;)if(c.call(a,i,l=a[e])>0)i=l;return i};d3.last=function(a,c){var e=0,g=a.length,i=a[0],l;if(arguments.length===
        1)c=d3.ascending;for(;++e<g;)if(c.call(a,i,l=a[e])<=0)i=l;return i};d3.nest=function(){function a(c,i){if(i>=g.length)return b?b.call(e,c):l?c.sort(l):c;for(var k=-1,f=c.length,j=g[i++],n,m,q={};++k<f;)(n=j(m=c[k]))in q?q[n].push(m):q[n]=[m];for(n in q)q[n]=a(q[n],i);return q}function c(a,e){if(e>=g.length)return a;var l=[],b=i[e++],k;for(k in a)l.push({key:k,values:c(a[k],e)});b&&l.sort(function(a,c){return b(a.key,c.key)});return l}var e={},g=[],i=[],l,b;e.map=function(c){return a(c,0)};e.entries=
        function(e){return c(a(e,0),0)};e.key=function(a){g.push(a);return e};e.sortKeys=function(a){i[g.length-1]=a;return e};e.sortValues=function(a){l=a;return e};e.rollup=function(a){b=a;return e};return e};d3.keys=function(a){var c=[],e;for(e in a)c.push(e);return c};d3.values=function(a){var c=[],e;for(e in a)c.push(a[e]);return c};d3.entries=function(a){var c=[],e;for(e in a)c.push({key:e,value:a[e]});return c};d3.permute=function(a,c){for(var e=[],g=-1,i=c.length;++g<i;)e[g]=a[c[g]];return e};d3.merge=
        function(a){return Array.prototype.concat.apply([],a)};d3.split=function(a,c){var e=[],g=[],i,l=-1,b=a.length;for(arguments.length<2&&(c=B);++l<b;)if(c.call(g,i=a[l],l))g=[];else{g.length||e.push(g);g.push(i)}return e};d3.range=function(a,c,e){if(arguments.length<3){e=1;if(arguments.length<2){c=a;a=0}}if((c-a)/e==Infinity)throw Error("infinite range");var g=[],i=-1,l;if(e<0)for(;(l=a+e*++i)>c;)g.push(l);else for(;(l=a+e*++i)<c;)g.push(l);return g};d3.requote=function(a){return a.replace(Cc,"\\$&")};
    var Cc=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;d3.round=function(a,c){return c?Math.round(a*(c=Math.pow(10,c)))/c:Math.round(a)};d3.xhr=function(a,c,e){var g;window.XMLHttpRequest?g=new XMLHttpRequest:window.ActiveXObject&&(g=new ActiveXObject("Microsoft.XMLHTTP"));if(arguments.length<3){e=c;c=null}else c&&g.overrideMimeType&&g.overrideMimeType(c);g.open("GET",a,true);c&&g.setRequestHeader("Accept",c);g.onreadystatechange=function(){g.readyState===4&&e(g.status<300?g:null)};g.send(null)};d3.text=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            c,e){if(arguments.length<3){e=c;c=null}d3.xhr(a,c,function(a){e(a&&a.responseText)})};d3.json=function(a,c){d3.text(a,"application/json",function(a){c(a?JSON.parse(a):null)})};d3.html=function(a,c){d3.text(a,"text/html",function(a){if(a!=null){var g=document.createRange();g.selectNode(document.body);a=g.createContextualFragment(a)}c(a)})};d3.xml=function(a,c,e){if(arguments.length<3){e=c;c=null}d3.xhr(a,c,function(a){e(a&&a.responseXML)})};var sb={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",
        xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};d3.ns={prefix:sb,qualify:function(a){var c=a.indexOf(":");return c<0?a in sb?{space:sb[a],local:a}:a:{space:sb[a.substring(0,c)],local:a.substring(c+1)}}};d3.dispatch=function(){for(var a=new P,c=-1,e=arguments.length;++c<e;)a[arguments[c]]=M(a);return a};P.prototype.on=function(a,c){var e=a.indexOf("."),g="";if(e>0){g=a.substring(e+1);a=a.substring(0,e)}return arguments.length<2?
        this[a].on(g):this[a].on(g,c)};d3.format=function(a){var a=Dc.exec(a),c=a[1]||" ",e=a[3]||"",g=a[5],i=+a[6],l=a[7],b=a[8],k=a[9],f=1,j="",n=false;b&&(b=+b.substring(1));if(g){c="0";l&&(i=i-Math.floor((i-1)/4))}switch(k){case "n":l=true;k="g";break;case "%":f=100;j="%";k="f";break;case "p":f=100;j="%";k="r";break;case "d":n=true;b=0;break;case "s":f=-1;k="r"}k=="r"&&!b&&(k="g");k=Ec[k]||$;return function(a){if(n&&a%1)return"";var m=a<0&&(a=-a)?"\u2212":e;if(f<0){var q=d3.formatPrefix(a,b),a=a*q.scale;
        j=q.symbol}else a=a*f;a=k(a,b);if(g){q=a.length+m.length;q<i&&(a=Array(i-q+1).join(c)+a);l&&(a=K(a));a=m+a}else{l&&(a=K(a));a=m+a;q=a.length;q<i&&(a=Array(i-q+1).join(c)+a)}return a+j}};var Dc=/(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,Ec={g:function(a,c){return a.toPrecision(c)},e:function(a,c){return a.toExponential(c)},f:function(a,c){return a.toFixed(c)},r:function(a,c){return d3.round(a,c=ja(a,c)).toFixed(Math.max(0,Math.min(20,c)))}},Fc=["y","z","a","f","p",
        "n","\u03bc","m","","k","M","G","T","P","E","Z","Y"].map(function(a,c){return{scale:Math.pow(10,(8-c)*3),symbol:a}});d3.formatPrefix=function(a,c){var e=0;if(a){a<0&&(a=a*-1);c&&(a=d3.round(a,ja(a,c)));e=1+Math.floor(1E-12+Math.log(a)/Math.LN10);e=Math.max(-24,Math.min(24,Math.floor((e<=0?e+1:e-1)/3)*3))}return Fc[8+e/3]};var Gc=Da(2),Hc=Da(3),Ic={linear:function(){return da},poly:Da,quad:function(){return Gc},cubic:function(){return Hc},sin:function(){return L},exp:function(){return E},circle:function(){return ka},
        elastic:function(a,c){var e;arguments.length<2&&(c=0.45);if(arguments.length<1){a=1;e=c/4}else e=c/(2*Math.PI)*Math.asin(1/a);return function(g){return 1+a*Math.pow(2,10*-g)*Math.sin((g-e)*2*Math.PI/c)}},back:function(a){a||(a=1.70158);return function(c){return c*c*((a+1)*c-a)}},bounce:function(){return Wa}},Jc={"in":function(a){return a},out:aa,"in-out":W,"out-in":function(a){return W(aa(a))}};d3.ease=function(a){var c=a.indexOf("-"),e=c>=0?a.substring(0,c):a,c=c>=0?a.substring(c+1):"in",g=Jc[c](Ic[e].apply(null,
        Array.prototype.slice.call(arguments,1)));return function(a){return a<=0?0:a>=1?1:g(a)}};d3.event=null;d3.interpolate=function(a,c){for(var e=d3.interpolators.length,g;--e>=0&&!(g=d3.interpolators[e](a,c)););return g};d3.interpolateNumber=function(a,c){c=c-a;return function(e){return a+c*e}};d3.interpolateRound=function(a,c){c=c-a;return function(e){return Math.round(a+c*e)}};d3.interpolateString=function(a,c){var e,g,i=0,l=[],b=[],k,f;for(g=tb.lastIndex=0;e=tb.exec(c);++g){e.index&&l.push(c.substring(i,
        e.index));b.push({i:l.length,x:e[0]});l.push(null);i=tb.lastIndex}i<c.length&&l.push(c.substring(i));g=0;for(k=b.length;(e=tb.exec(a))&&g<k;++g){f=b[g];if(f.x==e[0]){if(f.i)if(l[f.i+1]==null){l[f.i-1]=l[f.i-1]+f.x;l.splice(f.i,1);for(e=g+1;e<k;++e)b[e].i--}else{l[f.i-1]=l[f.i-1]+(f.x+l[f.i+1]);l.splice(f.i,2);for(e=g+1;e<k;++e)b[e].i=b[e].i-2}else if(l[f.i+1]==null)l[f.i]=f.x;else{l[f.i]=f.x+l[f.i+1];l.splice(f.i+1,1);for(e=g+1;e<k;++e)b[e].i--}b.splice(g,1);k--;g--}else f.x=d3.interpolateNumber(parseFloat(e[0]),
        parseFloat(f.x))}for(;g<k;){f=b.pop();if(l[f.i+1]==null)l[f.i]=f.x;else{l[f.i]=f.x+l[f.i+1];l.splice(f.i+1,1)}k--}return l.length===1?l[0]==null?b[0].x:function(){return c}:function(a){for(g=0;g<k;++g)l[(f=b[g]).i]=f.x(a);return l.join("")}};d3.interpolateTransform=function(a,c){var e=[],g=[],i,l=d3.transform(a),b=d3.transform(c),k=l.translate,f=b.translate,j=l.rotate,n=b.rotate,m=l.skew,q=b.skew,l=l.scale,b=b.scale;if(k[0]!=f[0]||k[1]!=f[1]){e.push("translate(",null,",",null,")");g.push({i:1,x:d3.interpolateNumber(k[0],
        f[0])},{i:3,x:d3.interpolateNumber(k[1],f[1])})}else f[0]||f[1]?e.push("translate("+f+")"):e.push("");j!=n?g.push({i:e.push(e.pop()+"rotate(",null,")")-2,x:d3.interpolateNumber(j,n)}):n&&e.push(e.pop()+"rotate("+n+")");m!=q?g.push({i:e.push(e.pop()+"skewX(",null,")")-2,x:d3.interpolateNumber(m,q)}):q&&e.push(e.pop()+"skewX("+q+")");if(l[0]!=b[0]||l[1]!=b[1]){i=e.push(e.pop()+"scale(",null,",",null,")");g.push({i:i-4,x:d3.interpolateNumber(l[0],b[0])},{i:i-2,x:d3.interpolateNumber(l[1],b[1])})}else(b[0]!=
    1||b[1]!=1)&&e.push(e.pop()+"scale("+b+")");i=g.length;return function(a){for(var c=-1,l;++c<i;)e[(l=g[c]).i]=l.x(a);return e.join("")}};d3.interpolateRgb=function(a,c){var a=d3.rgb(a),c=d3.rgb(c),e=a.r,g=a.g,i=a.b,l=c.r-e,b=c.g-g,k=c.b-i;return function(a){return"#"+fa(Math.round(e+l*a))+fa(Math.round(g+b*a))+fa(Math.round(i+k*a))}};d3.interpolateHsl=function(a,c){var a=d3.hsl(a),c=d3.hsl(c),e=a.h,g=a.s,i=a.l,l=c.h-e,b=c.s-g,k=c.l-i;return function(a){return ra(e+l*a,g+b*a,i+k*a).toString()}};d3.interpolateArray=
        function(a,c){var e=[],g=[],i=a.length,l=c.length,b=Math.min(a.length,c.length),k;for(k=0;k<b;++k)e.push(d3.interpolate(a[k],c[k]));for(;k<i;++k)g[k]=a[k];for(;k<l;++k)g[k]=c[k];return function(a){for(k=0;k<b;++k)g[k]=e[k](a);return g}};d3.interpolateObject=function(a,c){var e={},g={},i;for(i in a)i in c?e[i]=(i=="transform"?d3.interpolateTransform:d3.interpolate)(a[i],c[i]):g[i]=a[i];for(i in c)i in a||(g[i]=c[i]);return function(a){for(i in e)g[i]=e[i](a);return g}};var tb=/[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?/g;
    d3.interpolators=[d3.interpolateObject,function(a,c){return c instanceof Array&&d3.interpolateArray(a,c)},function(a,c){return(typeof a==="string"||typeof c==="string")&&d3.interpolateString(a+"",c+"")},function(a,c){return(typeof c==="string"?c in Ya||/^(#|rgb\(|hsl\()/.test(c):c instanceof Y||c instanceof J)&&d3.interpolateRgb(a,c)},function(a,c){return!isNaN(a=+a)&&!isNaN(c=+c)&&d3.interpolateNumber(a,c)}];d3.rgb=function(a,c,e){return arguments.length===1?a instanceof Y?ea(a.r,a.g,a.b):Ea(""+
        a,ea,ra):ea(~~a,~~c,~~e)};Y.prototype.brighter=function(a){var a=Math.pow(0.7,arguments.length?a:1),c=this.r,e=this.g,g=this.b;if(!c&&!e&&!g)return ea(30,30,30);c&&c<30&&(c=30);e&&e<30&&(e=30);g&&g<30&&(g=30);return ea(Math.min(255,Math.floor(c/a)),Math.min(255,Math.floor(e/a)),Math.min(255,Math.floor(g/a)))};Y.prototype.darker=function(a){a=Math.pow(0.7,arguments.length?a:1);return ea(Math.floor(a*this.r),Math.floor(a*this.g),Math.floor(a*this.b))};Y.prototype.hsl=function(){return Fa(this.r,this.g,
        this.b)};Y.prototype.toString=function(){return"#"+fa(this.r)+fa(this.g)+fa(this.b)};var Ya={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",
        darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",
        floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",
        lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",
        mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",
        royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},Nb;for(Nb in Ya)Ya[Nb]=
        Ea(Ya[Nb],ea,ra);d3.hsl=function(a,c,e){return arguments.length===1?a instanceof J?ga(a.h,a.s,a.l):Ea(""+a,Fa,ga):ga(+a,+c,+e)};J.prototype.brighter=function(a){a=Math.pow(0.7,arguments.length?a:1);return ga(this.h,this.s,this.l/a)};J.prototype.darker=function(a){a=Math.pow(0.7,arguments.length?a:1);return ga(this.h,this.s,a*this.l)};J.prototype.rgb=function(){return ra(this.h,this.s,this.l)};J.prototype.toString=function(){return this.rgb().toString()};var ib=function(a,c){return c.querySelector(a)},
        Pb=function(a,c){return c.querySelectorAll(a)},Ua=document.documentElement,Kc=Ua.matchesSelector||Ua.webkitMatchesSelector||Ua.mozMatchesSelector||Ua.msMatchesSelector||Ua.oMatchesSelector,kc=function(a,c){return Kc.call(a,c)};if(typeof Sizzle==="function"){ib=function(a,c){return Sizzle(a,c)[0]};Pb=function(a,c){return Sizzle.uniqueSort(Sizzle(a,c))};kc=Sizzle.matchesSelector}var I=[];d3.selection=function(){return gb};d3.selection.prototype=I;I.select=function(a){var c=[],e,g,i,l;typeof a!=="function"&&
    (a=la(a));for(var b=-1,k=this.length;++b<k;){c.push(e=[]);e.parentNode=(i=this[b]).parentNode;for(var f=-1,j=i.length;++f<j;)if(l=i[f]){e.push(g=a.call(l,l.__data__,f));if(g&&"__data__"in l)g.__data__=l.__data__}else e.push(null)}return Q(c)};I.selectAll=function(a){var c=[],e,g;typeof a!=="function"&&(a=sa(a));for(var i=-1,l=this.length;++i<l;)for(var b=this[i],k=-1,f=b.length;++k<f;)if(g=b[k]){c.push(e=fb(a.call(g,g.__data__,k)));e.parentNode=g}return Q(c)};I.attr=function(a,c){function e(){this.removeAttribute(a)}
        function g(){this.removeAttributeNS(a.space,a.local)}function i(){this.setAttribute(a,c)}function l(){this.setAttributeNS(a.space,a.local,c)}function b(){var e=c.apply(this,arguments);e==null?this.removeAttribute(a):this.setAttribute(a,e)}function k(){var e=c.apply(this,arguments);e==null?this.removeAttributeNS(a.space,a.local):this.setAttributeNS(a.space,a.local,e)}a=d3.ns.qualify(a);if(arguments.length<2){var f=this.node();return a.local?f.getAttributeNS(a.space,a.local):f.getAttribute(a)}return this.each(c==
        null?a.local?g:e:typeof c==="function"?a.local?k:b:a.local?l:i)};I.classed=function(a,c){var e=a.split(Lc),g=e.length,i=-1;if(arguments.length>1){for(;++i<g;)ta.call(this,e[i],c);return this}for(;++i<g;)if(!ta.call(this,e[i]))return false;return true};var Lc=/\s+/g;I.style=function(a,c,e){function g(){this.style.removeProperty(a)}function i(){this.style.setProperty(a,c,e)}function l(){var g=c.apply(this,arguments);g==null?this.style.removeProperty(a):this.style.setProperty(a,g,e)}arguments.length<
    3&&(e="");return arguments.length<2?window.getComputedStyle(this.node(),null).getPropertyValue(a):this.each(c==null?g:typeof c==="function"?l:i)};I.property=function(a,c){function e(){delete this[a]}function g(){this[a]=c}function i(){var e=c.apply(this,arguments);e==null?delete this[a]:this[a]=e}return arguments.length<2?this.node()[a]:this.each(c==null?e:typeof c==="function"?i:g)};I.text=function(a){return arguments.length<1?this.node().textContent:this.each(typeof a==="function"?function(){var c=
        a.apply(this,arguments);this.textContent=c==null?"":c}:a==null?function(){this.textContent=""}:function(){this.textContent=a})};I.html=function(a){return arguments.length<1?this.node().innerHTML:this.each(typeof a==="function"?function(){var c=a.apply(this,arguments);this.innerHTML=c==null?"":c}:a==null?function(){this.innerHTML=""}:function(){this.innerHTML=a})};I.append=function(a){function c(){return this.appendChild(document.createElementNS(this.namespaceURI,a))}function e(){var c=document.createElementNS(a.space,
        a.local);return this.appendChild(c)}a=d3.ns.qualify(a);return this.select(a.local?e:c)};I.insert=function(a,c){function e(){return this.insertBefore(document.createElementNS(this.namespaceURI,a),ib(c,this))}function g(){return this.insertBefore(document.createElementNS(a.space,a.local),ib(c,this))}a=d3.ns.qualify(a);return this.select(a.local?g:e)};I.remove=function(){return this.each(function(){var a=this.parentNode;a&&a.removeChild(this)})};I.data=function(a,c){function e(a,e){var b,k=a.length,
        f=e.length,v=Math.min(k,f),j=Math.max(k,f),n=[],m=[],q=[],D,C;if(c){var v={},j=[],p;C=e.length;for(b=-1;++b<k;){p=c.call(D=a[b],D.__data__,b);p in v?q[C++]=D:v[p]=D;j.push(p)}for(b=-1;++b<f;){if(D=v[p=c.call(e,C=e[b],b)]){D.__data__=C;n[b]=D;m[b]=q[b]=null}else{m[b]={__data__:C};n[b]=q[b]=null}delete v[p]}for(b=-1;++b<k;)j[b]in v&&(q[b]=a[b])}else{for(b=-1;++b<v;){D=a[b];C=e[b];if(D){D.__data__=C;n[b]=D;m[b]=q[b]=null}else{m[b]={__data__:C};n[b]=q[b]=null}}for(;b<f;++b){m[b]={__data__:e[b]};n[b]=
        q[b]=null}for(;b<j;++b){q[b]=a[b];m[b]=n[b]=null}}m.update=n;m.parentNode=n.parentNode=q.parentNode=a.parentNode;g.push(m);i.push(n);l.push(q)}var g=[],i=[],l=[],b=-1,k=this.length,f;if(typeof a==="function")for(;++b<k;)e(f=this[b],a.call(f,f.parentNode.__data__,b));else for(;++b<k;)e(f=this[b],a);b=Q(i);b.enter=function(){var a=g;vb(a,Va);return a};b.exit=function(){return Q(l)};return b};I.filter=function(a){var c=[],e,g,i;if(typeof a!=="function")var b=a,a=function(){return kc(this,b)};for(var k=
        0,f=this.length;k<f;k++){c.push(e=[]);e.parentNode=(g=this[k]).parentNode;for(var n=0,j=g.length;n<j;n++)(i=g[n])&&a.call(i,i.__data__,n)&&e.push(i)}return Q(c)};I.map=function(a){return this.each(function(){this.__data__=a.apply(this,arguments)})};I.order=function(){for(var a=-1,c=this.length;++a<c;)for(var e=this[a],g=e.length-1,i=e[g],b;--g>=0;)if(b=e[g]){i&&i!==b.nextSibling&&i.parentNode.insertBefore(b,i);i=b}return this};I.sort=function(a){for(var a=xa.apply(this,arguments),c=-1,e=this.length;++c<
    e;)this[c].sort(a);return this.order()};I.on=function(a,c,e){arguments.length<3&&(e=false);var g="__on"+a,i=a.indexOf(".");i>0&&(a=a.substring(0,i));return arguments.length<2?(i=this.node()[g])&&i._:this.each(function(i,b){function k(a){var e=d3.event;d3.event=a;try{c.call(f,f.__data__,b)}finally{d3.event=e}}var f=this;f[g]&&f.removeEventListener(a,f[g],e);c&&f.addEventListener(a,f[g]=k,e);k._=c})};I.each=function(a){for(var c=-1,e=this.length;++c<e;)for(var g=this[c],i=-1,b=g.length;++i<b;){var k=
        g[i];k&&a.call(k,k.__data__,i,c)}return this};I.call=function(a){a.apply(this,(arguments[0]=this,arguments));return this};I.empty=function(){return!this.node()};I.node=function(){for(var a=0,c=this.length;a<c;a++)for(var e=this[a],g=0,i=e.length;g<i;g++){var b=e[g];if(b)return b}return null};I.transition=function(){for(var a=[],c,e,g=-1,i=this.length;++g<i;){a.push(c=[]);for(var b=this[g],k=-1,f=b.length;++k<f;)c.push((e=b[k])?{node:e,delay:0,duration:250}:null)}return ya(a,Oa||++Mc,Date.now())};
    var gb=Q([[document]]);gb[0].parentNode=Ua;d3.select=function(a){return typeof a==="string"?gb.select(a):Q([[a]])};d3.selectAll=function(a){return typeof a==="string"?gb.selectAll(a):Q([fb(a)])};var Va=[];Va.append=I.append;Va.insert=I.insert;Va.empty=I.empty;Va.node=I.node;Va.select=function(a){for(var c=[],e,g,b,k,f,n=-1,j=this.length;++n<j;){b=(k=this[n]).update;c.push(e=[]);e.parentNode=k.parentNode;for(var m=-1,q=k.length;++m<q;)if(f=k[m]){e.push(b[m]=g=a.call(k.parentNode,f.__data__,m));g.__data__=
        f.__data__}else e.push(null)}return Q(c)};var $a={},Z=[],Mc=0,Oa=0,oc=d3.ease("cubic-in-out");Z.call=I.call;d3.transition=function(){return gb.transition()};d3.transition.prototype=Z;Z.select=function(a){var c=[],e,g,b;typeof a!=="function"&&(a=la(a));for(var k=-1,f=this.length;++k<f;){c.push(e=[]);for(var n=this[k],j=-1,m=n.length;++j<m;)if((b=n[j])&&(g=a.call(b.node,b.node.__data__,j))){if("__data__"in b.node)g.__data__=b.node.__data__;e.push({node:g,delay:b.delay,duration:b.duration})}else e.push(null)}return ya(c,
        this.id,this.time).ease(this.ease())};Z.selectAll=function(a){var c=[],e,g,b;typeof a!=="function"&&(a=sa(a));for(var k=-1,f=this.length;++k<f;)for(var n=this[k],j=-1,m=n.length;++j<m;)if(b=n[j]){g=a.call(b.node,b.node.__data__,j);c.push(e=[]);for(var q=-1,C=g.length;++q<C;)e.push({node:g[q],delay:b.delay,duration:b.duration})}return ya(c,this.id,this.time).ease(this.ease())};Z.attr=function(a,c){return this.attrTween(a,b(a,c))};Z.attrTween=function(a,c){function e(a,e){var g=c.call(this,a,e,this.getAttribute(b));
        return g===$a?(this.removeAttribute(b),null):g&&function(a){this.setAttribute(b,g(a))}}function g(a,e){var g=c.call(this,a,e,this.getAttributeNS(b.space,b.local));return g===$a?(this.removeAttributeNS(b.space,b.local),null):g&&function(a){this.setAttributeNS(b.space,b.local,g(a))}}var b=d3.ns.qualify(a);return this.tween("attr."+a,b.local?g:e)};Z.style=function(a,c,e){arguments.length<3&&(e="");return this.styleTween(a,b(a,c),e)};Z.styleTween=function(a,c,e){arguments.length<3&&(e="");return this.tween("style."+
        a,function(g,b){var k=c.call(this,g,b,window.getComputedStyle(this,null).getPropertyValue(a));return k===$a?(this.style.removeProperty(a),null):k&&function(c){this.style.setProperty(a,k(c),e)}})};Z.text=function(a){return this.tween("text",function(c,e){this.textContent=typeof a==="function"?a.call(this,c,e):a})};Z.remove=function(){return this.each("end.transition",function(){var a;!this.__transition__&&(a=this.parentNode)&&a.removeChild(this)})};Z.delay=function(a){var c=this;return c.each(typeof a===
    "function"?function(e,g,b){c[b][g].delay=+a.apply(this,arguments)}:(a=+a,function(e,g,b){c[b][g].delay=a}))};Z.duration=function(a){var c=this;return c.each(typeof a==="function"?function(e,g,b){c[b][g].duration=+a.apply(this,arguments)}:(a=+a,function(e,g,b){c[b][g].duration=a}))};Z.transition=function(){return this.select(G)};var Ha=null,kb,jb;d3.timer=function(a,c,e){var g=false,b=Ha;if(arguments.length<3){if(arguments.length<2)c=0;else if(!isFinite(c))return;e=Date.now()}for(;b;){if(b.callback===
        a){b.then=e;b.delay=c;g=true;break}b=b.next}g||(Ha={callback:a,then:e,delay:c,next:Ha});if(!kb){jb=clearTimeout(jb);kb=1;Qb(o)}};d3.timer.flush=function(){for(var a,c=Date.now(),e=Ha;e;){a=c-e.then;if(!e.delay)e.flush=e.callback(a);e=e.next}ha()};var Qb=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,17)};d3.transform=function(a){var c=document.createElementNS(d3.ns.prefix.svg,
        "g"),e={a:1,b:0,c:0,d:1,e:0,f:0};return(d3.transform=function(a){c.setAttribute("transform",a);a=c.transform.baseVal.consolidate();return new U(a?a.matrix:e)})(a)};U.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var Rb=180/Math.PI;d3.scale={};d3.scale.linear=function(){return k([0,1],[0,1],d3.interpolate,false)};d3.scale.log=function(){return S(d3.scale.linear(),X)};var pc=d3.format(".0e");X.pow=function(a){return Math.pow(10,
        a)};s.pow=function(a){return-Math.pow(10,-a)};d3.scale.pow=function(){return u(d3.scale.linear(),1)};d3.scale.sqrt=function(){return d3.scale.pow().exponent(0.5)};d3.scale.ordinal=function(){return Sb([],{t:"range",x:[]})};d3.scale.category10=function(){return d3.scale.ordinal().range(Nc)};d3.scale.category20=function(){return d3.scale.ordinal().range(Oc)};d3.scale.category20b=function(){return d3.scale.ordinal().range(Pc)};d3.scale.category20c=function(){return d3.scale.ordinal().range(Qc)};var Nc=
        ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],Oc=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],Pc=["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd",
        "#de9ed6"],Qc=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];d3.scale.quantile=function(){return z([],[])};d3.scale.quantize=function(){return F(0,1,[0,1])};d3.svg={};d3.svg.arc=function(){function a(){var a=c.apply(this,arguments),k=e.apply(this,arguments),f=g.apply(this,arguments)+Ka,n=b.apply(this,arguments)+Ka,j=(n<f&&(j=f,f=n,n=j),n-f),m=j<
    Math.PI?"0":"1",q=Math.cos(f),f=Math.sin(f),C=Math.cos(n),n=Math.sin(n);return j>=Rc?a?"M0,"+k+"A"+k+","+k+" 0 1,1 0,"+-k+"A"+k+","+k+" 0 1,1 0,"+k+"M0,"+a+"A"+a+","+a+" 0 1,0 0,"+-a+"A"+a+","+a+" 0 1,0 0,"+a+"Z":"M0,"+k+"A"+k+","+k+" 0 1,1 0,"+-k+"A"+k+","+k+" 0 1,1 0,"+k+"Z":a?"M"+k*q+","+k*f+"A"+k+","+k+" 0 "+m+",1 "+k*C+","+k*n+"L"+a*C+","+a*n+"A"+a+","+a+" 0 "+m+",0 "+a*q+","+a*f+"Z":"M"+k*q+","+k*f+"A"+k+","+k+" 0 "+m+",1 "+k*C+","+k*n+"L0,0Z"}var c=A,e=H,g=na,b=R;a.innerRadius=function(e){if(!arguments.length)return c;
        c=d3.functor(e);return a};a.outerRadius=function(c){if(!arguments.length)return e;e=d3.functor(c);return a};a.startAngle=function(c){if(!arguments.length)return g;g=d3.functor(c);return a};a.endAngle=function(c){if(!arguments.length)return b;b=d3.functor(c);return a};a.centroid=function(){var a=(c.apply(this,arguments)+e.apply(this,arguments))/2,k=(g.apply(this,arguments)+b.apply(this,arguments))/2+Ka;return[Math.cos(k)*a,Math.sin(k)*a]};return a};var Ka=-Math.PI/2,Rc=2*Math.PI-1E-6;d3.svg.line=function(){return N(Object)};
    var wb={linear:Aa,"step-before":xb,"step-after":yb,basis:Tb,"basis-open":function(a){if(a.length<4)return Aa(a);for(var c=[],e=-1,g=a.length,b,k=[0],f=[0];++e<3;){b=a[e];k.push(b[0]);f.push(b[1])}c.push(oa(Qa,k)+","+oa(Qa,f));for(--e;++e<g;){b=a[e];k.shift();k.push(b[0]);f.shift();f.push(b[1]);bb(c,k,f)}return c.join("")},"basis-closed":function(a){for(var c,e=-1,g=a.length,b=g+4,k,f=[],n=[];++e<4;){k=a[e%g];f.push(k[0]);n.push(k[1])}c=[oa(Qa,f),",",oa(Qa,n)];for(--e;++e<b;){k=a[e%g];f.shift();f.push(k[0]);
        n.shift();n.push(k[1]);bb(c,f,n)}return c.join("")},bundle:function(a,c){for(var e=a.length-1,g=a[0][0],b=a[0][1],k=a[e][0]-g,f=a[e][1]-b,n=-1,j,m;++n<=e;){j=a[n];m=n/e;j[0]=c*j[0]+(1-c)*(g+m*k);j[1]=c*j[1]+(1-c)*(b+m*f)}return Tb(a)},cardinal:function(a,c){return a.length<3?Aa(a):a[0]+mb(a,zb(a,c))},"cardinal-open":function(a,c){return a.length<4?Aa(a):a[1]+mb(a.slice(1,a.length-1),zb(a,c))},"cardinal-closed":function(a,c){return a.length<3?Aa(a):a[0]+mb((a.push(a[0]),a),zb([a[a.length-2]].concat(a,
        [a[1]]),c))},monotone:function(a){if(a.length<3)a=Aa(a);else{var c=a[0],e=[],b,k,l,f;b=0;k=a.length-1;var n=[];l=a[1];for(f=n[0]=Ab(a[0],l);++b<k;)n[b]=f+(f=Ab(l,l=a[b+1]));n[b]=f;for(var j=-1,m=a.length-1;++j<m;){b=Ab(a[j],a[j+1]);if(Math.abs(b)<1E-6)n[j]=n[j+1]=0;else{k=n[j]/b;l=n[j+1]/b;f=k*k+l*l;if(f>9){f=b*3/Math.sqrt(f);n[j]=f*k;n[j+1]=f*l}}}for(j=-1;++j<=m;){f=(a[Math.min(m,j+1)][0]-a[Math.max(0,j-1)][0])/(6*(1+n[j]*n[j]));e.push([f||0,n[j]*f||0])}a=c+mb(a,e)}return a}},Ub=[0,2/3,1/3,0],Vb=
        [0,1/3,2/3,0],Qa=[0,1/6,2/3,1/6];d3.svg.line.radial=function(){var a=N(Wb);a.radius=a.x;delete a.x;a.angle=a.y;delete a.y;return a};xb.reverse=yb;yb.reverse=xb;d3.svg.area=function(){return Xb(Object)};d3.svg.area.radial=function(){var a=Xb(Wb);a.radius=a.x;delete a.x;a.innerRadius=a.x0;delete a.x0;a.outerRadius=a.x1;delete a.x1;a.angle=a.y;delete a.y;a.startAngle=a.y0;delete a.y0;a.endAngle=a.y1;delete a.y1;return a};d3.svg.chord=function(){function a(a,k){var i=c(this,e,a,k),l=c(this,b,a,k);return"M"+
        i.p0+("A"+i.r+","+i.r+" 0 "+ +(i.a1-i.a0>Math.PI)+",1 "+i.p1)+(i.a0==l.a0&&i.a1==l.a1?"Q 0,0 "+i.p0:"Q 0,0 "+l.p0+("A"+l.r+","+l.r+" 0 "+ +(l.a1-l.a0>Math.PI)+",1 "+l.p1)+("Q 0,0 "+i.p0))+"Z"}function c(a,c,e,b){var g=c.call(a,e,b),c=k.call(a,g,b),e=l.call(a,g,b)+Ka,a=f.call(a,g,b)+Ka;return{r:c,a0:e,a1:a,p0:[c*Math.cos(e),c*Math.sin(e)],p1:[c*Math.cos(a),c*Math.sin(a)]}}var e=Yb,b=Zb,k=qc,l=na,f=R;a.radius=function(c){if(!arguments.length)return k;k=d3.functor(c);return a};a.source=function(c){if(!arguments.length)return e;
        e=d3.functor(c);return a};a.target=function(c){if(!arguments.length)return b;b=d3.functor(c);return a};a.startAngle=function(c){if(!arguments.length)return l;l=d3.functor(c);return a};a.endAngle=function(c){if(!arguments.length)return f;f=d3.functor(c);return a};return a};d3.svg.diagonal=function(){function a(a,k){var f=c.call(this,a,k),n=e.call(this,a,k),j=(f.y+n.y)/2,f=[f,{x:f.x,y:j},{x:n.x,y:j},n],f=f.map(b);return"M"+f[0]+"C"+f[1]+" "+f[2]+" "+f[3]}var c=Yb,e=Zb,b=$b;a.source=function(e){if(!arguments.length)return c;
        c=d3.functor(e);return a};a.target=function(c){if(!arguments.length)return e;e=d3.functor(c);return a};a.projection=function(c){if(!arguments.length)return b;b=c;return a};return a};d3.svg.diagonal.radial=function(){var a=d3.svg.diagonal(),c=$b,e=a.projection;a.projection=function(a){var b;if(arguments.length){var k=c=a;b=e(function(){var a=k.apply(this,arguments),c=a[0],a=a[1]+Ka;return[c*Math.cos(a),c*Math.sin(a)]})}else b=c;return b};return a};d3.svg.mouse=function(a){return ac(a,d3.event)};var Bb=
        /WebKit/.test(navigator.userAgent)?-1:0;d3.svg.touches=function(a,c){if(arguments.length<2)c=d3.event.touches;return c?fb(c).map(function(c){var b=ac(a,c);b.identifier=c.identifier;return b}):[]};d3.svg.symbol=function(){function a(a,b){return(Ob[c.call(this,a,b)]||Ob.circle)(e.call(this,a,b))}var c=sc,e=rc;a.type=function(e){if(!arguments.length)return c;c=d3.functor(e);return a};a.size=function(c){if(!arguments.length)return e;e=d3.functor(c);return a};return a};var Ob={circle:function(a){a=Math.sqrt(a/
        Math.PI);return"M0,"+a+"A"+a+","+a+" 0 1,1 0,"+-a+"A"+a+","+a+" 0 1,1 0,"+a+"Z"},cross:function(a){a=Math.sqrt(a/5)/2;return"M"+-3*a+","+-a+"H"+-a+"V"+-3*a+"H"+a+"V"+-a+"H"+3*a+"V"+a+"H"+a+"V"+3*a+"H"+-a+"V"+a+"H"+-3*a+"Z"},diamond:function(a){var a=Math.sqrt(a/(2*lc)),c=a*lc;return"M0,"+-a+"L"+c+",0 0,"+a+" "+-c+",0Z"},square:function(a){a=Math.sqrt(a)/2;return"M"+-a+","+-a+"L"+a+","+-a+" "+a+","+a+" "+-a+","+a+"Z"},"triangle-down":function(a){var a=Math.sqrt(a/ub),c=a*ub/2;return"M0,"+c+"L"+a+","+
        -c+" "+-a+","+-c+"Z"},"triangle-up":function(a){var a=Math.sqrt(a/ub),c=a*ub/2;return"M0,"+-c+"L"+a+","+c+" "+-a+","+c+"Z"}};d3.svg.symbolTypes=d3.keys(Ob);var ub=Math.sqrt(3),lc=Math.tan(30*Math.PI/180);d3.svg.axis=function(){function a(a){a.each(function(q,C,p){var S=d3.select(this),z=a.delay?function(c){var e=Oa;try{Oa=a.id;return c.transition().delay(a[p][C].delay).duration(a[p][C].duration).ease(a.ease())}finally{Oa=e}}:Object,o=c.ticks?c.ticks.apply(c,n):c.domain(),q=j==null?c.tickFormat?c.tickFormat.apply(c,
        n):String:j,x=m,X=[];if(x&&o.length>1){for(var s=za(c.domain()),X,A=-1,V=o.length,F=(o[1]-o[0])/++x,H,h;++A<V;)for(H=x;--H>0;)(h=+o[A]-H*F)>=s[0]&&X.push(h);--A;for(H=0;++H<x&&(h=+o[A]+H*F)<s[1];)X.push(h)}s=S.selectAll(".minor").data(X,String);h=s.enter().insert("line","g").attr("class","tick minor").style("opacity",1E-6);x=z(s.exit()).style("opacity",1E-6).remove();s=z(s).style("opacity",1);A=S.selectAll("g").data(o,String);o=A.enter().insert("g","path").style("opacity",1E-6);X=z(A.exit()).style("opacity",
        1E-6).remove();var A=z(A).style("opacity",1),u,V=Ia(c),S=S.selectAll(".domain").data([0]);S.enter().append("path").attr("class","domain");var z=z(S),N=c.copy(),S=this.__chart__||N;this.__chart__=N;o.append("line").attr("class","tick");o.append("text");A.select("text").text(q);switch(e){case "bottom":u=bc;h.attr("y2",k);s.attr("x2",0).attr("y2",k);o.select("line").attr("y2",b);o.select("text").attr("y",Math.max(b,0)+f);A.select("line").attr("x2",0).attr("y2",b);A.select("text").attr("x",0).attr("y",
        Math.max(b,0)+f).attr("dy",".71em").attr("text-anchor","middle");z.attr("d","M"+V[0]+","+l+"V0H"+V[1]+"V"+l);break;case "top":u=bc;h.attr("y2",-k);s.attr("x2",0).attr("y2",-k);o.select("line").attr("y2",-b);o.select("text").attr("y",-(Math.max(b,0)+f));A.select("line").attr("x2",0).attr("y2",-b);A.select("text").attr("x",0).attr("y",-(Math.max(b,0)+f)).attr("dy","0em").attr("text-anchor","middle");z.attr("d","M"+V[0]+","+-l+"V0H"+V[1]+"V"+-l);break;case "left":u=cc;h.attr("x2",-k);s.attr("x2",-k).attr("y2",
        0);o.select("line").attr("x2",-b);o.select("text").attr("x",-(Math.max(b,0)+f));A.select("line").attr("x2",-b).attr("y2",0);A.select("text").attr("x",-(Math.max(b,0)+f)).attr("y",0).attr("dy",".32em").attr("text-anchor","end");z.attr("d","M"+-l+","+V[0]+"H0V"+V[1]+"H"+-l);break;case "right":u=cc;h.attr("x2",k);s.attr("x2",k).attr("y2",0);o.select("line").attr("x2",b);o.select("text").attr("x",Math.max(b,0)+f);A.select("line").attr("x2",b).attr("y2",0);A.select("text").attr("x",Math.max(b,0)+f).attr("y",
        0).attr("dy",".32em").attr("text-anchor","start");z.attr("d","M"+l+","+V[0]+"H0V"+V[1]+"H"+l)}if(c.ticks){o.call(u,S);A.call(u,N);X.call(u,N);h.call(u,S);s.call(u,N);x.call(u,N)}else{var ia=N.rangeBand()/2,q=function(a){return N(a)+ia};o.call(u,q);A.call(u,q)}})}var c=d3.scale.linear(),e="bottom",b=6,k=6,l=6,f=3,n=[10],j,m=0;a.scale=function(e){if(!arguments.length)return c;c=e;return a};a.orient=function(c){if(!arguments.length)return e;e=c;return a};a.ticks=function(){if(!arguments.length)return n;
        n=arguments;return a};a.tickFormat=function(c){if(!arguments.length)return j;j=c;return a};a.tickSize=function(c,e,f){if(!arguments.length)return b;var n=arguments.length-1;b=+c;k=n>1?+e:b;l=n>0?+arguments[n]:b;return a};a.tickPadding=function(c){if(!arguments.length)return f;f=+c;return a};a.tickSubdivide=function(c){if(!arguments.length)return m;m=+c;return a};return a};d3.svg.brush=function(){function a(e){var n=b&&k?["n","e","s","w","nw","ne","se","sw"]:b?["e","w"]:k?["n","s"]:[];e.each(function(){var e=
        d3.select(this).on("mousedown.brush",c),j=e.selectAll(".background").data([0]),m=e.selectAll(".extent").data([0]),q=e.selectAll(".resize").data(n,String);j.enter().append("rect").attr("class","background").style("visibility","hidden").style("pointer-events","all").style("cursor","crosshair");m.enter().append("rect").attr("class","extent").style("cursor","move");q.enter().append("rect").attr("class",function(a){return"resize "+a}).attr("width",6).attr("height",6).style("visibility","hidden").style("cursor",
        function(a){return Sc[a]});q.style("pointer-events",a.empty()?"none":"all");q.exit().remove();if(b){m=Ia(b);j.attr("x",m[0]).attr("width",m[1]-m[0]);dc(e,f)}if(k){m=Ia(k);j.attr("y",m[0]).attr("height",m[1]-m[0]);ec(e,f)}})}function c(){var c=d3.select(d3.event.target);Db=a;La=this;T=f;O=d3.svg.mouse(La);if(ua=c.classed("extent")){O[0]=f[0][0]-O[0];O[1]=f[0][1]-O[1]}else if(c.classed("resize")){Ra=d3.event.target.__data__;O[0]=f[+/w$/.test(Ra)][0];O[1]=f[+/^n/.test(Ra)][1]}else d3.event.altKey&&(pa=
        O.slice());nb=!/^(n|s)$/.test(Ra)&&b;ob=!/^(e|w)$/.test(Ra)&&k;var n=this,j=arguments;cb=function(c){var b=d3.event;try{d3.event={type:c,target:a};e[c].apply(n,j)}finally{d3.event=b}};cb("brushstart");Cb();ba()}var e=d3.dispatch("brushstart","brush","brushend"),b,k,f=[[0,0],[0,0]];a.x=function(c){if(!arguments.length)return b;b=c;return a};a.y=function(c){if(!arguments.length)return k;k=c;return a};a.extent=function(c){var e,n,j,m,q;if(!arguments.length){if(b){e=f[0][0];n=f[1][0];if(b.invert){e=b.invert(e);
        n=b.invert(n)}if(n<e){q=e;e=n;n=q}}if(k){j=f[0][1];m=f[1][1];if(k.invert){j=k.invert(j);m=k.invert(m)}if(m<j){q=j;j=m;m=q}}return b&&k?[[e,j],[n,m]]:b?[e,n]:k&&[j,m]}if(b){e=c[0];n=c[1];if(k){e=e[0];n=n[0]}if(b.invert){e=b(e);n=b(n)}if(n<e){q=e;e=n;n=q}f[0][0]=e;f[1][0]=n}if(k){j=c[0];m=c[1];if(b){j=j[1];m=m[1]}if(k.invert){j=k(j);m=k(m)}if(m<j){q=j;j=m;m=q}f[0][1]=j;f[1][1]=m}return a};a.clear=function(){f[0][0]=f[0][1]=f[1][0]=f[1][1]=0;return a};a.empty=function(){return b&&f[0][0]===f[1][0]||
        k&&f[0][1]===f[1][1]};d3.select(window).on("mousemove.brush",Cb).on("mouseup.brush",vc).on("keydown.brush",tc).on("keyup.brush",uc);return d3.rebind(a,e,"on")};var Db,cb,La,nb,ob,T,ua,Ra,pa,O,Sc={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"};d3.behavior={};d3.behavior.drag=function(){function a(){this.on("mousedown.drag",e).on("touchstart.drag",e);d3.select(window).on("mousemove.drag",hc).on("touchmove.drag",hc).on("mouseup.drag",
        Gb,true).on("touchend.drag",Gb,true).on("click.drag",wc,true)}function c(){Fb=b;Hb=d3.event.target;Ca=this;pb=arguments;Ma=gc();if(k){Ba=k.apply(Ca,pb);Ba=[Ba.x-Ma[0],Ba.y-Ma[1]]}else Ba=[0,0];Na=0}function e(){c.apply(this,arguments);Eb("dragstart")}var b=d3.dispatch("drag","dragstart","dragend"),k=null;a.origin=function(c){if(!arguments.length)return k;k=c;return a};return d3.rebind(a,b,"on")};var Fb,Hb,Ca,pb,Ba,Ma,Na;d3.behavior.zoom=function(){function a(){this.on("mousedown.zoom",e).on("mousewheel.zoom",
        b).on("DOMMouseScroll.zoom",b).on("dblclick.zoom",k).on("touchstart.zoom",f);d3.select(window).on("mousemove.zoom",yc).on("mouseup.zoom",zc).on("touchmove.zoom",xc).on("touchend.zoom",ic).on("click.zoom",Ac,true)}function c(){ca=n;Jb=m;Kb=j.zoom;Ib=d3.event.target;qa=this;Lb=arguments}function e(){c.apply(this,arguments);eb=qb(d3.svg.mouse(qa));Ta=0;d3.event.preventDefault();window.focus()}function b(){c.apply(this,arguments);rb||(rb=qb(d3.svg.mouse(qa)));if(!hb)hb=d3.select("body").append("div").style("visibility",
        "hidden").style("top",0).style("height",0).style("width",0).style("overflow-y","scroll").append("div").style("height","2000px").node().parentNode;var a=d3.event,e;try{hb.scrollTop=1E3;hb.dispatchEvent(a);e=1E3-hb.scrollTop}catch(k){e=a.wheelDelta||-a.detail*5}Sa(e*0.005+n[2],d3.svg.mouse(qa),rb)}function k(){c.apply(this,arguments);var a=d3.svg.mouse(qa);Sa(d3.event.shiftKey?Math.ceil(n[2]-1):Math.floor(n[2]+1),a,qb(a))}function f(){c.apply(this,arguments);var a=ic(),e,b=Date.now();a.length===1&&
    b-mc<300&&Sa(1+Math.floor(n[2]),e=a[0],db[e.identifier]);mc=b}var n=[0,0,0],j=d3.dispatch("zoom"),m=nc;a.extent=function(c){if(!arguments.length)return m;m=c==null?nc:c;return a};return d3.rebind(a,j,"on")};var hb,eb,rb,db={},mc=0,ca,Jb,Kb,Ib,qa,Lb,Ta,nc=[[-Infinity,Infinity],[-Infinity,Infinity],[-Infinity,Infinity]]})();
(function(){function w(b){var f=b.source,b=b.target,j;var m=b;if(f===m)j=f;else{j=G(f);for(var m=G(m),q=j.pop(),n=m.pop(),C=null;q===n;){C=q;q=j.pop();n=m.pop()}j=C}for(m=[f];f!==j;){f=f.parent;m.push(f)}for(f=m.length;b!==j;){m.splice(f,0,b);b=b.parent}return m}function G(b){for(var f=[],j=b.parent;j!=null;){f.push(b);b=j;j=j.parent}f.push(b);return f}function h(b){b.fixed=b.fixed|2}function r(b){if(b!==ma)b.fixed=b.fixed&1}function t(){B();ma.fixed=ma.fixed&1;U=ma=null}function B(){ma.px=d3.event.x;
    ma.py=d3.event.y;U.resume()}function y(b,f,j){var m=0,q=0;b.charge=0;if(!b.leaf)for(var n=b.nodes,C=n.length,p=-1,o;++p<C;){o=n[p];if(o!=null){y(o,f,j);b.charge=b.charge+o.charge;m=m+o.charge*o.cx;q=q+o.charge*o.cy}}if(b.point){if(!b.leaf){b.point.x=b.point.x+(Math.random()-0.5);b.point.y=b.point.y+(Math.random()-0.5)}f=f*j[b.point.index];b.charge=b.charge+(b.pointCharge=f);m=m+f*b.point.x;q=q+f*b.point.y}b.cx=m/b.charge;b.cy=q/b.charge}function P(){return 20}function M(){return 1}function ja(b){return b.x}
    function $(b){return b.y}function K(b,f,j){b.y0=f;b.y=j}function aa(b){for(var f=1,j=0,m=b[0][1],q,n=b.length;f<n;++f)if((q=b[f][1])>m){j=f;m=q}return j}function W(b){return b.reduce(da,0)}function da(b,f){return b+f[1]}function Da(b,f){return L(b,Math.ceil(Math.log(f.length)/Math.LN2+1))}function L(b,f){for(var j=-1,m=+b[0],q=(b[1]-m)/f,n=[];++j<=f;)n[j]=q*j+m;return n}function E(b){return[d3.min(b),d3.max(b)]}function ka(b,f){d3.rebind(b,f,"sort","children","value");b.links=Xa;b.nodes=function(f){ab=
        true;return(b.nodes=b)(f)};return b}function Wa(b){return b.children}function ba(b){return b.value}function va(b,f){return f.value-b.value}function Xa(b){return d3.merge(b.map(function(b){return(b.children||[]).map(function(k){return{source:b,target:k}})}))}function ea(b,f){return b.value-f.value}function Y(b,f){var j=b._pack_next;b._pack_next=f;f._pack_prev=b;f._pack_next=j;j._pack_prev=f}function fa(b,f){var j=f.x-b.x,m=f.y-b.y,q=b.r+f.r;return q*q-j*j-m*m>0.001}function Ea(b){b._pack_next=b._pack_prev=
        b}function Fa(b){delete b._pack_next;delete b._pack_prev}function wa(b){var f=b.children;if(f&&f.length){f.forEach(wa);var j=function(b){m=Math.min(b.x-b.r,m);q=Math.max(b.x+b.r,q);n=Math.min(b.y-b.r,n);C=Math.max(b.y+b.r,C)},m=Infinity,q=-Infinity,n=Infinity,C=-Infinity,p=f.length,o,s,u,x,h;f.forEach(Ea);o=f[0];o.x=-o.r;o.y=0;j(o);if(p>1){s=f[1];s.x=s.r;s.y=0;j(s);if(p>2){u=f[2];J(o,s,u);j(u);Y(o,u);o._pack_prev=u;Y(u,s);s=o._pack_next;for(var z=3;z<p;z++){J(o,s,u=f[z]);var F=0,A=1,H=1;for(x=s._pack_next;x!==
    s;x=x._pack_next,A++)if(fa(x,u)){F=1;break}if(F==1)for(h=o._pack_prev;h!==x._pack_prev;h=h._pack_prev,H++)if(fa(h,u))break;if(F){if(A<H||A==H&&s.r<o.r){u=o;x=s=x;u._pack_next=x;x._pack_prev=u}else{x=o=h;u=s;x._pack_next=u;u._pack_prev=x}z--}else{Y(o,u);s=u;j(u)}}}}j=(m+q)/2;o=(n+C)/2;for(z=s=0;z<p;z++){h=f[z];h.x=h.x-j;h.y=h.y-o;s=Math.max(s,h.r+Math.sqrt(h.x*h.x+h.y*h.y))}f.forEach(Fa);b.r=s}else b.r=Math.sqrt(b.value)}function ga(b,f,j,m){var q=b.children;b.x=f=f+m*b.x;b.y=j=j+m*b.y;b.r=b.r*m;if(q)for(var b=
        -1,n=q.length;++b<n;)ga(q[b],f,j,m)}function J(b,f,j){var m=b.r+j.r,q=f.x-b.x,n=f.y-b.y;if(m&&(q||n)){var C=f.r+j.r,f=Math.sqrt(q*q+n*n),p=Math.max(-1,Math.min(1,(m*m+f*f-C*C)/(2*m*f))),C=Math.acos(p),f=p*(m=m/f),m=Math.sin(C)*m;j.x=b.x+f*q+m*n;j.y=b.y+f*n-m*q}else{j.x=b.x+m;j.y=b.y}}function ra(b){var f=b.children;return f&&f.length?ra(f[0]):b}function Q(b){var f=b.children,j;return f&&(j=f.length)?Q(f[j-1]):b}function la(b,f){return b.parent==f.parent?1:2}function sa(b){var f=b.children;return f&&
    f.length?f[0]:b._tree.thread}function ta(b){var f=b.children,j;return f&&(j=f.length)?f[j-1]:b._tree.thread}function xa(b,f){var j=b.children;if(j&&(q=j.length))for(var m,q,n=-1;++n<q;)if(f(m=xa(j[n],f),b)>0)b=m;return b}function ya(b,f){return b.x-f.x}function Za(b,f){return f.x-b.x}function b(b,f){return b.depth-f.depth}function p(b,f){function j(b,k){var n=b.children;if(n&&(s=n.length))for(var p,o=null,h=-1,s;++h<s;){p=n[h];j(p,o);o=p}f(b,k)}j(b,null)}function o(b){return{x:b.x,y:b.y,dx:b.dx,dy:b.dy}}
    function ha(b,f){var j=b.x+f[3],m=b.y+f[0],q=b.dx-f[1]-f[3],n=b.dy-f[0]-f[2];if(q<0){j=j+q/2;q=0}if(n<0){m=m+n/2;n=0}return{x:j,y:m,dx:q,dy:n}}d3.layout={};d3.layout.bundle=function(){return function(b){for(var f=[],j=-1,m=b.length;++j<m;)f.push(w(b[j]));return f}};d3.layout.chord=function(){function b(){var k={},j=[],z=d3.range(p),F=[],A,H,na,R,N;m=[];q=[];A=0;for(R=-1;++R<p;){H=0;for(N=-1;++N<p;)H=H+n[R][N];j.push(H);F.push(d3.range(p));A=A+H}h&&z.sort(function(b,f){return h(j[b],j[f])});s&&F.forEach(function(b,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         f){b.sort(function(b,k){return s(n[f][b],n[f][k])})});A=(2*Math.PI-o*p)/A;H=0;for(R=-1;++R<p;){na=H;for(N=-1;++N<p;){var ia=z[R],Ja=F[ia][N],V=n[ia][Ja],r=H,t=H=H+V*A;k[ia+"-"+Ja]={index:ia,subindex:Ja,startAngle:r,endAngle:t,value:V}}q.push({index:ia,startAngle:na,endAngle:H,value:(H-na)/A});H=H+o}for(R=-1;++R<p;)for(N=R-1;++N<p;){z=k[R+"-"+N];F=k[N+"-"+R];if(z.value||F.value)m.push(z.value<F.value?{source:F,target:z}:{source:z,target:F})}u&&f()}function f(){m.sort(function(b,f){return u((b.source.value+
        b.target.value)/2,(f.source.value+f.target.value)/2)})}var j={},m,q,n,p,o=0,h,s,u;j.matrix=function(b){if(!arguments.length)return n;p=(n=b)&&n.length;m=q=null;return j};j.padding=function(b){if(!arguments.length)return o;o=b;m=q=null;return j};j.sortGroups=function(b){if(!arguments.length)return h;h=b;m=q=null;return j};j.sortSubgroups=function(b){if(!arguments.length)return s;s=b;m=null;return j};j.sortChords=function(b){if(!arguments.length)return u;u=b;m&&f();return j};j.chords=function(){m||
    b();return m};j.groups=function(){q||b();return q};return j};d3.layout.force=function(){function b(f){return function(b,k,n,j){if(b.point!==f){var n=b.cx-f.x,m=b.cy-f.y,q=1/Math.sqrt(n*n+m*m);if((j-k)*q<z){k=b.charge*q*q;f.px=f.px-n*k;f.py=f.py-m*k;return true}if(b.point&&isFinite(q)){k=b.pointCharge*q*q;f.px=f.px-n*k;f.py=f.py-m*k}}return!b.charge}}function f(){var f=F.length,j=A.length,m,p,C,z,h,s,u;for(m=0;m<j;++m){p=A[m];C=p.source;z=p.target;s=z.x-C.x;u=z.y-C.y;if(h=s*s+u*u){h=o*na[m]*((h=Math.sqrt(h))-
        H[m])/h;s=s*h;u=u*h;z.x=z.x-s*(h=C.weight/(z.weight+C.weight));z.y=z.y-u*h;C.x=C.x+s*(h=1-h);C.y=C.y+u*h}}if(h=o*w){s=n[0]/2;u=n[1]/2;m=-1;if(h)for(;++m<f;){p=F[m];p.x=p.x+(s-p.x)*h;p.y=p.y+(u-p.y)*h}}if(x){y(j=d3.geom.quadtree(F),o,R);for(m=-1;++m<f;)(p=F[m]).fixed||j.visit(b(p))}for(m=-1;++m<f;){p=F[m];if(p.fixed){p.x=p.px;p.y=p.py}else{p.x=p.x-(p.px-(p.px=p.x))*X;p.y=p.y-(p.py-(p.py=p.y))*X}}q.tick({type:"tick",alpha:o});return(o=o*0.99)<0.005}function j(b){h(ma=b);U=m}var m={},q=d3.dispatch("tick"),
        n=[1,1],p,o,X=0.9,s=P,u=M,x=-30,w=0.1,z=0.8,F=[],A=[],H,na,R;m.nodes=function(b){if(!arguments.length)return F;F=b;return m};m.links=function(b){if(!arguments.length)return A;A=b;return m};m.size=function(b){if(!arguments.length)return n;n=b;return m};m.linkDistance=function(b){if(!arguments.length)return s;s=d3.functor(b);return m};m.distance=m.linkDistance;m.linkStrength=function(b){if(!arguments.length)return u;u=d3.functor(b);return m};m.friction=function(b){if(!arguments.length)return X;X=b;
        return m};m.charge=function(b){if(!arguments.length)return x;x=typeof b==="function"?b:+b;return m};m.gravity=function(b){if(!arguments.length)return w;w=b;return m};m.theta=function(b){if(!arguments.length)return z;z=b;return m};m.start=function(){function b(n,m){var p;if(!C){C=[];for(k=0;k<j;++k)C[k]=[];for(k=0;k<q;++k){p=A[k];C[p.source.index].push(p.target);C[p.target.index].push(p.source)}}p=C[f];for(var o=-1,h=p.length,z;++o<h;)if(!isNaN(z=p[o][n]))return z;return Math.random()*m}var f,k,j=
        F.length,q=A.length,p=n[0],o=n[1],C,h;for(f=0;f<j;++f){(h=F[f]).index=f;h.weight=0}H=[];na=[];for(f=0;f<q;++f){h=A[f];if(typeof h.source=="number")h.source=F[h.source];if(typeof h.target=="number")h.target=F[h.target];H[f]=s.call(this,h,f);na[f]=u.call(this,h,f);++h.source.weight;++h.target.weight}for(f=0;f<j;++f){h=F[f];if(isNaN(h.x))h.x=b("x",p);if(isNaN(h.y))h.y=b("y",o);if(isNaN(h.px))h.px=h.x;if(isNaN(h.py))h.py=h.y}R=[];if(typeof x==="function")for(f=0;f<j;++f)R[f]=+x.call(this,F[f],f);else for(f=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0;f<j;++f)R[f]=x;return m.resume()};m.resume=function(){o=0.1;d3.timer(f);return m};m.stop=function(){o=0;return m};m.drag=function(){p||(p=d3.behavior.drag().origin(Object).on("dragstart",j).on("drag",B).on("dragend",t));this.on("mouseover.force",h).on("mouseout.force",r).call(p)};return d3.rebind(m,q,"on")};var U,ma;d3.layout.partition=function(){function b(f,j,m,q){var p=f.children;f.x=j;f.y=f.depth*q;f.dx=m;f.dy=q;if(p&&(h=p.length))for(var o=-1,h,r,m=f.value?m/f.value:0;++o<h;){b(r=p[o],j,f=
        r.value*m,q);j=j+f}}function f(b){var b=b.children,k=0;if(b&&(m=b.length))for(var j=-1,m;++j<m;)k=Math.max(k,f(b[j]));return 1+k}function j(j,p){var o=m.call(this,j,p);b(o[0],0,q[0],q[1]/f(o[0]));return o}var m=d3.layout.hierarchy(),q=[1,1];j.size=function(b){if(!arguments.length)return q;q=b;return j};return ka(j,m)};d3.layout.pie=function(){function b(n,o){var h=n.map(function(j,n){return+f.call(b,j,n)}),r=+(typeof m==="function"?m.apply(this,arguments):m),s=((typeof p==="function"?p.apply(this,
            arguments):p)-m)/d3.sum(h),u=d3.range(n.length);j!=null&&u.sort(j===za?function(b,f){return h[f]-h[b]}:function(b,f){return j(n[b],n[f])});var x=[];u.forEach(function(b){x[b]={data:n[b],value:d=h[b],startAngle:r,endAngle:r=r+d*s}});return x}var f=Number,j=za,m=0,p=2*Math.PI;b.value=function(j){if(!arguments.length)return f;f=j;return b};b.sort=function(f){if(!arguments.length)return j;j=f;return b};b.startAngle=function(f){if(!arguments.length)return m;m=f;return b};b.endAngle=function(f){if(!arguments.length)return p;
        p=f;return b};return b};var za={};d3.layout.stack=function(){function b(h,r){var s=h.map(function(j,m){return f.call(b,j,m)}),u=s.map(function(f){return f.map(function(f,j){return[n.call(b,f,j),o.call(b,f,j)]})}),x=j.call(b,u,r),s=d3.permute(s,x),u=d3.permute(u,x),x=m.call(b,u,r),t=s.length,z=s[0].length,F,A,H;for(A=0;A<z;++A){p.call(b,s[0][A],H=x[A],u[0][A][1]);for(F=1;F<t;++F)p.call(b,s[F][A],H=H+u[F-1][A][1],u[F][A][1])}return h}var f=Object,j=Ia["default"],m=Pa.zero,p=K,n=ja,o=$;b.values=function(j){if(!arguments.length)return f;
        f=j;return b};b.order=function(f){if(!arguments.length)return j;j=typeof f==="function"?f:Ia[f];return b};b.offset=function(f){if(!arguments.length)return m;m=typeof f==="function"?f:Pa[f];return b};b.x=function(f){if(!arguments.length)return n;n=f;return b};b.y=function(f){if(!arguments.length)return o;o=f;return b};b.out=function(f){if(!arguments.length)return p;p=f;return b};return b};var Ia={"inside-out":function(b){for(var f=b.length,j,m=b.map(aa),p=b.map(W),n=d3.range(f).sort(function(b,f){return m[b]-
        m[f]}),o=0,h=0,r=[],s=[],b=0;b<f;++b){j=n[b];if(o<h){o=o+p[j];r.push(j)}else{h=h+p[j];s.push(j)}}return s.reverse().concat(r)},reverse:function(b){return d3.range(b.length).reverse()},"default":function(b){return d3.range(b.length)}},Pa={silhouette:function(b){var f=b.length,j=b[0].length,m=[],p=0,n,o,h,r=[];for(o=0;o<j;++o){for(h=n=0;n<f;n++)h=h+b[n][o][1];h>p&&(p=h);m.push(h)}for(o=0;o<j;++o)r[o]=(p-m[o])/2;return r},wiggle:function(b){var f=b.length,j=b[0],m=j.length,p,n,o,h,r,s,u,x,t,z=[];z[0]=
        x=t=0;for(n=1;n<m;++n){for(h=p=0;p<f;++p)h=h+b[p][n][1];r=p=0;for(u=j[n][0]-j[n-1][0];p<f;++p){o=0;for(s=(b[p][n][1]-b[p][n-1][1])/(2*u);o<p;++o)s=s+(b[o][n][1]-b[o][n-1][1])/u;r=r+s*b[p][n][1]}z[n]=x=x-(h?r/h*u:0);x<t&&(t=x)}for(n=0;n<m;++n)z[n]=z[n]-t;return z},expand:function(b){var f=b.length,j=b[0].length,m=1/f,p,n,o,h=[];for(n=0;n<j;++n){for(o=p=0;p<f;p++)o=o+b[p][n][1];if(o)for(p=0;p<f;p++)b[p][n][1]=b[p][n][1]/o;else for(p=0;p<f;p++)b[p][n][1]=m}for(n=0;n<j;++n)h[n]=0;return h},zero:function(b){for(var f=
        -1,b=b[0].length,j=[];++f<b;)j[f]=0;return j}};d3.layout.histogram=function(){function b(k,o){for(var h=[],r=k.map(j,this),s=m.call(this,r,o),u=p.call(this,s,r,o),x,o=-1,t=r.length,z=u.length-1,F=f?1:1/t;++o<z;){x=h[o]=[];x.dx=u[o+1]-(x.x=u[o]);x.y=0}for(o=-1;++o<t;){x=r[o];if(x>=s[0]&&x<=s[1]){x=h[d3.bisect(u,x,1,z)-1];x.y=x.y+F;x.push(k[o])}}return h}var f=true,j=Number,m=E,p=Da;b.value=function(f){if(!arguments.length)return j;j=f;return b};b.range=function(f){if(!arguments.length)return m;m=d3.functor(f);
        return b};b.bins=function(f){if(!arguments.length)return p;p=typeof f==="number"?function(b){return L(b,f)}:d3.functor(f);return b};b.frequency=function(j){if(!arguments.length)return f;f=!!j;return b};return b};d3.layout.hierarchy=function(){function b(f,h,r){var s=o.call(j,f,h),u=ab?f:{data:f};u.depth=h;r.push(u);if(s&&(x=s.length)){for(var f=-1,x,t=u.children=[],z=0,h=h+1;++f<x;){d=b(s[f],h,r);d.parent=u;t.push(d);z=z+d.value}p&&t.sort(p);if(n)u.value=z}else if(n)u.value=+n.call(j,f,h)||0;return u}
        function f(b,k){var p=b.children,m=0;if(p&&(h=p.length))for(var o=-1,h,q=k+1;++o<h;)m=m+f(p[o],q);else n&&(m=+n.call(j,ab?b:b.data,k)||0);if(n)b.value=m;return m}function j(f){var j=[];b(f,0,j);return j}var p=va,o=Wa,n=ba;j.sort=function(b){if(!arguments.length)return p;p=b;return j};j.children=function(b){if(!arguments.length)return o;o=b;return j};j.value=function(b){if(!arguments.length)return n;n=b;return j};j.revalue=function(b){f(b,0);return b};return j};var ab=false;d3.layout.pack=function(){function b(k,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           p){var n=f.call(this,k,p),o=n[0];o.x=0;o.y=0;wa(o);var h=j[0],r=j[1],s=1/Math.max(2*o.r/h,2*o.r/r);ga(o,h/2,r/2,s);return n}var f=d3.layout.hierarchy().sort(ea),j=[1,1];b.size=function(f){if(!arguments.length)return j;j=f;return b};return ka(b,f)};d3.layout.cluster=function(){function b(k,n){var o=f.call(this,k,n),h=o[0],r,s=0;p(h,function(b){var f=b.children;if(f&&f.length){b.x=f.reduce(function(b,f){return b+f.x},0)/f.length;b.y=1+d3.max(f,function(b){return b.y})}else{b.x=r?s=s+j(b,r):0;b.y=0;
        r=b}});var u=ra(h),x=Q(h),t=u.x-j(u,x)/2,z=x.x+j(x,u)/2;p(h,function(b){b.x=(b.x-t)/(z-t)*m[0];b.y=(1-(h.y?b.y/h.y:1))*m[1]});return o}var f=d3.layout.hierarchy().sort(null).value(null),j=la,m=[1,1];b.separation=function(f){if(!arguments.length)return j;j=f;return b};b.size=function(f){if(!arguments.length)return m;m=f;return b};return ka(b,f)};d3.layout.tree=function(){function k(k,n){function o(b,f){var k=b.children,p=b._tree;if(k&&(m=k.length)){for(var m,n=k[0],h,q=n,z,s=-1;++s<m;){z=k[s];o(z,
        h);var A=z;if(h){for(var r=A,u=A,x=A.parent.children[0],t=r._tree.mod,F=u._tree.mod,w=h._tree.mod,B=x._tree.mod,U=void 0;h=ta(h),r=sa(r),h&&r;){x=sa(x);u=ta(u);u._tree.ancestor=A;U=h._tree.prelim+w-r._tree.prelim-t+j(h,r);if(U>0){var ha=h._tree.ancestor.parent==A.parent?h._tree.ancestor:q,y=A,E=U,ha=ha._tree,y=y._tree,G=E/(y.number-ha.number);ha.change=ha.change+G;y.change=y.change-G;y.shift=y.shift+E;y.prelim=y.prelim+E;y.mod=y.mod+E;t=t+U;F=F+U}w=w+h._tree.mod;t=t+r._tree.mod;B=B+x._tree.mod;F=
        F+u._tree.mod}if(h&&!ta(u)){u._tree.thread=h;u._tree.mod=u._tree.mod+(w-F)}if(r&&!sa(x)){x._tree.thread=r;x._tree.mod=x._tree.mod+(t-B);q=A}}h=z}m=k=0;s=b.children;for(A=s.length;--A>=0;){q=s[A]._tree;q.prelim=q.prelim+k;q.mod=q.mod+k;k=k+(q.shift+(m=m+q.change))}n=0.5*(n._tree.prelim+z._tree.prelim);if(f){p.prelim=f._tree.prelim+j(b,f);p.mod=p.prelim-n}else p.prelim=n}else if(f)p.prelim=f._tree.prelim+j(b,f)}function h(b,f){b.x=b._tree.prelim+f;var k=b.children;if(k&&(p=k.length))for(var j=-1,p,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      f=f+b._tree.mod;++j<p;)h(k[j],f)}var r=f.call(this,k,n),s=r[0];p(s,function(b,f){b._tree={ancestor:b,prelim:0,mod:0,change:0,shift:0,number:f?f._tree.number+1:0}});o(s);h(s,-s._tree.prelim);var u=xa(s,Za),x=xa(s,ya),t=xa(s,b),z=u.x-j(u,x)/2,F=x.x+j(x,u)/2,A=t.depth||1;p(s,function(b){b.x=(b.x-z)/(F-z)*m[0];b.y=b.depth/A*m[1];delete b._tree});return r}var f=d3.layout.hierarchy().sort(null).value(null),j=la,m=[1,1];k.separation=function(b){if(!arguments.length)return j;j=b;return k};k.size=function(b){if(!arguments.length)return m;
        m=b;return k};return ka(k,f)};d3.layout.treemap=function(){function b(f,k){for(var j=-1,p=f.length,m,n;++j<p;){n=(m=f[j]).value*(k<0?0:k);m.area=isNaN(n)||n<=0?0:n}}function f(j){var n=j.children;if(n&&n.length){var h=s(j),o=[],q=n.slice(),r=Infinity,u=Math.min(h.dx,h.dy);b(q,h.dx*h.dy/j.value);for(o.area=0;(j=q.length)>0;){o.push(j=q[j-1]);o.area=o.area+j.area;for(var j=u,t=o.area,x=void 0,w=0,U=Infinity,B=-1,C=o.length;++B<C;)if(x=o[B].area){x<U&&(U=x);x>w&&(w=x)}t=t*t;j=j*j;if((j=t?Math.max(j*
            w*y/t,t/(j*U*y)):Infinity)<=r){q.pop();r=j}else{o.area=o.area-o.pop().area;p(o,u,h,false);u=Math.min(h.dx,h.dy);o.length=o.area=0;r=Infinity}}if(o.length){p(o,u,h,true);o.length=o.area=0}n.forEach(f)}}function j(f){var n=f.children;if(n&&n.length){var h=s(f),o=n.slice(),q=[];b(o,h.dx*h.dy/f.value);for(q.area=0;f=o.pop();){q.push(f);q.area=q.area+f.area;if(f.z!=null){p(q,f.z?h.dx:h.dy,h,!o.length);q.length=q.area=0}}n.forEach(j)}}function p(b,f,j,k){var m=-1,n=b.length,h=j.x,o=j.y,q=f?r(b.area/f):
        0,s;if(f==j.dx){if(k||q>j.dy)q=j.dy;for(;++m<n;){s=b[m];s.x=h;s.y=o;s.dy=q;h=h+(s.dx=Math.min(j.x+j.dx-h,q?r(s.area/q):0))}s.z=true;s.dx=s.dx+(j.x+j.dx-h);j.y=j.y+q;j.dy=j.dy-q}else{if(k||q>j.dx)q=j.dx;for(;++m<n;){s=b[m];s.x=h;s.y=o;s.dx=q;o=o+(s.dy=Math.min(j.y+j.dy-o,q?r(s.area/q):0))}s.z=false;s.dy=s.dy+(j.y+j.dy-o);j.x=j.x+q;j.dx=j.dx-q}}function h(p){var p=x||n(p),m=p[0];m.x=0;m.y=0;m.dx=t[0];m.dy=t[1];x&&n.revalue(m);b([m],m.dx*m.dy/m.value);(x?j:f)(m);u&&(x=p);return p}var n=d3.layout.hierarchy(),
        r=Math.round,t=[1,1],w=null,s=o,u=false,x,y=0.5*(1+Math.sqrt(5));h.size=function(b){if(!arguments.length)return t;t=b;return h};h.padding=function(b){function f(j){var k=b.call(h,j,j.depth);return k==null?o(j):ha(j,typeof k==="number"?[k,k,k,k]:k)}function j(f){return ha(f,b)}if(!arguments.length)return w;var k;s=(w=b)==null?o:(k=typeof b)==="function"?f:k==="number"?(b=[b,b,b,b],j):j;return h};h.round=function(b){if(!arguments.length)return r!=Number;r=b?Math.round:Number;return h};h.sticky=function(b){if(!arguments.length)return u;
        u=b;x=null;return h};h.ratio=function(b){if(!arguments.length)return y;y=b;return h};return ka(h,n)}})();
(function(){function w(h){return h.map(G).join(",")}function G(h){return/[",\n]/.test(h)?'"'+h.replace(/\"/g,'""')+'"':h}d3.csv=function(h,r){d3.text(h,"text/csv",function(h){r(h&&d3.csv.parse(h))})};d3.csv.parse=function(h){var r;return d3.csv.parseRows(h,function(h,w){if(w){for(var y={},G=-1,M=r.length;++G<M;)y[r[G]]=h[G];return y}r=h;return null})};d3.csv.parseRows=function(h,r){function t(){if(M.lastIndex>=h.length)return y;if(K){K=false;return w}var r=M.lastIndex;if(h.charCodeAt(r)===34){for(var t=
    r;t++<h.length;)if(h.charCodeAt(t)===34){if(h.charCodeAt(t+1)!==34)break;t++}M.lastIndex=t+2;var G=h.charCodeAt(t+1);if(G===13){K=true;h.charCodeAt(t+2)===10&&M.lastIndex++}else G===10&&(K=true);return h.substring(r+1,t).replace(/""/g,'"')}if(t=M.exec(h)){K=t[0].charCodeAt(0)!==44;return h.substring(r,t.index)}M.lastIndex=h.length;return h.substring(r)}var w={},y={},G=[],M=/\r\n|[,\r\n]/g,ja=0,$,K;for(M.lastIndex=0;($=t())!==y;){for(var aa=[];$!==w&&$!==y;){aa.push($);$=t()}(!r||(aa=r(aa,ja++)))&&
G.push(aa)}return G};d3.csv.format=function(h){return h.map(w).join("\n")}})();
(function(){function w(b,p,h,r){for(var t,w=0,y=p.length,B=h.length;w<y;){if(r>=B)return-1;t=p.charCodeAt(w++);if(t==37){t=Xa[p.charAt(w++)];if(!t||(r=t(b,h,r))<0)return-1}else if(t!=h.charCodeAt(r++))return-1}return r}function G(b,p,h){J.lastIndex=0;return(p=J.exec(p.substring(h,h+2)))?(b.setDate(+p[0]),h+p[0].length):-1}function h(b,p,h){J.lastIndex=0;return(p=J.exec(p.substring(h,h+2)))?(b.setHours(+p[0]),h+p[0].length):-1}function r(b,p){return~~((p-b)/864E5-(p.getTimezoneOffset()-b.getTimezoneOffset())/
1440)}function t(){this._=new Date(Date.UTC.apply(this,arguments))}function B(b){return b.toISOString()}function y(b,p,h){return function(r,t,w){var y=b(r),B=[];y<r&&p(y);if(w>1)for(;y<t;){r=new Date(+y);h(r)%w||B.push(r);p(y)}else for(;y<t;){B.push(new Date(+y));p(y)}return B}}function P(b){b.setTime(b.getTime()+6E4)}function M(b){b.setTime(b.getTime()+36E5)}function ja(b,p,h){function r(p){return b(p)}r.invert=function(p){return $(b.invert(p))};r.domain=function(p){if(!arguments.length)return b.domain().map($);
    b.domain(p);return r};r.ticks=function(h,o){var t,w=r.domain();t=w[0];w=w[w.length-1];t=t<w?[t,w]:[w,t];if(typeof h!=="function"){var w=(t[1]-t[0])/h,y=d3.bisect(la,w);if(y==la.length)return p.year(t,h);if(!y)return b.ticks(h).map($);Math.log(w/la[y-1])<Math.log(la[y]/w)&&--y;h=p[y];o=h[1];h=h[0]}return h(t[0],new Date(+t[1]+1),o)};r.tickFormat=function(){return h};r.copy=function(){return ja(b.copy(),p,h)};return d3.rebind(r,b,"range","rangeRound","interpolate","clamp")}function $(b){return new Date(b)}
    function K(b){return function(p){for(var h=b.length-1,r=b[h];!r[1](p);)r=b[--h];return r[0](p)}}function aa(b){var p=new Date(b,0,1);p.setFullYear(b);return p}function W(b){var p=b.getFullYear(),h=aa(p),r=aa(p+1);return p+(b-h)/(r-h)}function da(b){var h=new Date(Date.UTC(b,0,1));h.setUTCFullYear(b);return h}function Da(b){var h=b.getUTCFullYear(),o=da(h),r=da(h+1);return h+(b-o)/(r-o)}d3.time={};var L=Date;d3.time.format=function(b){function h(p){for(var r=[],t=-1,w=0,y,B;++t<o;)if(b.charCodeAt(t)==
        37){r.push(b.substring(w,t),(B=va[y=b.charAt(++t)])?B(p):y);w=t+1}r.push(b.substring(w,t));return r.join("")}var o=b.length;h.parse=function(h){var p=new L(1900,0,1);if(w(p,b,h,0)!=h.length)return null;if(p.hour12){h=p.getHours()%12;p.setHours(p.hour12pm?h+12:h)}delete p.hour12;delete p.hour12pm;return p};h.toString=function(){return b};return h};var E=d3.format("02d"),ka=d3.format("03d"),Wa=d3.format("04d"),ba=d3.format("2d"),va={a:function(b){return fa[b.getDay()].substring(0,3)},A:function(b){return fa[b.getDay()]},
            b:function(b){return ga[b.getMonth()].substring(0,3)},B:function(b){return ga[b.getMonth()]},c:d3.time.format("%a %b %e %H:%M:%S %Y"),d:function(b){return E(b.getDate())},e:function(b){return ba(b.getDate())},H:function(b){return E(b.getHours())},I:function(b){return E(b.getHours()%12||12)},j:function(b){return ka(1+r(new L(b.getFullYear(),0,1),b))},L:function(b){return ka(b.getMilliseconds())},m:function(b){return E(b.getMonth()+1)},M:function(b){return E(b.getMinutes())},p:function(b){return b.getHours()>=
            12?"PM":"AM"},S:function(b){return E(b.getSeconds())},U:function(b){var h=new L(b.getFullYear(),0,1);return E(~~((r(h,b)+h.getDay())/7))},w:function(b){return b.getDay()},W:function(b){var h=new L(b.getFullYear(),0,1);return E(~~((r(h,b)+(h.getDay()+6)%7)/7))},x:d3.time.format("%m/%d/%y"),X:d3.time.format("%H:%M:%S"),y:function(b){return E(b.getFullYear()%100)},Y:function(b){return Wa(b.getFullYear()%1E4)},Z:function(b){var h=b.getTimezoneOffset(),b=h>0?"-":"+",o=~~(Math.abs(h)/60),h=Math.abs(h)%
                60;return b+E(o)+E(h)},"%":function(){return"%"}},Xa={a:function(b,h,o){return h.substring(o,o=o+3).toLowerCase()in ea?o:-1},A:function(b,h,o){Y.lastIndex=0;return(b=Y.exec(h.substring(o,o+10)))?o+b[0].length:-1},b:function(b,h,o){h=Ea[h.substring(o,o=o+3).toLowerCase()];return h==null?-1:(b.setMonth(h),o)},B:function(b,h,o){Fa.lastIndex=0;return(h=Fa.exec(h.substring(o,o+12)))?(b.setMonth(wa[h[0].toLowerCase()]),o+h[0].length):-1},c:function(b,h,o){return w(b,va.c.toString(),h,o)},d:G,e:G,H:h,I:function(b,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              p,o){b.hour12=true;return h(b,p,o)},L:function(b,h,o){J.lastIndex=0;return(h=J.exec(h.substring(o,o+3)))?(b.setMilliseconds(+h[0]),o+h[0].length):-1},m:function(b,h,o){J.lastIndex=0;return(h=J.exec(h.substring(o,o+2)))?(b.setMonth(h[0]-1),o+h[0].length):-1},M:function(b,h,o){J.lastIndex=0;return(h=J.exec(h.substring(o,o+2)))?(b.setMinutes(+h[0]),o+h[0].length):-1},p:function(b,h,o){h=ra[h.substring(o,o=o+2).toLowerCase()];return h==null?-1:(b.hour12pm=h,o)},S:function(b,h,o){J.lastIndex=0;return(h=
            J.exec(h.substring(o,o+2)))?(b.setSeconds(+h[0]),o+h[0].length):-1},x:function(b,h,o){return w(b,va.x.toString(),h,o)},X:function(b,h,o){return w(b,va.X.toString(),h,o)},y:function(b,h,o){J.lastIndex=0;return(h=J.exec(h.substring(o,o+2)))?(b.setFullYear(~~((new Date).getFullYear()/1E3)*1E3+ +h[0]),o+h[0].length):-1},Y:function(b,h,o){J.lastIndex=0;return(h=J.exec(h.substring(o,o+4)))?(b.setFullYear(h[0]),o+h[0].length):-1}},ea={sun:3,mon:3,tue:3,wed:3,thu:3,fri:3,sat:3},Y=/^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/ig,
        fa=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Ea={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11},Fa=/^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig,wa={january:0,february:1,march:2,april:3,may:4,june:5,july:6,august:7,september:8,october:9,november:10,december:11},ga=["January","February","March","April","May","June","July","August","September","October","November","December"],J=/\s*\d+/,ra={am:0,
            pm:1};d3.time.format.utc=function(b){function h(b){try{L=t;var p=new L;p._=b;return o(p)}finally{L=Date}}var o=d3.time.format(b);h.parse=function(b){try{L=t;var h=o.parse(b);return h&&h._}finally{L=Date}};h.toString=o.toString;return h};t.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},
        getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.getTime()},setDate:function(b){this._.setUTCDate(b)},setDay:function(b){this._.setUTCDay(b)},setFullYear:function(b){this._.setUTCFullYear(b)},setHours:function(b){this._.setUTCHours(b)},setMilliseconds:function(b){this._.setUTCMilliseconds(b)},setMinutes:function(b){this._.setUTCMinutes(b)},
        setMonth:function(b){this._.setUTCMonth(b)},setSeconds:function(b){this._.setUTCSeconds(b)}};var Q=d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");d3.time.format.iso=Date.prototype.toISOString?B:Q;B.parse=function(b){return new Date(b)};B.toString=Q.toString;d3.time.second=function(b){return new Date(~~(b/1E3)*1E3)};d3.time.second.utc=d3.time.second;d3.time.seconds=y(d3.time.second,function(b){b.setTime(b.getTime()+1E3)},function(b){return b.getSeconds()});d3.time.seconds.utc=d3.time.seconds;d3.time.minute=
        function(b){return new Date(~~(b/6E4)*6E4)};d3.time.minute.utc=d3.time.minute;d3.time.minutes=y(d3.time.minute,P,function(b){return b.getMinutes()});d3.time.minutes.utc=y(d3.time.minute,P,function(b){return b.getUTCMinutes()});d3.time.hour=function(b){var h=b.getTimezoneOffset()/60;return new Date((~~(b/36E5-h)+h)*36E5)};d3.time.hour.utc=function(b){return new Date(~~(b/36E5)*36E5)};d3.time.hours=y(d3.time.hour,M,function(b){return b.getHours()});d3.time.hours.utc=y(d3.time.hour.utc,M,function(b){return b.getUTCHours()});
    d3.time.day=function(b){return new Date(b.getFullYear(),b.getMonth(),b.getDate())};d3.time.day.utc=function(b){return new Date(~~(b/864E5)*864E5)};d3.time.days=y(d3.time.day,function(b){b.setDate(b.getDate()+1)},function(b){return b.getDate()-1});d3.time.days.utc=y(d3.time.day.utc,function(b){b.setUTCDate(b.getUTCDate()+1)},function(b){return b.getUTCDate()-1});d3.time.week=function(b){(b=d3.time.day(b)).setDate(b.getDate()-b.getDay());return b};d3.time.week.utc=function(b){(b=d3.time.day.utc(b)).setUTCDate(b.getUTCDate()-
        b.getUTCDay());return b};d3.time.weeks=y(d3.time.week,function(b){b.setDate(b.getDate()+7)},function(b){return~~((b-new Date(b.getFullYear(),0,1))/6048E5)});d3.time.weeks.utc=y(d3.time.week.utc,function(b){b.setUTCDate(b.getUTCDate()+7)},function(b){return~~((b-Date.UTC(b.getUTCFullYear(),0,1))/6048E5)});d3.time.month=function(b){return new Date(b.getFullYear(),b.getMonth(),1)};d3.time.month.utc=function(b){return new Date(Date.UTC(b.getUTCFullYear(),b.getUTCMonth(),1))};d3.time.months=y(d3.time.month,
        function(b){b.setMonth(b.getMonth()+1)},function(b){return b.getMonth()});d3.time.months.utc=y(d3.time.month.utc,function(b){b.setUTCMonth(b.getUTCMonth()+1)},function(b){return b.getUTCMonth()});d3.time.year=function(b){return new Date(b.getFullYear(),0,1)};d3.time.year.utc=function(b){return new Date(Date.UTC(b.getUTCFullYear(),0,1))};d3.time.years=y(d3.time.year,function(b){b.setFullYear(b.getFullYear()+1)},function(b){return b.getFullYear()});d3.time.years.utc=y(d3.time.year.utc,function(b){b.setUTCFullYear(b.getUTCFullYear()+
        1)},function(b){return b.getUTCFullYear()});var la=[1E3,5E3,15E3,3E4,6E4,3E5,9E5,18E5,36E5,108E5,216E5,432E5,864E5,1728E5,6048E5,2592E6,7776E6,31536E6],sa=[[d3.time.seconds,1],[d3.time.seconds,5],[d3.time.seconds,15],[d3.time.seconds,30],[d3.time.minutes,1],[d3.time.minutes,5],[d3.time.minutes,15],[d3.time.minutes,30],[d3.time.hours,1],[d3.time.hours,3],[d3.time.hours,6],[d3.time.hours,12],[d3.time.days,1],[d3.time.days,2],[d3.time.weeks,1],[d3.time.months,1],[d3.time.months,3],[d3.time.years,1]],
        Q=[[d3.time.format("%Y"),function(){return true}],[d3.time.format("%B"),function(b){return b.getMonth()}],[d3.time.format("%b %d"),function(b){return b.getDate()!=1}],[d3.time.format("%a %d"),function(b){return b.getDay()&&b.getDate()!=1}],[d3.time.format("%I %p"),function(b){return b.getHours()}],[d3.time.format("%I:%M"),function(b){return b.getMinutes()}],[d3.time.format(":%S"),function(b){return b.getSeconds()}],[d3.time.format(".%L"),function(b){return b.getMilliseconds()}]],ta=d3.scale.linear(),
        xa=K(Q);sa.year=function(b,h){return ta.domain(b.map(W)).ticks(h).map(aa)};d3.time.scale=function(){return ja(d3.scale.linear(),sa,xa)};var ya=[[d3.time.seconds.utc,1],[d3.time.seconds.utc,5],[d3.time.seconds.utc,15],[d3.time.seconds.utc,30],[d3.time.minutes.utc,1],[d3.time.minutes.utc,5],[d3.time.minutes.utc,15],[d3.time.minutes.utc,30],[d3.time.hours.utc,1],[d3.time.hours.utc,3],[d3.time.hours.utc,6],[d3.time.hours.utc,12],[d3.time.days.utc,1],[d3.time.days.utc,2],[d3.time.weeks.utc,1],[d3.time.months.utc,
        1],[d3.time.months.utc,3],[d3.time.years.utc,1]],Q=[[d3.time.format.utc("%Y"),function(){return true}],[d3.time.format.utc("%B"),function(b){return b.getUTCMonth()}],[d3.time.format.utc("%b %d"),function(b){return b.getUTCDate()!=1}],[d3.time.format.utc("%a %d"),function(b){return b.getUTCDay()&&b.getUTCDate()!=1}],[d3.time.format.utc("%I %p"),function(b){return b.getUTCHours()}],[d3.time.format.utc("%I:%M"),function(b){return b.getUTCMinutes()}],[d3.time.format.utc(":%S"),function(b){return b.getUTCSeconds()}],
        [d3.time.format.utc(".%L"),function(b){return b.getUTCMilliseconds()}]],Za=K(Q);ya.year=function(b,h){return ta.domain(b.map(Da)).ticks(h).map(da)};d3.time.scale.utc=function(){return ja(d3.scale.linear(),ya,Za)}})();


(function(){d3.csv = function(url, callback) {
    d3.text(url, "text/csv", function(text) {
        callback(text && d3.csv.parse(text));
    });
};
    d3.csv.parse = function(text) {
        var header;
        return d3.csv.parseRows(text, function(row, i) {
            if (i) {
                var o = {}, j = -1, m = header.length;
                while (++j < m) o[header[j]] = row[j];
                return o;
            } else {
                header = row;
                return null;
            }
        });
    };

    d3.csv.parseRows = function(text, f) {
        var EOL = {}, // sentinel value for end-of-line
            EOF = {}, // sentinel value for end-of-file
            rows = [], // output rows
            re = /\r\n|[,\r\n]/g, // field separator regex
            n = 0, // the current line number
            t, // the current token
            eol; // is the current token followed by EOL?

        re.lastIndex = 0; // work-around bug in FF 3.6

        /** @private Returns the next token. */
        function token() {
            if (re.lastIndex >= text.length) return EOF; // special case: end of file
            if (eol) { eol = false; return EOL; } // special case: end of line

            // special case: quotes
            var j = re.lastIndex;
            if (text.charCodeAt(j) === 34) {
                var i = j;
                while (i++ < text.length) {
                    if (text.charCodeAt(i) === 34) {
                        if (text.charCodeAt(i + 1) !== 34) break;
                        i++;
                    }
                }
                re.lastIndex = i + 2;
                var c = text.charCodeAt(i + 1);
                if (c === 13) {
                    eol = true;
                    if (text.charCodeAt(i + 2) === 10) re.lastIndex++;
                } else if (c === 10) {
                    eol = true;
                }
                return text.substring(j + 1, i).replace(/""/g, "\"");
            }

            // common case
            var m = re.exec(text);
            if (m) {
                eol = m[0].charCodeAt(0) !== 44;
                return text.substring(j, m.index);
            }
            re.lastIndex = text.length;
            return text.substring(j);
        }

        while ((t = token()) !== EOF) {
            var a = [];
            while ((t !== EOL) && (t !== EOF)) {
                a.push(t);
                t = token();
            }
            if (f && !(a = f(a, n++))) continue;
            rows.push(a);
        }

        return rows;
    };
    d3.csv.format = function(rows) {
        return rows.map(d3_csv_formatRow).join("\n");
    };

    function d3_csv_formatRow(row) {
        return row.map(d3_csv_formatValue).join(",");
    }

    function d3_csv_formatValue(text) {
        return /[",\n]/.test(text)
            ? "\"" + text.replace(/\"/g, "\"\"") + "\""
            : text;
    }
})();

(function(){function ea(a){var b=a.source,a=a.target,c;var e=a;if(b===e)c=b;else{c=O(b);for(var e=O(e),f=c.pop(),h=e.pop(),g=null;f===h;)g=f,f=c.pop(),h=e.pop();c=g}for(e=[b];b!==c;)b=b.parent,e.push(b);for(b=e.length;a!==c;)e.splice(b,0,a),a=a.parent;return e}function O(a){for(var b=[],c=a.parent;null!=c;)b.push(a),a=c,c=c.parent;b.push(a);return b}function P(a){a.fixed|=2}function fa(a){a!==s&&(a.fixed&=1)}function ga(){Q();s.fixed&=1;D=s=null}function Q(){s.px=d3.event.x;s.py=d3.event.y;D.resume()} function R(a,b,c){var e=0,f=0;a.charge=0;if(!a.leaf)for(var h=a.nodes,g=h.length,i=-1,k;++i<g;)k=h[i],null!=k&&(R(k,b,c),a.charge+=k.charge,e+=k.charge*k.cx,f+=k.charge*k.cy);a.point&&(a.leaf||(a.point.x+=Math.random()-0.5,a.point.y+=Math.random()-0.5),b*=c[a.point.index],a.charge+=a.pointCharge=b,e+=b*a.point.x,f+=b*a.point.y);a.cx=e/a.charge;a.cy=f/a.charge}function ha(){return 20}function ia(){return 1}function ja(a){return a.x}function ka(a){return a.y}function la(a,b,c){a.y0=b;a.y=c}function ma(a){for(var b= 1,c=0,e=a[0][1],f,h=a.length;b<h;++b)if((f=a[b][1])>e)c=b,e=f;return c}function na(a){return a.reduce(oa,0)}function oa(a,b){return a+b[1]}function pa(a,b){return S(a,Math.ceil(Math.log(b.length)/Math.LN2+1))}function S(a,b){for(var c=-1,e=+a[0],f=(a[1]-e)/b,h=[];++c<=b;)h[c]=f*c+e;return h}function qa(a){return[d3.min(a),d3.max(a)]}function u(a,b){d3.rebind(a,b,"sort","children","value");a.links=ra;a.nodes=function(b){J=!0;return(a.nodes=a)(b)};return a}function sa(a){return a.children}function ta(a){return a.value} function ua(a,b){return b.value-a.value}function ra(a){return d3.merge(a.map(function(a){return(a.children||[]).map(function(c){return{source:a,target:c}})}))}function va(a,b){return a.value-b.value}function K(a,b){var c=a._pack_next;a._pack_next=b;b._pack_prev=a;b._pack_next=c;c._pack_prev=b}function T(a,b){a._pack_next=b;b._pack_prev=a}function U(a,b){var c=b.x-a.x,e=b.y-a.y,f=a.r+b.r;return 0.001<f*f-c*c-e*e}function wa(a){function b(a){c=Math.min(a.x-a.r,c);e=Math.max(a.x+a.r,e);f=Math.min(a.y- a.r,f);h=Math.max(a.y+a.r,h)}var c=Infinity,e=-Infinity,f=Infinity,h=-Infinity,g=a.length,i,k,l,j,m;a.forEach(xa);i=a[0];i.x=-i.r;i.y=0;b(i);if(1<g&&(k=a[1],k.x=k.r,k.y=0,b(k),2<g)){l=a[2];V(i,k,l);b(l);K(i,l);i._pack_prev=l;K(l,k);k=i._pack_next;for(var n=3;n<g;n++){V(i,k,l=a[n]);var o=0,p=1,q=1;for(j=k._pack_next;j!==k;j=j._pack_next,p++)if(U(j,l)){o=1;break}if(1==o)for(m=i._pack_prev;m!==j._pack_prev&&!U(m,l);m=m._pack_prev,q++);o?(p<q||p==q&&k.r<i.r?T(i,k=j):T(i=m,k),n--):(K(i,l),k=l,b(l))}}i= (c+e)/2;k=(f+h)/2;for(n=l=0;n<g;n++)j=a[n],j.x-=i,j.y-=k,l=Math.max(l,j.r+Math.sqrt(j.x*j.x+j.y*j.y));a.forEach(ya);return l}function xa(a){a._pack_next=a._pack_prev=a}function ya(a){delete a._pack_next;delete a._pack_prev}function W(a){var b=a.children;b&&b.length?(b.forEach(W),a.r=wa(b)):a.r=Math.sqrt(a.value)}function X(a,b,c,e){var f=a.children;a.x=b+=e*a.x;a.y=c+=e*a.y;a.r*=e;if(f)for(var a=-1,h=f.length;++a<h;)X(f[a],b,c,e)}function V(a,b,c){var e=a.r+c.r,f=b.x-a.x,h=b.y-a.y;if(e&&(f||h)){var g= b.r+c.r,b=Math.sqrt(f*f+h*h),i=Math.max(-1,Math.min(1,(e*e+b*b-g*g)/(2*e*b))),g=Math.acos(i),b=i*(e/=b),e=Math.sin(g)*e;c.x=a.x+b*f+e*h;c.y=a.y+b*h-e*f}else c.x=a.x+e,c.y=a.y}function za(a){return 1+d3.max(a,function(a){return a.y})}function Aa(a){return a.reduce(function(a,c){return a+c.x},0)/a.length}function Y(a){var b=a.children;return b&&b.length?Y(b[0]):a}function Z(a){var b=a.children,c;return b&&(c=b.length)?Z(b[c-1]):a}function $(a,b){return a.parent==b.parent?1:2}function L(a){var b=a.children; return b&&b.length?b[0]:a._tree.thread}function M(a){var b=a.children,c;return b&&(c=b.length)?b[c-1]:a._tree.thread}function v(a,b){var c=a.children;if(c&&(f=c.length))for(var e,f,h=-1;++h<f;)if(0<b(e=v(c[h],b),a))a=e;return a}function Ba(a,b){return a.x-b.x}function Ca(a,b){return b.x-a.x}function Da(a,b){return a.depth-b.depth}function B(a,b){function c(a,f){var h=a.children;if(h&&(l=h.length))for(var g,i=null,k=-1,l;++k<l;)g=h[k],c(g,i),i=g;b(a,f)}c(a,null)}function N(a){return{x:a.x,y:a.y,dx:a.dx, dy:a.dy}}function aa(a,b){var c=a.x+b[3],e=a.y+b[0],f=a.dx-b[1]-b[3],h=a.dy-b[0]-b[2];0>f&&(c+=f/2,f=0);0>h&&(e+=h/2,h=0);return{x:c,y:e,dx:f,dy:h}}d3.layout={};d3.layout.bundle=function(){return function(a){for(var b=[],c=-1,e=a.length;++c<e;)b.push(ea(a[c]));return b}};d3.layout.chord=function(){function a(){var a={},c=[],o=d3.range(g),p=[],q,r,C,t,x;e=[];f=[];q=0;for(t=-1;++t<g;){r=0;for(x=-1;++x<g;)r+=h[t][x];c.push(r);p.push(d3.range(g));q+=r}k&&o.sort(function(a,b){return k(c[a],c[b])});l&& p.forEach(function(a,b){a.sort(function(a,c){return l(h[b][a],h[b][c])})});q=(2*Math.PI-i*g)/q;r=0;for(t=-1;++t<g;){C=r;for(x=-1;++x<g;){var F=o[t],A=p[F][x],E=h[F][A],Ea=r,Fa=r+=E*q;a[F+"-"+A]={index:F,subindex:A,startAngle:Ea,endAngle:Fa,value:E}}f.push({index:F,startAngle:C,endAngle:r,value:(r-C)/q});r+=i}for(t=-1;++t<g;)for(x=t-1;++x<g;)if(o=a[t+"-"+x],p=a[x+"-"+t],o.value||p.value)e.push(o.value<p.value?{source:p,target:o}:{source:o,target:p});j&&b()}function b(){e.sort(function(a,b){return j((a.source.value+ a.target.value)/2,(b.source.value+b.target.value)/2)})}var c={},e,f,h,g,i=0,k,l,j;c.matrix=function(a){if(!arguments.length)return h;g=(h=a)&&h.length;e=f=null;return c};c.padding=function(a){if(!arguments.length)return i;i=a;e=f=null;return c};c.sortGroups=function(a){if(!arguments.length)return k;k=a;e=f=null;return c};c.sortSubgroups=function(a){if(!arguments.length)return l;l=a;e=null;return c};c.sortChords=function(a){if(!arguments.length)return j;j=a;e&&b();return c};c.chords=function(){e|| a();return e};c.groups=function(){f||a();return f};return c};d3.layout.force=function(){function a(a){return function(b,c,h,e){if(b.point!==a){var h=b.cx-a.x,f=b.cy-a.y,g=1/Math.sqrt(h*h+f*f);if((e-c)*g<o)return c=b.charge*g*g,a.px-=h*c,a.py-=f*c,!0;b.point&&isFinite(g)&&(c=b.pointCharge*g*g,a.px-=h*c,a.py-=f*c)}return!b.charge}}function b(){var b=p.length,c=q.length,e,g,o,l,j,y,z;for(e=0;e<c;++e)if(g=q[e],o=g.source,l=g.target,y=l.x-o.x,z=l.y-o.y,j=y*y+z*z)j=i*C[e]*((j=Math.sqrt(j))-r[e])/j,y*=j, z*=j,l.x-=y*(j=o.weight/(l.weight+o.weight)),l.y-=z*j,o.x+=y*(j=1-j),o.y+=z*j;if(j=i*n)if(y=h[0]/2,z=h[1]/2,e=-1,j)for(;++e<b;)g=p[e],g.x+=(y-g.x)*j,g.y+=(z-g.y)*j;if(m){R(c=d3.geom.quadtree(p),i,t);for(e=-1;++e<b;)(g=p[e]).fixed||c.visit(a(g))}for(e=-1;++e<b;)g=p[e],g.fixed?(g.x=g.px,g.y=g.py):(g.x-=(g.px-(g.px=g.x))*k,g.y-=(g.py-(g.py=g.y))*k);f.tick({type:"tick",alpha:i});return 0.005>(i*=0.99)}function c(a){P(s=a);D=e}var e={},f=d3.dispatch("tick"),h=[1,1],g,i,k=0.9,l=ha,j=ia,m=-30,n=0.1,o=0.8, p=[],q=[],r,C,t;e.nodes=function(a){if(!arguments.length)return p;p=a;return e};e.links=function(a){if(!arguments.length)return q;q=a;return e};e.size=function(a){if(!arguments.length)return h;h=a;return e};e.linkDistance=function(a){if(!arguments.length)return l;l=d3.functor(a);return e};e.distance=e.linkDistance;e.linkStrength=function(a){if(!arguments.length)return j;j=d3.functor(a);return e};e.friction=function(a){if(!arguments.length)return k;k=a;return e};e.charge=function(a){if(!arguments.length)return m; m="function"===typeof a?a:+a;return e};e.gravity=function(a){if(!arguments.length)return n;n=a;return e};e.theta=function(a){if(!arguments.length)return o;o=a;return e};e.start=function(){function a(e,h){var i;if(!k){k=[];for(c=0;c<g;++c)k[c]=[];for(c=0;c<f;++c)i=q[c],k[i.source.index].push(i.target),k[i.target.index].push(i.source)}i=k[b];for(var o=-1,j=i.length,l;++o<j;)if(!isNaN(l=i[o][e]))return l;return Math.random()*h}var b,c,g=p.length,f=q.length,i=h[0],o=h[1],k,n;for(b=0;b<g;++b)(n=p[b]).index= b,n.weight=0;r=[];C=[];for(b=0;b<f;++b)n=q[b],"number"==typeof n.source&&(n.source=p[n.source]),"number"==typeof n.target&&(n.target=p[n.target]),r[b]=l.call(this,n,b),C[b]=j.call(this,n,b),++n.source.weight,++n.target.weight;for(b=0;b<g;++b)if(n=p[b],isNaN(n.x)&&(n.x=a("x",i)),isNaN(n.y)&&(n.y=a("y",o)),isNaN(n.px)&&(n.px=n.x),isNaN(n.py))n.py=n.y;t=[];if("function"===typeof m)for(b=0;b<g;++b)t[b]=+m.call(this,p[b],b);else for(b=0;b<g;++b)t[b]=m;return e.resume()};e.resume=function(){i=0.1;d3.timer(b); return e};e.stop=function(){i=0;return e};e.drag=function(){g||(g=d3.behavior.drag().origin(Object).on("dragstart",c).on("drag",Q).on("dragend",ga));this.on("mouseover.force",P).on("mouseout.force",fa).call(g)};return d3.rebind(e,f,"on")};var D,s;d3.layout.partition=function(){function a(b,c,e,f){var l=b.children;b.x=c;b.y=b.depth*f;b.dx=e;b.dy=f;if(l&&(m=l.length))for(var j=-1,m,n,e=b.value?e/b.value:0;++j<m;)a(n=l[j],c,b=n.value*e,f),c+=b}function b(a){var a=a.children,c=0;if(a&&(f=a.length))for(var e= -1,f;++e<f;)c=Math.max(c,b(a[e]));return 1+c}function c(c,g){var i=e.call(this,c,g);a(i[0],0,f[0],f[1]/b(i[0]));return i}var e=d3.layout.hierarchy(),f=[1,1];c.size=function(a){if(!arguments.length)return f;f=a;return c};return u(c,e)};d3.layout.pie=function(){function a(h,g){var i=h.map(function(c,e){return+b.call(a,c,e)}),k=+("function"===typeof e?e.apply(this,arguments):e),l=(("function"===typeof f?f.apply(this,arguments):f)-e)/d3.sum(i),j=d3.range(h.length);null!=c&&j.sort(c===ba?function(a,b){return i[b]- i[a]}:function(a,b){return c(h[a],h[b])});var m=[];j.forEach(function(a){m[a]={data:h[a],value:d=i[a],startAngle:k,endAngle:k+=d*l}});return m}var b=Number,c=ba,e=0,f=2*Math.PI;a.value=function(c){if(!arguments.length)return b;b=c;return a};a.sort=function(b){if(!arguments.length)return c;c=b;return a};a.startAngle=function(b){if(!arguments.length)return e;e=b;return a};a.endAngle=function(b){if(!arguments.length)return f;f=b;return a};return a};var ba={};d3.layout.stack=function(){function a(i,k){var l= i.map(function(c,e){return b.call(a,c,e)}),j=l.map(function(b){return b.map(function(b,c){return[h.call(a,b,c),g.call(a,b,c)]})}),m=c.call(a,j,k),l=d3.permute(l,m),j=d3.permute(j,m),m=e.call(a,j,k),n=l.length,o=l[0].length,p,q,r;for(q=0;q<o;++q){f.call(a,l[0][q],r=m[q],j[0][q][1]);for(p=1;p<n;++p)f.call(a,l[p][q],r+=j[p-1][q][1],j[p][q][1])}return i}var b=Object,c=ca["default"],e=da.zero,f=la,h=ja,g=ka;a.values=function(c){if(!arguments.length)return b;b=c;return a};a.order=function(b){if(!arguments.length)return c; c="function"===typeof b?b:ca[b];return a};a.offset=function(b){if(!arguments.length)return e;e="function"===typeof b?b:da[b];return a};a.x=function(b){if(!arguments.length)return h;h=b;return a};a.y=function(b){if(!arguments.length)return g;g=b;return a};a.out=function(b){if(!arguments.length)return f;f=b;return a};return a};var ca={"inside-out":function(a){for(var b=a.length,c,e=a.map(ma),f=a.map(na),h=d3.range(b).sort(function(a,b){return e[a]-e[b]}),g=0,i=0,k=[],l=[],a=0;a<b;++a)c=h[a],g<i?(g+= f[c],k.push(c)):(i+=f[c],l.push(c));return l.reverse().concat(k)},reverse:function(a){return d3.range(a.length).reverse()},"default":function(a){return d3.range(a.length)}},da={silhouette:function(a){var b=a.length,c=a[0].length,e=[],f=0,h,g,i,k=[];for(g=0;g<c;++g){for(i=h=0;h<b;h++)i+=a[h][g][1];i>f&&(f=i);e.push(i)}for(g=0;g<c;++g)k[g]=(f-e[g])/2;return k},wiggle:function(a){var b=a.length,c=a[0],e=c.length,f,h,g,i,k,l,j,m,n,o=[];o[0]=m=n=0;for(h=1;h<e;++h){for(i=f=0;f<b;++f)i+=a[f][h][1];k=f=0; for(j=c[h][0]-c[h-1][0];f<b;++f){g=0;for(l=(a[f][h][1]-a[f][h-1][1])/(2*j);g<f;++g)l+=(a[g][h][1]-a[g][h-1][1])/j;k+=l*a[f][h][1]}o[h]=m-=i?k/i*j:0;m<n&&(n=m)}for(h=0;h<e;++h)o[h]-=n;return o},expand:function(a){var b=a.length,c=a[0].length,e=1/b,f,h,g,i=[];for(h=0;h<c;++h){for(g=f=0;f<b;f++)g+=a[f][h][1];if(g)for(f=0;f<b;f++)a[f][h][1]/=g;else for(f=0;f<b;f++)a[f][h][1]=e}for(h=0;h<c;++h)i[h]=0;return i},zero:function(a){for(var b=-1,a=a[0].length,c=[];++b<a;)c[b]=0;return c}};d3.layout.histogram= function(){function a(a,g){for(var i=[],k=a.map(c,this),l=e.call(this,k,g),j=f.call(this,l,k,g),m,g=-1,n=k.length,o=j.length-1,p=b?1:1/n;++g<o;)m=i[g]=[],m.dx=j[g+1]-(m.x=j[g]),m.y=0;for(g=-1;++g<n;)m=k[g],m>=l[0]&&m<=l[1]&&(m=i[d3.bisect(j,m,1,o)-1],m.y+=p,m.push(a[g]));return i}var b=!0,c=Number,e=qa,f=pa;a.value=function(b){if(!arguments.length)return c;c=b;return a};a.range=function(b){if(!arguments.length)return e;e=d3.functor(b);return a};a.bins=function(b){if(!arguments.length)return f;f="number"=== typeof b?function(a){return S(a,b)}:d3.functor(b);return a};a.frequency=function(c){if(!arguments.length)return b;b=!!c;return a};return a};d3.layout.hierarchy=function(){function a(b,i,k){var l=f.call(c,b,i),j=J?b:{data:b};j.depth=i;k.push(j);if(l&&(m=l.length)){for(var b=-1,m,n=j.children=[],o=0,i=i+1;++b<m;)d=a(l[b],i,k),d.parent=j,n.push(d),o+=d.value;e&&n.sort(e);h&&(j.value=o)}else h&&(j.value=+h.call(c,b,i)||0);return j}function b(a,e){var f=a.children,l=0;if(f&&(m=f.length))for(var j=-1,m, n=e+1;++j<m;)l+=b(f[j],n);else h&&(l=+h.call(c,J?a:a.data,e)||0);h&&(a.value=l);return l}function c(b){var c=[];a(b,0,c);return c}var e=ua,f=sa,h=ta;c.sort=function(a){if(!arguments.length)return e;e=a;return c};c.children=function(a){if(!arguments.length)return f;f=a;return c};c.value=function(a){if(!arguments.length)return h;h=a;return c};c.revalue=function(a){b(a,0);return a};return c};var J=!1;d3.layout.pack=function(){function a(a,f){var h=b.call(this,a,f),g=h[0];g.x=0;g.y=0;W(g);var i=c[0], k=c[1],l=1/Math.max(2*g.r/i,2*g.r/k);X(g,i/2,k/2,l);return h}var b=d3.layout.hierarchy().sort(va),c=[1,1];a.size=function(b){if(!arguments.length)return c;c=b;return a};return u(a,b)};d3.layout.cluster=function(){function a(a,h){var g=b.call(this,a,h),i=g[0],k,l=0;B(i,function(a){var b=a.children;b&&b.length?(a.x=Aa(b),a.y=za(b)):(a.x=k?l+=c(a,k):0,a.y=0,k=a)});var j=Y(i),m=Z(i),n=j.x-c(j,m)/2,o=m.x+c(m,j)/2;B(i,function(a){a.x=(a.x-n)/(o-n)*e[0];a.y=(1-(i.y?a.y/i.y:1))*e[1]});return g}var b=d3.layout.hierarchy().sort(null).value(null), c=$,e=[1,1];a.separation=function(b){if(!arguments.length)return c;c=b;return a};a.size=function(b){if(!arguments.length)return e;e=b;return a};return u(a,b)};d3.layout.tree=function(){function a(a,h){function g(a,b){var e=a.children,f=a._tree;if(e&&(h=e.length)){for(var h,i=e[0],o,l=i,j,k=-1;++k<h;){j=e[k];g(j,o);var q=j;if(o){for(var p=q,n=q,m=q.parent.children[0],s=p._tree.mod,u=n._tree.mod,v=o._tree.mod,B=m._tree.mod,G=void 0;o=M(o),p=L(p),o&&p;){m=L(m);n=M(n);n._tree.ancestor=q;G=o._tree.prelim+ v-p._tree.prelim-s+c(o,p);if(0<G){var H=o._tree.ancestor.parent==q.parent?o._tree.ancestor:l,w=q,I=G,H=H._tree,w=w._tree,D=I/(w.number-H.number);H.change+=D;w.change-=D;w.shift+=I;w.prelim+=I;w.mod+=I;s+=G;u+=G}v+=o._tree.mod;s+=p._tree.mod;B+=m._tree.mod;u+=n._tree.mod}o&&!M(n)&&(n._tree.thread=o,n._tree.mod+=v-u);p&&!L(m)&&(m._tree.thread=p,m._tree.mod+=s-B,l=q)}o=j}h=e=0;k=a.children;for(q=k.length;0<=--q;)l=k[q]._tree,l.prelim+=e,l.mod+=e,e+=l.shift+(h+=l.change);i=0.5*(i._tree.prelim+j._tree.prelim); b?(f.prelim=b._tree.prelim+c(a,b),f.mod=f.prelim-i):f.prelim=i}else b&&(f.prelim=b._tree.prelim+c(a,b))}function i(a,b){a.x=a._tree.prelim+b;var c=a.children;if(c&&(f=c.length))for(var e=-1,f,b=b+a._tree.mod;++e<f;)i(c[e],b)}var k=b.call(this,a,h),l=k[0];B(l,function(a,b){a._tree={ancestor:a,prelim:0,mod:0,change:0,shift:0,number:b?b._tree.number+1:0}});g(l);i(l,-l._tree.prelim);var j=v(l,Ca),m=v(l,Ba),n=v(l,Da),o=j.x-c(j,m)/2,p=m.x+c(m,j)/2,q=n.depth||1;B(l,function(a){a.x=(a.x-o)/(p-o)*e[0];a.y= a.depth/q*e[1];delete a._tree});return k}var b=d3.layout.hierarchy().sort(null).value(null),c=$,e=[1,1];a.separation=function(b){if(!arguments.length)return c;c=b;return a};a.size=function(b){if(!arguments.length)return e;e=b;return a};return u(a,b)};d3.layout.treemap=function(){function a(a,b){for(var c=-1,e=a.length,f,g;++c<e;)g=(f=a[c]).value*(0>b?0:b),f.area=isNaN(g)||0>=g?0:g}function b(c){var f=c.children;if(f&&f.length){var g=l(c),h=[],i=f.slice(),j=Infinity,k=Math.min(g.dx,g.dy);a(i,g.dx* g.dy/c.value);for(h.area=0;0<(c=i.length);){h.push(c=i[c-1]);h.area+=c.area;for(var c=k,m=h.area,A=void 0,E=0,s=Infinity,u=-1,v=h.length;++u<v;)if(A=h[u].area)A<s&&(s=A),A>E&&(E=A);m*=m;c*=c;(c=m?Math.max(c*E*n/m,m/(c*s*n)):Infinity)<=j?(i.pop(),j=c):(h.area-=h.pop().area,e(h,k,g,!1),k=Math.min(g.dx,g.dy),h.length=h.area=0,j=Infinity)}h.length&&(e(h,k,g,!0),h.length=h.area=0);f.forEach(b)}}function c(b){var f=b.children;if(f&&f.length){var g=l(b),h=f.slice(),i=[];a(h,g.dx*g.dy/b.value);for(i.area= 0;b=h.pop();)i.push(b),i.area+=b.area,null!=b.z&&(e(i,b.z?g.dx:g.dy,g,!h.length),i.length=i.area=0);f.forEach(c)}}function e(a,b,c,e){var f=-1,h=a.length,i=c.x,l=c.y,j=b?g(a.area/b):0,k;if(b==c.dx){if(e||j>c.dy)j=c.dy;for(;++f<h;)k=a[f],k.x=i,k.y=l,k.dy=j,i+=k.dx=Math.min(c.x+c.dx-i,j?g(k.area/j):0);k.z=!0;k.dx+=c.x+c.dx-i;c.y+=j;c.dy-=j}else{if(e||j>c.dx)j=c.dx;for(;++f<h;)k=a[f],k.x=i,k.y=l,k.dx=j,l+=k.dy=Math.min(c.y+c.dy-l,j?g(k.area/j):0);k.z=!1;k.dy+=c.y+c.dy-l;c.x+=j;c.dx-=j}}function f(e){var e= m||h(e),f=e[0];f.x=0;f.y=0;f.dx=i[0];f.dy=i[1];m&&h.revalue(f);a([f],f.dx*f.dy/f.value);(m?c:b)(f);j&&(m=e);return e}var h=d3.layout.hierarchy(),g=Math.round,i=[1,1],k=null,l=N,j=!1,m,n=0.5*(1+Math.sqrt(5));f.size=function(a){if(!arguments.length)return i;i=a;return f};f.padding=function(a){function b(c){var e=a.call(f,c,c.depth);return null==e?N(c):aa(c,"number"===typeof e?[e,e,e,e]:e)}function c(b){return aa(b,a)}if(!arguments.length)return k;var e;l=null==(k=a)?N:"function"===(e=typeof a)?b:"number"=== e?(a=[a,a,a,a],c):c;return f};f.round=function(a){if(!arguments.length)return g!=Number;g=a?Math.round:Number;return f};f.sticky=function(a){if(!arguments.length)return j;j=a;m=null;return f};f.ratio=function(a){if(!arguments.length)return n;n=a;return f};return u(f,h)}})();


// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

// ┌──────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.3.4 - JavaScript Events Library                                                │ \\
// ├──────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)          │ \\
// │ Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license. │ \\
// └──────────────────────────────────────────────────────────────────────────────────────┘ \\

(function (glob) {
    var version = "0.3.4",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        wildcard = "*",
        fun = function () {},
        numsort = function (a, b) {
            return a - b;
        },
        current_event,
        stop,
        events = {n: {}},

        eve = function (name, scope) {
            var e = events,
                oldstop = stop,
                args = Array.prototype.slice.call(arguments, 2),
                listeners = eve.listeners(name),
                z = 0,
                f = false,
                l,
                indexed = [],
                queue = {},
                out = [],
                ce = current_event,
                errors = [];
            current_event = name;
            stop = 0;
            for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
                indexed.push(listeners[i].zIndex);
                if (listeners[i].zIndex < 0) {
                    queue[listeners[i].zIndex] = listeners[i];
                }
            }
            indexed.sort(numsort);
            while (indexed[z] < 0) {
                l = queue[indexed[z++]];
                out.push(l.apply(scope, args));
                if (stop) {
                    stop = oldstop;
                    return out;
                }
            }
            for (i = 0; i < ii; i++) {
                l = listeners[i];
                if ("zIndex" in l) {
                    if (l.zIndex == indexed[z]) {
                        out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                        do {
                            z++;
                            l = queue[indexed[z]];
                            l && out.push(l.apply(scope, args));
                            if (stop) {
                                break;
                            }
                        } while (l)
                    } else {
                        queue[l.zIndex] = l;
                    }
                } else {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                }
            }
            stop = oldstop;
            current_event = ce;
            return out.length ? out : null;
        };

    eve.listeners = function (name) {
        var names = name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };


    eve.on = function (name, f) {
        var names = name.split(separator),
            e = events;
        for (var i = 0, ii = names.length; i < ii; i++) {
            e = e.n;
            !e[names[i]] && (e[names[i]] = {n: {}});
            e = e[names[i]];
        }
        e.f = e.f || [];
        for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
            return fun;
        }
        e.f.push(f);
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };

    eve.stop = function () {
        stop = 1;
    };

    eve.nt = function (subname) {
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event);
        }
        return current_event;
    };


    eve.off = eve.unbind = function (name, f) {
        var names = name.split(separator),
            e,
            key,
            splice,
            i, ii, j, jj,
            cur = [events];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                    }
                } else {
                    for (key in e) if (e[has](key)) {
                        splice.push(e[key]);
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                            e.f.splice(j, 1);
                            break;
                        }
                        !e.f.length && delete e.f;
                    }
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        var funcs = e.n[key].f;
                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                            funcs.splice(j, 1);
                            break;
                        }
                        !funcs.length && delete e.n[key].f;
                    }
                } else {
                    delete e.f;
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        delete e.n[key].f;
                    }
                }
                e = e.n;
            }
        }
    };

    eve.once = function (name, f) {
        var f2 = function () {
            var res = f.apply(this, arguments);
            eve.unbind(name, f2);
            return res;
        };
        return eve.on(name, f2);
    };

    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define != "undefined" ? (define("eve", [], function() { return eve; })) : (glob.eve = eve));
})(this);


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ "Raphaël 2.1.0" - JavaScript Vector Library                         │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
(function () {

    function R(first) {
        if (R.is(first, "function")) {
            return loaded ? first() : eve.on("raphael.DOMload", first);
        } else if (R.is(first, array)) {
            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
        } else {
            var args = Array.prototype.slice.call(arguments, 0);
            if (R.is(args[args.length - 1], "function")) {
                var f = args.pop();
                return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
                    f.call(R._engine.create[apply](R, args));
                });
            } else {
                return R._engine.create[apply](R, arguments);
            }
        }
    }
    R.version = "2.1.0";
    R.eve = eve;
    var loaded,
        separator = /[, ]+/,
        elements = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
        formatrg = /\{(\d+)\}/g,
        proto = "prototype",
        has = "hasOwnProperty",
        g = {
            doc: document,
            win: window
        },
        oldRaphael = {
            was: Object.prototype[has].call(g.win, "Raphael"),
            is: g.win.Raphael
        },
        Paper = function () {


            this.ca = this.customAttributes = {};
        },
        paperproto,
        appendChild = "appendChild",
        apply = "apply",
        concat = "concat",
        supportsTouch = "createTouch" in g.doc,
        E = "",
        S = " ",
        Str = String,
        split = "split",
        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
        touchMap = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        lowerCase = Str.prototype.toLowerCase,
        math = Math,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        pow = math.pow,
        PI = math.PI,
        nu = "number",
        string = "string",
        array = "array",
        toString = "toString",
        fillString = "fill",
        objectToString = Object.prototype.toString,
        paper = {},
        push = "push",
        ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1},
        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        round = math.round,
        setAttribute = "setAttribute",
        toFloat = parseFloat,
        toInt = parseInt,
        upperCase = Str.prototype.toUpperCase,
        availableAttrs = R._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        availableAnimAttrs = R._availableAnimAttrs = {
            blur: nu,
            "clip-rect": "csv",
            cx: nu,
            cy: nu,
            fill: "colour",
            "fill-opacity": nu,
            "font-size": nu,
            height: nu,
            opacity: nu,
            path: "path",
            r: nu,
            rx: nu,
            ry: nu,
            stroke: "colour",
            "stroke-opacity": nu,
            "stroke-width": nu,
            transform: "transform",
            width: nu,
            x: nu,
            y: nu
        },
        whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
        commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        hsrg = {hs: 1, rg: 1},
        p2s = /,?([achlmqrstvxz]),?/gi,
        pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
        radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
        eldata = {},
        sortByKey = function (a, b) {
            return a.key - b.key;
        },
        sortByNumber = function (a, b) {
            return toFloat(a) - toFloat(b);
        },
        fun = function () {},
        pipe = function (x) {
            return x;
        },
        rectPath = R._rectPath = function (x, y, w, h, r) {
            if (r) {
                return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
            }
            return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
        },
        ellipsePath = function (x, y, rx, ry) {
            if (ry == null) {
                ry = rx;
            }
            return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
        },
        getPath = R._getPath = {
            path: function (el) {
                return el.attr("path");
            },
            circle: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.r);
            },
            ellipse: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
            },
            rect: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height, a.r);
            },
            image: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height);
            },
            text: function (el) {
                var bbox = el._getBBox();
                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
            }
        },

        mapPath = R.mapPath = function (path, matrix) {
            if (!matrix) {
                return path;
            }
            var x, y, i, j, ii, jj, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
                pathi = path[i];
                for (j = 1, jj = pathi.length; j < jj; j += 2) {
                    x = matrix.x(pathi[j], pathi[j + 1]);
                    y = matrix.y(pathi[j], pathi[j + 1]);
                    pathi[j] = x;
                    pathi[j + 1] = y;
                }
            }
            return path;
        };

    R._g = g;

    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (R.type == "VML") {
        var d = g.doc.createElement("div"),
            b;
        d.innerHTML = '<v:shape adj="1"/>';
        b = d.firstChild;
        b.style.behavior = "url(#default#VML)";
        if (!(b && typeof b.adj == "object")) {
            return (R.type = E);
        }
        d = null;
    }


    R.svg = !(R.vml = R.type == "VML");
    R._Paper = Paper;

    R.fn = paperproto = Paper.prototype = R.prototype;
    R._id = 0;
    R._oid = 0;

    R.is = function (o, type) {
        type = lowerCase.call(type);
        if (type == "finite") {
            return !isnan[has](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return  (type == "null" && o === null) ||
            (type == typeof o && o !== null) ||
            (type == "object" && o === Object(o)) ||
            (type == "array" && Array.isArray && Array.isArray(o)) ||
            objectToString.call(o).slice(8, -1).toLowerCase() == type;
    };

    function clone(obj) {
        if (Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) if (obj[has](key)) {
            res[key] = clone(obj[key]);
        }
        return res;
    }

    R.angle = function (x1, y1, x2, y2, x3, y3) {
        if (x3 == null) {
            var x = x1 - x2,
                y = y1 - y2;
            if (!x && !y) {
                return 0;
            }
            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
        } else {
            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
        }
    };

    R.rad = function (deg) {
        return deg % 360 * PI / 180;
    };

    R.deg = function (rad) {
        return rad * 180 / PI % 360;
    };

    R.snapTo = function (values, value, tolerance) {
        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
        if (R.is(values, array)) {
            var i = values.length;
            while (i--) if (abs(values[i] - value) <= tolerance) {
                return values[i];
            }
        } else {
            values = +values;
            var rem = value % values;
            if (rem < tolerance) {
                return value - rem;
            }
            if (rem > values - tolerance) {
                return value - rem + values;
            }
        }
        return value;
    };


    var createUUID = R.createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });


    R.setWindow = function (newwin) {
        eve("raphael.setWindow", R, g.win, newwin);
        g.win = newwin;
        g.doc = g.win.document;
        if (R._engine.initWin) {
            R._engine.initWin(g.win);
        }
    };
    var toHex = function (color) {
            if (R.vml) {
                // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
                var trim = /^\s+|\s+$/g;
                var bod;
                try {
                    var docum = new ActiveXObject("htmlfile");
                    docum.write("<body>");
                    docum.close();
                    bod = docum.body;
                } catch(e) {
                    bod = createPopup().document.body;
                }
                var range = bod.createTextRange();
                toHex = cacher(function (color) {
                    try {
                        bod.style.color = Str(color).replace(trim, E);
                        var value = range.queryCommandValue("ForeColor");
                        value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
                        return "#" + ("000000" + value.toString(16)).slice(-6);
                    } catch(e) {
                        return "none";
                    }
                });
            } else {
                var i = g.doc.createElement("i");
                i.title = "Rapha\xebl Colour Picker";
                i.style.display = "none";
                g.doc.body.appendChild(i);
                toHex = cacher(function (color) {
                    i.style.color = color;
                    return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
                });
            }
            return toHex(color);
        },
        hsbtoString = function () {
            return "hsb(" + [this.h, this.s, this.b] + ")";
        },
        hsltoString = function () {
            return "hsl(" + [this.h, this.s, this.l] + ")";
        },
        rgbtoString = function () {
            return this.hex;
        },
        prepareRGB = function (r, g, b) {
            if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
                b = r.b;
                g = r.g;
                r = r.r;
            }
            if (g == null && R.is(r, string)) {
                var clr = R.getRGB(r);
                r = clr.r;
                g = clr.g;
                b = clr.b;
            }
            if (r > 1 || g > 1 || b > 1) {
                r /= 255;
                g /= 255;
                b /= 255;
            }

            return [r, g, b];
        },
        packageRGB = function (r, g, b, o) {
            r *= 255;
            g *= 255;
            b *= 255;
            var rgb = {
                r: r,
                g: g,
                b: b,
                hex: R.rgb(r, g, b),
                toString: rgbtoString
            };
            R.is(o, "finite") && (rgb.opacity = o);
            return rgb;
        };


    R.color = function (clr) {
        var rgb;
        if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
            rgb = R.hsb2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
            rgb = R.hsl2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else {
            if (R.is(clr, "string")) {
                clr = R.getRGB(clr);
            }
            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
                rgb = R.rgb2hsl(clr);
                clr.h = rgb.h;
                clr.s = rgb.s;
                clr.l = rgb.l;
                rgb = R.rgb2hsb(clr);
                clr.v = rgb.b;
            } else {
                clr = {hex: "none"};
                clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
            }
        }
        clr.toString = rgbtoString;
        return clr;
    };

    R.hsb2rgb = function (h, s, v, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
            v = h.b;
            s = h.s;
            h = h.h;
            o = h.o;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = v - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };

    R.hsl2rgb = function (h, s, l, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
            l = h.l;
            s = h.s;
            h = h.h;
        }
        if (h > 1 || s > 1 || l > 1) {
            h /= 360;
            s /= 100;
            l /= 100;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = 2 * s * (l < .5 ? l : 1 - l);
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = l - C / 2;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };

    R.rgb2hsb = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, V, C;
        V = mmax(r, g, b);
        C = V - mmin(r, g, b);
        H = (C == 0 ? null :
                V == r ? (g - b) / C :
                    V == g ? (b - r) / C + 2 :
                    (r - g) / C + 4
        );
        H = ((H + 360) % 6) * 60 / 360;
        S = C == 0 ? 0 : C / V;
        return {h: H, s: S, b: V, toString: hsbtoString};
    };

    R.rgb2hsl = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, L, M, m, C;
        M = mmax(r, g, b);
        m = mmin(r, g, b);
        C = M - m;
        H = (C == 0 ? null :
            M == r ? (g - b) / C :
                M == g ? (b - r) / C + 2 :
                (r - g) / C + 4);
        H = ((H + 360) % 6) * 60 / 360;
        L = (M + m) / 2;
        S = (C == 0 ? 0 :
            L < .5 ? C / (2 * L) :
            C / (2 - 2 * L));
        return {h: H, s: S, l: L, toString: hsltoString};
    };
    R._path2string = function () {
        return this.join(",").replace(p2s, "$1");
    };
    function repush(array, item) {
        for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
            return array.push(array.splice(i, 1)[0]);
        }
    }
    function cacher(f, scope, postprocessor) {
        function newf() {
            var arg = Array.prototype.slice.call(arguments, 0),
                args = arg.join("\u2400"),
                cache = newf.cache = newf.cache || {},
                count = newf.count = newf.count || [];
            if (cache[has](args)) {
                repush(count, args);
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }
            count.length >= 1e3 && delete cache[count.shift()];
            count.push(args);
            cache[args] = f[apply](scope, arg);
            return postprocessor ? postprocessor(cache[args]) : cache[args];
        }
        return newf;
    }

    var preload = R._preload = function (src, f) {
        var img = g.doc.createElement("img");
        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        img.onload = function () {
            f.call(this);
            this.onload = null;
            g.doc.body.removeChild(this);
        };
        img.onerror = function () {
            g.doc.body.removeChild(this);
        };
        g.doc.body.appendChild(img);
        img.src = src;
    };

    function clrToString() {
        return this.hex;
    }


    R.getRGB = cacher(function (colour) {
        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
            return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none", toString: clrToString};
        }
        !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
        var res,
            red,
            green,
            blue,
            opacity,
            t,
            values,
            rgb = colour.match(colourRegExp);
        if (rgb) {
            if (rgb[2]) {
                blue = toInt(rgb[2].substring(5), 16);
                green = toInt(rgb[2].substring(3, 5), 16);
                red = toInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                green = toInt((t = rgb[3].charAt(2)) + t, 16);
                red = toInt((t = rgb[3].charAt(1)) + t, 16);
            }
            if (rgb[4]) {
                values = rgb[4][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
            }
            if (rgb[5]) {
                values = rgb[5][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsb2rgb(red, green, blue, opacity);
            }
            if (rgb[6]) {
                values = rgb[6][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsl2rgb(red, green, blue, opacity);
            }
            rgb = {r: red, g: green, b: blue, toString: clrToString};
            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
            R.is(opacity, "finite") && (rgb.opacity = opacity);
            return rgb;
        }
        return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
    }, R);

    R.hsb = cacher(function (h, s, b) {
        return R.hsb2rgb(h, s, b).hex;
    });

    R.hsl = cacher(function (h, s, l) {
        return R.hsl2rgb(h, s, l).hex;
    });

    R.rgb = cacher(function (r, g, b) {
        return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
    });

    R.getColor = function (value) {
        var start = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: value || .75},
            rgb = this.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            start.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: start.b});
        }
        return rgb.hex;
    };

    R.getColor.reset = function () {
        delete this.start;
    };

    // http://schepers.cc/getting-to-the-point
    function catmullRom2bezier(crp, z) {
        var d = [];
        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
            var p = [
                {x: +crp[i - 2], y: +crp[i - 1]},
                {x: +crp[i],     y: +crp[i + 1]},
                {x: +crp[i + 2], y: +crp[i + 3]},
                {x: +crp[i + 4], y: +crp[i + 5]}
            ];
            if (z) {
                if (!i) {
                    p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
                } else if (iLen - 4 == i) {
                    p[3] = {x: +crp[0], y: +crp[1]};
                } else if (iLen - 2 == i) {
                    p[2] = {x: +crp[0], y: +crp[1]};
                    p[3] = {x: +crp[2], y: +crp[3]};
                }
            } else {
                if (iLen - 4 == i) {
                    p[3] = p[2];
                } else if (!i) {
                    p[0] = {x: +crp[i], y: +crp[i + 1]};
                }
            }
            d.push(["C",
                (-p[0].x + 6 * p[1].x + p[2].x) / 6,
                (-p[0].y + 6 * p[1].y + p[2].y) / 6,
                (p[1].x + 6 * p[2].x - p[3].x) / 6,
                (p[1].y + 6*p[2].y - p[3].y) / 6,
                p[2].x,
                p[2].y
            ]);
        }

        return d;
    }

    R.parsePathString = function (pathString) {
        if (!pathString) {
            return null;
        }
        var pth = paths(pathString);
        if (pth.arr) {
            return pathClone(pth.arr);
        }

        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [];
        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
            data = pathClone(pathString);
        }
        if (!data.length) {
            Str(pathString).replace(pathCommand, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b][concat](params.splice(0, 2)));
                    name = "l";
                    b = b == "m" ? "l" : "L";
                }
                if (name == "r") {
                    data.push([b][concat](params));
                } else while (params.length >= paramCounts[name]) {
                    data.push([b][concat](params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = R._path2string;
        pth.arr = pathClone(data);
        return data;
    };

    R.parseTransformString = cacher(function (TString) {
        if (!TString) {
            return null;
        }
        var paramCounts = {r: 3, s: 4, t: 2, m: 6},
            data = [];
        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
            data = pathClone(TString);
        }
        if (!data.length) {
            Str(TString).replace(tCommand, function (a, b, c) {
                var params = [],
                    name = lowerCase.call(b);
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                data.push([b][concat](params));
            });
        }
        data.toString = R._path2string;
        return data;
    });
    // PATHS
    var paths = function (ps) {
        var p = paths.ps = paths.ps || {};
        if (p[ps]) {
            p[ps].sleep = 100;
        } else {
            p[ps] = {
                sleep: 100
            };
        }
        setTimeout(function () {
            for (var key in p) if (p[has](key) && key != ps) {
                p[key].sleep--;
                !p[key].sleep && delete p[key];
            }
        });
        return p[ps];
    };

    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t,
            t13 = pow(t1, 3),
            t12 = pow(t1, 2),
            t2 = t * t,
            t3 = t2 * t,
            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
            ax = t1 * p1x + t * c1x,
            ay = t1 * p1y + t * c1y,
            cx = t1 * c2x + t * p2x,
            cy = t1 * c2y + t * p2y,
            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
        (mx > nx || my < ny) && (alpha += 180);
        return {
            x: x,
            y: y,
            m: {x: mx, y: my},
            n: {x: nx, y: ny},
            start: {x: ax, y: ay},
            end: {x: cx, y: cy},
            alpha: alpha
        };
    };

    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        if (!R.is(p1x, "array")) {
            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
        }
        var bbox = curveDim.apply(null, p1x);
        return {
            x: bbox.min.x,
            y: bbox.min.y,
            x2: bbox.max.x,
            y2: bbox.max.y,
            width: bbox.max.x - bbox.min.x,
            height: bbox.max.y - bbox.min.y
        };
    };

    R.isPointInsideBBox = function (bbox, x, y) {
        return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
    };

    R.isBBoxIntersect = function (bbox1, bbox2) {
        var i = R.isPointInsideBBox;
        return i(bbox2, bbox1.x, bbox1.y)
            || i(bbox2, bbox1.x2, bbox1.y)
            || i(bbox2, bbox1.x, bbox1.y2)
            || i(bbox2, bbox1.x2, bbox1.y2)
            || i(bbox1, bbox2.x, bbox2.y)
            || i(bbox1, bbox2.x2, bbox2.y)
            || i(bbox1, bbox2.x, bbox2.y2)
            || i(bbox1, bbox2.x2, bbox2.y2)
            || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
            && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
    };
    function base3(t, p1, p2, p3, p4) {
        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
        return t * t2 - 3 * p1 + 3 * p2;
    }
    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
        if (z == null) {
            z = 1;
        }
        z = z > 1 ? 1 : z < 0 ? 0 : z;
        var z2 = z / 2,
            n = 12,
            Tvalues = [-0.1252,0.1252,-0.3678,0.3678,-0.5873,0.5873,-0.7699,0.7699,-0.9041,0.9041,-0.9816,0.9816],
            Cvalues = [0.2491,0.2491,0.2335,0.2335,0.2032,0.2032,0.1601,0.1601,0.1069,0.1069,0.0472,0.0472],
            sum = 0;
        for (var i = 0; i < n; i++) {
            var ct = z2 * Tvalues[i] + z2,
                xbase = base3(ct, x1, x2, x3, x4),
                ybase = base3(ct, y1, y2, y3, y4),
                comb = xbase * xbase + ybase * ybase;
            sum += Cvalues[i] * math.sqrt(comb);
        }
        return z2 * sum;
    }
    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
        if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
            return;
        }
        var t = 1,
            step = t / 2,
            t2 = t - step,
            l,
            e = .01;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        while (abs(l - ll) > e) {
            step /= 2;
            t2 += (l < ll ? 1 : -1) * step;
            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        }
        return t2;
    }
    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        if (
            mmax(x1, x2) < mmin(x3, x4) ||
            mmin(x1, x2) > mmax(x3, x4) ||
            mmax(y1, y2) < mmin(y3, y4) ||
            mmin(y1, y2) > mmax(y3, y4)
        ) {
            return;
        }
        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (!denominator) {
            return;
        }
        var px = nx / denominator,
            py = ny / denominator,
            px2 = +px.toFixed(2),
            py2 = +py.toFixed(2);
        if (
            px2 < +mmin(x1, x2).toFixed(2) ||
            px2 > +mmax(x1, x2).toFixed(2) ||
            px2 < +mmin(x3, x4).toFixed(2) ||
            px2 > +mmax(x3, x4).toFixed(2) ||
            py2 < +mmin(y1, y2).toFixed(2) ||
            py2 > +mmax(y1, y2).toFixed(2) ||
            py2 < +mmin(y3, y4).toFixed(2) ||
            py2 > +mmax(y3, y4).toFixed(2)
        ) {
            return;
        }
        return {x: px, y: py};
    }
    function inter(bez1, bez2) {
        return interHelper(bez1, bez2);
    }
    function interCount(bez1, bez2) {
        return interHelper(bez1, bez2, 1);
    }
    function interHelper(bez1, bez2, justCount) {
        var bbox1 = R.bezierBBox(bez1),
            bbox2 = R.bezierBBox(bez2);
        if (!R.isBBoxIntersect(bbox1, bbox2)) {
            return justCount ? 0 : [];
        }
        var l1 = bezlen.apply(0, bez1),
            l2 = bezlen.apply(0, bez2),
            n1 = ~~(l1 / 5),
            n2 = ~~(l2 / 5),
            dots1 = [],
            dots2 = [],
            xy = {},
            res = justCount ? 0 : [];
        for (var i = 0; i < n1 + 1; i++) {
            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
            dots1.push({x: p.x, y: p.y, t: i / n1});
        }
        for (i = 0; i < n2 + 1; i++) {
            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
            dots2.push({x: p.x, y: p.y, t: i / n2});
        }
        for (i = 0; i < n1; i++) {
            for (var j = 0; j < n2; j++) {
                var di = dots1[i],
                    di1 = dots1[i + 1],
                    dj = dots2[j],
                    dj1 = dots2[j + 1],
                    ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                    cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                    is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                if (is) {
                    if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                        continue;
                    }
                    xy[is.x.toFixed(4)] = is.y.toFixed(4);
                    var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                        t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
                        if (justCount) {
                            res++;
                        } else {
                            res.push({
                                x: is.x,
                                y: is.y,
                                t1: t1,
                                t2: t2
                            });
                        }
                    }
                }
            }
        }
        return res;
    }

    R.pathIntersection = function (path1, path2) {
        return interPathHelper(path1, path2);
    };
    R.pathIntersectionNumber = function (path1, path2) {
        return interPathHelper(path1, path2, 1);
    };
    function interPathHelper(path1, path2, justCount) {
        path1 = R._path2curve(path1);
        path2 = R._path2curve(path2);
        var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
            res = justCount ? 0 : [];
        for (var i = 0, ii = path1.length; i < ii; i++) {
            var pi = path1[i];
            if (pi[0] == "M") {
                x1 = x1m = pi[1];
                y1 = y1m = pi[2];
            } else {
                if (pi[0] == "C") {
                    bez1 = [x1, y1].concat(pi.slice(1));
                    x1 = bez1[6];
                    y1 = bez1[7];
                } else {
                    bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                    x1 = x1m;
                    y1 = y1m;
                }
                for (var j = 0, jj = path2.length; j < jj; j++) {
                    var pj = path2[j];
                    if (pj[0] == "M") {
                        x2 = x2m = pj[1];
                        y2 = y2m = pj[2];
                    } else {
                        if (pj[0] == "C") {
                            bez2 = [x2, y2].concat(pj.slice(1));
                            x2 = bez2[6];
                            y2 = bez2[7];
                        } else {
                            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                            x2 = x2m;
                            y2 = y2m;
                        }
                        var intr = interHelper(bez1, bez2, justCount);
                        if (justCount) {
                            res += intr;
                        } else {
                            for (var k = 0, kk = intr.length; k < kk; k++) {
                                intr[k].segment1 = i;
                                intr[k].segment2 = j;
                                intr[k].bez1 = bez1;
                                intr[k].bez2 = bez2;
                            }
                            res = res.concat(intr);
                        }
                    }
                }
            }
        }
        return res;
    }

    R.isPointInsidePath = function (path, x, y) {
        var bbox = R.pathBBox(path);
        return R.isPointInsideBBox(bbox, x, y) &&
            interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
    };
    R._removedFactory = function (methodname) {
        return function () {
            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname);
        };
    };

    var pathDimensions = R.pathBBox = function (path) {
            var pth = paths(path);
            if (pth.bbox) {
                return pth.bbox;
            }
            if (!path) {
                return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
            }
            path = path2curve(path);
            var x = 0,
                y = 0,
                X = [],
                Y = [],
                p;
            for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                    x = p[1];
                    y = p[2];
                    X.push(x);
                    Y.push(y);
                } else {
                    var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                    X = X[concat](dim.min.x, dim.max.x);
                    Y = Y[concat](dim.min.y, dim.max.y);
                    x = p[5];
                    y = p[6];
                }
            }
            var xmin = mmin[apply](0, X),
                ymin = mmin[apply](0, Y),
                xmax = mmax[apply](0, X),
                ymax = mmax[apply](0, Y),
                bb = {
                    x: xmin,
                    y: ymin,
                    x2: xmax,
                    y2: ymax,
                    width: xmax - xmin,
                    height: ymax - ymin
                };
            pth.bbox = clone(bb);
            return bb;
        },
        pathClone = function (pathArray) {
            var res = clone(pathArray);
            res.toString = R._path2string;
            return res;
        },
        pathToRelative = R._pathToRelative = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.rel) {
                return pathClone(pth.rel);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = pathArray[0][1];
                y = pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res.push(["M", x, y]);
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != lowerCase.call(pa[0])) {
                    r[0] = lowerCase.call(pa[0]);
                    switch (r[0]) {
                        case "a":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] - x).toFixed(3);
                            r[7] = +(pa[7] - y).toFixed(3);
                            break;
                        case "v":
                            r[1] = +(pa[1] - y).toFixed(3);
                            break;
                        case "m":
                            mx = pa[1];
                            my = pa[2];
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                            }
                    }
                } else {
                    r = res[i] = [];
                    if (pa[0] == "m") {
                        mx = pa[1] + x;
                        my = pa[2] + y;
                    }
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                var len = res[i].length;
                switch (res[i][0]) {
                    case "z":
                        x = mx;
                        y = my;
                        break;
                    case "h":
                        x += +res[i][len - 1];
                        break;
                    case "v":
                        y += +res[i][len - 1];
                        break;
                    default:
                        x += +res[i][len - 2];
                        y += +res[i][len - 1];
                }
            }
            res.toString = R._path2string;
            pth.rel = pathClone(res);
            return res;
        },
        pathToAbsolute = R._pathToAbsolute = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.abs) {
                return pathClone(pth.abs);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            if (!pathArray || !pathArray.length) {
                return [["M", 0, 0]];
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = +pathArray[0][1];
                y = +pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res[0] = ["M", x, y];
            }
            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                res.push(r = []);
                pa = pathArray[i];
                if (pa[0] != upperCase.call(pa[0])) {
                    r[0] = upperCase.call(pa[0]);
                    switch (r[0]) {
                        case "A":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] + x);
                            r[7] = +(pa[7] + y);
                            break;
                        case "V":
                            r[1] = +pa[1] + y;
                            break;
                        case "H":
                            r[1] = +pa[1] + x;
                            break;
                        case "R":
                            var dots = [x, y][concat](pa.slice(1));
                            for (var j = 2, jj = dots.length; j < jj; j++) {
                                dots[j] = +dots[j] + x;
                                dots[++j] = +dots[j] + y;
                            }
                            res.pop();
                            res = res[concat](catmullRom2bezier(dots, crz));
                            break;
                        case "M":
                            mx = +pa[1] + x;
                            my = +pa[2] + y;
                        default:
                            for (j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +pa[j] + ((j % 2) ? x : y);
                            }
                    }
                } else if (pa[0] == "R") {
                    dots = [x, y][concat](pa.slice(1));
                    res.pop();
                    res = res[concat](catmullRom2bezier(dots, crz));
                    r = ["R"][concat](pa.slice(-2));
                } else {
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        r[k] = pa[k];
                    }
                }
                switch (r[0]) {
                    case "Z":
                        x = mx;
                        y = my;
                        break;
                    case "H":
                        x = r[1];
                        break;
                    case "V":
                        y = r[1];
                        break;
                    case "M":
                        mx = r[r.length - 2];
                        my = r[r.length - 1];
                    default:
                        x = r[r.length - 2];
                        y = r[r.length - 1];
                }
            }
            res.toString = R._path2string;
            pth.abs = pathClone(res);
            return res;
        },
        l2c = function (x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2];
        },
        q2c = function (x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
                _23 = 2 / 3;
            return [
                _13 * x1 + _23 * ax,
                _13 * y1 + _23 * ay,
                _13 * x2 + _23 * ax,
                _13 * y2 + _23 * ay,
                x2,
                y2
            ];
        },
        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = PI * 120 / 180,
                rad = PI / 180 * (+angle || 0),
                res = [],
                xy,
                rotate = cacher(function (x, y, rad) {
                    var X = x * math.cos(rad) - y * math.sin(rad),
                        Y = x * math.sin(rad) + y * math.cos(rad);
                    return {x: X, y: Y};
                });
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = math.cos(PI / 180 * angle),
                    sin = math.sin(PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                if (h > 1) {
                    h = math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? PI - f1 : f1;
                f2 = x2 < cx ? PI - f2 : f2;
                f1 < 0 && (f1 = PI * 2 + f1);
                f2 < 0 && (f2 = PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * math.cos(f2);
                y2 = cy + ry * math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
                s1 = math.sin(f1),
                c2 = math.cos(f2),
                s2 = math.sin(f2),
                t = math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4][concat](res);
            } else {
                res = [m2, m3, m4][concat](res).join()[split](",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
        },
        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            };
        },
        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                c = p1x - c1x,
                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                y = [p1y, p2y],
                x = [p1x, p2x],
                dot;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
            c = p1y - c1y;
            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            return {
                min: {x: mmin[apply](0, x), y: mmin[apply](0, y)},
                max: {x: mmax[apply](0, x), y: mmax[apply](0, y)}
            };
        }),
        path2curve = R._path2curve = cacher(function (path, path2) {
            var pth = !path2 && paths(path);
            if (!path2 && pth.curve) {
                return pathClone(pth.curve);
            }
            var p = pathToAbsolute(path),
                p2 = path2 && pathToAbsolute(path2),
                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                processPath = function (path, d) {
                    var nx, ny;
                    if (!path) {
                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                    }
                    !(path[0] in {T:1, Q:1}) && (d.qx = d.qy = null);
                    switch (path[0]) {
                        case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;
                        case "A":
                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                            break;
                        case "S":
                            nx = d.x + (d.x - (d.bx || d.x));
                            ny = d.y + (d.y - (d.by || d.y));
                            path = ["C", nx, ny][concat](path.slice(1));
                            break;
                        case "T":
                            d.qx = d.x + (d.x - (d.qx || d.x));
                            d.qy = d.y + (d.y - (d.qy || d.y));
                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;
                        case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;
                        case "L":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                            break;
                        case "H":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                            break;
                        case "V":
                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                            break;
                        case "Z":
                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                            break;
                    }
                    return path;
                },
                fixArc = function (pp, i) {
                    if (pp[i].length > 7) {
                        pp[i].shift();
                        var pi = pp[i];
                        while (pi.length) {
                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                        }
                        pp.splice(i, 1);
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                fixM = function (path1, path2, a1, a2, i) {
                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                        path2.splice(i, 0, ["M", a2.x, a2.y]);
                        a1.bx = 0;
                        a1.by = 0;
                        a1.x = path1[i][1];
                        a1.y = path1[i][2];
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                };
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                p[i] = processPath(p[i], attrs);
                fixArc(p, i);
                p2 && (p2[i] = processPath(p2[i], attrs2));
                p2 && fixArc(p2, i);
                fixM(p, p2, attrs, attrs2, i);
                fixM(p2, p, attrs2, attrs, i);
                var seg = p[i],
                    seg2 = p2 && p2[i],
                    seglen = seg.length,
                    seg2len = p2 && seg2.length;
                attrs.x = seg[seglen - 2];
                attrs.y = seg[seglen - 1];
                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                attrs2.x = p2 && seg2[seg2len - 2];
                attrs2.y = p2 && seg2[seg2len - 1];
            }
            if (!p2) {
                pth.curve = pathClone(p);
            }
            return p2 ? [p, p2] : p;
        }, null, pathClone),
        parseDots = R._parseDots = cacher(function (gradient) {
            var dots = [];
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {},
                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = R.getRGB(par[1]);
                if (dot.color.error) {
                    return null;
                }
                dot.color = dot.color.hex;
                par[2] && (dot.offset = par[2] + "%");
                dots.push(dot);
            }
            for (i = 1, ii = dots.length - 1; i < ii; i++) {
                if (!dots[i].offset) {
                    var start = toFloat(dots[i - 1].offset || 0),
                        end = 0;
                    for (var j = i + 1; j < ii; j++) {
                        if (dots[j].offset) {
                            end = dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = toFloat(end);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        dots[i].offset = start + "%";
                    }
                }
            }
            return dots;
        }),
        tear = R._tear = function (el, paper) {
            el == paper.top && (paper.top = el.prev);
            el == paper.bottom && (paper.bottom = el.next);
            el.next && (el.next.prev = el.prev);
            el.prev && (el.prev.next = el.next);
        },
        tofront = R._tofront = function (el, paper) {
            if (paper.top === el) {
                return;
            }
            tear(el, paper);
            el.next = null;
            el.prev = paper.top;
            paper.top.next = el;
            paper.top = el;
        },
        toback = R._toback = function (el, paper) {
            if (paper.bottom === el) {
                return;
            }
            tear(el, paper);
            el.next = paper.bottom;
            el.prev = null;
            paper.bottom.prev = el;
            paper.bottom = el;
        },
        insertafter = R._insertafter = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.top && (paper.top = el);
            el2.next && (el2.next.prev = el);
            el.next = el2.next;
            el.prev = el2;
            el2.next = el;
        },
        insertbefore = R._insertbefore = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.bottom && (paper.bottom = el);
            el2.prev && (el2.prev.next = el);
            el.prev = el2.prev;
            el2.prev = el;
            el.next = el2;
        },

        toMatrix = R.toMatrix = function (path, transform) {
            var bb = pathDimensions(path),
                el = {
                    _: {
                        transform: E
                    },
                    getBBox: function () {
                        return bb;
                    }
                };
            extractTransform(el, transform);
            return el.matrix;
        },

        transformPath = R.transformPath = function (path, transform) {
            return mapPath(path, toMatrix(path, transform));
        },
        extractTransform = R._extractTransform = function (el, tstr) {
            if (tstr == null) {
                return el._.transform;
            }
            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
            var tdata = R.parseTransformString(tstr),
                deg = 0,
                dx = 0,
                dy = 0,
                sx = 1,
                sy = 1,
                _ = el._,
                m = new Matrix;
            _.transform = tdata || [];
            if (tdata) {
                for (var i = 0, ii = tdata.length; i < ii; i++) {
                    var t = tdata[i],
                        tlen = t.length,
                        command = Str(t[0]).toLowerCase(),
                        absolute = t[0] != command,
                        inver = absolute ? m.invert() : 0,
                        x1,
                        y1,
                        x2,
                        y2,
                        bb;
                    if (command == "t" && tlen == 3) {
                        if (absolute) {
                            x1 = inver.x(0, 0);
                            y1 = inver.y(0, 0);
                            x2 = inver.x(t[1], t[2]);
                            y2 = inver.y(t[1], t[2]);
                            m.translate(x2 - x1, y2 - y1);
                        } else {
                            m.translate(t[1], t[2]);
                        }
                    } else if (command == "r") {
                        if (tlen == 2) {
                            bb = bb || el.getBBox(1);
                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            deg += t[1];
                        } else if (tlen == 4) {
                            if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.rotate(t[1], x2, y2);
                            } else {
                                m.rotate(t[1], t[2], t[3]);
                            }
                            deg += t[1];
                        }
                    } else if (command == "s") {
                        if (tlen == 2 || tlen == 3) {
                            bb = bb || el.getBBox(1);
                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            sx *= t[1];
                            sy *= t[tlen - 1];
                        } else if (tlen == 5) {
                            if (absolute) {
                                x2 = inver.x(t[3], t[4]);
                                y2 = inver.y(t[3], t[4]);
                                m.scale(t[1], t[2], x2, y2);
                            } else {
                                m.scale(t[1], t[2], t[3], t[4]);
                            }
                            sx *= t[1];
                            sy *= t[2];
                        }
                    } else if (command == "m" && tlen == 7) {
                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    _.dirtyT = 1;
                    el.matrix = m;
                }
            }


            el.matrix = m;

            _.sx = sx;
            _.sy = sy;
            _.deg = deg;
            _.dx = dx = m.e;
            _.dy = dy = m.f;

            if (sx == 1 && sy == 1 && !deg && _.bbox) {
                _.bbox.x += +dx;
                _.bbox.y += +dy;
            } else {
                _.dirtyT = 1;
            }
        },
        getEmpty = function (item) {
            var l = item[0];
            switch (l.toLowerCase()) {
                case "t": return [l, 0, 0];
                case "m": return [l, 1, 0, 0, 1, 0, 0];
                case "r": if (item.length == 4) {
                    return [l, 0, item[2], item[3]];
                } else {
                    return [l, 0];
                }
                case "s": if (item.length == 5) {
                    return [l, 1, 1, item[3], item[4]];
                } else if (item.length == 3) {
                    return [l, 1, 1];
                } else {
                    return [l, 1];
                }
            }
        },
        equaliseTransform = R._equaliseTransform = function (t1, t2) {
            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
            t1 = R.parseTransformString(t1) || [];
            t2 = R.parseTransformString(t2) || [];
            var maxlength = mmax(t1.length, t2.length),
                from = [],
                to = [],
                i = 0, j, jj,
                tt1, tt2;
            for (; i < maxlength; i++) {
                tt1 = t1[i] || getEmpty(t2[i]);
                tt2 = t2[i] || getEmpty(tt1);
                if ((tt1[0] != tt2[0]) ||
                    (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) ||
                    (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))
                ) {
                    return;
                }
                from[i] = [];
                to[i] = [];
                for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                    j in tt1 && (from[i][j] = tt1[j]);
                    j in tt2 && (to[i][j] = tt2[j]);
                }
            }
            return {
                from: from,
                to: to
            };
        };
    R._getContainer = function (x, y, w, h) {
        var container;
        container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
        if (container == null) {
            return;
        }
        if (container.tagName) {
            if (y == null) {
                return {
                    container: container,
                    width: container.style.pixelWidth || container.offsetWidth,
                    height: container.style.pixelHeight || container.offsetHeight
                };
            } else {
                return {
                    container: container,
                    width: y,
                    height: w
                };
            }
        }
        return {
            container: 1,
            x: x,
            y: y,
            width: w,
            height: h
        };
    };

    R.pathToRelative = pathToRelative;
    R._engine = {};

    R.path2curve = path2curve;

    R.matrix = function (a, b, c, d, e, f) {
        return new Matrix(a, b, c, d, e, f);
    };
    function Matrix(a, b, c, d, e, f) {
        if (a != null) {
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.d = +d;
            this.e = +e;
            this.f = +f;
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }
    (function (matrixproto) {

        matrixproto.add = function (a, b, c, d, e, f) {
            var out = [[], [], []],
                m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
                x, y, z, res;

            if (a && a instanceof Matrix) {
                matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]];
            }

            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    res = 0;
                    for (z = 0; z < 3; z++) {
                        res += m[x][z] * matrix[z][y];
                    }
                    out[x][y] = res;
                }
            }
            this.a = out[0][0];
            this.b = out[1][0];
            this.c = out[0][1];
            this.d = out[1][1];
            this.e = out[0][2];
            this.f = out[1][2];
        };

        matrixproto.invert = function () {
            var me = this,
                x = me.a * me.d - me.b * me.c;
            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
        };

        matrixproto.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
        };

        matrixproto.translate = function (x, y) {
            this.add(1, 0, 0, 1, x, y);
        };

        matrixproto.scale = function (x, y, cx, cy) {
            y == null && (y = x);
            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
            this.add(x, 0, 0, y, 0, 0);
            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
        };

        matrixproto.rotate = function (a, x, y) {
            a = R.rad(a);
            x = x || 0;
            y = y || 0;
            var cos = +math.cos(a).toFixed(9),
                sin = +math.sin(a).toFixed(9);
            this.add(cos, sin, -sin, cos, x, y);
            this.add(1, 0, 0, 1, -x, -y);
        };

        matrixproto.x = function (x, y) {
            return x * this.a + y * this.c + this.e;
        };

        matrixproto.y = function (x, y) {
            return x * this.b + y * this.d + this.f;
        };
        matrixproto.get = function (i) {
            return +this[Str.fromCharCode(97 + i)].toFixed(4);
        };
        matrixproto.toString = function () {
            return R.svg ?
            "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" :
                [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        };
        matrixproto.toFilter = function () {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) +
                ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) +
                ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        };
        matrixproto.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        function norm(a) {
            return a[0] * a[0] + a[1] * a[1];
        }
        function normalize(a) {
            var mag = math.sqrt(norm(a));
            a[0] && (a[0] /= mag);
            a[1] && (a[1] /= mag);
        }

        matrixproto.split = function () {
            var out = {};
            // translation
            out.dx = this.e;
            out.dy = this.f;

            // scale and shear
            var row = [[this.a, this.c], [this.b, this.d]];
            out.scalex = math.sqrt(norm(row[0]));
            normalize(row[0]);

            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

            out.scaley = math.sqrt(norm(row[1]));
            normalize(row[1]);
            out.shear /= out.scaley;

            // rotation
            var sin = -row[0][1],
                cos = row[1][1];
            if (cos < 0) {
                out.rotate = R.deg(math.acos(cos));
                if (sin < 0) {
                    out.rotate = 360 - out.rotate;
                }
            } else {
                out.rotate = R.deg(math.asin(sin));
            }

            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
            return out;
        };

        matrixproto.toTransformString = function (shorter) {
            var s = shorter || this[split]();
            if (s.isSimple) {
                s.scalex = +s.scalex.toFixed(4);
                s.scaley = +s.scaley.toFixed(4);
                s.rotate = +s.rotate.toFixed(4);
                return  (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) +
                    (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) +
                    (s.rotate ? "r" + [s.rotate, 0, 0] : E);
            } else {
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
            }
        };
    })(Matrix.prototype);

    // WebKit rendering bug workaround method
    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") ||
        (navigator.vendor == "Google Inc." && version && version[1] < 8)) {

        paperproto.safari = function () {
            var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
            setTimeout(function () {rect.remove();});
        };
    } else {
        paperproto.safari = fun;
    }

    var preventDefault = function () {
            this.returnValue = false;
        },
        preventTouch = function () {
            return this.originalEvent.preventDefault();
        },
        stopPropagation = function () {
            this.cancelBubble = true;
        },
        stopTouch = function () {
            return this.originalEvent.stopPropagation();
        },
        addEvent = (function () {
            if (g.doc.addEventListener) {
                return function (obj, type, fn, element) {
                    var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
                        f = function (e) {
                            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                                x = e.clientX + scrollX,
                                y = e.clientY + scrollY;
                            if (supportsTouch && touchMap[has](type)) {
                                for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                                    if (e.targetTouches[i].target == obj) {
                                        var olde = e;
                                        e = e.targetTouches[i];
                                        e.originalEvent = olde;
                                        e.preventDefault = preventTouch;
                                        e.stopPropagation = stopTouch;
                                        break;
                                    }
                                }
                            }
                            return fn.call(element, e, x, y);
                        };
                    obj.addEventListener(realName, f, false);
                    return function () {
                        obj.removeEventListener(realName, f, false);
                        return true;
                    };
                };
            } else if (g.doc.attachEvent) {
                return function (obj, type, fn, element) {
                    var f = function (e) {
                        e = e || g.win.event;
                        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                            x = e.clientX + scrollX,
                            y = e.clientY + scrollY;
                        e.preventDefault = e.preventDefault || preventDefault;
                        e.stopPropagation = e.stopPropagation || stopPropagation;
                        return fn.call(element, e, x, y);
                    };
                    obj.attachEvent("on" + type, f);
                    var detacher = function () {
                        obj.detachEvent("on" + type, f);
                        return true;
                    };
                    return detacher;
                };
            }
        })(),
        drag = [],
        dragMove = function (e) {
            var x = e.clientX,
                y = e.clientY,
                scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                dragi,
                j = drag.length;
            while (j--) {
                dragi = drag[j];
                if (supportsTouch) {
                    var i = e.touches.length,
                        touch;
                    while (i--) {
                        touch = e.touches[i];
                        if (touch.identifier == dragi.el._drag.id) {
                            x = touch.clientX;
                            y = touch.clientY;
                            (e.originalEvent ? e.originalEvent : e).preventDefault();
                            break;
                        }
                    }
                } else {
                    e.preventDefault();
                }
                var node = dragi.el.node,
                    o,
                    next = node.nextSibling,
                    parent = node.parentNode,
                    display = node.style.display;
                g.win.opera && parent.removeChild(node);
                node.style.display = "none";
                o = dragi.el.paper.getElementByPoint(x, y);
                node.style.display = display;
                g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
                o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
                x += scrollX;
                y += scrollY;
                eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
            }
        },
        dragUp = function (e) {
            R.unmousemove(dragMove).unmouseup(dragUp);
            var i = drag.length,
                dragi;
            while (i--) {
                dragi = drag[i];
                dragi.el._drag = {};
                eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
            }
            drag = [];
        },

        elproto = R.el = {};
































    for (var i = events.length; i--;) {
        (function (eventName) {
            R[eventName] = elproto[eventName] = function (fn, scope) {
                if (R.is(fn, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)});
                }
                return this;
            };
            R["un" + eventName] = elproto["un" + eventName] = function (fn) {
                var events = this.events || [],
                    l = events.length;
                while (l--) if (events[l].name == eventName && events[l].f == fn) {
                    events[l].unbind();
                    events.splice(l, 1);
                    !events.length && delete this.events;
                    return this;
                }
                return this;
            };
        })(events[i]);
    }


    elproto.data = function (key, value) {
        var data = eldata[this.id] = eldata[this.id] || {};
        if (arguments.length == 1) {
            if (R.is(key, "object")) {
                for (var i in key) if (key[has](i)) {
                    this.data(i, key[i]);
                }
                return this;
            }
            eve("raphael.data.get." + this.id, this, data[key], key);
            return data[key];
        }
        data[key] = value;
        eve("raphael.data.set." + this.id, this, value, key);
        return this;
    };

    elproto.removeData = function (key) {
        if (key == null) {
            eldata[this.id] = {};
        } else {
            eldata[this.id] && delete eldata[this.id][key];
        }
        return this;
    };

    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };

    elproto.unhover = function (f_in, f_out) {
        return this.unmouseover(f_in).unmouseout(f_out);
    };
    var draggable = [];

    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
        function start(e) {
            (e.originalEvent || e).preventDefault();
            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            this._drag.x = e.clientX + scrollX;
            this._drag.y = e.clientY + scrollY;
            this._drag.id = e.identifier;
            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
            drag.push({el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
            onstart && eve.on("raphael.drag.start." + this.id, onstart);
            onmove && eve.on("raphael.drag.move." + this.id, onmove);
            onend && eve.on("raphael.drag.end." + this.id, onend);
            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
        }
        this._drag = {};
        draggable.push({el: this, start: start});
        this.mousedown(start);
        return this;
    };

    elproto.onDragOver = function (f) {
        f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
    };

    elproto.undrag = function () {
        var i = draggable.length;
        while (i--) if (draggable[i].el == this) {
            this.unmousedown(draggable[i].start);
            draggable.splice(i, 1);
            eve.unbind("raphael.drag.*." + this.id);
        }
        !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
    };

    paperproto.circle = function (x, y, r) {
        var out = R._engine.circle(this, x || 0, y || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.rect = function (x, y, w, h, r) {
        var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.ellipse = function (x, y, rx, ry) {
        var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.path = function (pathString) {
        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
        var out = R._engine.path(R.format[apply](R, arguments), this);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.image = function (src, x, y, w, h) {
        var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.text = function (x, y, text) {
        var out = R._engine.text(this, x || 0, y || 0, Str(text));
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.set = function (itemsArray) {
        !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
        var out = new Set(itemsArray);
        this.__set__ && this.__set__.push(out);
        return out;
    };

    paperproto.setStart = function (set) {
        this.__set__ = set || this.set();
    };

    paperproto.setFinish = function (set) {
        var out = this.__set__;
        delete this.__set__;
        return out;
    };

    paperproto.setSize = function (width, height) {
        return R._engine.setSize.call(this, width, height);
    };

    paperproto.setViewBox = function (x, y, w, h, fit) {
        return R._engine.setViewBox.call(this, x, y, w, h, fit);
    };


    paperproto.top = paperproto.bottom = null;

    paperproto.raphael = R;
    var getOffset = function (elem) {
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top  = box.top  + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop ) - clientTop,
            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
        return {
            y: top,
            x: left
        };
    };

    paperproto.getElementByPoint = function (x, y) {
        var paper = this,
            svg = paper.canvas,
            target = g.doc.elementFromPoint(x, y);
        if (g.win.opera && target.tagName == "svg") {
            var so = getOffset(svg),
                sr = svg.createSVGRect();
            sr.x = x - so.x;
            sr.y = y - so.y;
            sr.width = sr.height = 1;
            var hits = svg.getIntersectionList(sr, null);
            if (hits.length) {
                target = hits[hits.length - 1];
            }
        }
        if (!target) {
            return null;
        }
        while (target.parentNode && target != svg.parentNode && !target.raphael) {
            target = target.parentNode;
        }
        target == paper.canvas.parentNode && (target = svg);
        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
        return target;
    };

    paperproto.getById = function (id) {
        var bot = this.bottom;
        while (bot) {
            if (bot.id == id) {
                return bot;
            }
            bot = bot.next;
        }
        return null;
    };

    paperproto.forEach = function (callback, thisArg) {
        var bot = this.bottom;
        while (bot) {
            if (callback.call(thisArg, bot) === false) {
                return this;
            }
            bot = bot.next;
        }
        return this;
    };

    paperproto.getElementsByPoint = function (x, y) {
        var set = this.set();
        this.forEach(function (el) {
            if (el.isPointInside(x, y)) {
                set.push(el);
            }
        });
        return set;
    };
    function x_y() {
        return this.x + S + this.y;
    }
    function x_y_w_h() {
        return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
    }

    elproto.isPointInside = function (x, y) {
        var rp = this.realPath = this.realPath || getPath[this.type](this);
        return R.isPointInsidePath(rp, x, y);
    };

    elproto.getBBox = function (isWithoutTransform) {
        if (this.removed) {
            return {};
        }
        var _ = this._;
        if (isWithoutTransform) {
            if (_.dirty || !_.bboxwt) {
                this.realPath = getPath[this.type](this);
                _.bboxwt = pathDimensions(this.realPath);
                _.bboxwt.toString = x_y_w_h;
                _.dirty = 0;
            }
            return _.bboxwt;
        }
        if (_.dirty || _.dirtyT || !_.bbox) {
            if (_.dirty || !this.realPath) {
                _.bboxwt = 0;
                this.realPath = getPath[this.type](this);
            }
            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
            _.bbox.toString = x_y_w_h;
            _.dirty = _.dirtyT = 0;
        }
        return _.bbox;
    };

    elproto.clone = function () {
        if (this.removed) {
            return null;
        }
        var out = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(out);
        return out;
    };

    elproto.glow = function (glow) {
        if (this.type == "text") {
            return null;
        }
        glow = glow || {};
        var s = {
                width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
                fill: glow.fill || false,
                opacity: glow.opacity || .5,
                offsetx: glow.offsetx || 0,
                offsety: glow.offsety || 0,
                color: glow.color || "#000"
            },
            c = s.width / 2,
            r = this.paper,
            out = r.set(),
            path = this.realPath || getPath[this.type](this);
        path = this.matrix ? mapPath(path, this.matrix) : path;
        for (var i = 1; i < c + 1; i++) {
            out.push(r.path(path).attr({
                stroke: s.color,
                fill: s.fill ? s.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(s.width / c * i).toFixed(3),
                opacity: +(s.opacity / c).toFixed(3)
            }));
        }
        return out.insertBefore(this).translate(s.offsetx, s.offsety);
    };
    var curveslengths = {},
        getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
            if (length == null) {
                return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
            } else {
                return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
            }
        },
        getLengthFactory = function (istotal, subpath) {
            return function (path, length, onlystart) {
                path = path2curve(path);
                var x, y, p, l, sp = "", subpaths = {}, point,
                    len = 0;
                for (var i = 0, ii = path.length; i < ii; i++) {
                    p = path[i];
                    if (p[0] == "M") {
                        x = +p[1];
                        y = +p[2];
                    } else {
                        l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                        if (len + l > length) {
                            if (subpath && !subpaths.start) {
                                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                                if (onlystart) {return sp;}
                                subpaths.start = sp;
                                sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                                len += l;
                                x = +p[5];
                                y = +p[6];
                                continue;
                            }
                            if (!istotal && !subpath) {
                                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                return {x: point.x, y: point.y, alpha: point.alpha};
                            }
                        }
                        len += l;
                        x = +p[5];
                        y = +p[6];
                    }
                    sp += p.shift() + p;
                }
                subpaths.end = sp;
                point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
                point.alpha && (point = {x: point.x, y: point.y, alpha: point.alpha});
                return point;
            };
        };
    var getTotalLength = getLengthFactory(1),
        getPointAtLength = getLengthFactory(),
        getSubpathsAtLength = getLengthFactory(0, 1);

    R.getTotalLength = getTotalLength;

    R.getPointAtLength = getPointAtLength;

    R.getSubpath = function (path, from, to) {
        if (this.getTotalLength(path) - to < 1e-6) {
            return getSubpathsAtLength(path, from).end;
        }
        var a = getSubpathsAtLength(path, to, 1);
        return from ? getSubpathsAtLength(a, from).end : a;
    };

    elproto.getTotalLength = function () {
        if (this.type != "path") {return;}
        if (this.node.getTotalLength) {
            return this.node.getTotalLength();
        }
        return getTotalLength(this.attrs.path);
    };

    elproto.getPointAtLength = function (length) {
        if (this.type != "path") {return;}
        return getPointAtLength(this.attrs.path, length);
    };

    elproto.getSubpath = function (from, to) {
        if (this.type != "path") {return;}
        return R.getSubpath(this.attrs.path, from, to);
    };

    var ef = R.easing_formulas = {
        linear: function (n) {
            return n;
        },
        "<": function (n) {
            return pow(n, 1.7);
        },
        ">": function (n) {
            return pow(n, .48);
        },
        "<>": function (n) {
            var q = .48 - n / 1.04,
                Q = math.sqrt(.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            var s = 1.70158;
            return n * n * ((s + 1) * n - s);
        },
        backOut: function (n) {
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1;
        },
        elastic: function (n) {
            if (n == !!n) {
                return n;
            }
            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
        },
        bounce: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + .75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + .9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + .984375;
                    }
                }
            }
            return l;
        }
    };
    ef.easeIn = ef["ease-in"] = ef["<"];
    ef.easeOut = ef["ease-out"] = ef[">"];
    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
    ef["back-in"] = ef.backIn;
    ef["back-out"] = ef.backOut;

    var animationElements = [],
        requestAnimFrame = window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                setTimeout(callback, 16);
            },
        animation = function () {
            var Now = +new Date,
                l = 0;
            for (; l < animationElements.length; l++) {
                var e = animationElements[l];

                if (e.el.removed || e.paused) {
                    continue;
                }
                var time = Now - e.start,
                    ms = e.ms,
                    easing = e.easing,
                    from = e.from,
                    diff = e.diff,
                    to = e.to,
                    t = e.t,
                    that = e.el,
                    set = {},
                    now,
                    init = {},
                    key;
                if (e.initstatus) {
                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                    e.status = e.initstatus;
                    delete e.initstatus;
                    e.stop && animationElements.splice(l--, 1);
                } else {
                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
                }
                if (time < 0) {
                    continue;
                }
                if (time < ms) {
                    var pos = easing(time / ms);
                    for (var attr in from) if (from[has](attr)) {
                        switch (availableAnimAttrs[attr]) {
                            case nu:
                                now = +from[attr] + pos * ms * diff[attr];
                                break;
                            case "colour":
                                now = "rgb(" + [
                                        upto255(round(from[attr].r + pos * ms * diff[attr].r)),
                                        upto255(round(from[attr].g + pos * ms * diff[attr].g)),
                                        upto255(round(from[attr].b + pos * ms * diff[attr].b))
                                    ].join(",") + ")";
                                break;
                            case "path":
                                now = [];
                                for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                    now[i] = [from[attr][i][0]];
                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                    }
                                    now[i] = now[i].join(S);
                                }
                                now = now.join(S);
                                break;
                            case "transform":
                                if (diff[attr].real) {
                                    now = [];
                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
                                        now[i] = [from[attr][i][0]];
                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                            now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                                        }
                                    }
                                } else {
                                    var get = function (i) {
                                        return +from[attr][i] + pos * ms * diff[attr][i];
                                    };
                                    // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
                                    now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]];
                                }
                                break;
                            case "csv":
                                if (attr == "clip-rect") {
                                    now = [];
                                    i = 4;
                                    while (i--) {
                                        now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                    }
                                }
                                break;
                            default:
                                var from2 = [][concat](from[attr]);
                                now = [];
                                i = that.paper.customAttributes[attr].length;
                                while (i--) {
                                    now[i] = +from2[i] + pos * ms * diff[attr][i];
                                }
                                break;
                        }
                        set[attr] = now;
                    }
                    that.attr(set);
                    (function (id, that, anim) {
                        setTimeout(function () {
                            eve("raphael.anim.frame." + id, that, anim);
                        });
                    })(that.id, that, e.anim);
                } else {
                    (function(f, el, a) {
                        setTimeout(function() {
                            eve("raphael.anim.frame." + el.id, el, a);
                            eve("raphael.anim.finish." + el.id, el, a);
                            R.is(f, "function") && f.call(el);
                        });
                    })(e.callback, that, e.anim);

                    that.attr(to);
                    animationElements.splice(l--, 1);
                    if (e.repeat > 1 && !e.next) {
                        for (key in to) if (to[has](key)) {
                            init[key] = e.totalOrigin[key];
                        }
                        e.el.attr(init);
                        runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
                    }

                    if (e.next && !e.stop) {
                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
                    }

                }
            }
            R.svg && that && that.paper && that.paper.safari();
            animationElements.length && requestAnimFrame(animation);
        },
        upto255 = function (color) {
            return color > 255 ? 255 : color < 0 ? 0 : color;
        };

    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
            x, y;
        runAnimation(a, element, a.percents[0], null, element.attr());
        for (var i = 0, ii = animationElements.length; i < ii; i++) {
            if (animationElements[i].anim == anim && animationElements[i].el == el) {
                animationElements[ii - 1].start = animationElements[i].start;
                break;
            }
        }
        return element;
        //
        //
        // var a = params ? R.animation(params, ms, easing, callback) : anim,
        //     status = element.status(anim);
        // return this.animate(a).status(a, status * anim.ms / a.ms);
    };
    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
        var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t;
        }
        function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for(t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (abs(x2) < epsilon) {
                    return t2;
                }
                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                if (abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) / 2 + t0;
            }
            return t2;
        }
        return solve(t, 1 / (200 * duration));
    }
    elproto.onAnimation = function (f) {
        f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
        return this;
    };
    function Animation(anim, ms) {
        var percents = [],
            newAnim = {};
        this.ms = ms;
        this.times = 1;
        if (anim) {
            for (var attr in anim) if (anim[has](attr)) {
                newAnim[toFloat(attr)] = anim[attr];
                percents.push(toFloat(attr));
            }
            percents.sort(sortByNumber);
        }
        this.anim = newAnim;
        this.top = percents[percents.length - 1];
        this.percents = percents;
    }

    Animation.prototype.delay = function (delay) {
        var a = new Animation(this.anim, this.ms);
        a.times = this.times;
        a.del = +delay || 0;
        return a;
    };

    Animation.prototype.repeat = function (times) {
        var a = new Animation(this.anim, this.ms);
        a.del = this.del;
        a.times = math.floor(mmax(times, 0)) || 1;
        return a;
    };
    function runAnimation(anim, element, percent, status, totalOrigin, times) {
        percent = toFloat(percent);
        var params,
            isInAnim,
            isInAnimSet,
            percents = [],
            next,
            prev,
            timestamp,
            ms = anim.ms,
            from = {},
            to = {},
            diff = {};
        if (status) {
            for (i = 0, ii = animationElements.length; i < ii; i++) {
                var e = animationElements[i];
                if (e.el.id == element.id && e.anim == anim) {
                    if (e.percent != percent) {
                        animationElements.splice(i, 1);
                        isInAnimSet = 1;
                    } else {
                        isInAnim = e;
                    }
                    element.attr(e.totalOrigin);
                    break;
                }
            }
        } else {
            status = +to; // NaN
        }
        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
                percent = anim.percents[i];
                prev = anim.percents[i - 1] || 0;
                ms = ms / anim.top * (percent - prev);
                next = anim.percents[i + 1];
                params = anim.anim[percent];
                break;
            } else if (status) {
                element.attr(anim.anim[anim.percents[i]]);
            }
        }
        if (!params) {
            return;
        }
        if (!isInAnim) {
            for (var attr in params) if (params[has](attr)) {
                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                    from[attr] = element.attr(attr);
                    (from[attr] == null) && (from[attr] = availableAttrs[attr]);
                    to[attr] = params[attr];
                    switch (availableAnimAttrs[attr]) {
                        case nu:
                            diff[attr] = (to[attr] - from[attr]) / ms;
                            break;
                        case "colour":
                            from[attr] = R.getRGB(from[attr]);
                            var toColour = R.getRGB(to[attr]);
                            diff[attr] = {
                                r: (toColour.r - from[attr].r) / ms,
                                g: (toColour.g - from[attr].g) / ms,
                                b: (toColour.b - from[attr].b) / ms
                            };
                            break;
                        case "path":
                            var pathes = path2curve(from[attr], to[attr]),
                                toPath = pathes[1];
                            from[attr] = pathes[0];
                            diff[attr] = [];
                            for (i = 0, ii = from[attr].length; i < ii; i++) {
                                diff[attr][i] = [0];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                }
                            }
                            break;
                        case "transform":
                            var _ = element._,
                                eq = equaliseTransform(_[attr], to[attr]);
                            if (eq) {
                                from[attr] = eq.from;
                                to[attr] = eq.to;
                                diff[attr] = [];
                                diff[attr].real = true;
                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                    diff[attr][i] = [from[attr][i][0]];
                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                                    }
                                }
                            } else {
                                var m = (element.matrix || new Matrix),
                                    to2 = {
                                        _: {transform: _.transform},
                                        getBBox: function () {
                                            return element.getBBox(1);
                                        }
                                    };
                                from[attr] = [
                                    m.a,
                                    m.b,
                                    m.c,
                                    m.d,
                                    m.e,
                                    m.f
                                ];
                                extractTransform(to2, to[attr]);
                                to[attr] = to2._.transform;
                                diff[attr] = [
                                    (to2.matrix.a - m.a) / ms,
                                    (to2.matrix.b - m.b) / ms,
                                    (to2.matrix.c - m.c) / ms,
                                    (to2.matrix.d - m.d) / ms,
                                    (to2.matrix.e - m.e) / ms,
                                    (to2.matrix.f - m.f) / ms
                                ];
                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
                                // extractTransform(to2, to[attr]);
                                // diff[attr] = [
                                //     (to2._.sx - _.sx) / ms,
                                //     (to2._.sy - _.sy) / ms,
                                //     (to2._.deg - _.deg) / ms,
                                //     (to2._.dx - _.dx) / ms,
                                //     (to2._.dy - _.dy) / ms
                                // ];
                            }
                            break;
                        case "csv":
                            var values = Str(params[attr])[split](separator),
                                from2 = Str(from[attr])[split](separator);
                            if (attr == "clip-rect") {
                                from[attr] = from2;
                                diff[attr] = [];
                                i = from2.length;
                                while (i--) {
                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                }
                            }
                            to[attr] = values;
                            break;
                        default:
                            values = [][concat](params[attr]);
                            from2 = [][concat](from[attr]);
                            diff[attr] = [];
                            i = element.paper.customAttributes[attr].length;
                            while (i--) {
                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                            }
                            break;
                    }
                }
            }
            var easing = params.easing,
                easyeasy = R.easing_formulas[easing];
            if (!easyeasy) {
                easyeasy = Str(easing).match(bezierrg);
                if (easyeasy && easyeasy.length == 5) {
                    var curve = easyeasy;
                    easyeasy = function (t) {
                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                    };
                } else {
                    easyeasy = pipe;
                }
            }
            timestamp = params.start || anim.start || +new Date;
            e = {
                anim: anim,
                percent: percent,
                timestamp: timestamp,
                start: timestamp + (anim.del || 0),
                status: 0,
                initstatus: status || 0,
                stop: false,
                ms: ms,
                easing: easyeasy,
                from: from,
                diff: diff,
                to: to,
                el: element,
                callback: params.callback,
                prev: prev,
                next: next,
                repeat: times || anim.times,
                origin: element.attr(),
                totalOrigin: totalOrigin
            };
            animationElements.push(e);
            if (status && !isInAnim && !isInAnimSet) {
                e.stop = true;
                e.start = new Date - ms * status;
                if (animationElements.length == 1) {
                    return animation();
                }
            }
            if (isInAnimSet) {
                e.start = new Date - e.ms * status;
            }
            animationElements.length == 1 && requestAnimFrame(animation);
        } else {
            isInAnim.initstatus = status;
            isInAnim.start = new Date - isInAnim.ms * status;
        }
        eve("raphael.anim.start." + element.id, element, anim);
    }

    R.animation = function (params, ms, easing, callback) {
        if (params instanceof Animation) {
            return params;
        }
        if (R.is(easing, "function") || !easing) {
            callback = callback || easing || null;
            easing = null;
        }
        params = Object(params);
        ms = +ms || 0;
        var p = {},
            json,
            attr;
        for (attr in params) if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
            json = true;
            p[attr] = params[attr];
        }
        if (!json) {
            return new Animation(params, ms);
        } else {
            easing && (p.easing = easing);
            callback && (p.callback = callback);
            return new Animation({100: p}, ms);
        }
    };

    elproto.animate = function (params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
        runAnimation(anim, element, anim.percents[0], null, element.attr());
        return element;
    };

    elproto.setTime = function (anim, value) {
        if (anim && value != null) {
            this.status(anim, mmin(value, anim.ms) / anim.ms);
        }
        return this;
    };

    elproto.status = function (anim, value) {
        var out = [],
            i = 0,
            len,
            e;
        if (value != null) {
            runAnimation(anim, this, -1, mmin(value, 1));
            return this;
        } else {
            len = animationElements.length;
            for (; i < len; i++) {
                e = animationElements[i];
                if (e.el.id == this.id && (!anim || e.anim == anim)) {
                    if (anim) {
                        return e.status;
                    }
                    out.push({
                        anim: e.anim,
                        status: e.status
                    });
                }
            }
            if (anim) {
                return 0;
            }
            return out;
        }
    };

    elproto.pause = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                animationElements[i].paused = true;
            }
        }
        return this;
    };

    elproto.resume = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            var e = animationElements[i];
            if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
                delete e.paused;
                this.status(e.anim, e.status);
            }
        }
        return this;
    };

    elproto.stop = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                animationElements.splice(i--, 1);
            }
        }
        return this;
    };
    function stopAnimation(paper) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.paper == paper) {
            animationElements.splice(i--, 1);
        }
    }
    eve.on("raphael.remove", stopAnimation);
    eve.on("raphael.clear", stopAnimation);
    elproto.toString = function () {
        return "Rapha\xebl\u2019s object";
    };

    // Set
    var Set = function (items) {
            this.items = [];
            this.length = 0;
            this.type = "set";
            if (items) {
                for (var i = 0, ii = items.length; i < ii; i++) {
                    if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
                        this[this.items.length] = this.items[this.items.length] = items[i];
                        this.length++;
                    }
                }
            }
        },
        setproto = Set.prototype;

    setproto.push = function () {
        var item,
            len;
        for (var i = 0, ii = arguments.length; i < ii; i++) {
            item = arguments[i];
            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
                len = this.items.length;
                this[len] = this.items[len] = item;
                this.length++;
            }
        }
        return this;
    };

    setproto.pop = function () {
        this.length && delete this[this.length--];
        return this.items.pop();
    };

    setproto.forEach = function (callback, thisArg) {
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            if (callback.call(thisArg, this.items[i], i) === false) {
                return this;
            }
        }
        return this;
    };
    for (var method in elproto) if (elproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname][apply](el, arg);
                });
            };
        })(method);
    }
    setproto.attr = function (name, value) {
        if (name && R.is(name, array) && R.is(name[0], "object")) {
            for (var j = 0, jj = name.length; j < jj; j++) {
                this.items[j].attr(name[j]);
            }
        } else {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                this.items[i].attr(name, value);
            }
        }
        return this;
    };

    setproto.clear = function () {
        while (this.length) {
            this.pop();
        }
    };

    setproto.splice = function (index, count, insertion) {
        index = index < 0 ? mmax(this.length + index, 0) : index;
        count = mmax(0, mmin(this.length - index, count));
        var tail = [],
            todel = [],
            args = [],
            i;
        for (i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (i = 0; i < count; i++) {
            todel.push(this[index + i]);
        }
        for (; i < this.length - index; i++) {
            tail.push(this[index + i]);
        }
        var arglen = args.length;
        for (i = 0; i < arglen + tail.length; i++) {
            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
        }
        i = this.items.length = this.length -= count - arglen;
        while (this[i]) {
            delete this[i++];
        }
        return new Set(todel);
    };

    setproto.exclude = function (el) {
        for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
            this.splice(i, 1);
            return true;
        }
    };
    setproto.animate = function (params, ms, easing, callback) {
        (R.is(easing, "function") || !easing) && (callback = easing || null);
        var len = this.items.length,
            i = len,
            item,
            set = this,
            collector;
        if (!len) {
            return this;
        }
        callback && (collector = function () {
            !--len && callback.call(set);
        });
        easing = R.is(easing, string) ? easing : collector;
        var anim = R.animation(params, ms, easing, collector);
        item = this.items[--i].animate(anim);
        while (i--) {
            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
        }
        return this;
    };
    setproto.insertAfter = function (el) {
        var i = this.items.length;
        while (i--) {
            this.items[i].insertAfter(el);
        }
        return this;
    };
    setproto.getBBox = function () {
        var x = [],
            y = [],
            x2 = [],
            y2 = [];
        for (var i = this.items.length; i--;) if (!this.items[i].removed) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            x2.push(box.x + box.width);
            y2.push(box.y + box.height);
        }
        x = mmin[apply](0, x);
        y = mmin[apply](0, y);
        x2 = mmax[apply](0, x2);
        y2 = mmax[apply](0, y2);
        return {
            x: x,
            y: y,
            x2: x2,
            y2: y2,
            width: x2 - x,
            height: y2 - y
        };
    };
    setproto.clone = function (s) {
        s = new Set;
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            s.push(this.items[i].clone());
        }
        return s;
    };
    setproto.toString = function () {
        return "Rapha\xebl\u2018s set";
    };


    R.registerFont = function (font) {
        if (!font.face) {
            return font;
        }
        this.fonts = this.fonts || {};
        var fontcopy = {
                w: font.w,
                face: {},
                glyphs: {}
            },
            family = font.face["font-family"];
        for (var prop in font.face) if (font.face[has](prop)) {
            fontcopy.face[prop] = font.face[prop];
        }
        if (this.fonts[family]) {
            this.fonts[family].push(fontcopy);
        } else {
            this.fonts[family] = [fontcopy];
        }
        if (!font.svg) {
            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
            for (var glyph in font.glyphs) if (font.glyphs[has](glyph)) {
                var path = font.glyphs[glyph];
                fontcopy.glyphs[glyph] = {
                    w: path.w,
                    k: {},
                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
                        return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[command] || "M";
                    }) + "z"
                };
                if (path.k) {
                    for (var k in path.k) if (path[has](k)) {
                        fontcopy.glyphs[glyph].k[k] = path.k[k];
                    }
                }
            }
        }
        return font;
    };

    paperproto.getFont = function (family, weight, style, stretch) {
        stretch = stretch || "normal";
        style = style || "normal";
        weight = +weight || {normal: 400, bold: 700, lighter: 300, bolder: 800}[weight] || 400;
        if (!R.fonts) {
            return;
        }
        var font = R.fonts[family];
        if (!font) {
            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
            for (var fontName in R.fonts) if (R.fonts[has](fontName)) {
                if (name.test(fontName)) {
                    font = R.fonts[fontName];
                    break;
                }
            }
        }
        var thefont;
        if (font) {
            for (var i = 0, ii = font.length; i < ii; i++) {
                thefont = font[i];
                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                    break;
                }
            }
        }
        return thefont;
    };

    paperproto.print = function (x, y, string, font, size, origin, letter_spacing) {
        origin = origin || "middle"; // baseline|middle
        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
        var letters = Str(string)[split](E),
            shift = 0,
            notfirst = 0,
            path = E,
            scale;
        R.is(font, string) && (font = this.getFont(font));
        if (font) {
            scale = (size || 16) / font.face["units-per-em"];
            var bb = font.face.bbox[split](separator),
                top = +bb[0],
                lineHeight = bb[3] - bb[1],
                shifty = 0,
                height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
            for (var i = 0, ii = letters.length; i < ii; i++) {
                if (letters[i] == "\n") {
                    shift = 0;
                    curr = 0;
                    notfirst = 0;
                    shifty += lineHeight;
                } else {
                    var prev = notfirst && font.glyphs[letters[i - 1]] || {},
                        curr = font.glyphs[letters[i]];
                    shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                    notfirst = 1;
                }
                if (curr && curr.d) {
                    path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
                }
            }
        }
        return this.path(path).attr({
            fill: "#000",
            stroke: "none"
        });
    };


    paperproto.add = function (json) {
        if (R.is(json, "array")) {
            var res = this.set(),
                i = 0,
                ii = json.length,
                j;
            for (; i < ii; i++) {
                j = json[i] || {};
                elements[has](j.type) && res.push(this[j.type]().attr(j));
            }
        }
        return res;
    };


    R.format = function (token, params) {
        var args = R.is(params, array) ? [0][concat](params) : arguments;
        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
            return args[++i] == null ? E : args[i];
        }));
        return token || E;
    };

    R.fullfill = (function () {
        var tokenRegex = /\{([^\}]+)\}/g,
            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
            replacer = function (all, key, obj) {
                var res = obj;
                key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                    name = name || quotedName;
                    if (res) {
                        if (name in res) {
                            res = res[name];
                        }
                        typeof res == "function" && isFunc && (res = res());
                    }
                });
                res = (res == null || res == obj ? all : res) + "";
                return res;
            };
        return function (str, obj) {
            return String(str).replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj);
            });
        };
    })();

    R.ninja = function () {
        oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
        return R;
    };

    R.st = setproto;
    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
    (function (doc, loaded, f) {
        if (doc.readyState == null && doc.addEventListener){
            doc.addEventListener(loaded, f = function () {
                doc.removeEventListener(loaded, f, false);
                doc.readyState = "complete";
            }, false);
            doc.readyState = "loading";
        }
        function isLoaded() {
            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
        }
        isLoaded();
    })(document, "DOMContentLoaded");

    oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);

    eve.on("raphael.DOMload", function () {
        loaded = true;
    });
})();


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ SVG Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.svg && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        toInt = parseInt,
        math = Math,
        mmax = math.max,
        abs = math.abs,
        pow = math.pow,
        separator = /[, ]+/,
        eve = R.eve,
        E = "",
        S = " ";
    var xlink = "http://www.w3.org/1999/xlink",
        markers = {
            block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
        },
        markerCounter = {};
    R.toString = function () {
        return  "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
    };
    var $ = function (el, attr) {
            if (attr) {
                if (typeof el == "string") {
                    el = $(el);
                }
                for (var key in attr) if (attr[has](key)) {
                    if (key.substring(0, 6) == "xlink:") {
                        el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
                    } else {
                        el.setAttribute(key, Str(attr[key]));
                    }
                }
            } else {
                el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
                el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
            }
            return el;
        },
        addGradientFill = function (element, gradient) {
            var type = "linear",
                id = element.id + gradient,
                fx = .5, fy = .5,
                o = element.node,
                SVG = element.paper,
                s = o.style,
                el = R._g.doc.getElementById(id);
            if (!el) {
                gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
                    type = "radial";
                    if (_fx && _fy) {
                        fx = toFloat(_fx);
                        fy = toFloat(_fy);
                        var dir = ((fy > .5) * 2 - 1);
                        pow(fx - .5, 2) + pow(fy - .5, 2) > .25 &&
                        (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) &&
                        fy != .5 &&
                        (fy = fy.toFixed(5) - 1e-5 * dir);
                    }
                    return E;
                });
                gradient = gradient.split(/\s*\-\s*/);
                if (type == "linear") {
                    var angle = gradient.shift();
                    angle = -toFloat(angle);
                    if (isNaN(angle)) {
                        return null;
                    }
                    var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                        max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                    vector[2] *= max;
                    vector[3] *= max;
                    if (vector[2] < 0) {
                        vector[0] = -vector[2];
                        vector[2] = 0;
                    }
                    if (vector[3] < 0) {
                        vector[1] = -vector[3];
                        vector[3] = 0;
                    }
                }
                var dots = R._parseDots(gradient);
                if (!dots) {
                    return null;
                }
                id = id.replace(/[\(\)\s,\xb0#]/g, "_");

                if (element.gradient && id != element.gradient.id) {
                    SVG.defs.removeChild(element.gradient);
                    delete element.gradient;
                }

                if (!element.gradient) {
                    el = $(type + "Gradient", {id: id});
                    element.gradient = el;
                    $(el, type == "radial" ? {
                        fx: fx,
                        fy: fy
                    } : {
                        x1: vector[0],
                        y1: vector[1],
                        x2: vector[2],
                        y2: vector[3],
                        gradientTransform: element.matrix.invert()
                    });
                    SVG.defs.appendChild(el);
                    for (var i = 0, ii = dots.length; i < ii; i++) {
                        el.appendChild($("stop", {
                            offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                            "stop-color": dots[i].color || "#fff"
                        }));
                    }
                }
            }
            $(o, {
                fill: "url(#" + id + ")",
                opacity: 1,
                "fill-opacity": 1
            });
            s.fill = E;
            s.opacity = 1;
            s.fillOpacity = 1;
            return 1;
        },
        updatePosition = function (o) {
            var bbox = o.getBBox(1);
            $(o.pattern, {patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"});
        },
        addArrow = function (o, value, isEnd) {
            if (o.type == "path") {
                var values = Str(value).toLowerCase().split("-"),
                    p = o.paper,
                    se = isEnd ? "end" : "start",
                    node = o.node,
                    attrs = o.attrs,
                    stroke = attrs["stroke-width"],
                    i = values.length,
                    type = "classic",
                    from,
                    to,
                    dx,
                    refX,
                    attr,
                    w = 3,
                    h = 3,
                    t = 5;
                while (i--) {
                    switch (values[i]) {
                        case "block":
                        case "classic":
                        case "oval":
                        case "diamond":
                        case "open":
                        case "none":
                            type = values[i];
                            break;
                        case "wide": h = 5; break;
                        case "narrow": h = 2; break;
                        case "long": w = 5; break;
                        case "short": w = 2; break;
                    }
                }
                if (type == "open") {
                    w += 2;
                    h += 2;
                    t += 2;
                    dx = 1;
                    refX = isEnd ? 4 : 1;
                    attr = {
                        fill: "none",
                        stroke: attrs.stroke
                    };
                } else {
                    refX = dx = w / 2;
                    attr = {
                        fill: attrs.stroke,
                        stroke: "none"
                    };
                }
                if (o._.arrows) {
                    if (isEnd) {
                        o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                        o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
                    } else {
                        o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                        o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
                    }
                } else {
                    o._.arrows = {};
                }
                if (type != "none") {
                    var pathId = "raphael-marker-" + type,
                        markerId = "raphael-marker-" + se + type + w + h;
                    if (!R._g.doc.getElementById(pathId)) {
                        p.defs.appendChild($($("path"), {
                            "stroke-linecap": "round",
                            d: markers[type],
                            id: pathId
                        }));
                        markerCounter[pathId] = 1;
                    } else {
                        markerCounter[pathId]++;
                    }
                    var marker = R._g.doc.getElementById(markerId),
                        use;
                    if (!marker) {
                        marker = $($("marker"), {
                            id: markerId,
                            markerHeight: h,
                            markerWidth: w,
                            orient: "auto",
                            refX: refX,
                            refY: h / 2
                        });
                        use = $($("use"), {
                            "xlink:href": "#" + pathId,
                            transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
                            "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
                        });
                        marker.appendChild(use);
                        p.defs.appendChild(marker);
                        markerCounter[markerId] = 1;
                    } else {
                        markerCounter[markerId]++;
                        use = marker.getElementsByTagName("use")[0];
                    }
                    $(use, attr);
                    var delta = dx * (type != "diamond" && type != "oval");
                    if (isEnd) {
                        from = o._.arrows.startdx * stroke || 0;
                        to = R.getTotalLength(attrs.path) - delta * stroke;
                    } else {
                        from = delta * stroke;
                        to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                    }
                    attr = {};
                    attr["marker-" + se] = "url(#" + markerId + ")";
                    if (to || from) {
                        attr.d = Raphael.getSubpath(attrs.path, from, to);
                    }
                    $(node, attr);
                    o._.arrows[se + "Path"] = pathId;
                    o._.arrows[se + "Marker"] = markerId;
                    o._.arrows[se + "dx"] = delta;
                    o._.arrows[se + "Type"] = type;
                    o._.arrows[se + "String"] = value;
                } else {
                    if (isEnd) {
                        from = o._.arrows.startdx * stroke || 0;
                        to = R.getTotalLength(attrs.path) - from;
                    } else {
                        from = 0;
                        to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                    }
                    o._.arrows[se + "Path"] && $(node, {d: Raphael.getSubpath(attrs.path, from, to)});
                    delete o._.arrows[se + "Path"];
                    delete o._.arrows[se + "Marker"];
                    delete o._.arrows[se + "dx"];
                    delete o._.arrows[se + "Type"];
                    delete o._.arrows[se + "String"];
                }
                for (attr in markerCounter) if (markerCounter[has](attr) && !markerCounter[attr]) {
                    var item = R._g.doc.getElementById(attr);
                    item && item.parentNode.removeChild(item);
                }
            }
        },
        dasharray = {
            "": [0],
            "none": [0],
            "-": [3, 1],
            ".": [1, 1],
            "-.": [3, 1, 1, 1],
            "-..": [3, 1, 1, 1, 1, 1],
            ". ": [1, 3],
            "- ": [4, 3],
            "--": [8, 3],
            "- .": [4, 3, 1, 3],
            "--.": [8, 3, 1, 3],
            "--..": [8, 3, 1, 3, 1, 3]
        },
        addDashes = function (o, value, params) {
            value = dasharray[Str(value).toLowerCase()];
            if (value) {
                var width = o.attrs["stroke-width"] || "1",
                    butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                    dashes = [],
                    i = value.length;
                while (i--) {
                    dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
                }
                $(o.node, {"stroke-dasharray": dashes.join(",")});
            }
        },
        setFillAndStroke = function (o, params) {
            var node = o.node,
                attrs = o.attrs,
                vis = node.style.visibility;
            node.style.visibility = "hidden";
            for (var att in params) {
                if (params[has](att)) {
                    if (!R._availableAttrs[has](att)) {
                        continue;
                    }
                    var value = params[att];
                    attrs[att] = value;
                    switch (att) {
                        case "blur":
                            o.blur(value);
                            break;
                        case "href":
                        case "title":
                        case "target":
                            var pn = node.parentNode;
                            if (pn.tagName.toLowerCase() != "a") {
                                var hl = $("a");
                                pn.insertBefore(hl, node);
                                hl.appendChild(node);
                                pn = hl;
                            }
                            if (att == "target") {
                                pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
                            } else {
                                pn.setAttributeNS(xlink, att, value);
                            }
                            break;
                        case "cursor":
                            node.style.cursor = value;
                            break;
                        case "transform":
                            o.transform(value);
                            break;
                        case "arrow-start":
                            addArrow(o, value);
                            break;
                        case "arrow-end":
                            addArrow(o, value, 1);
                            break;
                        case "clip-rect":
                            var rect = Str(value).split(separator);
                            if (rect.length == 4) {
                                o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                                var el = $("clipPath"),
                                    rc = $("rect");
                                el.id = R.createUUID();
                                $(rc, {
                                    x: rect[0],
                                    y: rect[1],
                                    width: rect[2],
                                    height: rect[3]
                                });
                                el.appendChild(rc);
                                o.paper.defs.appendChild(el);
                                $(node, {"clip-path": "url(#" + el.id + ")"});
                                o.clip = rc;
                            }
                            if (!value) {
                                var path = node.getAttribute("clip-path");
                                if (path) {
                                    var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                                    clip && clip.parentNode.removeChild(clip);
                                    $(node, {"clip-path": E});
                                    delete o.clip;
                                }
                            }
                            break;
                        case "path":
                            if (o.type == "path") {
                                $(node, {d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"});
                                o._.dirty = 1;
                                if (o._.arrows) {
                                    "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                    "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                                }
                            }
                            break;
                        case "width":
                            node.setAttribute(att, value);
                            o._.dirty = 1;
                            if (attrs.fx) {
                                att = "x";
                                value = attrs.x;
                            } else {
                                break;
                            }
                        case "x":
                            if (attrs.fx) {
                                value = -attrs.x - (attrs.width || 0);
                            }
                        case "rx":
                            if (att == "rx" && o.type == "rect") {
                                break;
                            }
                        case "cx":
                            node.setAttribute(att, value);
                            o.pattern && updatePosition(o);
                            o._.dirty = 1;
                            break;
                        case "height":
                            node.setAttribute(att, value);
                            o._.dirty = 1;
                            if (attrs.fy) {
                                att = "y";
                                value = attrs.y;
                            } else {
                                break;
                            }
                        case "y":
                            if (attrs.fy) {
                                value = -attrs.y - (attrs.height || 0);
                            }
                        case "ry":
                            if (att == "ry" && o.type == "rect") {
                                break;
                            }
                        case "cy":
                            node.setAttribute(att, value);
                            o.pattern && updatePosition(o);
                            o._.dirty = 1;
                            break;
                        case "r":
                            if (o.type == "rect") {
                                $(node, {rx: value, ry: value});
                            } else {
                                node.setAttribute(att, value);
                            }
                            o._.dirty = 1;
                            break;
                        case "src":
                            if (o.type == "image") {
                                node.setAttributeNS(xlink, "href", value);
                            }
                            break;
                        case "stroke-width":
                            if (o._.sx != 1 || o._.sy != 1) {
                                value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
                            }
                            if (o.paper._vbSize) {
                                value *= o.paper._vbSize;
                            }
                            node.setAttribute(att, value);
                            if (attrs["stroke-dasharray"]) {
                                addDashes(o, attrs["stroke-dasharray"], params);
                            }
                            if (o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                            break;
                        case "stroke-dasharray":
                            addDashes(o, value, params);
                            break;
                        case "fill":
                            var isURL = Str(value).match(R._ISURL);
                            if (isURL) {
                                el = $("pattern");
                                var ig = $("image");
                                el.id = R.createUUID();
                                $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                                $(ig, {x: 0, y: 0, "xlink:href": isURL[1]});
                                el.appendChild(ig);

                                (function (el) {
                                    R._preload(isURL[1], function () {
                                        var w = this.offsetWidth,
                                            h = this.offsetHeight;
                                        $(el, {width: w, height: h});
                                        $(ig, {width: w, height: h});
                                        o.paper.safari();
                                    });
                                })(el);
                                o.paper.defs.appendChild(el);
                                $(node, {fill: "url(#" + el.id + ")"});
                                o.pattern = el;
                                o.pattern && updatePosition(o);
                                break;
                            }
                            var clr = R.getRGB(value);
                            if (!clr.error) {
                                delete params.gradient;
                                delete attrs.gradient;
                                !R.is(attrs.opacity, "undefined") &&
                                R.is(params.opacity, "undefined") &&
                                $(node, {opacity: attrs.opacity});
                                !R.is(attrs["fill-opacity"], "undefined") &&
                                R.is(params["fill-opacity"], "undefined") &&
                                $(node, {"fill-opacity": attrs["fill-opacity"]});
                            } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                                if ("opacity" in attrs || "fill-opacity" in attrs) {
                                    var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                    if (gradient) {
                                        var stops = gradient.getElementsByTagName("stop");
                                        $(stops[stops.length - 1], {"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)});
                                    }
                                }
                                attrs.gradient = value;
                                attrs.fill = "none";
                                break;
                            }
                            clr[has]("opacity") && $(node, {"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                        case "stroke":
                            clr = R.getRGB(value);
                            node.setAttribute(att, clr.hex);
                            att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                            if (att == "stroke" && o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                            break;
                        case "gradient":
                            (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                            break;
                        case "opacity":
                            if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                                $(node, {"stroke-opacity": value > 1 ? value / 100 : value});
                            }
                        // fall
                        case "fill-opacity":
                            if (attrs.gradient) {
                                gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                if (gradient) {
                                    stops = gradient.getElementsByTagName("stop");
                                    $(stops[stops.length - 1], {"stop-opacity": value});
                                }
                                break;
                            }
                        default:
                            att == "font-size" && (value = toInt(value, 10) + "px");
                            var cssrule = att.replace(/(\-.)/g, function (w) {
                                return w.substring(1).toUpperCase();
                            });
                            node.style[cssrule] = value;
                            o._.dirty = 1;
                            node.setAttribute(att, value);
                            break;
                    }
                }
            }

            tuneText(o, params);
            node.style.visibility = vis;
        },
        leading = 1.2,
        tuneText = function (el, params) {
            if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
                return;
            }
            var a = el.attrs,
                node = el.node,
                fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

            if (params[has]("text")) {
                a.text = params.text;
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
                var texts = Str(params.text).split("\n"),
                    tspans = [],
                    tspan;
                for (var i = 0, ii = texts.length; i < ii; i++) {
                    tspan = $("tspan");
                    i && $(tspan, {dy: fontSize * leading, x: a.x});
                    tspan.appendChild(R._g.doc.createTextNode(texts[i]));
                    node.appendChild(tspan);
                    tspans[i] = tspan;
                }
            } else {
                tspans = node.getElementsByTagName("tspan");
                for (i = 0, ii = tspans.length; i < ii; i++) if (i) {
                    $(tspans[i], {dy: fontSize * leading, x: a.x});
                } else {
                    $(tspans[0], {dy: 0});
                }
            }
            $(node, {x: a.x, y: a.y});
            el._.dirty = 1;
            var bb = el._getBBox(),
                dif = a.y - (bb.y + bb.height / 2);
            dif && R.is(dif, "finite") && $(tspans[0], {dy: dif});
        },
        Element = function (node, svg) {
            var X = 0,
                Y = 0;

            this[0] = this.node = node;

            node.raphael = true;

            this.id = R._oid++;
            node.raphaelid = this.id;
            this.matrix = R.matrix();
            this.realPath = null;

            this.paper = svg;
            this.attrs = this.attrs || {};
            this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                deg: 0,
                dx: 0,
                dy: 0,
                dirty: 1
            };
            !svg.bottom && (svg.bottom = this);

            this.prev = svg.top;
            svg.top && (svg.top.next = this);
            svg.top = this;

            this.next = null;
        },
        elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;

    R._engine.path = function (pathString, SVG) {
        var el = $("path");
        SVG.canvas && SVG.canvas.appendChild(el);
        var p = new Element(el, SVG);
        p.type = "path";
        setFillAndStroke(p, {
            fill: "none",
            stroke: "#000",
            path: pathString
        });
        return p;
    };

    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };

    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        return this;
    };

    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };

    elproto.transform = function (tstr) {
        var _ = this._;
        if (tstr == null) {
            return _.transform;
        }
        R._extractTransform(this, tstr);

        this.clip && $(this.clip, {transform: this.matrix.invert()});
        this.pattern && updatePosition(this);
        this.node && $(this.node, {transform: this.matrix});

        if (_.sx != 1 || _.sy != 1) {
            var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({"stroke-width": sw});
        }

        return this;
    };

    elproto.hide = function () {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this;
    };

    elproto.show = function () {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this;
    };

    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        var paper = this.paper;
        paper.__set__ && paper.__set__.exclude(this);
        eve.unbind("raphael.*.*." + this.id);
        if (this.gradient) {
            paper.defs.removeChild(this.gradient);
        }
        R._tear(this, paper);
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.removeChild(this.node.parentNode);
        } else {
            this.node.parentNode.removeChild(this.node);
        }
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto._getBBox = function () {
        if (this.node.style.display == "none") {
            this.show();
            var hide = true;
        }
        var bbox = {};
        try {
            bbox = this.node.getBBox();
        } catch(e) {
            // Firefox 3.0.x plays badly here
        } finally {
            bbox = bbox || {};
        }
        hide && this.hide();
        return bbox;
    };

    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            if (name == "transform") {
                return this._.transform;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        if (value != null) {
            var params = {};
            params[name] = value;
        } else if (name != null && R.is(name, "object")) {
            params = name;
        }
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
            this.attrs[key] = params[key];
            for (var subkey in par) if (par[has](subkey)) {
                params[subkey] = par[subkey];
            }
        }
        setFillAndStroke(this, params);
        return this;
    };

    elproto.toFront = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.appendChild(this.node.parentNode);
        } else {
            this.node.parentNode.appendChild(this.node);
        }
        var svg = this.paper;
        svg.top != this && R._tofront(this, svg);
        return this;
    };

    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        var parent = this.node.parentNode;
        if (parent.tagName.toLowerCase() == "a") {
            parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild);
        } else if (parent.firstChild != this.node) {
            parent.insertBefore(this.node, this.node.parentNode.firstChild);
        }
        R._toback(this, this.paper);
        var svg = this.paper;
        return this;
    };

    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[element.length - 1].node;
        if (node.nextSibling) {
            node.parentNode.insertBefore(this.node, node.nextSibling);
        } else {
            node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };

    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[0].node;
        node.parentNode.insertBefore(this.node, node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        // Experimental. No Safari support. Use it on your own risk.
        var t = this;
        if (+size !== 0) {
            var fltr = $("filter"),
                blur = $("feGaussianBlur");
            t.attrs.blur = size;
            fltr.id = R.createUUID();
            $(blur, {stdDeviation: +size || 1.5});
            fltr.appendChild(blur);
            t.paper.defs.appendChild(fltr);
            t._blur = fltr;
            $(t.node, {filter: "url(#" + fltr.id + ")"});
        } else {
            if (t._blur) {
                t._blur.parentNode.removeChild(t._blur);
                delete t._blur;
                delete t.attrs.blur;
            }
            t.node.removeAttribute("filter");
        }
    };
    R._engine.circle = function (svg, x, y, r) {
        var el = $("circle");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, r: r, fill: "none", stroke: "#000"};
        res.type = "circle";
        $(el, res.attrs);
        return res;
    };
    R._engine.rect = function (svg, x, y, w, h, r) {
        var el = $("rect");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, r: r || 0, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000"};
        res.type = "rect";
        $(el, res.attrs);
        return res;
    };
    R._engine.ellipse = function (svg, x, y, rx, ry) {
        var el = $("ellipse");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000"};
        res.type = "ellipse";
        $(el, res.attrs);
        return res;
    };
    R._engine.image = function (svg, src, x, y, w, h) {
        var el = $("image");
        $(el, {x: x, y: y, width: w, height: h, preserveAspectRatio: "none"});
        el.setAttributeNS(xlink, "href", src);
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, src: src};
        res.type = "image";
        return res;
    };
    R._engine.text = function (svg, x, y, text) {
        var el = $("text");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {
            x: x,
            y: y,
            "text-anchor": "middle",
            text: text,
            font: R._availableAttrs.font,
            stroke: "none",
            fill: "#000"
        };
        res.type = "text";
        setFillAndStroke(res, res.attrs);
        return res;
    };
    R._engine.setSize = function (width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        if (this._viewBox) {
            this.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con && con.container,
            x = con.x,
            y = con.y,
            width = con.width,
            height = con.height;
        if (!container) {
            throw new Error("SVG container not found.");
        }
        var cnvs = $("svg"),
            css = "overflow:hidden;",
            isFloating;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        $(cnvs, {
            height: height,
            version: 1.1,
            width: width,
            xmlns: "http://www.w3.org/2000/svg"
        });
        if (container == 1) {
            cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
            R._g.doc.body.appendChild(cnvs);
            isFloating = 1;
        } else {
            cnvs.style.cssText = css + "position:relative";
            if (container.firstChild) {
                container.insertBefore(cnvs, container.firstChild);
            } else {
                container.appendChild(cnvs);
            }
        }
        container = new R._Paper;
        container.width = width;
        container.height = height;
        container.canvas = cnvs;
        container.clear();
        container._left = container._top = 0;
        isFloating && (container.renderfix = function () {});
        container.renderfix();
        return container;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var size = mmax(w / this.width, h / this.height),
            top = this.top,
            aspectRatio = fit ? "meet" : "xMinYMin",
            vb,
            sw;
        if (x == null) {
            if (this._vbSize) {
                size = 1;
            }
            delete this._vbSize;
            vb = "0 0 " + this.width + S + this.height;
        } else {
            this._vbSize = size;
            vb = x + S + y + S + w + S + h;
        }
        $(this.canvas, {
            viewBox: vb,
            preserveAspectRatio: aspectRatio
        });
        while (size && top) {
            sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
            top.attr({"stroke-width": sw});
            top._.dirty = 1;
            top._.dirtyT = 1;
            top = top.prev;
        }
        this._viewBox = [x, y, w, h, !!fit];
        return this;
    };

    R.prototype.renderfix = function () {
        var cnvs = this.canvas,
            s = cnvs.style,
            pos;
        try {
            pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
        } catch (e) {
            pos = cnvs.createSVGMatrix();
        }
        var left = -pos.e % 1,
            top = -pos.f % 1;
        if (left || top) {
            if (left) {
                this._left = (this._left + left) % 1;
                s.left = this._left + "px";
            }
            if (top) {
                this._top = (this._top + top) % 1;
                s.top = this._top + "px";
            }
        }
    };

    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        var c = this.canvas;
        while (c.firstChild) {
            c.removeChild(c.firstChild);
        }
        this.bottom = this.top = null;
        (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
        c.appendChild(this.desc);
        c.appendChild(this.defs = $("defs"));
    };

    R.prototype.remove = function () {
        eve("raphael.remove", this);
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
    };
    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);

// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ VML Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.vml && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        math = Math,
        round = math.round,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        fillString = "fill",
        separator = /[, ]+/,
        eve = R.eve,
        ms = " progid:DXImageTransform.Microsoft",
        S = " ",
        E = "",
        map = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
        bites = /([clmz]),?([^clmz]*)/gi,
        blurregexp = / progid:\S+Blur\([^\)]+\)/g,
        val = /-?[^,\s-]+/g,
        cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
        zoom = 21600,
        pathTypes = {path: 1, rect: 1, image: 1},
        ovalTypes = {circle: 1, ellipse: 1},
        path2vml = function (path) {
            var total =  /[ahqstv]/ig,
                command = R._pathToAbsolute;
            Str(path).match(total) && (command = R._path2curve);
            total = /[clmz]/g;
            if (command == R._pathToAbsolute && !Str(path).match(total)) {
                var res = Str(path).replace(bites, function (all, command, args) {
                    var vals = [],
                        isMove = command.toLowerCase() == "m",
                        res = map[command];
                    args.replace(val, function (value) {
                        if (isMove && vals.length == 2) {
                            res += vals + map[command == "m" ? "l" : "L"];
                            vals = [];
                        }
                        vals.push(round(value * zoom));
                    });
                    return res + vals;
                });
                return res;
            }
            var pa = command(path), p, r;
            res = [];
            for (var i = 0, ii = pa.length; i < ii; i++) {
                p = pa[i];
                r = pa[i][0].toLowerCase();
                r == "z" && (r = "x");
                for (var j = 1, jj = p.length; j < jj; j++) {
                    r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
                }
                res.push(r);
            }
            return res.join(S);
        },
        compensation = function (deg, dx, dy) {
            var m = R.matrix();
            m.rotate(-deg, .5, .5);
            return {
                dx: m.x(dx, dy),
                dy: m.y(dx, dy)
            };
        },
        setCoords = function (p, sx, sy, dx, dy, deg) {
            var _ = p._,
                m = p.matrix,
                fillpos = _.fillpos,
                o = p.node,
                s = o.style,
                y = 1,
                flip = "",
                dxdy,
                kx = zoom / sx,
                ky = zoom / sy;
            s.visibility = "hidden";
            if (!sx || !sy) {
                return;
            }
            o.coordsize = abs(kx) + S + abs(ky);
            s.rotation = deg * (sx * sy < 0 ? -1 : 1);
            if (deg) {
                var c = compensation(deg, dx, dy);
                dx = c.dx;
                dy = c.dy;
            }
            sx < 0 && (flip += "x");
            sy < 0 && (flip += " y") && (y = -1);
            s.flip = flip;
            o.coordorigin = (dx * -kx) + S + (dy * -ky);
            if (fillpos || _.fillsize) {
                var fill = o.getElementsByTagName(fillString);
                fill = fill && fill[0];
                o.removeChild(fill);
                if (fillpos) {
                    c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                    fill.position = c.dx * y + S + c.dy * y;
                }
                if (_.fillsize) {
                    fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
                }
                o.appendChild(fill);
            }
            s.visibility = "visible";
        };
    R.toString = function () {
        return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
    };
    var addArrow = function (o, value, isEnd) {
            var values = Str(value).toLowerCase().split("-"),
                se = isEnd ? "end" : "start",
                i = values.length,
                type = "classic",
                w = "medium",
                h = "medium";
            while (i--) {
                switch (values[i]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        type = values[i];
                        break;
                    case "wide":
                    case "narrow": h = values[i]; break;
                    case "long":
                    case "short": w = values[i]; break;
                }
            }
            var stroke = o.node.getElementsByTagName("stroke")[0];
            stroke[se + "arrow"] = type;
            stroke[se + "arrowlength"] = w;
            stroke[se + "arrowwidth"] = h;
        },
        setFillAndStroke = function (o, params) {
            // o.paper.canvas.style.display = "none";
            o.attrs = o.attrs || {};
            var node = o.node,
                a = o.attrs,
                s = node.style,
                xy,
                newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
                isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
                res = o;


            for (var par in params) if (params[has](par)) {
                a[par] = params[par];
            }
            if (newpath) {
                a.path = R._getPath[o.type](o);
                o._.dirty = 1;
            }
            params.href && (node.href = params.href);
            params.title && (node.title = params.title);
            params.target && (node.target = params.target);
            params.cursor && (s.cursor = params.cursor);
            "blur" in params && o.blur(params.blur);
            if (params.path && o.type == "path" || newpath) {
                node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
                if (o.type == "image") {
                    o._.fillpos = [a.x, a.y];
                    o._.fillsize = [a.width, a.height];
                    setCoords(o, 1, 1, 0, 0, 0);
                }
            }
            "transform" in params && o.transform(params.transform);
            if (isOval) {
                var cx = +a.cx,
                    cy = +a.cy,
                    rx = +a.rx || +a.r || 0,
                    ry = +a.ry || +a.r || 0;
                node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
            }
            if ("clip-rect" in params) {
                var rect = Str(params["clip-rect"]).split(separator);
                if (rect.length == 4) {
                    rect[2] = +rect[2] + (+rect[0]);
                    rect[3] = +rect[3] + (+rect[1]);
                    var div = node.clipRect || R._g.doc.createElement("div"),
                        dstyle = div.style;
                    dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                    if (!node.clipRect) {
                        dstyle.position = "absolute";
                        dstyle.top = 0;
                        dstyle.left = 0;
                        dstyle.width = o.paper.width + "px";
                        dstyle.height = o.paper.height + "px";
                        node.parentNode.insertBefore(div, node);
                        div.appendChild(node);
                        node.clipRect = div;
                    }
                }
                if (!params["clip-rect"]) {
                    node.clipRect && (node.clipRect.style.clip = "auto");
                }
            }
            if (o.textpath) {
                var textpathStyle = o.textpath.style;
                params.font && (textpathStyle.font = params.font);
                params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
                params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
                params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
                params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
            }
            if ("arrow-start" in params) {
                addArrow(res, params["arrow-start"]);
            }
            if ("arrow-end" in params) {
                addArrow(res, params["arrow-end"], 1);
            }
            if (params.opacity != null ||
                params["stroke-width"] != null ||
                params.fill != null ||
                params.src != null ||
                params.stroke != null ||
                params["stroke-width"] != null ||
                params["stroke-opacity"] != null ||
                params["fill-opacity"] != null ||
                params["stroke-dasharray"] != null ||
                params["stroke-miterlimit"] != null ||
                params["stroke-linejoin"] != null ||
                params["stroke-linecap"] != null) {
                var fill = node.getElementsByTagName(fillString),
                    newfill = false;
                fill = fill && fill[0];
                !fill && (newfill = fill = createNode(fillString));
                if (o.type == "image" && params.src) {
                    fill.src = params.src;
                }
                params.fill && (fill.on = true);
                if (fill.on == null || params.fill == "none" || params.fill === null) {
                    fill.on = false;
                }
                if (fill.on && params.fill) {
                    var isURL = Str(params.fill).match(R._ISURL);
                    if (isURL) {
                        fill.parentNode == node && node.removeChild(fill);
                        fill.rotate = true;
                        fill.src = isURL[1];
                        fill.type = "tile";
                        var bbox = o.getBBox(1);
                        fill.position = bbox.x + S + bbox.y;
                        o._.fillpos = [bbox.x, bbox.y];

                        R._preload(isURL[1], function () {
                            o._.fillsize = [this.offsetWidth, this.offsetHeight];
                        });
                    } else {
                        fill.color = R.getRGB(params.fill).hex;
                        fill.src = E;
                        fill.type = "solid";
                        if (R.getRGB(params.fill).error && (res.type in {circle: 1, ellipse: 1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                            a.fill = "none";
                            a.gradient = params.fill;
                            fill.rotate = false;
                        }
                    }
                }
                if ("fill-opacity" in params || "opacity" in params) {
                    var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                    opacity = mmin(mmax(opacity, 0), 1);
                    fill.opacity = opacity;
                    if (fill.src) {
                        fill.color = "none";
                    }
                }
                node.appendChild(fill);
                var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
                    newstroke = false;
                !stroke && (newstroke = stroke = createNode("stroke"));
                if ((params.stroke && params.stroke != "none") ||
                    params["stroke-width"] ||
                    params["stroke-opacity"] != null ||
                    params["stroke-dasharray"] ||
                    params["stroke-miterlimit"] ||
                    params["stroke-linejoin"] ||
                    params["stroke-linecap"]) {
                    stroke.on = true;
                }
                (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
                var strokeColor = R.getRGB(params.stroke);
                stroke.on && params.stroke && (stroke.color = strokeColor.hex);
                opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
                var width = (toFloat(params["stroke-width"]) || 1) * .75;
                opacity = mmin(mmax(opacity, 0), 1);
                params["stroke-width"] == null && (width = a["stroke-width"]);
                params["stroke-width"] && (stroke.weight = width);
                width && width < 1 && (opacity *= width) && (stroke.weight = 1);
                stroke.opacity = opacity;

                params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
                stroke.miterlimit = params["stroke-miterlimit"] || 8;
                params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
                if (params["stroke-dasharray"]) {
                    var dasharray = {
                        "-": "shortdash",
                        ".": "shortdot",
                        "-.": "shortdashdot",
                        "-..": "shortdashdotdot",
                        ". ": "dot",
                        "- ": "dash",
                        "--": "longdash",
                        "- .": "dashdot",
                        "--.": "longdashdot",
                        "--..": "longdashdotdot"
                    };
                    stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
                }
                newstroke && node.appendChild(stroke);
            }
            if (res.type == "text") {
                res.paper.canvas.style.display = E;
                var span = res.paper.span,
                    m = 100,
                    fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
                s = span.style;
                a.font && (s.font = a.font);
                a["font-family"] && (s.fontFamily = a["font-family"]);
                a["font-weight"] && (s.fontWeight = a["font-weight"]);
                a["font-style"] && (s.fontStyle = a["font-style"]);
                fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
                s.fontSize = fontSize * m + "px";
                res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                var brect = span.getBoundingClientRect();
                res.W = a.w = (brect.right - brect.left) / m;
                res.H = a.h = (brect.bottom - brect.top) / m;
                // res.paper.canvas.style.display = "none";
                res.X = a.x;
                res.Y = a.y + res.H / 2;

                ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
                var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
                for (var d = 0, dd = dirtyattrs.length; d < dd; d++) if (dirtyattrs[d] in params) {
                    res._.dirty = 1;
                    break;
                }

                // text-anchor emulation
                switch (a["text-anchor"]) {
                    case "start":
                        res.textpath.style["v-text-align"] = "left";
                        res.bbx = res.W / 2;
                        break;
                    case "end":
                        res.textpath.style["v-text-align"] = "right";
                        res.bbx = -res.W / 2;
                        break;
                    default:
                        res.textpath.style["v-text-align"] = "center";
                        res.bbx = 0;
                        break;
                }
                res.textpath.style["v-text-kern"] = true;
            }
            // res.paper.canvas.style.display = E;
        },
        addGradientFill = function (o, gradient, fill) {
            o.attrs = o.attrs || {};
            var attrs = o.attrs,
                pow = Math.pow,
                opacity,
                oindex,
                type = "linear",
                fxfy = ".5 .5";
            o.attrs.gradient = gradient;
            gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
                type = "radial";
                if (fx && fy) {
                    fx = toFloat(fx);
                    fy = toFloat(fy);
                    pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                    fxfy = fx + S + fy;
                }
                return E;
            });
            gradient = gradient.split(/\s*\-\s*/);
            if (type == "linear") {
                var angle = gradient.shift();
                angle = -toFloat(angle);
                if (isNaN(angle)) {
                    return null;
                }
            }
            var dots = R._parseDots(gradient);
            if (!dots) {
                return null;
            }
            o = o.shape || o.node;
            if (dots.length) {
                o.removeChild(fill);
                fill.on = true;
                fill.method = "none";
                fill.color = dots[0].color;
                fill.color2 = dots[dots.length - 1].color;
                var clrs = [];
                for (var i = 0, ii = dots.length; i < ii; i++) {
                    dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
                }
                fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
                if (type == "radial") {
                    fill.type = "gradientTitle";
                    fill.focus = "100%";
                    fill.focussize = "0 0";
                    fill.focusposition = fxfy;
                    fill.angle = 0;
                } else {
                    // fill.rotate= true;
                    fill.type = "gradient";
                    fill.angle = (270 - angle) % 360;
                }
                o.appendChild(fill);
            }
            return 1;
        },
        Element = function (node, vml) {
            this[0] = this.node = node;
            node.raphael = true;
            this.id = R._oid++;
            node.raphaelid = this.id;
            this.X = 0;
            this.Y = 0;
            this.attrs = {};
            this.paper = vml;
            this.matrix = R.matrix();
            this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                dx: 0,
                dy: 0,
                deg: 0,
                dirty: 1,
                dirtyT: 1
            };
            !vml.bottom && (vml.bottom = this);
            this.prev = vml.top;
            vml.top && (vml.top.next = this);
            vml.top = this;
            this.next = null;
        };
    var elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;
    elproto.transform = function (tstr) {
        if (tstr == null) {
            return this._.transform;
        }
        var vbs = this.paper._viewBoxShift,
            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
            oldt;
        if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
        }
        R._extractTransform(this, vbt + tstr);
        var matrix = this.matrix.clone(),
            skew = this.skew,
            o = this.node,
            split,
            isGrad = ~Str(this.attrs.fill).indexOf("-"),
            isPatt = !Str(this.attrs.fill).indexOf("url(");
        matrix.translate(-.5, -.5);
        if (isPatt || isGrad || this.type == "image") {
            skew.matrix = "1 0 0 1";
            skew.offset = "0 0";
            split = matrix.split();
            if ((isGrad && split.noRotation) || !split.isSimple) {
                o.style.filter = matrix.toFilter();
                var bb = this.getBBox(),
                    bbt = this.getBBox(1),
                    dx = bb.x - bbt.x,
                    dy = bb.y - bbt.y;
                o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
                setCoords(this, 1, 1, dx, dy, 0);
            } else {
                o.style.filter = E;
                setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
            }
        } else {
            o.style.filter = E;
            skew.matrix = Str(matrix);
            skew.offset = matrix.offset();
        }
        oldt && (this._.transform = oldt);
        return this;
    };
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        if (deg == null) {
            return;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this._.dirtyT = 1;
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        if (this._.bbox) {
            this._.bbox.x += dx;
            this._.bbox.y += dy;
        }
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
            isNaN(cx) && (cx = null);
            isNaN(cy) && (cy = null);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;

        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        this._.dirtyT = 1;
        return this;
    };
    elproto.hide = function () {
        !this.removed && (this.node.style.display = "none");
        return this;
    };
    elproto.show = function () {
        !this.removed && (this.node.style.display = E);
        return this;
    };
    elproto._getBBox = function () {
        if (this.removed) {
            return {};
        }
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
        };
    };
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        this.paper.__set__ && this.paper.__set__.exclude(this);
        R.eve.unbind("raphael.*.*." + this.id);
        R._tear(this, this.paper);
        this.node.parentNode.removeChild(this.node);
        this.shape && this.shape.parentNode.removeChild(this.shape);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (this.attrs && value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        var params;
        if (value != null) {
            params = {};
            params[name] = value;
        }
        value == null && R.is(name, "object") && (params = name);
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        if (params) {
            for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
                this.attrs[key] = params[key];
                for (var subkey in par) if (par[has](subkey)) {
                    params[subkey] = par[subkey];
                }
            }
            // this.paper.canvas.style.display = "none";
            if (params.text && this.type == "text") {
                this.textpath.string = params.text;
            }
            setFillAndStroke(this, params);
            // this.paper.canvas.style.display = E;
        }
        return this;
    };
    elproto.toFront = function () {
        !this.removed && this.node.parentNode.appendChild(this.node);
        this.paper && this.paper.top != this && R._tofront(this, this.paper);
        return this;
    };
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            R._toback(this, this.paper);
        }
        return this;
    };
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[element.length - 1];
        }
        if (element.node.nextSibling) {
            element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
        } else {
            element.node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[0];
        }
        element.node.parentNode.insertBefore(this.node, element.node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        var s = this.node.runtimeStyle,
            f = s.filter;
        f = f.replace(blurregexp, E);
        if (+size !== 0) {
            this.attrs.blur = size;
            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
        } else {
            s.filter = f;
            s.margin = 0;
            delete this.attrs.blur;
        }
    };

    R._engine.path = function (pathString, vml) {
        var el = createNode("shape");
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = vml.coordorigin;
        var p = new Element(el, vml),
            attr = {fill: "none", stroke: "#000"};
        pathString && (attr.path = pathString);
        p.type = "path";
        p.path = [];
        p.Path = E;
        setFillAndStroke(p, attr);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.rect = function (vml, x, y, w, h, r) {
        var path = R._rectPath(x, y, w, h, r),
            res = vml.path(path),
            a = res.attrs;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.r = r;
        a.path = path;
        res.type = "rect";
        return res;
    };
    R._engine.ellipse = function (vml, x, y, rx, ry) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - rx;
        res.Y = y - ry;
        res.W = rx * 2;
        res.H = ry * 2;
        res.type = "ellipse";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            rx: rx,
            ry: ry
        });
        return res;
    };
    R._engine.circle = function (vml, x, y, r) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - r;
        res.Y = y - r;
        res.W = res.H = r * 2;
        res.type = "circle";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            r: r
        });
        return res;
    };
    R._engine.image = function (vml, src, x, y, w, h) {
        var path = R._rectPath(x, y, w, h),
            res = vml.path(path).attr({stroke: "none"}),
            a = res.attrs,
            node = res.node,
            fill = node.getElementsByTagName(fillString)[0];
        a.src = src;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.path = path;
        res.type = "image";
        fill.parentNode == node && node.removeChild(fill);
        fill.rotate = true;
        fill.src = src;
        fill.type = "tile";
        res._.fillpos = [x, y];
        res._.fillsize = [w, h];
        node.appendChild(fill);
        setCoords(res, 1, 1, 0, 0, 0);
        return res;
    };
    R._engine.text = function (vml, x, y, text) {
        var el = createNode("shape"),
            path = createNode("path"),
            o = createNode("textpath");
        x = x || 0;
        y = y || 0;
        text = text || "";
        path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
        path.textpathok = true;
        o.string = Str(text);
        o.on = true;
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = "0 0";
        var p = new Element(el, vml),
            attr = {
                fill: "#000",
                stroke: "none",
                font: R._availableAttrs.font,
                text: text
            };
        p.shape = el;
        p.path = path;
        p.textpath = o;
        p.type = "text";
        p.attrs.text = Str(text);
        p.attrs.x = x;
        p.attrs.y = y;
        p.attrs.w = 1;
        p.attrs.h = 1;
        setFillAndStroke(p, attr);
        el.appendChild(o);
        el.appendChild(path);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.setSize = function (width, height) {
        var cs = this.canvas.style;
        this.width = width;
        this.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        cs.width = width;
        cs.height = height;
        cs.clip = "rect(0 " + width + " " + height + " 0)";
        if (this._viewBox) {
            R._engine.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var width = this.width,
            height = this.height,
            size = 1 / mmax(w / width, h / height),
            H, W;
        if (fit) {
            H = height / h;
            W = width / w;
            if (w * H < width) {
                x -= (width - w * H) / 2 / H;
            }
            if (h * W < height) {
                y -= (height - h * W) / 2 / W;
            }
        }
        this._viewBox = [x, y, w, h, !!fit];
        this._viewBoxShift = {
            dx: -x,
            dy: -y,
            scale: size
        };
        this.forEach(function (el) {
            el.transform("...");
        });
        return this;
    };
    var createNode;
    R._engine.initWin = function (win) {
        var doc = win.document;
        doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            createNode = function (tagName) {
                return doc.createElement('<rvml:' + tagName + ' class="rvml">');
            };
        } catch (e) {
            createNode = function (tagName) {
                return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
        }
    };
    R._engine.initWin(R._g.win);
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con.container,
            height = con.height,
            s,
            width = con.width,
            x = con.x,
            y = con.y;
        if (!container) {
            throw new Error("VML container not found.");
        }
        var res = new R._Paper,
            c = res.canvas = R._g.doc.createElement("div"),
            cs = c.style;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        res.width = width;
        res.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        res.coordsize = zoom * 1e3 + S + zoom * 1e3;
        res.coordorigin = "0 0";
        res.span = R._g.doc.createElement("span");
        res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        c.appendChild(res.span);
        cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
        if (container == 1) {
            R._g.doc.body.appendChild(c);
            cs.left = x + "px";
            cs.top = y + "px";
            cs.position = "absolute";
        } else {
            if (container.firstChild) {
                container.insertBefore(c, container.firstChild);
            } else {
                container.appendChild(c);
            }
        }
        res.renderfix = function () {};
        return res;
    };
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        this.canvas.innerHTML = E;
        this.span = R._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null;
    };
    R.prototype.remove = function () {
        R.eve("raphael.remove", this);
        this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        return true;
    };

    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);


/*global exports */
/**
 * @fileoverview This file is used for define the EventProxy library.
 * @author <a href="mailto:shyvo1987@gmail.com">Jackson Tian</a>
 * @version 0.1.0
 */
(function () {
    /**
     * @description EventProxy. A module that can be mixed in to *any object* in order to provide it with
     * custom events. You may `bind` or `unbind` a callback function to an event;
     * `trigger`-ing an event fires all callbacks in succession.
     * @constructor
     * @name EventProxy
     * @class EventProxy. An implementation of task/event based asynchronous pattern.
     * @example
     * var render = function (template, resources) {};
     * var proxy = new EventProxy();
     * proxy.assign("template", "l10n", render);
     * proxy.trigger("template", template);
     * proxy.trigger("l10n", resources);
     */
    var EventProxy = function () {
        if (!(this instanceof EventProxy)) {
            return new EventProxy();
        }
        this._callbacks = {};
        this._fired = {};
    };

    /**
     * @description Bind an event, specified by a string name, `ev`, to a `callback` function.
     * Passing `"all"` will bind the callback to all events fired.
     * @memberOf EventProxy#
     * @param {string} eventName Event name.
     * @param {function} callback Callback.
     */
    EventProxy.prototype.addListener = function (ev, callback) {
        this._callbacks = this._callbacks || {};
        this._callbacks[ev] = this._callbacks[ev] || [];
        this._callbacks[ev].push(callback);
        return this;
    };
    EventProxy.prototype.bind = EventProxy.prototype.addListener;
    EventProxy.prototype.on = EventProxy.prototype.addListener;
    EventProxy.prototype.await = EventProxy.prototype.addListener;

    /**
     * @description Remove one or many callbacks. If `callback` is null, removes all
     * callbacks for the event. If `ev` is null, removes all bound callbacks
     * for all events.
     * @memberOf EventProxy#
     * @param {string} eventName Event name.
     * @param {function} callback Callback.
     */
    EventProxy.prototype.removeListener = function (ev, callback) {
        var calls = this._callbacks, i, l;
        if (!ev) {
            this._callbacks = {};
        } else if (calls) {
            if (!callback) {
                calls[ev] = [];
            } else {
                var list = calls[ev];
                if (!list) {
                    return this;
                }
                l = list.length;
                for (i = 0; i < l; i++) {
                    if (callback === list[i]) {
                        list[i] = null;
                        break;
                    }
                }
            }
        }
        return this;
    };
    EventProxy.prototype.unbind = EventProxy.prototype.removeListener;

    /**
     * @description Remove all listeners.
     * It equals unbind(); Just add this API for as same as Event.Emitter.
     * @memberOf EventProxy#
     * @param {string} event Event name.
     */
    EventProxy.prototype.removeAllListeners = function (event) {
        return this.unbind(event);
    };

    /**
     * @description Trigger an event, firing all bound callbacks. Callbacks are passed the
     * same arguments as `trigger` is, apart from the event name.
     * Listening for `"all"` passes the true event name as the first argument.
     * @param {string} eventName Event name.
     * @param {mix} data Pass in data.
     */
    EventProxy.prototype.trigger = function (eventName, data) {
        var list, calls, ev, callback, args, i, l;
        var both = 2;
        if (!(calls = this._callbacks)) {
            return this;
        }
        while (both--) {
            ev = both ? eventName : 'all';
            list = calls[ev];
            if (list) {
                for (i = 0, l = list.length; i < l; i++) {
                    if (!(callback = list[i])) {
                        list.splice(i, 1); i--; l--;
                    } else {
                        args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
                        callback.apply(this, args);
                    }
                }
            }
        }
        return this;
    };
    EventProxy.prototype.emit = EventProxy.prototype.trigger;
    EventProxy.prototype.fire = EventProxy.prototype.trigger;

    /**
     * @description Bind an event like the bind method, but will remove the listener after it was fired.
     * @param {string} ev Event name.
     * @param {function} callback Callback.
     */
    EventProxy.prototype.once = function (ev, callback) {
        var self = this,
            wrapper = function () {
                callback.apply(self, arguments);
                self.unbind(ev, wrapper);
            };
        this.bind(ev, wrapper);
        return this;
    };

    /**
     * @description Bind an event, and trigger it immediately.
     * @param {string} ev Event name.
     * @param {function} callback Callback.
     * @param {mix} data The data that will be passed to calback as arguments.
     */
    EventProxy.prototype.immediate = function (ev, callback, data) {
        this.bind(ev, callback);
        this.trigger(ev, data);
        return this;
    };

    var _assign = function (eventname1, eventname2, cb, once) {
        var proxy = this, length, index = 0, argsLength = arguments.length,
            bind, _all,
            callback, events, isOnce, times = 0, flag = {};

        // Check the arguments length.
        if (argsLength < 3) {
            return this;
        }

        events = Array.prototype.slice.apply(arguments, [0, argsLength - 2]);
        callback = arguments[argsLength - 2];
        isOnce = arguments[argsLength - 1];

        // Check the callback type.
        if (typeof callback !== "function") {
            return this;
        }

        length = events.length;
        bind = function (key) {
            var method = isOnce ? "once" : "bind";
            proxy[method](key, function (data) {
                proxy._fired[key] = proxy._fired[key] || {};
                proxy._fired[key].data = data;
                if (!flag[key]) {
                    flag[key] = true;
                    times++;
                }
            });
        };

        for (index = 0; index < length; index++) {
            bind(events[index]);
        }

        _all = function () {
            if (times < length) {
                return;
            }
            var data = [];
            for (index = 0; index < length; index++) {
                data.push(proxy._fired[events[index]].data);
            }
            if (isOnce) {
                proxy.unbind("all", _all);
            }
            callback.apply(null, data);
        };
        proxy.bind("all", _all);
    };

    /**
     * @description Assign some events, after all events were fired, the callback will be executed once.
     * @example
     * proxy.all(ev1, ev2, callback);
     * proxy.all([ev1, ev2], callback);
     * proxy.all(ev1, [ev2, ev3], callback);
     * @param {string} eventName1 First event name.
     * @param {string} eventName2 Second event name.
     * @param {function} callback Callback, that will be called after predefined events were fired.
     */
    EventProxy.prototype.all = function (eventname1, eventname2, cb) {
        var args = Array.prototype.concat.apply([], arguments);
        args.push(true);
        _assign.apply(this, args);
        return this;
    };
    EventProxy.prototype.assign = EventProxy.prototype.all;

    /**
     * @description Assign some events, after all events were fired, the callback will be executed first time.
     * then any event that predefined be fired again, the callback will executed with the newest data.
     * @example
     * proxy.tail(ev1, ev2, callback);
     * proxy.tail([ev1, ev2], callback);
     * proxy.tail(ev1, [ev2, ev3], callback);
     * @memberOf EventProxy#
     * @param {string} eventName1 First event name.
     * @param {string} eventName2 Second event name.
     * @param {function} callback Callback, that will be called after predefined events were fired.
     */
    EventProxy.prototype.tail = function () {
        var args = Array.prototype.concat.apply([], arguments);
        args.push(false);
        _assign.apply(this, args);
        return this;
    };
    EventProxy.prototype.assignAll = EventProxy.prototype.tail;
    EventProxy.prototype.assignAlways = EventProxy.prototype.tail;

    /**
     * @description The callback will be executed after the event be fired N times.
     * @memberOf EventProxy#
     * @param {string} eventName Event name.
     * @param {number} times N times.
     * @param {function} callback Callback, that will be called after event was fired N times.
     */
    EventProxy.prototype.after = function (eventName, times, callback) {
        if (times === 0) {
            callback.call(null, []);
            return this;
        }
        var proxy = this,
            firedData = [],
            all;
        all = function (name, data) {
            if (name === eventName) {
                times--;
                firedData.push(data);
                if (times < 1) {
                    proxy.unbind("all", all);
                    callback.apply(null, [firedData]);
                }
            }
        };
        proxy.bind("all", all);
        return this;
    };

    /**
     * @description The callback will be executed after any registered event was fired. It only executed once.
     * @memberOf EventProxy#
     * @param {string} eventName1 Event name.
     * @param {string} eventName2 Event name.
     * @param {function} callback The callback will get a map that has data and eventName attributes.
     */
    EventProxy.prototype.any = function () {
        var proxy = this,
            index,
            _bind,
            len = arguments.length,
            callback = arguments[len - 1],
            events = Array.prototype.slice.apply(arguments, [0, len - 1]),
            count = events.length,
            _eventName = events.join("_");

        proxy.once(_eventName, callback);

        _bind = function (key) {
            proxy.bind(key, function (data) {
                proxy.trigger(_eventName, {"data": data, eventName: key});
            });
        };

        for (index = 0; index < count; index++) {
            _bind(events[index]);
        }
    };

    /**
     * @description The callback will be executed when the evnet name not equals with assigned evnet.
     * @memberOf EventProxy#
     * @param {string} eventName Event name.
     * @param {function} callback Callback.
     */
    EventProxy.prototype.not = function (eventName, callback) {
        var proxy = this;
        proxy.bind("all", function (name, data) {
            if (name !== eventName) {
                callback(data);
            }
        });
    };

    /**
     * Create a new EventProxy
     * @example
     *     var ep = EventProxy.create();
     *     ep.assign('user', 'articles', function(user, articles) {
     *       // do something...
     *     });
     *
     *     // or one line ways: Create EventProxy and Assign
     *
     *     var ep = EventProxy.create('user', 'articles', function(user, articles) {
     *       // do something...
     *     });
     *
     * @returns {EventProxy}
     */
    EventProxy.create = function () {
        var ep = new EventProxy();
        if (arguments.length) {
            ep.assign.apply(ep, Array.prototype.slice.call(arguments));
        }
        return ep;
    };

    // Event proxy can be used in browser and Nodejs both.
    if (typeof exports !== "undefined") {
        exports.EventProxy = EventProxy;
    } else {
        this.EventProxy = EventProxy;
    }

}());

/*global d3 */
//define(function (require, exports, module) {
var DataV = function () {};
DataV.version = "0.0.1";

DataV.Themes = {};

// DataV.Themes["default"] = DataV.Themes.theme0 = {
//     /* color format:
//       [
//        [darkColor1, lightColor1],
//        [darkColor2, lightColor2],
//        .....
//       ]
//      */
//     COLOR_ARGS: [
//         ["#03809a", "#04d4d4"],
//         ["#8fdfa5", "#cefedb"],
//         ["#f7cd34", "#feef8d"],
//         ["#7dab16", "#c2e96c"],
//         ["#00b8b8", "#3dffff"],
//         ["#1b6157", "#1fc4ac"]
//     ]
//     //FONT_ARGS: {HEADER_FAMILY:"微软雅黑", HEADER_SIZE: 20, PAGE_FAMILY:"微软雅黑", PAGE_SIZE: 5}
// };
DataV.Themes["default"] = DataV.Themes.theme0 = {


    COLOR_ARGS: [
        ["#3dc6f4", "#8ce3ff"],
        ["#214fd9", "#7396ff"],
        ["#4f21d9", "#9673ff"],
        ["#c43df2", "#e38cff"],
        ["#d8214f", "#ff7396"],
        ["#f3c53c", "#ffe38c"]
    ]

    //FONT_ARGS: {HEADER_FAMILY:"微软雅黑", HEADER_SIZE: 20, PAGE_FAMILY:"微软雅黑", PAGE_SIZE: 5}
};
DataV.Themes.theme1 = {
    COLOR_ARGS: [
        ["#e72e8b", "#ff7fbf"],
        ["#d94f21", "#ff9673"],
        ["#f3c53c", "#ffe38c"],
        ["#8be62f", "#bfff7f"],
        ["#14cc14", "#66ff66"],
        ["#2fe68a", "#7fffc0"]
    ]

    //FONT_ARGS: {HEADER_FAMILY:"微软雅黑", HEADER_SIZE: 20, PAGE_FAMILY:"微软雅黑", PAGE_SIZE: 5}
};
DataV.Themes.theme2 = {
    COLOR_ARGS: [
        ["#2f8ae7", "#7fc0ff"],
        ["#8a2ee7", "#bf7fff"],
        ["#f33dc6", "#ff8ce3"],
        ["#8be62f", "#bfff7f"],
        ["#14cc14", "#66ff66"],
        ["#2fe68a", "#7fffc0"]
    ]
    //FONT_ARGS: {HEADER_FAMILY:"微软雅黑", HEADER_SIZE: 20, PAGE_FAMILY:"微软雅黑", PAGE_SIZE: 10}
};
DataV.Themes.theme3 = {
    COLOR_ARGS: [
        ["#2f8ae7", "#896DA3"],
        ["#8e34df", "#FFADA6"],
        ["#f738c0", "#65FCFC"],
        ["#84e653", "#555566"],
        ["#0cc53e", "#db3f7c"],
        ["#00e793s", "#db3f7c"]
    ]
    //FONT_ARGS: {HEADER_FAMILY:"微软雅黑", HEADER_SIZE: 20, PAGE_FAMILY:"微软雅黑", PAGE_SIZE: 10}
};
DataV.Themes.theme4 = {
    COLOR_ARGS: [
        ["#d94f21", "#7a88d1"],
        ["#579ce2", "#87bdf4"],
        ["#3bb4df", "#7fd1ef"],
        ["#a380ff", "#baa0ff"],
        ["#a164c5", "#c28fe1"],
        ["#d93a92", "#ec74b6"],
        ["#b82377", "#d569a7"],
        ["#bb3ca3", "#d381c2"],
        ["#da2d57", "#ec6b8a"],
        ["#4ca716", "#4ca716"],
        ["#5b63c2", "#8e93d7"],
        ["#15a9a3", "#4ecac5"],
        ["#a9ab48", "#e8c670"],
        ["#2aa5f5", "#73c4fa"],
        ["#f67e10", "#feb648"],
        ["#1faa77", "#62c8a2"],
        ["#eb4f20", "#f58563"],
        ["#ffc000", "#ffd659"],
        ["#f16ebc", "#f6a1d3"],
        ["#d23457", "#e27b92"]
    ]
};

DataV.Themes.current = "default";
DataV.Themes._currentTheme = null;

DataV.Themes.get = function (key) {
    if (!DataV.Themes._currentTheme) {
        DataV.Themes._currentTheme = DataV.Themes[DataV.Themes.current];
    }
    return DataV.Themes._currentTheme[key] || DataV.Themes["default"][key];
};

/*
 * set user-define theme
 * @param themeName: a string
 *        theme: json, contain attribute "COLOR_ARGS", theme.COLOR_ARGS is a 2-d array;
 */
DataV.Themes.set = function (themeName, theme) {
    if (arguments.length < 2) {
        throw new Error("Arguments format error. should be: (themsName, theme)");
    } else if (typeof theme !== "object") {
        throw new Error("second argument theme should be a json object");
    } else if (!theme["COLOR_ARGS"]) {
        throw new Error("theme.COLOR_ARGS needed");
    } else if (!theme["COLOR_ARGS"] instanceof Array) {
        throw new Error("theme.COLOR_ARGS should be an array");
    } else if (!(theme["COLOR_ARGS"][0] instanceof Array)) {
        throw new Error("theme.COLOR_ARGS[0] should be an array");
    }
    DataV.Themes[themeName] = theme;
};

/**
 * @return boolean 返回是否切换成功
 */
DataV.changeTheme = function (themeName) {
    var ret = DataV.Themes[themeName];
    if (ret) {
        DataV.Themes.current = themeName;
        DataV.Themes._currentTheme = null;
    }
    return !!ret;
};

DataV.getColor = function () {
    var theme = DataV.Themes;
    var color = theme.get("COLOR_ARGS");

    return color;
};

//Get discrete color , used for type color
DataV.getDiscreteColor = function () {
    var theme = DataV.Themes;
    var color = theme.get("COLOR_ARGS");
    if (color.constructor !== Array) {
        throw new Error("The color should be Array");
    }
    var colorCount = color.length;
    var gotColor = [];

    if (color[0] === Array) {
        var i;
        for (i =  0 ; i < colorLineCount ; i++) {
            getColor.push(color[i][0]);
        }
    } else {
        gotColor = color;
    }

    return function (num) {
        var thisColor = gotColor;
        var thisColorCount = colorCount;

        return thisColor[num % thisolorCount];
    };
}

//Get gradient color, used for gradient data
DataV.gradientColor = function (color, method) {
    if (color.constructor !== Array) {
        throw new Error("The color should be Array");
    }

    var startColor = color[0];
    var colorColor;
    var colorCount = color.length;

    var hsb
    if (colorCount === 1) {
        hsb = Raphael.color(color[0]);
        endColor = Raphael.hsb(hsb.h / 360, (hsb.s -30) / 100, 1);
    } else {
        endColor = color[colorCount - 1];
    }

    method = method || "normal ";

    if (method === "special") {
        return function (num) {
            var startHSB = Raphael.color(startColor);
            var endHSB = Raphael.color(endColor);
            var startH = startHSB.h * 360;
            var endH = endHSB.h * 360;
            var startNum = startHSB.h * 20;
            var endNum = endHSB.h * 20;


            var dH;
            var dNum;
            if (startNum >= endNum) {
                dH = 360 - startH + endH;
                dNum = colorCount - startNum + endNum;
            } else {
                dH = endH - startH;
                dNum = endNum - startNum;
            }

            var h = (startH + dH * num) / 360;
            var s = (70 + Math.abs(4 - (startNum + dNum * num) % 8) * 5) / 100;
            var b = (100 - Math.abs(4 - (startNum + dNum * num) % 8) * 5) / 100;

            return Raphael.hsb(h, s, b);
        };
    } else {
        return d3.interpolateRgb.apply(null, [startColor, endColor]);
    }
}

DataV.json = function (url, callback) {
    d3.json(url, callback); '] '
};

DataV.csv = function (url, callback) {
    d3.text(url, "text/csv", function (text) {
        callback(text && d3.csv.parseRows(text));
    });
};


// Create a new Chart.
// @example
//    var Stream = DataV.extend(DataV.Chart, {
//        initialize: function () {
//            this.type = "Stream";
//        },
//        clearCanvas: function () {
//            this.canvas.clear();
//            this.legend.innerHTML = "";
//        }
//    });
//

var Chart = function () {
    this.type = "Chart";
};

Chart.prototype.getType = function () {
    return this.type;
};

DataV.Chart = Chart;

/**
 * 继承
 */
DataV.extend = function (parent, properties) {
    if (typeof parent !== "function") {
        properties = parent;
        parent = function () {};
    }

    properties = properties || {};
    var sub = function () {
        // Call the parent constructor.
        parent.apply(this, arguments);
        // Only call initialize in self constructor.
        if (this.constructor === parent && this.initialize) {
            this.initialize.apply(this, arguments);
        }
    };
    sub.prototype = new parent();
    sub.prototype.constructor = parent;
    $.extend(sub.prototype, properties);
    return sub;
};

/*********************************************************************************
 * Axis
 */
//copy codes from d3.js, add 4 functions: tickAttr, tickTextAttr, minorTickAttr and domainAttr;
//axis() changes, need a raphael paper object param, return raphael set object.
//examples in ../examples/axis/ to know the usage.
//a basic part for other data visualization format
/*global d3*/

/**
 * function from d3, get scaleRange of an ordinal scale
 * @param domain, ordinal scale's range
 */
function d3_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [start, stop] : [stop, start];
}

/**
 * function from d3, get scaleRange of a scale
 */
function d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
}

/**
 * function from d3, get subticks
 * @param scale, scale
 * @param ticks, major ticks of scale
 * @param m, number of subdivide
 */
function d3_svg_axisSubdivide(scale, ticks, m) {
    var subticks = [];
    if (m && ticks.length > 1) {
        var extent = d3_scaleExtent(scale.domain()),
            i = -1,
            n = ticks.length,
            d = (ticks[1] - ticks[0]) / ++m,
            j,
            v;
        while (++i < n) {
            for (j = m; --j > 0;) {
                if ((v = +ticks[i] - j * d) >= extent[0]) {
                    subticks.push(v);
                }
            }
        }
        for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1];) {
            subticks.push(v);
        }
    }
    return subticks;
}

var Axis = function () {
    var scale = d3.scale.linear(),
        orient = "bottom",
        tickMajorSize = 6,
        tickMinorSize = 6,
        tickEndSize = 6,
        tickPadding = 3,
        tickArguments_ = [10],
        tickFormat_,
        tickSubdivide = 0,

        tickAttr_ = {},
        tickTextAttr_ = {},
        minorTickAttr_ = {},
        domainAttr_ = {};

    /**
     * @param paper: raphael's paper object.
     * @return axisSet: raphael's set object.
     */
    function axis(paper) {
        // Ticks for quantitative scale, or domain values for ordinal scale.
        var ticks = scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain(),
            tickFormat = tickFormat_ === undefined ?
                (scale.tickFormat ?
                    scale.tickFormat.apply(scale, tickArguments_)
                    : String)
                : tickFormat_;

        var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide);
        var range = d3_scaleRange(scale);

        var axisSet = paper.set();

        switch (orient) {
            case "bottom":
                subticks.forEach(function (d, i, arr) {
                    var tickX = scale.ticks ? scale(d) : scale(d) + scale.rangeBand() / 2;
                    axisSet.push(paper
                        .path("M" + tickX + "," + tickMinorSize + "V0")
                        .attr(minorTickAttr_));
                });
                ticks.forEach(function (d, i, arr) {
                    var tickX = scale.ticks ? scale(d) : scale(d) + scale.rangeBand() / 2;
                    axisSet.push(paper
                        .path("M" + tickX + "," + tickMajorSize + "V0")
                        .attr(tickAttr_));
                    axisSet.push(paper
                        .text(tickX,  Math.max(tickMajorSize, 0) + tickPadding + 2,
                            typeof tickFormat === "function" ? tickFormat(d) : tickFormat)
                        .attr({"text-anchor": "middle"})
                        .attr(tickTextAttr_));
                });
                axisSet.push(paper
                    .path("M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize)
                    .attr(domainAttr_));
                break;

            case "top":
                subticks.forEach(function (d, i, arr) {
                    var tickX = scale.ticks ? scale(d) : scale(d) + scale.rangeBand() / 2;
                    axisSet.push(paper
                        .path("M" + tickX + "," + -tickMinorSize + "V0")
                        .attr(minorTickAttr_));
                });
                ticks.forEach(function (d, i, arr) {
                    var tickX = scale.ticks ? scale(d) : scale(d) + scale.rangeBand() / 2;
                    axisSet.push(paper
                        .path("M" + tickX + "," + -tickMajorSize + "V0")
                        .attr(tickAttr_));
                    axisSet.push(paper
                        .text(tickX,  -(Math.max(tickMajorSize, 0) + tickPadding + 2),
                            typeof tickFormat === "function" ? tickFormat(d) : tickFormat)
                        .attr({"text-anchor": "middle"})
                        .attr(tickTextAttr_));
                });
                axisSet.push(paper
                    .path("M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize)
                    .attr(domainAttr_));
                break;

            case "left":
                subticks.forEach(function (d, i, arr) {
                    var tickY = scale.ticks ? scale(d) : scale(d) + scale.rangeBand() / 2;
                    axisSet.push(paper
                        .path("M" + -tickMinorSize + "," + tickY + "H0")
                        .attr(minorTickAttr_));
                });
                ticks.forEach(function (d, i, arr) {
                    var tickY = scale.ticks ? scale(d) : scale(d) + scale.rangeBand() / 2;
                    axisSet.push(paper
                        .path("M" + -tickMajorSize + "," + tickY + "H0")
                        .attr(tickAttr_));
                    axisSet.push(paper
                        .text(-(Math.max(tickMajorSize, 0) + tickPadding),  tickY,
                            typeof tickFormat === "function" ? tickFormat(d) : tickFormat)
                        .attr({"text-anchor": "end"})
                        .attr(tickTextAttr_));
                });
                axisSet.push(paper
                    .path("M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize)
                    .attr(domainAttr_));
                break;

            case "right":
                subticks.forEach(function (d, i, arr) {
                    var tickY = scale.ticks ? scale(d) : scale(d) + scale.rangeBand() / 2;
                    axisSet.push(paper
                        .path("M" + tickMinorSize + "," + tickY + "H0")
                        .attr(minorTickAttr_));
                });
                ticks.forEach(function (d, i, arr) {
                    var tickY = scale.ticks ? scale(d) : scale(d) + scale.rangeBand() / 2;
                    axisSet.push(paper
                        .path("M" + tickMajorSize + "," + tickY + "H0")
                        .attr(tickAttr_));
                    axisSet.push(paper
                        .text(Math.max(tickMajorSize, 0) + tickPadding,  tickY,
                            typeof tickFormat === "function" ? tickFormat(d) : tickFormat)
                        .attr({"text-anchor": "start"})
                        .attr(tickTextAttr_));
                });
                axisSet.push(paper
                    .path("M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize)
                    .attr(domainAttr_));
                break;
        }

        return axisSet;
    }

    /**
     * get or set axis' scale.
     */
    axis.scale = function (x) {
        if (!arguments.length) {
            return scale;
        }
        scale = x;
        return axis;
    };

    /**
     * get or set axis' orinet: "bottom", "top", "left", "right", default orient is bottom.
     */
    axis.orient = function (x) {
        if (!arguments.length) {
            return orient;
        }
        orient = x;
        return axis;
    };

    /**
     * get or set axis' ticks number.
     */
    axis.ticks = function () {
        if (!arguments.length) {
            return tickArguments_;
        }
        tickArguments_ = arguments;
        return axis;
    };

    /**
     * get or set axis' ticks format function, it's a function change format style.
     * from one string format to another string format.
     */
    axis.tickFormat = function (x) {
        if (!arguments.length) {
            return tickFormat_;
        }
        tickFormat_ = x;
        return axis;
    };

    /**
     * get or set axis' tick size(length of tick line, unit: px).
     * @param arguments.length === 0, get axis' major tick size.
     * @param arguments.length === 1, set axis' all tick sizes as x.
     * @param arguments.length === 2, get axis' major tick size as x, minor and end size as y.
     * @param arguments.length === 3, get axis' major tick size as x, minor size as y, end size as z.
     */
    axis.tickSize = function (x, y, z) {
        if (!arguments.length) {
            return tickMajorSize;
        }
        var n = arguments.length - 1;
        tickMajorSize = +x;
        tickMinorSize = n > 1 ? +y : tickMajorSize;
        tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
        return axis;
    };

    /**
     * get or set axis' tick padding(the distance between tick text and axis).
     * @param x is a number, unit is px;
     */
    axis.tickPadding = function (x) {
        if (!arguments.length) {
            return tickPadding;
        }
        tickPadding = +x;
        return axis;
    };

    /**
     * get or set axis' sub tick divide number(divide number between two major ticks).
     */
    axis.tickSubdivide = function (x) {
        if (!arguments.length) {
            return tickSubdivide;
        }
        tickSubdivide = +x;
        return axis;
    };

    /**
     * get or set axis' tick attribute(Raphael format).
     */
    axis.tickAttr = function (x) {
        if (!arguments.length) {
            return tickAttr_;
        }
        tickAttr_ = x;
        return axis;
    };

    /**
     * get or set axis' tick text attribute(Raphael format).
     */
    axis.tickTextAttr = function (x) {
        if (!arguments.length) {
            return tickTextAttr_;
        }
        tickTextAttr_ = x;
        return axis;
    };

    /**
     * get or set axis' minor tick attribute(Raphael format).
     */
    axis.minorTickAttr = function (x) {
        if (!arguments.length) {
            return minorTickAttr_;
        }
        minorTickAttr_ = x;
        return axis;
    };

    /**
     * get or set axis' domain(axis line) attribute(Raphael format).
     */
    axis.domainAttr = function (x) {
        if (!arguments.length) {
            return domainAttr_;
        }
        domainAttr_ = x;
        return axis;
    };

    return axis;
};

DataV.Axis = Axis;


/*******************************************************************************
 * brush
 */
/*global d3*/
/*global Raphael*/
/*global $*/

var d3_svg_brush,
    d3_svg_brushDispatch,
    d3_svg_brushTarget,
    d3_svg_brushX,
    d3_svg_brushY,
    d3_svg_brushExtent,
    d3_svg_brushDrag,
    d3_svg_brushResize,
    d3_svg_brushCenter,
    d3_svg_brushOffset,
    d3_svg_brushEls;

/*
 * set foreground and resizers' x and width;
 */
function d3_svg_brushRedrawX(brushEls, extent) {
    brushEls.fg.attr({"x": extent[0][0],
        "width": extent[1][0] - extent[0][0] });
    brushEls.resizerSet.forEach(function (el) {
        var orient = el.data("resizeOrient");

        if (orient === "n" ||
            orient === "s" ||
            orient === "w" ||
            orient === "nw" ||
            orient === "sw") {
            el.attr({"x": extent[0][0] - 2});
        } else { // "e" "ne" "se"
            el.attr({"x": extent[1][0] - 2});
        }
        if (orient === "n" || orient === "s") {
            el.attr({"width": extent[1][0] - extent[0][0]});
        }
    });
    /*
     g.select(".extent").attr("x", extent[0][0]);
     g.selectAll(".n,.s,.w,.nw,.sw").attr("x", extent[0][0] - 2);
     g.selectAll(".e,.ne,.se").attr("x", extent[1][0] - 3);
     g.selectAll(".extent,.n,.s").attr("width", extent[1][0] - extent[0][0]);
     */
}

/*
 * set foreground and resizers' y and height;
 */
function d3_svg_brushRedrawY(brushEls, extent) {
    brushEls.fg.attr({"y": extent[0][1],
        "height": extent[1][1] - extent[0][1] });
    brushEls.resizerSet.forEach(function (el) {
        var orient = el.data("resizeOrient");
        if (orient === "n" ||
            orient === "e" ||
            orient === "w" ||
            orient === "nw" ||
            orient === "ne") {
            el.attr({"y": extent[0][1] - 3});
        } else { // "s" "se" "sw"
            el.attr({"y": extent[1][1] - 4});
        }
        if (orient === "e" || orient === "w") {
            el.attr({"height": extent[1][1] - extent[0][1]});
        }
    });

    /*
     g.select(".extent").attr("y", extent[0][1]);
     g.selectAll(".n,.e,.w,.nw,.ne").attr("y", extent[0][1] - 3);
     g.selectAll(".s,.se,.sw").attr("y", extent[1][1] - 4);
     g.selectAll(".extent,.e,.w").attr("height", extent[1][1] - extent[0][1]);
     */
}

/**
 * function from d3, called by d3_svg_brushMove, compute new brush extent after brush moved
 */
function d3_svg_brushMove1(mouse, scale, i) {
    var range = d3_scaleRange(scale),
        r0 = range[0],
        r1 = range[1],
        offset = d3_svg_brushOffset[i],
        size = d3_svg_brushExtent[1][i] - d3_svg_brushExtent[0][i],
        min,
        max;

    // When dragging, reduce the range by the extent size and offset.
    if (d3_svg_brushDrag) {
        r0 -= offset;
        r1 -= size + offset;
    }

    // Clamp the mouse so that the extent fits within the range extent.
    min = Math.max(r0, Math.min(r1, mouse[i]));

    // Compute the new extent bounds.
    if (d3_svg_brushDrag) {
        max = (min += offset) + size;
    } else {
        // If the ALT key is pressed, then preserve the center of the extent.
        if (d3_svg_brushCenter) {
            offset = Math.max(r0, Math.min(r1, 2 * d3_svg_brushCenter[i] - min));
        }

        // Compute the min and max of the offset and mouse.
        if (offset < min) {
            max = min;
            min = offset;
        } else {
            max = offset;
        }
    }

    // Update the stored bounds.
    d3_svg_brushExtent[0][i] = min;
    d3_svg_brushExtent[1][i] = max;
}

/**
 * function from d3, after brush moved, compute new brush extent
 * and redraw foreground and resizer.
 */
function d3_svg_brushMove(e) {
    if (d3_svg_brushOffset) {
        var bgOffset = $(d3_svg_brushTarget).offset();
        var mouse = [e.pageX - bgOffset.left, e.pageY - bgOffset.top];

        if (!d3_svg_brushDrag) {
            // If needed, determine the center from the current extent.
            if (e.altKey) {
                if (!d3_svg_brushCenter) {
                    d3_svg_brushCenter = [
                        (d3_svg_brushExtent[0][0] + d3_svg_brushExtent[1][0]) / 2,
                        (d3_svg_brushExtent[0][1] + d3_svg_brushExtent[1][1]) / 2
                    ];
                }

                // Update the offset, for when the ALT key is released.
                d3_svg_brushOffset[0] = d3_svg_brushExtent[+(mouse[0] < d3_svg_brushCenter[0])][0];
                d3_svg_brushOffset[1] = d3_svg_brushExtent[+(mouse[1] < d3_svg_brushCenter[1])][1];
            } else {
                // When the ALT key is released, we clear the center.
                d3_svg_brushCenter = null;
            }
        }

        // Update the brush extent for each dimension.
        if (d3_svg_brushX) {
            d3_svg_brushMove1(mouse, d3_svg_brushX, 0);
            d3_svg_brushRedrawX(d3_svg_brushEls, d3_svg_brushExtent);
        }
        if (d3_svg_brushY) {
            d3_svg_brushMove1(mouse, d3_svg_brushY, 1);
            d3_svg_brushRedrawY(d3_svg_brushEls, d3_svg_brushExtent);
        }

        // Notify listeners.
        d3_svg_brushDispatch("brush");
    }
}

/*
 * function from d3,
 * reset brush offset if user presses "space" key while brushing a new area,
 * to ensure foreground's size unchanged while position changing.
 */
function d3_svg_brushKeydown(e) {
    if (e.keyCode === 32 && d3_svg_brushTarget && !d3_svg_brushDrag) {
        d3_svg_brushCenter = null;
        d3_svg_brushOffset[0] -= d3_svg_brushExtent[1][0];
        d3_svg_brushOffset[1] -= d3_svg_brushExtent[1][1];
        d3_svg_brushDrag = 2;
        e.stopPropagation();
    }
}

/*
 * function from d3,
 * reset brush offset if "space" key up to restore normal drush state.
 */
function d3_svg_brushKeyup(e) {
    if (e.keyCode === 32 && d3_svg_brushDrag === 2) {
        d3_svg_brushOffset[0] += d3_svg_brushExtent[1][0];
        d3_svg_brushOffset[1] += d3_svg_brushExtent[1][1];
        d3_svg_brushDrag = 0;
        e.stopPropagation();
    }
}

/*
 * function from d3,
 * mouse up and stop brushing.
 */
function d3_svg_brushUp(e) {
    if (d3_svg_brushOffset) {
        d3_svg_brushMove(e);
        d3_svg_brushEls.resizerSet.forEach(function (resizer) {
            //adjust all resizers
            var orient = resizer.data("resizeOrient");
            var size = d3_svg_brush.empty() ? 0 : 6;
            if (orient === "n" || orient === "s") {
                resizer.attr({"height": size});
            } else {
                resizer.attr({"width": size});
            }
        });
        d3_svg_brushDispatch("brushend");
        d3_svg_brush =
            d3_svg_brushDispatch =
                d3_svg_brushTarget =
                    d3_svg_brushX =
                        d3_svg_brushY =
                            d3_svg_brushExtent =
                                d3_svg_brushDrag =
                                    d3_svg_brushResize =
                                        d3_svg_brushCenter =
                                            d3_svg_brushOffset =
                                                d3_svg_brushEls = null;
        e.stopPropagation();
    }
}

var d3_svg_brushCursor = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
};
var vml_brushCursor = {
    n: "row-resize",
    e: "col-resize",
    s: "row-resize",
    w: "col-resize",
    nw: "all-scroll",
    ne: "all-scroll",
    se: "all-scroll",
    sw: "all-scroll"
};

var Brush  = function () {
    var event = d3.dispatch("brushstart", "brush", "brushend"),
        x, // x-scale, optional
        y, // y-scale, optional
        extent = [[0, 0], [0, 0]], // [x0, y0], [x1, y1]
        e,
        left,
        top,
        width,
        height,
        backgroundAttr = {"fill": "#dddddd",
            "stroke": "none",
            "cursor": "crosshair"
        },
        foregroundAttr = {"fill": "steelblue",
            "stroke": "none",
            "cursor": "move"
        },
        brushStart = function () {},
        brushing = function () {},
        brushEnd = function () {},

        brushEls = {},
        brushClass;

    /*
     * mouse down and start brushing or dragging.
     */
    function down(e) {
        var target = e.target,
            bgOffset;

        // Store some global state for the duration of the brush gesture.
        d3_svg_brush = brush;
        d3_svg_brushTarget = $(brushEls.paper.canvas).parent();
        d3_svg_brushExtent = extent;
        bgOffset = $(d3_svg_brushTarget).offset();

        d3_svg_brushOffset = [e.pageX - bgOffset.left, e.pageY - bgOffset.top];
        d3_svg_brushEls = brushEls;

        // If the extent was clicked on, drag rather than brush;
        // store the offset between the mouse and extent origin instead.
        d3_svg_brushDrag = target.__brushNodeType__ === "fg" ? true : false;
        if (d3_svg_brushDrag) {
            d3_svg_brushOffset[0] = extent[0][0] - d3_svg_brushOffset[0];
            d3_svg_brushOffset[1] = extent[0][1] - d3_svg_brushOffset[1];
        } else if (/^resize/.test(target.__brushNodeType__)) {
            // If a resizer was clicked on, record which side is to be resized.
            // Also, set the offset to the opposite side.
            d3_svg_brushResize = target.__brushNodeType__.split("_")[1];
            d3_svg_brushOffset[0] = extent[+(/w$/.test(d3_svg_brushResize))][0];
            d3_svg_brushOffset[1] = extent[+(/^n/.test(d3_svg_brushResize))][1];
        } else if (e.altKey) {
            // If the ALT key is down when starting a brush, the center is at the mouse.
            d3_svg_brushCenter = d3_svg_brushOffset.slice();
        }

        // Restrict which dimensions are resized.
        d3_svg_brushX = !/^(n|s)$/.test(d3_svg_brushResize) && x;
        d3_svg_brushY = !/^(e|w)$/.test(d3_svg_brushResize) && y;

        // Notify listeners.
        d3_svg_brushDispatch = dispatcher(this, arguments);
        d3_svg_brushDispatch("brushstart");
        d3_svg_brushMove(e);
        e.stopPropagation();
    }

    /*
     * create brush
     * input a Raphael paper, return a brush object.
     */
    function brush(paper) {
        var resizes = x && y ? ["n", "e", "s", "w", "nw", "ne", "se", "sw"]
            : x ? ["e", "w"]
            : y ? ["n", "s"]
            : [];

        if (x) {
            e = d3_scaleRange(x);
            left = e[0];
            width = e[1] - e[0];
        }

        if (y) {
            e = d3_scaleRange(y);
            top = e[0];
            height = e[1] - e[0];
        }

        brushEls.paper = paper;
        brushEls.brushSet = paper.set();
        brushEls.resizerSet = paper.set();
        brushEls.bg = paper.rect(left, top, width, height)
            .attr({"fill": "#dddddd",
                "stroke": "none",
                "cursor": "crosshair"
            })
            .attr(backgroundAttr);
        brushEls.bg.node.__brushNodeType__ = "bg";
        brushEls.bg.node.ondragstart = function () { return false; };//firefox drag bug fix;

        brushClass = "brush" + brushEls.bg.id;

        //$(brushEls.bg.node).addClass("brush bg rvml");  // fail to svg
        brushEls.bg.node.setAttribute("class", "brush bg rvml " + brushClass);
        brushEls.bg.node.setAttribute("className", "brush bg rvml " + brushClass);// IE 6,7

        brushEls.fg = paper.rect(left, top, (x ? 0 : width), (y ? 0 : height))
            .attr({"fill": "steelblue",
                "stroke": "none",
                "cursor": "move"
            })
            .attr(foregroundAttr);
        brushEls.fg.node.__brushNodeType__ = "fg";
        brushEls.fg.node.ondragstart = function () { return false; };//firefox drag bug fix;
        //$(brushEls.fg.node).addClass("brush fg rvml");   //fail to svg
        brushEls.fg.node.setAttribute("class", "brush fg rvml " + brushClass);
        brushEls.fg.node.setAttribute("className", "brush fg rvml " + brushClass);// IE 6,7

        resizes.forEach(function (d) {
            var resizer = paper.rect(left, top, (x ? 6 : width), (y ? 6 : height))
                .data("resizeOrient", d)
                .attr({"cursor": d3_svg_brushCursor[d],
                    "fill": "white",
                    "stroke": "black",
                    "opacity": 0});
            if (Raphael.vml) {
                resizer.attr({"cursor": vml_brushCursor[d]});
            }
            if (brush.empty()) {
                //hide all resizers
                if (d === "n" || d === "s") {
                    resizer.attr({"height": 0});
                } else {
                    resizer.attr({"width": 0});
                }
            }
            resizer.node.__brushNodeType__ = "resizer_" + d;
            resizer.node.ondragstart = function () { return false; };//firefox drag bug fix;
            //$(resizer.node).addClass("brush rvml " + d3_svg_brushCursor[d]);  //fail to svg
            resizer.node.setAttribute("class", "brush rvml " + brushClass + " " + d3_svg_brushCursor[d]);
            //IE 6,7
            resizer.node.setAttribute("className", "brush rvml " + brushClass + " " + d3_svg_brushCursor[d]);
            brushEls.resizerSet.push(resizer);
        });

        if (x) {
            d3_svg_brushRedrawX(brushEls, extent);
        }

        if (y) {
            d3_svg_brushRedrawY(brushEls, extent);
        }

        //$(paper.canvas).delegate(".brush","mousedown", down);
        //$(paper.canvas).undelegate(".brush","mousedown", down);
        //$(paper.canvas).delegate(".brush","mousedown", down);
        //$(paper.canvas).off("mousedown", ".brush", down);
        $(paper.canvas).on("mousedown", "." + brushClass,  down);

        brush.brushElements = brushEls;
        return brush;
    }

    // dispatch event, bind data to golbal variant d3.event.
    var dispatcher = function (that, argumentz) {
        return function (type) {
            var e = d3.event;
            try {
                d3.event = {type: type, target: brush};
                event[type].apply(that, argumentz);
            } finally {
                d3.event = e;
            }
        };
    };

    /**
     * get or set brush's left
     * @param z, a value in brush scale's domain
     */
    brush.left = function (z) {
        if (!arguments.length) { return left; }
        left = z;
        return brush;
    };

    /**
     * get or set brush's top
     * @param z, a value in brush scale's domain
     */
    brush.top = function (z) {
        if (!arguments.length) { return top; }
        top = z;
        return brush;
    };

    /**
     * get or set brush's width
     * @param z, a value in brush scale's domain
     */
    brush.width = function (z) {
        if (!arguments.length) { return width; }
        width = z;
        return brush;
    };

    /**
     * get or set brush's height
     * @param z, a value in brush scale's domain
     */
    brush.height = function (z) {
        if (!arguments.length) { return height; }
        height = z;
        return brush;
    };

    /**
     * get or set brush's x scale
     * @param z, d3's sacle object
     */
    brush.x = function (z) {
        if (!arguments.length) { return x; }
        x = z;
        return brush;
    };

    /**
     * get or set brush's y scale
     * @param z, d3's sacle object
     */
    brush.y = function (z) {
        if (!arguments.length) { return y; }
        y = z;
        return brush;
    };

    /**
     * get or set brush's extent in scale's domain format.
     * if both x and y exist, @param z's format is [[x0, y0], [x1, y1]]
     * if only one of x and y exists, @param z's format is [x0, x1] or [y0, y1].
     */
    brush.extent = function (z) {
        var x0, x1, y0, y1, t;

        // Invert the pixel extent to data-space.
        if (!arguments.length) {
            if (x) {
                x0 = extent[0][0]; x1 = extent[1][0];
                if (x.invert) {
                    x0 = x.invert(x0); x1 = x.invert(x1);
                }
                if (x1 < x0) {
                    t = x0; x0 = x1; x1 = t;
                }
            }
            if (y) {
                y0 = extent[0][1]; y1 = extent[1][1];
                if (y.invert) {
                    y0 = y.invert(y0); y1 = y.invert(y1);
                }
                if (y1 < y0) {
                    t = y0; y0 = y1; y1 = t;
                }
            }
            return x && y ? [[x0, y0], [x1, y1]] : x ? [x0, x1] : y && [y0, y1];
        }

        // Scale the data-space extent to pixels.
        if (x) {
            x0 = z[0]; x1 = z[1];
            if (y) {
                x0 = x0[0]; x1 = x1[0];
            }
            if (x.invert) {
                x0 = x(x0); x1 = x(x1);
            }
            if (x1 < x0) {
                t = x0; x0 = x1; x1 = t;
            }
            extent[0][0] = x0; extent[1][0] = x1;
        }
        if (y) {
            y0 = z[0]; y1 = z[1];
            if (x) {
                y0 = y0[1]; y1 = y1[1];
            }
            if (y.invert) {
                y0 = y(y0); y1 = y(y1);
            }
            if (y1 < y0) {
                t = y0; y0 = y1; y1 = t;
            }
            extent[0][1] = y0; extent[1][1] = y1;
        }

        return brush;
    };

    //empty extent and refresh foreground
    brush.clear = function () {
        extent[0][0] = extent[0][1] = extent[1][0] = extent[1][1] = 0;
        brush.refresh();
        return brush;
    };

    //refresh foreground
    brush.refresh = function () {
        if (x) {
            d3_svg_brushRedrawX(brushEls, extent);
        }
        if (y) {
            d3_svg_brushRedrawY(brushEls, extent);
        }
        return brush;
    };

    //remove all brush elements, so users can reset brush attributes and redraw it.
    brush.remove = function () {
        $(paper.canvas).off("mousedown", "." + brushClass,  down);
        brushEls.fg.remove();
        brushEls.bg.remove();
        brushEls.resizerSet.remove();
        return brush;
    };

    // if brush is empty, return true, else false;
    brush.empty = function () {
        return (x && extent[0][0] === extent[1][0]) || (y && extent[0][1] === extent[1][1]);
    };

    // set background attribute.
    brush.backgroundAttr  = function (x) {
        if (!arguments.length) { return backgroundAttr; }
        backgroundAttr = x;
        return brush;
    };

    // set foreground attribute.
    brush.foregroundAttr = function (x) {
        if (!arguments.length) { return foregroundAttr; }
        foregroundAttr = x;
        return brush;
    };

    $(document).bind("mousemove", d3_svg_brushMove)
        .bind("mouseup", d3_svg_brushUp)
        .bind("keydown", d3_svg_brushKeydown)
        .bind("keyup", d3_svg_brushKeyup);

    return d3.rebind(brush, event, "on");
};

DataV.Brush = Brush;

/******************************************************************/
// floattag
var FloatTag = function () {

    var _mousemove = function (e) {
        var jqNode = e.data.jqNode;
        var container = e.data.container;
        var mouseToFloatTag = {x: 20, y: 20};
        var offset = $(container).offset();
        if (!(e.pageX && e.pageY)) {return false;}
        var x = e.pageX - offset.left,
            y = e.pageY - offset.top;
        var position = $(container).position();

        setContent.call(this);

        //set floatTag location
        floatTagWidth = jqNode.outerWidth();
        floatTagHeight = jqNode.outerHeight();
        if (floatTagWidth + x + 2 * mouseToFloatTag.x <=  $(container).width()) {
            x += mouseToFloatTag.x;
        } else {
            x = x - floatTagWidth - mouseToFloatTag.x;
        }
        if (y >= floatTagHeight + mouseToFloatTag.y) {
            y = y - mouseToFloatTag.y - floatTagHeight;
        } else {
            y += mouseToFloatTag.y;
        }
        jqNode.css("left",  x  + "px");
        jqNode.css("top",  y + "px");
    };

    var setContent = function () {
    };

    /**
     * @param paper: raphael's paper object.
     * @return axisSet: raphael's set object.
     */
    function floatTag(cont) {
        var container = cont;
        var jqNode = $("<div/>").css({
            "border": "1px solid",
            "border-color": $.browser.msie ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.8)",
            "background-color": $.browser.msie ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.75)",
            "color": "white",
            "border-radius": "2px",
            "padding": "12px 8px",
            //"line-height": "170%",
            //"opacity": 0.7,
            "font-size": "12px",
            "box-shadow": "3px 3px 6px 0px rgba(0,0,0,0.58)",
            "font-familiy": "宋体",
            "z-index": 10000,
            "text-align": "center",

            "visibility": "hidden",
            "position": "absolute"
        });
        $(container).append(jqNode)
            .mousemove({"jqNode": jqNode, "container": container}, _mousemove);
        return jqNode;
    }

    floatTag.setContent = function (sc) {
        if (arguments.length === 0) {
            return setContent;
        }
        setContent = sc;
    };

    return floatTag;
};

DataV.FloatTag = FloatTag;

//module.exports = DataV;
//});
/*global EventProxy, d3, Raphael, $ */
//define(function (require, exports, module) {
//    var DataV = require('datav');
var theme = DataV.Themes;

var Tree = DataV.extend(DataV.Chart, {
    initialize: function (container, options) {
        this.type = "Tree";
        this.container = container;
        this.defaults = {};

        this.addlink = {};

        // Properties
        this.treeDepth = 0;
        this.font = {};

        // Canvas
        this.defaults.width = 750;
        this.defaults.height = 760;
        this.defaults.deep = 180;
        this.defaults.radius = 15;

        this.setOptions(options);
        this.emitter = new EventProxy();
        this.createCanvas();
    }
});

Tree.prototype.on = function (eventName, callback) {
    this.emitter.on(eventName, callback);
};

Tree.prototype.setOptions = function (options) {
    var prop;
    if (options) {
        for (prop in options) {
            if (options.hasOwnProperty(prop)) {
                this.defaults[prop] = options[prop];
            }
        }
    }
};

Tree.prototype.hierarchyTableToJson = function (table) {
    if (table[0][0] === "ID") {
        table = table.slice(1);
    }

    var rootID;
    var hierarchy = {};
    var addlink = {}; //for multi-fathernode

    table.forEach(function (d, i) {
        if (d[0] === "") {
            throw new Error("ID can not be empty(line:" + (i + 1) + ").");
        }
        if (!d[3]) {
            if (rootID) {
                throw new Error("2 or more lines have an empty parentID(line:" + (i + 1) + ").");
            } else {
                rootID = d[0];
            }
        }
        if (hierarchy[d[0]]) {
            throw new Error("2 or more lines have same ID: " + d[0] + "(line:" + (i + 1) + ").");
        }

        var value = "";
        var j, length;
        if (d.length > 4) {
            for (j = 4, length = d.length; j < length; j++) {
                if (j < length - 1) {
                    value = value + d[j] + ",";
                } else {
                    value = value + d[j];
                }
            }
        }
        hierarchy[d[0]] = {name: d[1], size: d[2], child: [], id: d[0], value: value};
    });
    if (!rootID) {
        throw new Error("No root node defined.");
    }
    table.forEach(function (d, i) {
        if (d[3]) {
            var record;
            var ids = d[3].split('.');
            if (ids.length === 1) {
                record = hierarchy[d[3]];
                record.child.push(d[0]);
            } else {
                record = hierarchy[ids[0]];
                record.child.push(d[0]);
                addlink[d[0]] = {child: [], path: [], pnode: []};

                var j, length;
                for (j = 1, length = ids.length; j < length; j++) {
                    addlink[d[0]].child.push(ids[j]);
                }
            }
            if (!record) {
                throw new Error("Can not find parent with ID " + d[3] + "(line:" + (i + 1) + ").");
            }
        }
    });

    this.addlink = addlink;

    var recurse = function (rootID) {
        var record = hierarchy[rootID];
        if (record.child.length === 0) {
            if (isNaN(parseFloat(record.size))) {
                throw new Error("Leaf node's size is not a number(ID:" + (rootID + 1) + ").");
            } else {
                return {
                    name: record.name,
                    size: record.size,
                    num: record.id,
                    children: null,
                    draw: false,
                    value: record.value
                };
            }
        } else {
            var childNode = [];
            record.child.forEach(function (d) {
                childNode.push(recurse(d));
            });
            return {name: record.name, children: childNode, num: record.id, draw: false, value: record.value};
        }
    };

    return recurse(rootID);
};

Tree.prototype.setSource = function (source) {
    var conf = this.defaults;

    this.rawData = source; // this.hierarchyTableToJson(source);
    this.source = this.remapSource(source);

    this.source.x0 = conf.width / 2;
    this.source.y0 = conf.radius * 10;

    if (this.source.children) {

        this.source.children.forEach(function collapse(d) {
            if (d.children) {
                // d._children = d.children;
                // d._children.forEach(collapse);
                // d.children = null;
                d._children = null;
                d.children.forEach(collapse);
            }
        });

    }
};

Tree.prototype.remapSource = function (data) {
    return this.hierarchyTableToJson(data);
    // return data;
};

Tree.prototype.layout = function () {
    var conf = this.defaults;
    var tree = d3.layout.tree()
        .size([conf.width, conf.height]);

    this.nodesData = tree.nodes(this.source);

    var treedepth = 0;
    var id = 0;

    this.nodesData.forEach(function (d) {
        if (d.depth > treedepth) {
            treedepth = d.depth;
        }
    });

    this.nodesData.forEach(function (d) {
        d.origDepth = d.depth;
        d.depth -= Math.max(0, treedepth - 5);
    });

    treedepth = Math.min(5, treedepth);
    this.treeDepth = treedepth;

    conf.deep = conf.height / (treedepth + 1);

    this.nodesData.forEach(function (d) {
        d.y = conf.radius * 3 + d.depth * conf.deep;
        d.id = id;
        id++;
    });
};

Tree.prototype.getColor = function () {
    //var conf = this.defaults;
    //var treedepth = this.treeDepth;

    var colorMatrix = DataV.getColor();
    var color;
    if (colorMatrix.length > 1 && colorMatrix[0].length > 1) {
        color = [colorMatrix[0][0], colorMatrix[1][0]];
    } else {
        color = colorMatrix[0];
    }
    //var colorRow_Num = colorRow.length - 1;

    return DataV.gradientColor(color, "special");

    // return function(d){
    //     var color;

    //     if ((treedepth * 2 - 1 )> colorRow_Num) {
    //         if (d > colorRow_Num) {
    //             color = colorRow[colorRow_Num];
    //         } else {
    //             color = colorRow[d];
    //         }
    //     } else {
    //         if (d == 0) {
    //             color = colorRow[0];
    //         } else {
    //             color = colorRow[d * 2 - 1];
    //         }
    //     }

    //     return color;
    // }
};

// Tree.prototype.getFont = function () {
//     //var conf = this.defaults;

//     return DataV.getFont();
// };

Tree.prototype.createCanvas = function () {
    var conf = this.defaults;
    this.canvas = new Raphael(this.container, conf.width, conf.height);
    this.canvasF = document.getElementById(this.container);
    canvasStyle = this.canvasF.style;
    canvasStyle.position = "relative";
    this.floatTag = DataV.FloatTag()(this.canvasF);

    this.floatTag.css({"visibility": "hidden"});

    this.DOMNode = $(this.canvas.canvas);
    var that = this;
    this.DOMNode.click(function (event) {
        that.emitter.trigger("click", event);
    });
    this.DOMNode.dblclick(function (event) {
        that.emitter.trigger("dblclick", event);
    });

    var mousewheel = document.all ? "mousewheel" : "DOMMouseScroll";
    this.DOMNode.bind(mousewheel, function (event) {
        that.emitter.trigger("mousewheel", event);
    });

    this.DOMNode.bind("contextmenu", function (event) {
        that.emitter.trigger("contextmenu", event);
    });

    this.DOMNode.delegate("circle", "click", function (event) {
        that.emitter.trigger("circle_click", event);
    });

    this.DOMNode.delegate("circle", "mouseover", function (event) {
        that.emitter.trigger("circle_mouseover", event);
    });

    this.DOMNode.delegate("circle", "mouseout", function (event) {
        that.emitter.trigger("circle_mouseout", event);
    });

};

Tree.prototype.zoom = function (d) {
    var multiple = 2;

    if (d !== null) {
        multiple = d;
    }

    var conf = this.defaults;

    conf.width = conf.width * multiple;

    if (conf.height <= this.treeDepth * conf.deep) {
        conf.height = conf.height * multiple;
    }

    //this.createCanvas();
    this.canvas.setSize(conf.width, conf.height);
    this.canvas.setViewBox(0, 0, conf.width, 800);
    this.defaults = conf;

    this.render();
};


Tree.prototype.getLinkPath = function (fx, fy, tx, ty) {
    var conf = this.defaults;

    var c1x = fx;
    var c1y = fy + (ty - fy) / 2;
    var c2x = tx;
    var c2y = ty - (ty - fy) / 2;

    var link_path = [["M", fx, fy + conf.radius],
        ["C", c1x, c1y, c2x, c2y, tx, ty - conf.radius]];

    return link_path;
};

Tree.prototype.generatePaths = function () {
    var canvas = this.canvas;
    var source = this.source;
    var conf = this.defaults;
    var radius = conf.radius;
    //canvas.clear();
    var color = this.getColor();
    // var font = this.getFont();
    var font_family = '微软雅黑';
    var font_size = 8;
    var treedepth = this.treeDepth;
    var nodesData = this.nodesData;

    var n = 0;

    var addlink = this.addlink;
    var node;
    var num = 0;

    var nodes = canvas.set();
    var path = [];
    var textpath = [];

    var tree = this;
    var nodeupdate = function () {
        tree.update(this.data("num"));
    };

    $("#" + this.container).append(this.floatTag);

    var i, nodesLength;
    for (i = 0, nodesLength = nodesData.length; i < nodesLength; i++) {
        var d = nodesData[i];
        if (d.depth < 0) {
            continue;
        }
        var extra = d.value.split(",");
        d.lit = extra[0] == "1";
        d.new = extra[1] == "1";

        if (d.depth == 0) {
            if (d.lit) {
                delete d.parent;
            } else {
                continue;
            }
        }
        if (d.new) {
            d.draw = true;
        }
        var parent = d.parent;

        if (addlink[d.num]) {
            var j, k, childLength;
            for (j = 0, childLength = addlink[d.num].child.length; j < childLength; j++) {
                for (k = 0; k < nodesLength; k++) {
                    if (nodesData[k].num === addlink[d.num].child[j]) {
                        addlink[d.num].pnode[j] = k;
                        addlink[d.num].path[j] = canvas.path()
                            .attr({stroke: "#939598", "stroke-width": d.lit ? 2 : 0.5});
                    }
                }
            }
        }

        var startX;
        var startY;

        if (parent && d.draw) {
            startX = parent.x;
            startY = parent.y;
        } else {
            startX = d.x;
            startY = d.y;
        }
        var p = null;
        if (parent) {
            p = canvas.path().attr({stroke: "#939598", "stroke-width": d.lit ? 2 : 0.5});
            path.push(p);
        }
        var circle = canvas.circle(startX, startY, radius)
            .attr({
                fill: (d.lit ? color(d.origDepth * 1.5) : "#999"),
                stroke: "#ffffff",
                "stroke-width": 1,
                "fill-opacity": 0.4,
                "data": 12
            }).data("num", i);
        if (parent && d.draw) {
            circle.animate({cx: d.x, cy: d.y}, 500, "backOut");
        } else if (parent) {
            circle.animate({cx: d.x, cy: d.y}, 0, "linear");
        }

        nodes.push(
            circle
        );

        d.order = nodes.items.length;
        if (d.children || d._children) {
            //nodes[i].click(nodeupdate);
            nodes.items.rear().click(nodeupdate);
        }

        if (d._children) {
            //nodes[i].attr({
            nodes.items.rear().attr({
                stroke: color(d.depth / treedepth),
                "stroke-width": radius,
                "stroke-opacity": 0.4,
                "fill-opacity": 1,
                "r": radius / 2
            });
        }

        if (d.children) {
            textpath.push(canvas.text(d.x, d.y - radius - 7, d.name).attr({
                'font-size': 12,
                //"fill-opacity": d.lit ? 1 : 0.4
            }));
        } else {
            textpath.push(canvas.text(d.x, d.y + radius + 7, d.name).attr({
                'font-size': 12,
                //"fill-opacity": d.lit ? 1 : 0.4
            }));
        }
    }

    // var back = function(pid, x, y){
    //     s.forEach(function (d, i){
    //         if (d.data('pid') == pid){
    //             d.animate({cx: x, cy: y}, 200, "backOut");
    //             if (nodes[i].children)
    //             back(d.data('num'), d.attr('cx'), d.attr('cy'));
    //         }
    //     });
    // };

    // s.forEach(function(d, i) {
    //     d.click(function(){
    //         if (nodes[i].children)
    //         back(d.data('num'), d.attr('cx'), d.attr('cy'));
    //         tree.update(d.data("num"));
    //     });
    // });
    var floatTag = this.floatTag;
    nodes.forEach(function (d, i) {
        var orig = d.data("num");
        //$(d.node).attr('value', nodesData[i].value);
        $(d.node).attr('value', nodesData[orig].value);
        var textY = textpath[i].attr('y');

        var thisradius = d.attr('r');
        var thisstrokewidth = d.attr('stroke-width');
        d.mouseover(function () {
                //if (!nodesData[i]._children) {
                if (!nodesData[orig]._children) {
                    this.animate({r: thisradius + 2, "fill-opacity": 0.75}, 100);
                } else {
                    this.animate({r: thisradius + 2, "stroke-opacity": 0.75}, 100);
                }

                textpath[i].attr({'font-size': 20});


                if (i > 0) {
                    //if (!nodesData[i].children) {
                    if (!nodesData[orig].children) {
                        textpath[i].animate({'y': textY + 12}, 100, "backOut");
                    } else {
                        textpath[i].animate({'y': textY - 12}, 100, "backOut");
                    }
                }

                var getFline = function (node, num) {
                    var parent = node.parent;
                    if (parent) {
                        path[node.order - 2].attr({"stroke-width": 4, "stroke-opacity": num});
                        if (num > 0.5) {
                            num = num - 0.1;
                        }
                        getFline(parent, num);
                    }
                };

                //getFline(nodesData[i], 0.9);
                getFline(nodesData[orig], 0.9);

                //var thisparent = nodesData[i].parent;
                var thisparent = nodesData[orig].parent;
                var j, textpathLength;
                for (j = 0, textpathLength = textpath.length; j < textpathLength; j++) {
                    //var parent = nodesData[j].parent;
                    var parent = nodesData[orig].parent;
                    //if (parent === thisparent && j !== i) {
                    if (parent === thisparent && j !== nodesData[orig].order - 1) {
                        textpath[j].animate({'fill-opacity': 0.4});
                    }
                }

                //console.log(nodesData[i]);
                floatTag.html('<div style = "text-align: center;margin:auto;color:'
                        //+ jqNode.color
                    + "#ffffff"
                        //+ '">' + nodesData[i].name + '</div>'
                    + '">' + nodesData[orig].name + '</div>'
                );
                floatTag.css({"visibility": "visible"});
            })
            .mouseout(function () {
                floatTag.css({"visibility": "hidden"});
                //if (!nodesData[i]._children) {
                if (!nodesData[orig]._children) {
                    this.animate({r: thisradius, "fill-opacity": 0.4}, 100);
                } else {
                    this.animate({r: thisradius, "stroke-width": thisstrokewidth, "stroke-opacity": 0.4}, 100);
                }
                textpath[i].attr({'font-size': 12});
                textpath[i].animate({'y': textY}, 100, "backOut");

                var getFline = function (node) {
                    var parent = node.parent;
                    if (parent) {
                        path[node.order - 2].attr({"stroke-width": node.lit ? 2 : 0.5, "stroke-opacity": 1});
                        getFline(parent);
                    }
                }
                //getFline(nodesData[i]);
                getFline(nodesData[orig]);

                //var thisparent = nodesData[i].parent;
                var thisparent = nodesData[orig].parent;
                var j, textpathLength;
                for (j = 0, textpathLength = textpath.length; j < textpathLength; j++) {
                    //var parent = nodesData[j].parent;
                    var parent = nodesData[orig].parent;
                    //if (parent === thisparent && j !== i) {
                    if (parent === thisparent && j !== nodesData[orig].order - 1) {
                        textpath[j].animate({'fill-opacity': 1});
                    }
                }
            });
    });

    nodes.onAnimation(function () {
        var pathNum = 0;
        var i, nodeslength;

        for (i = 1, nodeslength = nodes.length; i < nodeslength; i++) {
            var d = nodes[i],
                orig = d.data("num");
            //var node = nodesData[i];
            var node = nodesData[orig];
            var parent = node.parent;

            path[pathNum]
                .attr({path: tree.getLinkPath(parent.x, parent.y, d.attr("cx"), d.attr("cy"))});

            pathNum++;

            if (addlink[node.num]) {
                var j, k, linkchildLength, nodesLength;
                for (j = 0, linkchildLength = addlink[node.num].child.length; j < linkchildLength; j++) {
                    for (k = 0, nodesLength = nodesData.length; k < nodesLength; k++) {
                        //var anparent = nodesData[k];
                        var anparent = nodesData[nodes[k].attr("orig")];
                        if (anparent.num === addlink[node.num].child[j]) {
                            var link_path = tree.getLinkPath(anparent.x, anparent.y, d.attr("cx"), d.attr("cy"));
                            addlink[node.num].path[j].attr({path: link_path});
                        }
                    }
                }
            }
        }
    });

    this.nodes = nodes;
    this.path = path;
    this.textpath = textpath;
    // this.link_paths = link_paths;
    // this.circle_paths = circle_paths;
    // this.text_paths = text_paths;
};

Tree.prototype.update = function (i) {
    var source = this.source;
    var conf = this.defaults;

    source.children.forEach(function clearDraw(d) {
        d.draw = false;
        if (d.children) {
            d.children.forEach(clearDraw);
        }
    });

    source.children.forEach(function find(d) {
        if (d.id === i) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                if (d.children) {
                    d.children.forEach(function drawn(child) {
                        child.draw = true;
                        if (child.children) {
                            child.children.forEach(drawn);
                        }
                    });
                }
                d._children = null;
            }
        } else {
            if (d.children) {
                d.children.forEach(find);
            }
        }
    });
    this.source = source;
    this.source.x0 = conf.width / 2;
    this.source.y0 = conf.radius * 2;
    this.render();
};


Tree.prototype.render = function (options) {
    // var st = new Date().getTime();
    if (!this.container) {
        throw new Error("Please specify which node to render.");
    }
    this.canvas.clear();
    this.setOptions(options);
    this.canvas.setSize(this.defaults.width, this.defaults.height);
    this.layout();
    // var st2 = new Date().getTime();

    this.generatePaths();
    // var et = new Date().getTime();
    //this.canvas.renderfix();
};

Tree.prototype.append = function (arr) {
    var source = this.rawData;
    for (var i = 0; i < source.length; i++) {
        var a = source[i];
        if (a[5] == "1") {
            a[5] = "0"
        }
    }
    if (arr.length < 6) {
        arr.push("1");
    } else {
        arr[5] = "1";
    }
    source.push(arr);
    this.setSource(source);
};

//module.exports = Tree;
//});
