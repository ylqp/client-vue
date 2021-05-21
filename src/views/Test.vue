<template>
  <div>
        <search @on-click="searchFn"/>
        <!-- <exam-note /> -->
        <!-- <slot-pop :isShowPop="isShowPop">
            <div class="popConSlot">
                <p class="col_red f20 fb tc mb10">注意：当前界面为考前检测界面，非正式考试！</p>
                <p class="col_red f20 fb tc" v-show="countDown>0">{{`${countDown}秒后确定`}}</p>
                <ots-button name="确定" v-show="countDown<=0" @click.native="isShowPop=false"/>
            </div>
        </slot-pop> -->
        <ul class="figure-list"> 
            <li> 
                <figure style="background-image:url(https://otstest.chinaedu.net:8443/img2/ots/cate/images/2021/0521/0ec38cf9-6782-48d0-acf7-50123f67dd07.png)"> 
                <a href="#"></a> 
                </figure> 
            </li> 
            <li> 
                <figure style="background-image:url(https://otstest.chinaedu.net:8443/img2/ots/cate/images/2021/0521/0ec38cf9-6782-48d0-acf7-50123f67dd07.png)"> 
                <a href="#"></a> 
                </figure> 
            </li> 
            <li> 
                <figure style="background-image:url(https://otstest.chinaedu.net:8443/img2/ots/cate/images/2021/0521/0ec38cf9-6782-48d0-acf7-50123f67dd07.png)"> 
                <a href="#"></a> 
                </figure> 
            </li> 
            <li> 
                <figure style="background-image:url(https://otstest.chinaedu.net:8443/img2/ots/cate/images/2021/0521/0ec38cf9-6782-48d0-acf7-50123f67dd07.png)"> 
                <a href="#"></a> 
                </figure> 
            </li> 
            
            <li> 
                <figure style="background-image:url(https://otstest.chinaedu.net:8443/img2/ots/cate/images/2021/0521/0ec38cf9-6782-48d0-acf7-50123f67dd07.png)"> 
                <a href="#"></a> 
                </figure> 
            </li> 
            <li> 
                <figure style="background-image:url(https://otstest.chinaedu.net:8443/img2/ots/cate/images/2021/0521/0ec38cf9-6782-48d0-acf7-50123f67dd07.png)"> 
                <a href="#"></a> 
                </figure> 
            </li> 
        </ul>
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
  .figure-list{ 
      margin: 0; 
      padding: 0; 
    } 
    .figure-list:after{ 
      content: ""; 
      display: block; 
      clear: both; 
      height: 0; 
      overflow: hidden; 
      visibility: hidden; 
    } 
    .figure-list li{ 
      list-style: none; 
      float: left; 
      width: 23.5%; 
      margin: 0 2% 2% 0; 
    } 
    .figure-list figure{ 
        border: 1px solid #000; 
      position: relative; 
      width: 100%; 
      height: 0; 
      overflow: hidden; 
      margin: 0; 
      padding-bottom: 100%; /* 关键就在这里 */ 
      background-position: center; 
      background-repeat: no-repeat; 
      background-size: cover; 
    } 
    .figure-list figure a{ 
      display: block; 
      position: absolute; 
      width: 100%; 
      top: 0; 
      bottom: 0; 
    } 
</style>