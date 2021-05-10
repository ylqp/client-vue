<template>
  <div class="topLine">
      <span>{{name}}</span>
      <div v-show="isShowExit">
          <!-- <i class="iconfont icon-exit fb f20 cp"></i> -->
          <close />
      </div>
  </div>
</template>
<script>
import Close from '../../../components/Close.vue'
export default {
  components: { Close },
    name: 'TopLine',
    props: {
        name: {
            type: String,
            required: true
        },
        isShowExit: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="less" scoped>
.topLine {
    height: 40px;
    font-size: 22px;
    border-bottom: 1px solid rgba(234,235,236,1);
    display: flex;
    justify-content: space-between;
}
</style>