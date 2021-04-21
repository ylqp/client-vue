<template>
    <div class="exam-page">
        <div class="top">
            <div class="title f22">{{arrangementName}}</div>
            <div class="exit">
                <div class="exitBtn">
                    <i class="iconfont icon-exit02 f14"></i>
                    <span class="ml5">退出考试</span>
                </div>
            </div>
        </div>
        <div class="mainCon">
            <div class="left">
                <div class="daBiaoTi mb20">
                    <span class="f18 fb ml20 col_grayZ">{{`${currentQue.daBiaoTiNum}、${currentQue.daBiaoTiName}`}}</span>
                    <!-- 显示题目 小括号后边的东西 -->
                </div>
                <div class="queArea">
                    <Question :queItem="currentQue" />
                </div>
                <div class="footer mt20 mb20">
                    <div class="nextBtn" @click="getNextQue">下一题</div>
                </div>
            </div>
            <div class="right">
                <div id="cameraArea" class="camArea" v-if="isShowCamera"></div>
                <div class="tika">
                    <div class="time"></div>
                    <div class="tishu"></div>
                    <div class="timu"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Question from './components/Question'
import { getExam } from '@/http/modules/common'
export default {
    name: 'Exam',
    components: {
        Question
    },
    data () {
        return {
            text: 1,
            isShowCamera: false,
            // 活动名称
            arrangementName: '',
            // 原始试题包
            questionBack: [],
            // 一层试题包
            questionList: [],
            // 当前试题
            currentQue: {},
            // 当前index
            currentIndex: 0,
            // 从开始接口获取到 ===> 需要传回submit的参数
            initialParam: {},
        }
    },
    created () {
        console.log(this.$route.query)
        this.getExamInfo()
    },
    methods: {
        async getExamInfo () {
            const { data } = await getExam(this.$route.query.isFace, {arrangementId: this.$route.query.eid})
            let examInfo = JSON.parse(data)
            console.log(examInfo)
            /**
             * 考试基本信息=> 页面需要
             */
            let { arrangementName } = examInfo
            this.arrangementName = arrangementName
            /**
             * 考试基本信息=> 提交参数
             */
            let { arrangementId, answerPaperRecordId, studentTestActivityScoreId, tempSaveAnswerExpire } = examInfo
            this.initialParam = {
                // 活动id
                arrangementId,
                // 作答记录id
                answerPaperRecordId,
                // 学生考试活动成绩id
                studentTestActivityScoreId,
                // 临时保存信息
                tempSaveAnswerExpire
            }
            // console.log(this.initialParam)
            /**
             * 题目处理
             */
            let questionBack = examInfo.paper.psOutputDto ? examInfo.paper.psOutputDto : []
            questionBack = questionBack.filter(item => item.paperQuestionList)

            questionBack.forEach(item => {// 大题结构
                item.paperQuestionList.forEach((questionItem) => { // 单题
                    /**
                     * 将大题信息挂载到每到题目上
                     */
                    questionItem.daBiaoTiNum = item.sequencenumber;  //第几道大题
                    questionItem.daBiaoTiName = item.name;  //第几道大题
                    questionItem.totalscore = item.totalscore; //共几分
                    questionItem.totalquestion = item.totalquestion;//共有几道题
                    questionItem.comment = item.comment;//备注

                    if (questionItem.answerMode !== 'Composite') {
                        questionItem.webData = {}
                        questionItem.webData.answer = ''
                        questionItem.webData.isAnswer = false

                    } else {
                        if (questionItem.subqustionList) {
                            questionItem.subqustionList.forEach((subQueItem) => {
                                subQueItem.webData = {}
                                subQueItem.webData.answer = ''
                                subQueItem.webData.isAnswer = false
                            })
                        }
                        questionItem.webData = {}
                        questionItem.webData.answer = ''
                        questionItem.webData.isAnswer = false
                    }
                    // 初始挂载答案
                    // questionItem = mountQueItemAnswer(questionItem)

                    this.questionList.push(questionItem)
                    this.currentQue = this.questionList[this.currentIndex]
                })
            });

            // 赋值给
            this.questionBack = questionBack

            console.log(this.questionList)
            
        },
        getNextQue () {
            this.currentIndex++
            this.currentQue = this.questionList[this.currentIndex]
            console.log(JSON.stringify(this.currentQue))
        }
    }
}
</script>
<style lang="less" scoped>
    .exam-page {
        background: rgba(250,251,252,1);
        height: 100%;
    }
    .top {
        height: 60px;
        line-height: 60px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .exitBtn {
            background: rgba(255, 255, 255, 1);
            border-radius: 3px;
            border: 1px solid rgba(187, 197, 205, 1);
            color: #7784A1;
            cursor: pointer;
            width: 88px;
            height: 34px;
            line-height: 34px;
            text-align: center;
        }
    }
    .mainCon {
        width: calc(100% - 60px);
        height: calc(100% - 90px);
        margin: auto;
        display: flex;
        justify-content: space-between;
        .left {
            flex: 1;
            background: #fff;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 6px 0px rgb(234 235 236);
            border-radius: 2px;
            .daBiaoTi {
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid rgba(231, 236, 241, 1);
            }
            .queArea {
                height: calc(100% - 170px);
                padding: 0 20px;
            }
            .footer {
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                .nextBtn {
                    width: 160px;
                    height: 50px;
                    background: linear-gradient(45deg, rgba(31, 202, 135, 1) 0%, rgba(27, 220, 152, 1) 100%);
                    border-radius: 3px;
                    line-height: 50px;
                    color: #FFF;
                    text-align: center;
                    cursor: pointer;
                    font-size: 20px;
                }
            }
        }
        .right {
            width: 220px;
            margin-left: 12px;
            flex-shrink: 0;
            .camArea {
                height: 162px;
                background: #ccc;
                margin-bottom: 13px;
            }
            .tika {
                background: rgba(235, 249, 255, 1);
                box-shadow: 0px 2px 6px 0px rgb(234 235 236);
                border-radius: 2px;
                height: calc(100% - 175px);
                .time {
                    height: 60px;
                    border-bottom: 1px solid rgba(231, 236, 241, 1);
                    line-height: 60px;
                    text-align: center;
                    font-size: 16px;
                    letter-spacing: 2px;
                    background: rgba(255, 255, 255, 1);
                }
                .tishu {
                    height: 60px;
                    line-height: 60px;
                    font-size: 16px;
                    text-align: center;
                    background: rgba(255, 255, 255, 1);
                }
                .timu {
                    height: calc(100% - 240px);
                    background: rgba(235, 249, 255, 1);
                    box-shadow: inset 0px 14px 10px -15px #7ea9bb;
                }
            }
        }
    }

</style>