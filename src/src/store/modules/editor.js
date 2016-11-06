/**
 * Created by Doma on 2016/10/27.
 */
import {remove, rear, hasThose} from '../../helpers/ArrayHelper'
import EditorTab from '../../models/EditorTab'

export default {
  state: {
    tabs: [],
    currentTab: null
  },
  getters: {
    currentCursorPos(state) {
      if (state.currentTab) {
        return state.currentTab.cursorPosition
      }
    },
    unsavedTabs(state) {
      return state.tabs.filter(tab => tab.unsaved)
    },
    editorNeedSave(state, getters) {
      return !!getters.unsavedTabs.length
    }
  },
  mutations: {
    openTab(state, tab) {
      state.tabs.push(tab)
    },
    closeTab(state, tab) {
      remove(state.tabs, tab)
    },
    setCurrentTab(state, tab) {
      state.currentTab = tab
    }
  },
  actions: {
    openFile({commit, state}, file) {
      let opened = state.tabs.filter(tab => tab.file == file)
      if (opened.length) {
        commit('setCurrentTab', opened[0])
      } else {
        let newTab = new EditorTab(file)
        commit('openTab', newTab)
        commit('setCurrentTab', newTab)
      }
    },
    switchTab({commit}, tab) {
      commit('setCurrentTab', tab)
    },
    closeTab({commit, state}, tab) {
      commit('closeTab', tab)
      commit('setCurrentTab', rear(state.tabs))
    }
  }
}
