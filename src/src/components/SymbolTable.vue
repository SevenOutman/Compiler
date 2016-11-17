<template>
  <!--ko with: symbolTable-->
  <div class="right-box resizable" :style="{ width: width + 'px' }" @click="$emit('click')">
    <resizer type="vertical" @resizer:begin="onResizeBegin" @resizer:resize="onResize"></resizer>
    <div class="box-header">
      <div class="box-title">Symbol Table</div>
      <span class="box-caret glyphicon glyphicon-menu-right" @click="$emit('symbol-table:close')"></span>
    </div>
    <div class="box-body">
      <div class="placeholder" v-show="symbols.length < 1">Nothing to show</div>
      <ul id="symbol-list" class="list">
        <template v-for="symbol of symbols">
          <li
            data-bind="attr: {id: attrId}, css: {active: isActive}, event: {click: $parents[0].setActive.bind($data), dblclick: toggle}">
                            <span class="glyphicon li-caret"
                                  data-bind="css: {'glyphicon-triangle-right': !isOpen(), 'glyphicon-triangle-bottom': isOpen}, click: toggle"></span>
            <span>{{ symbol.name }}</span>
            <span class="extra" data-bind="text: rowText">type: {{ symbol.type || 'unknown' }}, occurance: {{ symbol.positions.length }}</span>
          </li><!--ko foreach: positions-->
          <li class="position-row" v-for="(position, $index) of symbol.positions"
              data-bind="text: rowText, visible: $parents[0].isOpen, css: {active: isActive}, click: $parents[1].setActive.bind($data)">
            [{{ $index + 1 }}] line: {{ position.first_row }}, ch: {{ position.first_col }}
          </li>
          <!--/ko-->
        </template>
      </ul>
    </div>
  </div>
  <!--/ko-->
</template>
<script>
  import Resizer from './Resizer.vue'
  import {mapState} from 'vuex'
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
      ...mapState({
        'symbolTableState': 'symbolTable'
      }),
      symbols() {
        return this.symbolTableState.symbols
      }
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
