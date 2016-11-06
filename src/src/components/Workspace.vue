<template>
  <!--ko with: workspace-->
  <div class="left-box resizable" id="workspace" :style="{ width: width + 'px' }">
    <resizer type="vertical" @resizer:begin="onResizeBegin" @resizer:resize="onResize"></resizer>
    <div class="box-header">
      <div class="box-title">Workspace</div>
      <span class="box-caret glyphicon glyphicon-menu-left" @click="$emit('workspace:close')"></span></div>
    <div class="box-body">
      <div class="placeholder" v-show="!files.length">Nothing to show</div>
      <ul class="list" id="file-list">
        <li v-for="file of files" :class="{ active: file == selectedFile }" @click="selectedFile = file" @dblclick="openFileInEditor(file)" data-bind="attr: {id: attrId}, css: {active: isActive},
                        event: {contextmenu: $parents[0].setActive.bind($data)}">
          <span class="glyphicon glyphicon-file"></span>
          <span>{{ file.fileName }}</span>
        </li>
      </ul>
    </div>
  </div>
  <!--/ko-->
</template>
<script>
  import Resizer from './Resizer.vue'
  import {mapGetters} from 'vuex'
  import bus from '../helpers/EventBus'
  export default {
    components: {
      Resizer
    },
    props: {
      width: Number
    },
    data() {
      return {
        oldWidth: 0,
        selectedFile: null
      }
    },
    computed: {
      ...mapGetters({
        files: 'fileList'
      })
    },
    methods: {
      onResizeBegin() {
        this.oldWidth = this.width
      },
      onResize(delta) {
        this.$emit('workspace:resize', this.oldWidth + delta)
      },
      openFileInEditor(file) {
        bus.$emit('sys:editor.open', file)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  #workspace {

  }
</style>

