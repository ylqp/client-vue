<template>
  <div>
        <search @on-click="searchFn"/>
        <!-- <exam-note /> -->
        <slot-pop :isShowPop="isShowPop">
            <div class="popConSlot">
                <p class="col_red f20 fb tc mb10">注意：当前界面为考前检测界面，非正式考试！</p>
                <p class="col_red f20 fb tc" v-show="countDown>0">{{`${countDown}秒后确定`}}</p>
                <ots-button name="确定" v-show="countDown<=0" @click.native="isShowPop=false"/>
            </div>
        </slot-pop>
  </div>
</template>
<script>
import OtsButton from '../components/Button/OtsButton.vue'
import ExamNote from '../components/ExamNote.vue'
import Search from '../components/Search.vue'
import SlotPop from '../components/SlotPop.vue'
export default {
    components: { Search, ExamNote, SlotPop, OtsButton },
    name: 'Test',
    data () {
        return {
            isShowPop: true,
            countDown: 5,
        }
    },
    created () {
        console.log(this)
    },
    mounted () {
        
        const countTimer = setInterval(() => {
            console.log(this.countDown)
            this.countDown--
            if (this.countDown <= 0) {
                clearInterval(countTimer)
            }
        }, 1000)
    },
    methods: {
        searchFn (val) {
            console.log(val)
        }
    }
}
</script>
<style scoped>
.popConSlot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>