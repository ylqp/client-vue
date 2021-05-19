<template>
    <div class="checkBox">
        <div class="top">
            <div class="f22">考前检测</div>
            <exit-exam />
        </div>
        <div class="main">
            <take-photo v-if="!isPhoto" />
            <take-live v-else />
        </div>
        
    </div>
</template>
<script>
import TakeLive from './components/beforeExam/TakeLive.vue'
import TakePhoto from './components/beforeExam/TakePhoto.vue'
import ExitExam from './components/ExitExam.vue'
export default {
    components: { TakePhoto, TakeLive, ExitExam },
    name: 'StartExam',
    data () {
        return {
          isPhoto: true
        }
    },
    created () {
      if (this.$route.query.checkType !== 'startTakePhoto') {
        this.isPhoto = false
      }
    }
}
</script>
<style lang="less" scoped>
.checkBox {
    width: 100%;
    height: 100%;
    background: rgba(250,251,252,1);
    .top {
      height: 60px;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .main {
        width: calc(100% - 60px);
        height: calc(100% - 90px);
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px 0px rgb(234 235 236);
        border-radius: 2px;
    }
}
</style>