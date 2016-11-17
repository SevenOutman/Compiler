<template>
  <nav class="tool-bar navbar navbar-inverse navbar-fixed-top" style="margin-bottom: 0">
    <div class="container-fluid" style="padding-right: 15px">
      <div class="navbar-header">
        <div class="navbar-brand">
          <span class="glyphicon glyphicon-console"></span>
          Compiler
        </div>
      </div>
      <ul class="nav navbar-nav navbar-right" id="editing-btn-group" v-show="ui.mode == 'edit'"
          data-bind="with: controls">
        <li>
          <button class="btn navbar-btn-o" id="btn-save" :class="{ unsaved: editorNeedSave }" @click="save">
            <span class="glyphicon glyphicon-floppy-disk"></span> Save
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-tidy" @click="tidy"><span
            class="glyphicon glyphicon-flash"></span> Tidy
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-import" data-bind="click: importFile"><span
            class="glyphicon glyphicon-import"></span> Import
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-compile" @click="compile"><span
            class="glyphicon glyphicon-download-alt"></span> Compile
          </button>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right" id="compiling-btn-group" style="margin-right: -15px"
          v-show="ui.mode == 'compile'"
          data-bind="with: controls">
        <li>
          <button class="btn navbar-btn-o" id="btn-stop" @click="stop"><span
            class="glyphicon glyphicon-stop"></span> Stop
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-next" @click="next"><span
            class="glyphicon glyphicon-share-alt"></span> Next
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-ff" @click="ff"><span
            class="glyphicon glyphicon-fast-forward"></span> Fast Forward
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  import bus from '../helpers/EventBus'
  import Processor from '../helpers/Processor'
  export default {
    computed: {
      ...mapState([
        'ui'
      ]),
      ...mapGetters([
        'editorNeedSave'
      ])
    },
    methods: {
      ...mapMutations([
        'updateStateUI'
      ]),
      updateUIMode(mode) {
        this.updateStateUI({
          mode: mode
        })
      },
      save() {
        bus.$emit('sys:editor.save')
      },
      tidy() {
        bus.$emit('sys:editor.tidy')
      },
      compile() {
        bus.$emit('sys:editor.compile')
      },
      stop() {
        bus.$emit('sys:editor.stop')
      },
      next() {
        Processor.compileNext()
      },
      ff() {
        Processor.compileFF()
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .tool-bar {
    height: 28px;
    min-height: 28px;
    .navbar-brand {
      height: 28px;
      padding: 4px 15px;
    }
    .navbar-btn,
    .navbar-btn-o {
      margin-top: 3px;
      margin-bottom: 1px;
      font-size: 12px;
      color: rgb(201, 201, 201);
    }

    .navbar-btn {
      padding: 3px 12px;
      margin-right: 1px;
      border-radius: 0;
      border-width: 0;
    }
    .navbar-btn-o {
      padding: 1px 12px;
      border-width: 2px;
      border-radius: 2px;
    }
    #btn-save::after {
      height: 1px;
    }
    #btn-ff, #btn-compile {
      margin-right: 10px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    #btn-next, #btn-tidy {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
  }
</style>
