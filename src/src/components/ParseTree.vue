<template>
  <div class="tree-box resizable" :style="{ width: width + 'px' }" @click="$emit('click')">
    <resizer type="vertical" @resizer:begin="onResizeBegin" @resizer:resize="onResize"></resizer>
    <div class="box-header">
      <div class="box-title">{{ showAssembly ? 'Assembly' : 'Syntax Tree' }}</div>
      <span class="box-caret glyphicon glyphicon-menu-right" @click="$emit('parse-tree:close')"></span></div>
    <div class="box-body" v-show="!showAssembly" id="tree-pane" ref="boxBody">
      <div class="placeholder">Nothing to show</div>
    </div>
    <div class="box-body" v-show="showAssembly" id="assembly-pane">
      <div style="float: left;height: 100%;width: 18px;background: rgb(60, 63, 65)"></div>
      <textarea id="assembly" ref="textarea"></textarea></div>
  </div>
</template>
<script>
  import Tree from '../libs/compiler.datav'
  import bus from '../helpers/EventBus'
  import Resizer from '../components/Resizer.vue'

  import CodeMirror from '../libs/codemirror/lib/codemirror'
  require('../libs/codemirror/addon/scroll/simplescrollbars.js')
  require('../libs/console.js')
  export default {
    components: {
      Resizer
    },
    data() {
      return {
        oldWidth: 0,
        pen: null,
        cm: null,
        showAssembly: false
      }
    },
    props: {
      width: Number
    },
    methods: {
      onResizeBegin() {
        this.oldWidth = this.width
      },
      onResize(delta) {
        this.$emit('parse-tree:resize', this.oldWidth - delta)
      },
      resizePen () {
        this.pen.render({
          width: this.$refs.boxBody.clientWidth,
          height: this.$refs.boxBody.clientHeight
        });
      },
      clearPen() {
        this.pen.canvas.clear();
      },
      resetPen() {
        this.pen.setSource([
          ["0", "program", 1, "", "1", "0"],
        ]);
      },
      renderPen(nodes) {
        this.pen.setSource(nodes)
        this.pen.render()
      },
      assembly(content) {
          this.cm.setValue(content)
        this.showAssembly = true
      }
    },
    mounted() {
      this.pen = new Tree("tree-pane", {
        radius: 10
      });
      bus.$on('sys:parse-tree.render', this.renderPen)
      bus.$on('sys:parse-tree.resize', this.resizePen)
      bus.$on('sys:parse-tree.reset', this.resetPen)

      this.cm = CodeMirror.fromTextArea(this.$refs.textarea, {
        theme: "monokai-so",
        mode: "console",
        readOnly: "nocursor",
        scrollbarStyle: "overlay",
        viewportMargin: Infinity
      });
      bus.$on('sys:parse-tree.assembly', this.assembly)
    }
  }
</script>
