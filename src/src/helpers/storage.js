/**
 * Created by Doma on 2016/10/12.
 */
let fakeStorage
export default (storage) => {
  var testKey = "test";

  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return storage;
  } catch (error) {
    if (fakeStorage) {
      return fakeStorage
    }
    storage = (function () {
      var _data = {};

      return {
        setItem: function (id, val) {
          _data[id] = String(val);
          return _data[id];
        },

        getItem: function (id) {
          return _data.hasOwnProperty(id) ? this._data[id] : undefined;
        },

        removeItem: function (id) {
          return delete _data[id];
        },

        clear: function () {
          _data = {};
          return _data;
        }
      };
    })();
    return (fakeStorage = storage)
  }
}
