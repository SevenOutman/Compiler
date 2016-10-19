<template>
  <nav class="navbar navbar-inverse navbar-fixed-top" style="margin-bottom: 0">
    <div class="container-fluid" style="padding-right: 15px">
      <div class="navbar-header"><a href class="navbar-brand"><span class="glyphicon glyphicon-console"></span>
        Compiler</a></div>
      <ul class="nav navbar-nav navbar-left">
        <li>
          <button class="btn navbar-btn-o" id="btn-about" @click="showAbout"><span
            class="glyphicon glyphicon-cog"></span></button>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right" id="editing-btn-group" v-show="ui.mode == 'edit'"
          data-bind="with: controls">
        <li>
          <button class="btn navbar-btn-o" id="btn-save" data-bind="css: {unsaved: needSave}, click: save">
            <span class="glyphicon glyphicon-floppy-disk"></span> Save
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-tidy" data-bind="click: tidy"><span
            class="glyphicon glyphicon-flash"></span> Tidy
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-import" data-bind="click: importFile"><span
            class="glyphicon glyphicon-import"></span> Import
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-compile" data-bind="click: compile"><span
            class="glyphicon glyphicon-download-alt"></span> Compile
          </button>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right" id="compiling-btn-group" style="margin-right: -15px" v-show="ui.mode == 'compile'"
          data-bind="with: controls">
        <li>
          <button class="btn navbar-btn-o" id="btn-stop" data-bind="click: stop"><span
            class="glyphicon glyphicon-stop"></span> Stop
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-next" data-bind="click: next"><span
            class="glyphicon glyphicon-share-alt"></span> Next
          </button>
        </li>
        <li>
          <button class="btn navbar-btn" id="btn-ff" data-bind="click: ff"><span
            class="glyphicon glyphicon-fast-forward"></span> Fast Forward
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    computed: {
      ...mapState([
        'ui'
      ])
    },
    methods: {
      ...mapMutations([
        'updateStateAbout',
        'updateStateUI'
      ]),
      showAbout() {
        this.updateStateAbout({
          show: true
        })
      },
      updateUIMode(mode) {
        this.updateStateUI({
          mode: mode
        })
      }
    }
  }
</script>
