<template>
  <div id="main" class="layout">
    <div class="upper-box" :style="upperStyleObj">
      <div class="center-box">
        <!-- 双飞翼布局 -->
        <div class="center-box-inner" :style="centerStyleObj">
          <parse-tree></parse-tree>
          <editor></editor>
        </div>
      </div>
      <workspace v-show="workspace.open" :width="workspaceWidth" :style="leftStyleObj"
                 @workspace:resize="onWorkspaceResize" @workspace:close="onWorkspaceClose"></workspace>
      <symbol-table :width="symbolTableWidth" :style="rightStyleObj"
                    @symbol-table:resize="onSymbolTableResize" @symbol-table:close="onSymbolTableClose"></symbol-table>
    </div>
    <console v-show="console.open" :height="consoleHeight"
             @console:close="onConsoleClose" @console:resize="onConsoleResize"></console>
  </div>
</template>
<script>
  import Workspace from './Workspace.vue'
  import SymbolTable from './SymbolTable.vue'
  import ParseTree from './ParseTree.vue'
  import Editor from './Editor.vue'
  import Console from './Console.vue'

  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {
      Workspace,
      SymbolTable,
      ParseTree,
      Editor,
      Console
    },
    data() {
      return {
        elHeight: 0,
        elWidth: 0,
        storedConsoleHeight: 0,
        workspaceWidth: 0,
        symbolTableWidth: 0
      }
    },
    computed: {
      ...mapState([
        'workspace',
        'console',
        'symbolTable'
      ]),
      consoleHeight() {
        return this.console.open ? this.console.height : 0
      },
      workspaceWidth() {
        return this.workspace.open ? this.workspace.width : 0
      },
      symbolTableWidth() {
        return this.symbolTable.open ? this.symbolTable.width : 0
      },
      upperHeight() {
        return this.elHeight - this.consoleHeight - 75
      },
      editorWidth() {
        return this.elWidth - this.workspaceWidth - this.symbolTableWidth
      },
      upperStyleObj() {
        return {
          height: this.upperHeight + 'px'
        }
      },
      centerStyleObj() {
        return {
          marginLeft: this.workspaceWidth + 'px',
          marginRight: this.symbolTableWidth + 'px'
        }
      },
      leftStyleObj() {
        return {
          width: this.workspaceWidth + 'px',
        }
      },
      rightStyleObj() {
        return {
          width: this.symbolTableWidth + 'px',
          marginLeft: (-this.symbolTableWidth) + 'px',
        }
      }
    },
    methods: {
      ...mapMutations([
        'updateStateConsole',
        'updateStateWorkspace',
        'updateStateSymbolTable'
      ]),
      onConsoleResize(height) {
        this.updateStateConsole({
          height: Math.max(0, Math.min(this.elHeight, height))
        })
      },
      onConsoleClose() {
        this.updateStateConsole({
          open: false
        })
      },
      onWorkspaceResize(width) {
        this.updateStateWorkspace({
          width: Math.max(0, Math.min(this.elWidth - this.symbolTableWidth, width))
        })
      },
      onWorkspaceClose() {
        this.updateStateWorkspace({
          open: false
        })
      },
      onSymbolTableResize(width) {
        this.updateStateSymbolTable({
          width: Math.max(0, Math.min(this.elWidth - this.workspaceWidth, width))
        })
      },
      onSymbolTableClose() {
        this.updateStateSymbolTable({
          open: false
        })
      }
    },
    mounted() {
      this.elHeight = this.$el.clientHeight
      this.elWidth = this.$el.clientWidth
      this.updateStateConsole({
        height: this.elHeight * 0.3
      })
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

  #main {
    position: relative;
    height: 100%;
    padding-top: 55px;
    padding-bottom: 20px;
  }

  .layout {
    .upper-box {
      zoom: 1;
      overflow: hidden;

      .center-box {
        float: left;
        width: 100%;
        margin: 0;
        .center-box-inner {
          height: 100%;
        }
      }
      .left-box {
        float: left;
        margin-left: -100%;
        position: relative;

        width: 200px;
      }
      .right-box {
        float: left;
        position: relative;

        width: 200px;
        margin-left: -200px;
      }
    }
  }

</style>
