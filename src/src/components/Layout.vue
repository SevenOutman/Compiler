<template>
  <div id="main" class="layout">
    <div class="upper-box" :style="upperStyleObj">
      <div class="center-box">
        <!-- 双飞翼布局 -->
        <div class="center-box-inner" :style="centerStyleObj">
          <parse-tree v-show="parseTree.open" :width="parseTreeWidth"
                      @parse-tree:resize="onParseTreeResize" @parse-tree:close="onParseTreeClose"></parse-tree>
          <editor :style="{ width: editorWidth + 'px' }"></editor>
        </div>
      </div>
      <workspace v-show="workspace.open" :width="workspaceWidth" :style="leftStyleObj"
                 @workspace:resize="onWorkspaceResize" @workspace:close="onWorkspaceClose" :class="{ 'active-box': currentActiveBox == 'workspace' }" @click="currentActiveBox = 'workspace'"></workspace>

      <symbol-table v-show="symbolTable.open" :width="symbolTableWidth" :style="rightStyleObj"
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

  import bus from '../helpers/EventBus'

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
        symbolTableWidth: 0,
        currentActiveBox: null
      }
    },
    computed: {
      ...mapState([
        'workspace',
        'console',
        'symbolTable',
        'parseTree'
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
      parseTreeWidth() {
        return this.parseTree.open ? this.parseTree.width : 0
      },
      upperHeight() {
        return this.elHeight - this.consoleHeight - 48
      },
      editorWidth() {
        return this.elWidth - this.workspaceWidth - this.symbolTableWidth - this.parseTreeWidth
      },
      upperStyleObj() {
        return {
          height: this.upperHeight + 'px'
        }
      },
      centerStyleObj() {
        return {
          marginLeft: this.workspaceWidth + 'px',
          marginRight: (this.symbolTableWidth) + 'px'
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
        'updateStateSymbolTable',
        'updateStateParseTree'
      ]),
      onConsoleResize(height) {
        this.updateStateConsole({
          height: Math.max(0, Math.min(this.elHeight, height))
        })
        if (this.parseTree.open) {
          bus.$emit('sys:parse-tree.resize')
        }
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
          width: Math.max(0, Math.min(this.elWidth - this.workspaceWidth - this.parseTreeWidth, width))
        })
      },
      onSymbolTableClose() {
        this.updateStateSymbolTable({
          open: false
        })
      },
      onParseTreeResize(width) {
        this.updateStateParseTree({
          width: Math.max(0, Math.min(this.elWidth - this.workspaceWidth - this.symbolTableWidth, width))
        })
        bus.$emit('sys:parse-tree.resize')
      },
      onParseTreeClose() {
        this.updateStateParseTree({
            open: false
        })
      },
    },
    mounted() {
      this.elHeight = this.$el.clientHeight
      this.elWidth = this.$el.clientWidth
      this.updateStateConsole({
        height: this.elHeight * 0.3
      })
      this.updateStateParseTree({
        width: this.elWidth - 600
      })
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

  #main {
    position: relative;
    height: 100%;
    padding-top: 28px;
    padding-bottom: 20px;
  }

  .layout {
    .active-box .box-header {
      background-color: #424d5f;
      color: #bbbbbb;
    }
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
