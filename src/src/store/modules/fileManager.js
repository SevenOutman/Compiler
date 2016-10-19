import Vue from 'vue'


import getStorage from '../../helpers/storage'

let Storage = window.Storage = getStorage(window.localStorage)

function $defined(v) {
  return v !== undefined
}

function File(name, content, isNew) {
  return new Vue({
    data: {
      isNew: $defined(isNew) ? isNew : true,
      name: $defined(name) ? name.replace(/(\.toy)$/, "") : "untitled",
      content: content || ""
    },
    computed: {
      fileName() {
        return this.isNew ? this.name : this.name + ".toy"
      }
    },
    methods: {
      serialize() {
        return JSON.stringify({
          name: this.name,
          content: this.content
        })
      }
    }
  })
}

File.example = function () {
  return new File("example",
    "{\n" +
    "    int a;\n" +
    "    real b;\n" +
    "    a = 1;\n" +
    "    b = 2.0;\n" +
    "    if (a > b) then {\n" +
    "        b = a;\n" +
    "    } else {\n" +
    "        b = b - a;\n" +
    "    }\n" +
    "}", false);
};

let fileMap = {}

let addFile = file => {
  fileMap[file.fileName] = file;
}

let load = function () {
  var storedFileNames = JSON.parse(Storage.getItem("stored-files") || "[]");
  for (var i = 0, len = storedFileNames.length; i < len; i++) {
    var item = Storage.getItem(storedFileNames[i]);

    if (item) {
      var fileInfo = JSON.parse(item);
      let file = new File(fileInfo.name, fileInfo.content, false)
      addFile(file)
    }
  }
  if (!storedFileNames.length) {
    addFile(File.example());
  }
};
load()

export default  {
  state: {
    fileMap: fileMap,
    cached: []
  },
  getters: {
    fileList(state) {
      return Object.keys(state.fileMap).map(name => state.fileMap[name])
    }
  },
  mutations: {
    newFile(state, file) {
      state.cached.push(file)
    }
  },
  actions: {
    newFile({commit}) {
      let file = new File()
      commit('newFile', file)
      return file
    }
  }
}
function FileManager() {
  var self = this;
  self.files = ko.observableArray([]);
  var cached = [];
  self.newFile = function () {
    var file = new File();
    cached.push(file);
    return file;
  };

  /**
   * @param {string} fileName
   * @returns {*}
   */
  self.findFile = function (fileName) {
    for (var i = 0, files = self.files(), len = files.length; i < len; i++) {
      if (files[i].fileName() == fileName) {
        return files[i];
      }
    }
  };

  self.saveFile = function (file) {
    if (file.isNew()) {
      self.files.push(cached.pop());
      file.isNew(false);
    }
    Storage.setItem(file.fileName(), file.serialize());
  };
  self.deleteFile = function (file) {
    self.files.remove(file);
    Storage.removeItem(file.fileName());
  };

  self.load = function () {
    var storedFileNames = JSON.parse(Storage.getItem("stored-files") || "[]");
    for (var i = 0, len = storedFileNames.length; i < len; i++) {
      var item = Storage.getItem(storedFileNames[i]);

      if (item) {
        var fileInfo = JSON.parse(item);
        self.files.push(new File(fileInfo.name, fileInfo.content, false));
      }
    }
    if (!self.files().length) {
      self.files.push(File.example());
    }
  };
  self.save = function () {
    var storedFiles = [];
    for (var i = 0, files = self.files(), len = files.length; i < len; i++) {
      self.saveFile(files[i]);
      storedFiles[storedFiles.length] = files[i].fileName();
    }
    Storage.setItem("stored-files", JSON.stringify(storedFiles));
  };
  self.load();
}
