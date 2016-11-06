<template>
  <div id="app" @contextmenu.prevent>
    <div id="about-mask" v-show="about.show">
      <div class="mask-backdrop" @click="hideAbout"></div>
      <div class="dialog" id="about-dialog">
        <div class="dialog-banner">
          <h1><span class="glyphicon glyphicon-console"></span> Compiler</h1>
          <p>Presented by <a href="https://github.com/SevenOutman" target="_blank">SevenOutman</a>. Compiler implemented
            by <a href="https://github.com/ExinCoda" target="_blank">ExinCoda</a>.</p>
        </div>
      </div>
    </div>
    <tool-bar></tool-bar>
    <layout></layout>
    <div id="footer">
      <div class="footer-text footer-btn" :class="{ active: workspace.open }" @click="toggleWorkspace">Workspace
      </div>
      <div class="footer-text footer-btn" :class="{ active: console.open }" @click="toggleConsole">Output
      </div>
      <!--<div class="footer-text footer-btn" :class="{ active: symbolTable.open }" @click="toggleSymbolTable">Symbol Table-->
      <!--</div>-->
      <div class="footer-text" id="cursor-position" v-if="currentCursorPos">{{ currentCursorPos.line + 1 }}:{{ currentCursorPos.ch + 1 }}</div>
    </div>
  </div>
</template>

<script>
  import ToolBar from './components/ToolBar.vue'
  import Layout from './components/Layout.vue'

  import {mapState, mapMutations, mapGetters} from 'vuex'
  import bus from './helpers/EventBus'

  export default {
    components: {
      ToolBar,
      Layout,
    },
    computed: {
      ...mapState([
        'about',
        'console',
        'workspace',
        'symbolTable'
      ]),
      ...mapGetters([
        'currentCursorPos'
      ])
    },
    methods: {
      ...mapMutations([
        'updateStateAbout',
        'updateStateConsole',
        'updateStateWorkspace',
        'updateStateSymbolTable'
      ]),
      hideAbout() {
        this.updateStateAbout({
          show: false
        })
      },
      toggleConsole() {
        this.updateStateConsole({
          open: !this.console.open
        })
      },
      toggleWorkspace() {
        this.updateStateWorkspace({
          open: !this.workspace.open
        })
      },
      toggleSymbolTable() {
        this.updateStateSymbolTable({
          open: !this.symbolTable.open
        })
      }
    },
    mounted() {
      bus.$emit('sys:console.log', "Compiler lauched at " + new Date().toTimeString())
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./style/bootstrap.extract.css";
  @import "./style/glyphicon.extract.css";
  @import "./style/style.css";

  #app {
    width: 100%;
    height: 100%;

    #about-mask {
      .mask-backdrop {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 1050;
      }

      #about-dialog {
        position: fixed;
        width: 600px;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        margin: 0 auto;
        max-width: 80%;
        background: rgb(60, 63, 65);
        color: rgb(187, 187, 187);
        border-radius: 3px;
        font-size: 13px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .3);
        z-index: 5000;

        .dialog-banner {
          width: 100%;
          height: 200px;
          background: #FEDD31;
          color: #000000;
          text-align: center;
          padding: 40px;
        }

      }
    }
    #footer {
      .footer-text {
        &.footer-btn {
          padding: 5px 1em;
          margin: 0 0 0 1px;
          &.active {
            background-color: #2c2e2f;
          }
          &:not(.active):hover {
            background-color: #353739;
          }
        }
      }
    }
  }
</style>
