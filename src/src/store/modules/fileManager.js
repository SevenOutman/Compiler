import getStorage from '../../helpers/storage'

let Storage = window.Storage = getStorage(window.localStorage)
import File from '../../models/File'

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
const saveFile = function (file) {
  // if (file.isNew()) {
  //   self.files.push(cached.pop());
  //   file.isNew(false);
  // }
  Storage.setItem(file.fileName, file.serialize());
  file.isNew = false
};
load()

import {set} from 'vue'

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
    },
    addFile(state, file) {
      set(state.fileMap, file.fileName, file)
    }
  },
  actions: {
    createNewFile({commit}) {
      let file = new File()
      commit('newFile', file)
    },
    cacheFile({commit}, file) {
      commit('addFile', file)
    },
    saveFilesToStorage({getters}) {
      let storedFiles = [];
      for (let i = 0, files = getters.fileList, len = files.length; i < len; i++) {
        saveFile(files[i]);
        storedFiles[storedFiles.length] = files[i].fileName;
      }
      Storage.setItem("stored-files", JSON.stringify(storedFiles));
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
