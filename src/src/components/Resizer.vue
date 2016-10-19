<template>
  <div class="resizer" :class="[type, { resizing: resizing }]" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseleave="onMouseUp" @mouseup="onMouseUp"></div>
</template>
<script>
  export default {
    props: {
      type: String
    },
    data(){
      return {
        resizing: false,
        resizeStart: 0,
        resizeEnd: 0,
      }
    },
    computed: {
      resizeDelta() {
        return this.resizeEnd - this.resizeStart
      }
    },
    methods: {
      onMouseDown(e) {
        this.resizing = true
        this.resizeStart = this.type == 'horizontal' ? e.clientY : e.clientX

        this.$emit('resizer:begin')
      },
      onMouseMove(e) {
        if (this.resizing) {
          this.resizeEnd = this.type == 'horizontal' ? e.clientY : e.clientX
          this.$emit('resizer:resize', this.resizeDelta)
        }
      },
      onMouseUp() {
        this.resizing = false
        this.$emit('resizer:end')
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .resizer {
    &.resizing {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      bottom: auto;
      right: auto;
      z-index: 1051;
    }
  }
</style>
