<template>
  <!--ko with: console-->
  <div class="bottom-box resizable" :style="{ height: height + 'px' }">
    <!--<div class="resizer horizontal"></div>-->
    <resizer type="horizontal" @resizer:begin="onResizeBegin" @resizer:resize="onResize"></resizer>
    <div class="box-header">
      <div class="box-title">Console</div>
      <span class="box-caret glyphicon glyphicon-menu-down" @click="$emit('console:close')"></span>
    </div>
    <div class="console-container">
      <div class="console-seal"></div>
      <textarea id="console" ref="textarea"></textarea></div>
  </div>
  <!--/ko-->
</template>
<script>
  import Resizer from './Resizer.vue'
  import CodeMirror from '../libs/codemirror/lib/codemirror'

  import CodeMirrorAddonScroll from '../libs/codemirror/addon/scroll/simplescrollbars'

  export default {
    components: {
      Resizer
    },
    props: {
      height: {
        type: Number,
        twoWay: true
      }
    },
    data() {
      return {
        cm: null,
        oldHeight: 0
      }
    },
    watch: {
      open(val) {
        if (val) {
          this.cm && this.cm.focus()
        }
      }
    },
    methods: {
      onResizeBegin() {
        this.oldHeight = this.height
      },
      onResize(delta) {
        this.$emit('console:resize', this.oldHeight - delta)
      },
    },
    mounted() {
      this.cm = CodeMirror.fromTextArea(this.$refs.textarea, {
        theme: "monokai-so",
        mode: "console",
        readOnly: "nocursor",
        scrollbarStyle: "overlay",
        viewportMargin: Infinity
      });
    }
  }
</script>
<style>
  @import '../libs/codemirror/addon/scroll/simplescrollbars.css';
</style>
