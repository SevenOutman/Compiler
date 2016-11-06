/**
 * Created by Doma on 2016/10/20.
 */
import Vue from 'vue'
function EditorTab(file) {
  return new Vue({
    data: {
      file: file,
      cachedContent: file.content,
      cursorPosition: {
        line: 0,
        ch: 0
      },
      history: {
        done: [],
        undone: []
      }
    },
    computed: {
      unsaved() {
        return this.cachedContent != this.file.content
      }
    }
  })
}

export default EditorTab
