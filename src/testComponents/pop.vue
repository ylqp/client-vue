<template>
    <div>
        <transition name="fade">
            <div v-show="isShow">111111111111111111111111</div>
        </transition>
        <ots-button :name="切换" @click.native="isShow = !isShow" />
    </div>
</template>
<script>
import OtsButton from '../components/Button/OtsButton.vue'
export default {
  components: { OtsButton },
    name: 'Pop',
    data () {
        return {
            isShow: true
        }
    }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>