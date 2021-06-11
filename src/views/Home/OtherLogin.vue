<template>
    <div>
       <!-- 考试须知 -->
      <exam-note v-if="isShowNote" @cancel="isShowNote = false" :currentExamInfo="currentExamInfo" />
      <!-- 支付弹窗 -->
      <Pay v-if="isShowPay" :ids="payIds"  @closePay="closePay" />
    </div>
</template>
<script>
import { ifStartExam } from '@/http/modules/common'
import { getStateRouter } from '@/help/HomeGoExam'
import submit from '@/help/Exam/submitDeal'
import ExamNote from '../../components/ExamNote.vue'
import Pay from './components/pay.vue'
export default {
    components: { ExamNote, Pay },
    name: 'OtherLogin',
    data () {
        return {
            isShowNote: false,
            isShowPay: false,
            payIds: ''
        }
    },
    created () {
        if (this.$route.query.eid) {
            this.startExam()
        } else {
            this.$otsPopPro({
                content: '发生异常，请关闭重新进入'
            })
        }
    },
    methods: {
        async startExam () {

            // 判断可否考试
            let params = {
                arrangementId: this.$route.query.eid
            }
            const { data } = await ifStartExam(params)
            console.log(data)
            let isFaceTest = data.isFaceTest
            // 存储试卷信息
            window.localStorage.setItem("paperData", data.paperData);
            // 跳转页面
            if (data.state === 0) {

                let routePath = getStateRouter(data.goWhere);
                if (!routePath) {
                    // this.$alert(data.message, '提示', {
                    //     type: 'warning',
                    //     callback: action => {
                    //     }
                    // });
                    this.$otsPopPro({
                        content: data.message,
                        isNeedCancel: false
                    }).then(() => {
                        this.$client.goHome()
                    })
                } else if (routePath === 'goPay') {

                    this.payIds = this.$route.query.eid
                    this.isShowPay = true

                } else if (routePath === 'submitExam') {
                    this.$otsPopPro({
                        content: '本科目考试已超时不能继续作答，请确认交卷',
                        isNeedCancel: false
                    }).then(() => {
                        // 交卷
                        let paperData = JSON.parse(data.paperData)
                        let answer = {
                            arrangementId: paperData.arrangementId,
                            temp: 0,
                            sourceIp: paperData.sourcIp,  //undefined
                            answerPaperRecordId: paperData.answerPaperRecordId,
                            studentTestActivityScoreId: paperData.studentTestActivityScoreId,
                            paperAnswerResult: paperData.paperAnswerResult
                        }
                        submit(answer)
                    })
                } else {

                    // 跳转放在考试须知里====同意即跳转
                    let infoObj = {
                        eid: this.$route.query.eid,
                        isFace: isFaceTest,
                        routePath: routePath
                    }
                    this.showPreNote(infoObj)

                }

            } else if (data.state === 1) { // 不用跳转 只提示(这种情况无法进行考试)
                this.$otsPopPro({
                    content: data.message,
                    isNeedCancel: false
                }).then(() => {
                    this.$client.goHome()
                })
            } else if (data.state === 2) { // 先提示 再转跳==(暂时没有这种情况)
            }
        },
        showPreNote (el) {
            this.isShowNote = true
            this.currentExamInfo = el
        },
        closePay () {
            this.isShowPay = false
        },
    }
}
</script>
<style scoped>
</style>