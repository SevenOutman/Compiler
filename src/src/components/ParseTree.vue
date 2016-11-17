<template>
  <!--ko with: parseTree-->
  <div class="tree-box resizable" :style="{ width: width + 'px' }"
       data-bind="css: {hidden: !isOpen(), assembly: showAssembly}"  @click="$emit('click')">
    <resizer type="vertical" @resizer:begin="onResizeBegin" @resizer:resize="onResize"></resizer>
    <div class="box-header">
      <div class="box-title hidden-assembly">Syntax Tree</div>
      <div class="box-title assembly-only">Assembly</div>
      <span class="box-caret glyphicon glyphicon-menu-right" @click="$emit('parse-tree:close')"></span></div>
    <div class="box-body hidden-assembly" id="tree-pane" ref="boxBody">
      <div class="placeholder">Nothing to show</div>
    </div>
    <div class="box-body assembly-only" id="assembly-pane">
      <div style="float: left;height: 100%;width: 18px;background: rgb(60, 63, 65)"></div>
      <textarea id="assembly"></textarea></div>
  </div><!--/ko-->
</template>
<script>
  import Tree from '../libs/compiler.datav'
  import bus from '../helpers/EventBus'
  import Resizer from '../components/Resizer.vue'

  export default {
    components: {
      Resizer
    },
    data() {
      return {
        oldWidth: 0,
        pen: null
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
//        if (self.isOpen() && !self.showAssembly()) {
        this.pen.render({
          width: this.$refs.boxBody.clientWidth,
          height: this.$refs.boxBody.clientHeight
        });
//        }
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
      }
    },
    mounted() {
      this.pen = new Tree("tree-pane", {
        radius: 10
      });
      bus.$on('sys:parse-tree.render', this.renderPen)
      bus.$on('sys:parse-tree.resize', this.resizePen)
      bus.$on('sys:parse-tree.reset', this.resetPen)
    }
  }
</script>
