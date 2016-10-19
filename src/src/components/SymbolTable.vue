<template>
  <!--ko with: symbolTable-->
  <div class="right-box resizable" :style="{ width: width + 'px' }">
    <resizer type="vertical" @resizer:begin="onResizeBegin" @resizer:resize="onResize"></resizer>
    <div class="box-header">
      <div class="box-title">Symbol Table</div>
      <span class="box-caret glyphicon glyphicon-menu-right" @click="$emit('symbol-table:close')"></span>
    </div>
    <div class="box-body">
      <div class="placeholder" data-bind="visible: symbols().length < 1">Nothing to show</div>
      <ul id="symbol-list" class="list" data-bind="foreach: symbols, visible: symbols().length > 0">
        <li
          data-bind="attr: {id: attrId}, css: {active: isActive}, event: {click: $parents[0].setActive.bind($data), dblclick: toggle}">
                            <span class="glyphicon li-caret"
                                  data-bind="css: {'glyphicon-triangle-right': !isOpen(), 'glyphicon-triangle-bottom': isOpen}, click: toggle"></span>
          <span data-bind="text: name"></span> <span class="extra" data-bind="text: rowText"></span>
        </li><!--ko foreach: positions-->
        <li class="position-row"
            data-bind="text: rowText, visible: $parents[0].isOpen, css: {active: isActive}, click: $parents[1].setActive.bind($data)"></li>
        <!--/ko--></ul>
    </div>
  </div>
  <!--/ko-->
</template>
<script>
  import Resizer from './Resizer.vue'
  import {mapGetters} from 'vuex'
  export default {
    components: {
      Resizer
    },
    props: {
      width: Number
    },
    data() {
      return {
        oldWidth: 0
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
        this.$emit('symbol-table:resize', this.oldWidth - delta)
      }
    }
  }
</script>
