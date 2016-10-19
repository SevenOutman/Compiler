/**
 * Created by Doma on 2016/10/12.
 */
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import fileManager from './modules/fileManager'

export default new Vuex.Store({
  modules: {
    fileManager
  },
  state: {
    ui: {
      mode: 'edit'
    },
    about: {
      show: false
    },
    console: {
      open: false,
      height: 0
    },
    workspace: {
      open: true,
      width: 200
    },
    symbolTable: {
      open: false,
      width: 200
    }
  },
  mutations: {
    updateState(state, payload) {
      let obj = state[payload.key]
      if (obj) {
        Object.keys(obj).forEach(key => {
          if (payload.hasOwnProperty(key)) {
            obj[key] = payload[key]
          }
        })
      }
    },
    updateStateAbout(state, payload) {
      Object.keys(state.about).forEach(key => {
        if (payload.hasOwnProperty(key)) {
          state.about[key] = payload[key]
        }
      })
    },
    updateStateConsole(state, payload) {
      Object.keys(state.console).forEach(key => {
        if (payload.hasOwnProperty(key)) {
          state.console[key] = payload[key]
        }
      })
    },
    updateStateWorkspace(state, payload) {
      Object.keys(state.workspace).forEach(key => {
        if (payload.hasOwnProperty(key)) {
          state.workspace[key] = payload[key]
        }
      })
    },
    updateStateSymbolTable(state, payload) {
      Object.keys(state.symbolTable).forEach(key => {
        if (payload.hasOwnProperty(key)) {
          state.symbolTable[key] = payload[key]
        }
      })
    },
    updateStateUI(state, payload) {
      Object.keys(state.ui).forEach(key => {
        if (payload.hasOwnProperty(key)) {
          state.ui[key] = payload[key]
        }
      })
    }
  },
  actions: {}
})
