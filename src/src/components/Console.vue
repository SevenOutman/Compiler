<template>
  <!--ko with: console-->
  <div class="bottom-box resizable" :style="{ height: height + 'px' }" @click="$emit('click')">
    <!--<div class="resizer horizontal"></div>-->
    <resizer type="horizontal" @resizer:begin="onResizeBegin" @resizer:resize="onResize"></resizer>
    <div class="box-header">
      <div class="box-title">Output</div>
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
  import {mapState} from 'vuex'
  import bus from '../helpers/EventBus'


  import CodeMirror from '../libs/codemirror/lib/codemirror'
  require('../libs/codemirror/addon/scroll/simplescrollbars.js')
  require('../libs/console.js')

  function _preoutput(addon, para) {
    return addon + para.replace(/\s*\n/g, "\n  ") + "\n";
  }

  function _lastNLines(str, n) {
    return str.split("\n").slice(-n).join("\n");
  }

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
    computed: mapState(
      [
        'console'
      ]
    ),
    watch: {
      'console.open'(val) {
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
      outputWithAddon(addon, str) {
        if (str) {
          if (this.cm) {
            if (str instanceof Object) {
              str = str.toString();
            }
            this.cm.setValue(_lastNLines(this.cm.getValue() + _preoutput(addon, str), 1000));
          } else {
            window.console.log(str);
          }
        }
      },
      log(str) {
        if (this.cm) {
          this.cm.setValue(_lastNLines(this.cm.getValue() + _preoutput(": ", str), 1000));
        } else {
          window.console.log(str);
        }
      },
      error(str) {
        this.outputWithAddon("- ", str);
      },
      success(str) {
        this.outputWithAddon("+ ", str);
      },
      warn(str) {
        this.outputWithAddon("@ ", str);
      },
      clear() {
        this.cm.setValue("");
      }
    },
    created() {
      bus.$on('sys:console.log', this.log)
        .$on('sys:console.error', this.error)
        .$on('sys:console.success', this.success)
        .$on('sys:console.warn', this.warn)
        .$on('sys:console.clear', this.clear)
    },
    mounted() {
      let cm = this.cm = CodeMirror.fromTextArea(this.$refs.textarea, {
        theme: "monokai-so",
        mode: "console",
        readOnly: "nocursor",
        scrollbarStyle: "overlay",
        viewportMargin: Infinity
      });

      cm.on("change", (cm) => {
        cm.scrollIntoView(cm.doc.lastLine(), 1);
      });
    }
  }
</script>
<style>
  @import '../libs/codemirror/lib/codemirror.css';
  @import '../libs/monokai-so.css';
  @import '../libs/codemirror/addon/scroll/simplescrollbars.css';
</style>
