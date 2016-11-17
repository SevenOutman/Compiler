<template>
  <div class="editor-box" @click="$emit('click')">
    <div class="editor-placeholder" v-show="!editorState.tabs.length">
      Choose a file from workspace or <a id="cover-open" @click="openNewFile">create a new file</a>
    </div>
    <div class="tab-bar">
      <div class="tab-bar-cover" v-if="editorState.compilee"><span id="compiling-filename">{{ editorState.compilee.fileName}}</span>
      </div>
      <button class="tab-new" @click="openNewFile">&plus;</button>
      <div class="tab-row">
        <div class="tab-group">
          <div class="tab-cell" v-for="tab of editorState.tabs" :class="{ active: currentTab == tab }"
               @click="switchTab(tab)">
            <a>
              <span>{{ tab.file.fileName }}</span>
              <span class="tab-dismiss" @click.stop="closeTab(tab)">&times;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="editor-container">
      <textarea id="editor" ref="textarea"></textarea>
    </div>
  </div>
</template>
<script>
  import File from '../models/File'
  import EditorTab from '../models/EditorTab'
  import bus from '../helpers/EventBus'

  import {set} from 'vue'

  import CodeMirror from '../libs/codemirror/lib/codemirror'
  require('../libs/codemirror/addon/scroll/simplescrollbars.js')
  require('../libs/toy.js')

  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  import Processor from '../helpers/Processor'
  import getStorage from '../helpers/storage'
  const Storage = getStorage(window.localStorage)

  export default {
    data() {
      return {
        cm: null
      }
    },
    computed: {
      ...mapState({
        'editorState': 'editor',

        'fileManager': 'fileManager'
      }),
      ...mapGetters([
        'unsavedTabs'
      ]),
      tabs() {
        return this.editorState.tabs
      },
      currentTab() {
        return this.editorState.currentTab
      }
    },
    methods: {
      ...mapActions([
        'openFile',
        'closeTab',
        'switchTab',
        'saveFilesToStorage',
      ]),
      ...mapMutations([
        'setCompilee',
        'updateStateUI'
      ]),
      openNewFile() {
        let newFile = new File()
        if (newFile) {
          bus.$emit('sys:rename', newFile)
          bus.$on('sys:rename.confirm', () => {
            this.openFile(newFile)
            bus.$off('sys:rename.confirm')
          })
        }
      },
      saveAllTabs () {
        this.unsavedTabs.forEach(tab => {
          tab.file.content = tab.cachedContent
        })
        this.saveFilesToStorage()

        let openedFiles = [];
        this.editorState.tabs.forEach(tab => {
          openedFiles.push(tab.file.fileName)
          if (tab == this.currentTab) {
            Storage.setItem("last-editing", tab.file.fileName)
          }
        })
        Storage.setItem("opened-files", JSON.stringify(openedFiles));
      },
      formatCode() {
        let code = this.cm.getValue()
        this.cm.setValue(Processor.preprocesscode(code));
        for (let i = 0; i < this.cm.doc.lastLine(); i++) {
          this.cm.indentLine(i, "smart");
        }
        this.cm.focus();
      },
      compile() {
        let tab = this.currentTab
        if (tab) {
          this.saveAllTabs()
          let file = tab.file
          if (file.isNew) {
            return
          }
          this.lock()
          this.setCompilee(file)
          bus.$emit('sys:compile', true)
          Processor.compile(file)
        }
      },
      stop() {
        this.unlock()
        this.setCompilee(null)
        bus.$emit('sys:compile', false)
      },
      lock () {
        this.cm.setOption("readOnly", "nocursor")
      },
      unlock () {
        this.cm.setOption("readOnly", false)
      },
      loadOpenedFiles() {
        let openedFiles = JSON.parse(Storage.getItem("opened-files") || "[]"),
          lastEditing = Storage.getItem("last-editing");
        openedFiles.push(lastEditing);
        openedFiles.forEach(opened => {
          let file = this.fileManager.fileMap[opened]
          if (file) {
            this.openFile(file)
          }
        })
      }
    },
    watch: {
      'editorState.currentTab'(newTab, oldTab) {
        if (oldTab) {
          oldTab.cursorPosition = this.cm.doc.getCursor()
          oldTab.history = this.cm.doc.getHistory()
          oldTab.cachedContent = this.cm.getValue()
        }
        if (newTab) {
          this.cm.setValue(newTab.cachedContent) // fixme this triggers cursorActivity
          this.cm.doc.setHistory(newTab.history)
          this.cm.doc.setCursor(newTab.cursorPosition)
          this.cm.focus()
        }
      }
    },
    created() {
      bus.$on('sys:editor.open', this.openFile)
      bus.$on('sys:editor.save', this.saveAllTabs)
      bus.$on('sys:editor.tidy', this.formatCode)
      bus.$on('sys:editor.compile', this.compile)
      bus.$on('sys:editor.stop', this.stop)
      this.loadOpenedFiles()
    },
    mounted() {
      let cm = this.cm = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true,
        mode: "toy",
        indentUnit: 4,
        theme: "monokai-so",
        autoCloseBrackets: true,
        matchBrackets: true,
        styleActiveLine: true,
        showCursorWhenSelecting: true,
        scrollbarStyle: "overlay",
        selectionPointer: true,
        styleSelectedText: true
      })
      cm.on("change", (cm, change) => {
        if (this.currentTab) {
          this.currentTab.cachedContent = cm.getValue()
        }
      });

      CodeMirror.commands.save = () => {
        this.saveAllTabs()
      };

      cm.on("cursorActivity", (cm) => {
        if (this.currentTab) {
          this.currentTab.cursorPosition = cm.doc.getCursor()
        }
      });
    }
  }
</script>
