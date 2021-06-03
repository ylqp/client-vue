<template>
    <div class="checkBox">
        <div class="top">
            <div class="f22">结束考试拍照校验</div>
            <exit-exam />
        </div>
        <div class="main">
            <take-photo v-if="isPhoto" @goNext="goNext"/>
            <take-live v-else @goNext="goNext" />
        </div>
        
    </div>
</template>
<script>
import TakeLive from './components/afterExam/TakeLive.vue'
import TakePhoto from './components/afterExam/TakePhoto.vue'
import ExitExam from './components/ExitExam.vue'
import { submitExam, tempSave, ifStartExam, getIsClientLogin } from '@/http/modules/common'
import { exitClient } from '@/http/modules/close'
export default {
    components: { TakePhoto, TakeLive, ExitExam },
    name: 'EndExam',
    data () {
        return {
            isPhoto: true,
        }
    },
    created () {
        const exmaCheckType = window.localStorage.getItem('exmaCheckType')
        if (exmaCheckType != 'PhotoTest') {
            this.isPhoto = false
        }
    },
    methods: {
        goNext () {
            console.log('提交试卷')
            // 交卷
            this.submit()
        },
        async submit () {
            const paperAnswer = JSON.parse(window.localStorage.getItem('paperAnswer'))

            const  { data }  = await submitExam(paperAnswer)
            let type = 0
            let rdata = JSON.parse(data)
            // console.log(rdata)
            if (rdata.success == "true") {
                this.$otsPopPro({
                    content: type == 0 ? '试卷提交成功！' : '保存成功',
                    isNeedCancel: false
                }).then(() => {
                    return getIsClientLogin()
                }).then((val) => {
                    if (val.data == 'true') { // 退出程序
                        exitClient()
                    } else { // 返回列表
                        this.goExamList()
                    }
                })
            } else {
                this.$otsPopPro({
                    content: type == 0 ? '试卷提交失败，请稍后重试！' : '保存失败',
                    isNeedCancel: false
                }).then(() => {
                    this.isFreezeSumbit = false
                })
            }
        },
        goExamList () {
            this.$router.push({
                name: 'examList'
            })
        }
    },
    beforeDestroy () {
        this.$camera.closePure()
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