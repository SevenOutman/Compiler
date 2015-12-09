/**
 * Created by Doma on 15/12/5.
 */
var Storage = (function() {
    var testKey = "test";
    var storage = window.localStorage;

    try {
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return storage;
    } catch (error) {
        storage = (function() {
            var _data = {};

            return {
                setItem: function(id, val) {
                    return _data[id] = String(val);
                },

                getItem: function(id) {
                    return _data.hasOwnProperty(id) ? this._data[id] : undefined;
                },

                removeItem: function(id) {
                    return delete _data[id];
                },

                clear: function() {
                    return _data = {};
                }
            };
        })();
        return storage;
    }
})();
