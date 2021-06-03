<template>
    <div class="exam-page">
        <div class="top">
            <div class="title f22 col_red">环境测试，非正式考试</div>
            <div class="exit">
                <div class="exitBtn">
                    <i class="iconfont icon-exit02 f14"></i>
                    <span class="ml5" @click="goExamList">退出检测</span>
                </div>
            </div>
        </div>
        <div class="mainCon">
            <div class="left">
                <div class="daBiaoTi mb20">
                    <span class="f18 fb ml20 col_grayZ">{{`${currentQue.daBiaoTiNum}、${currentQue.daBiaoTiName}`}}</span>
                </div>
                <div class="queArea">
                    <Question :queItem="currentQue" />
                </div>
                <!-- <div class="footer mt20 mb20">
                    <div class="nextBtn" :class="isCanNext ? '' : 'gray'" @click="getNextQue">下一题</div>
                </div> -->
            </div>
            <div class="right">
                <!-- <div id="cameraArea" class="camArea" v-if="isShowCamera"></div> -->
                <!-- <div  class="camArea" v-if="!isShowCamera"></div> -->
                <camera-box class="camArea" v-if="isShowCamera" />
                <video-list />
                <div class="tika">
                    <div class="tishu">
                        <img src="@/assets/images/tika.png" class="mr5" />
                        <span class="col_green">{{doneQues.length}}</span>
                        <span class="col_grayZ">/{{questionList.length}}</span>
                        <span class="col_grayQ ml5">题</span>
                    </div>
                    <div class="timu">
                        <div class="tips">
                            <span class="done mr5"></span>
                            <span>已做</span>
                            <span class="nodo mr5 ml20"></span>
                            <span>未做</span>
                        </div>
                        <el-scrollbar class="tikaCon" style="height:calc(100% - 50px)">
                            <div v-for="item in questionBack" :key="item.id">
                                <h4>{{`${item.usedsequence}、${item.name}`}}</h4>
                                <div class="mt15 mb5">
                                    <span class="tiItem" 
                                          :class="queItem.webData.isAnswer ? 'done' : ''"
                                          v-for="(queItem, index) in item.paperQuestionList" :key="queItem.questionId"
                                          @click="goQue(queItem.questionId)"
                                    >
                                        {{index + 1}}
                                    </span>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div class="submitBox">
                        <div class="submitBtn" @click="goExam">
                            <i class="iconfont icon-tijiao"></i>
                            <span class="ml10 f14">提交并正式考试</span>
                        </div>
                        <div class="helpLink">考试遇到问题？</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 开始弹窗 -->
        <slot-pop :isShowPop="isShowPop">
            <div class="popConSlot">
                <p class="col_red f20 fb tc mb10">注意：当前界面为考前检测界面，非正式考试！</p>
                <p class="col_red f20 fb tc" v-show="countDown>0">{{`${countDown}秒后确定`}}</p>
                <ots-button name="确定" v-show="countDown<=0" @click.native="closePop" />
            </div>
        </slot-pop>
    </div>
</template>
<script>
import checkData from '@/help/Exam/checkData'
import { dealCheck } from '@/help/Exam/checkData'
import { mapState } from 'vuex'
import { dealQueItemAnswer, mountQueItemAnswer, copyPageData, getExamFlag } from '@/help/Exam/index'
import Question from './components/Question'
import SlotPop from '@/components/SlotPop.vue'
import OtsButton from '@/components/Button/OtsButton.vue'
import VideoList from '../../components/VideoList.vue'
import CameraBox from '@/components/CameraBox.vue'
import submit from '@/help/Exam/submitDeal'
export default {
    name: 'CheckExam',
    components: { Question, SlotPop, OtsButton, VideoList, CameraBox },
    data () {
        return {
            isShowCamera: true,
            isShowCheck: false,
            isShowPop: true,
            countDown: 5,
            countTimer: null,
            // 当前试题
            currentQue: {},
            // 当前index
            currentIndex: -1,
            // 原始试题包
            questionBack: [],
            // 一层试题包
            questionList: [],
            pageData: {
                title: '123'
            }
        }
    },
    computed: {
        ...mapState('user', ['userFPSettings']),
        doneQues () {
            return this.questionList.filter(item => item.webData.isAnswer)
        }
    },
    watch: {
        currentIndex: {
            handler: function () {
                if ((this.currentIndex + 1) >= this.questionList.length) {
                    this.isCanNext = false
                } else {
                    this.isCanNext = true
                }
                this.currentQue = this.questionList[this.currentIndex]
            }
        }
    },
    created () {
        console.log('-------------')
        console.log(this.$route.query.isFace)
        if (this.$route.query.isFace == 0) { // 直接跳考试页
            this.$router.push({
                name: 'exam',
                query: this.$route.query
            })
        } else {
            this.initCheckData()
        }
    },
    mounted () {
        
        this.firstPop()

        // this.getVideo()
        try {
            console.log(1)
            window.OTS.GetCameraRectangle()
        } catch (e) {
            console.log(e)
            this.$message('摄像设备有问题，请调试好')
        }
        
    },
    methods: {
        initCheckData () {
            
            let tenant = this.userFPSettings.tenant ? this.userFPSettings.tenant : 'cate'
            let dataStr = checkData[`${tenant}_dataSource`] ? checkData[`${tenant}_dataSource`] : checkData[`dataSource`]
            let examInfo = JSON.parse(dataStr).data

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
                                subQueItem.webData.parQueId = questionItem.questionId
                            })
                        }
                        questionItem.webData = {}
                        questionItem.webData.answer = ''
                        questionItem.webData.isAnswer = false
                    }
                    // 初始挂载答案
                    questionItem = mountQueItemAnswer(questionItem)

                    
                    this.questionList.push(questionItem)
                })
            })

            // 赋值给
            this.questionBack = questionBack
            // 展示第一道题
            this.currentIndex = 0
            // console.log(this.questionList)

            // 处理复合题isAnswer
            this.$eventBus.$on('dealCompositeIsAnswer', (qid) => {

                let queItem = this.questionList.filter(item => item.questionId === qid)[0]

                queItem.webData.isAnswer = queItem.subqustionList.every(function (item, index) {
                    return item.webData.isAnswer
                })
            })
        },
        goExam () {

            if (this.doneQues.length != this.questionList.length) {
                this.$otsPop({
                    content: '请完成左侧所有需要检测内容！'
                })
                return
            }
            
            // 处理验证页答案
            let dealCheckFn = dealCheck[this.userFPSettings.tenant] ? dealCheck[this.userFPSettings.tenant] : dealCheck['dealCommon']
            const checkReault = dealCheckFn(this.currentQue.subqustionList)
            

            // 验证通过跳考试页
            if (checkReault) {
                // 这块用来跳转
                let examPath = this.$route.query.examPath
                // 先存一下是拍照还是活体
                if (examPath.indexOf('Live') > 0) {
                    window.localStorage.setItem('exmaCheckType', 'LiveTest')
                } else {
                    window.localStorage.setItem('exmaCheckType', 'PhotoTest')
                }
                // 开始检测页面
                if (examPath === 'startLiveTest'
                    || examPath === 'startTakePhoto'
                ) { 
                    this.$router.push({
                        name: 'startExam',
                        query: this.$route.query
                    })
                }
                // 开始检测结束去考试页
                if (examPath === 'startPhotoExam' || examPath === 'startLiveExam') {
                    this.$router.push({
                        name: 'exam',
                        query: this.$route.query
                    })
                }
                // 结束检测页
                if (examPath === 'endTakePhoto' 
                    || examPath === 'endLiveTest' 
                ) {
                    // 需要存一下答案 因为不跳考试页了
                    window.localStorage.setItem('paperAnswer', this.getPaperAnswer())
                    this.$router.push({
                        name: 'endExam',
                    })
                }
                // 直接交卷
                if (examPath == 'submitExam') {
                    console.log(this.getPaperAnswer())
                    submit(this.getPaperAnswer())
                }
            }
            
        },
        getPaperAnswer () {
            const paperData = JSON.parse(window.localStorage.getItem('paperData'))
            const paperAnswer = {
                arrangementId: paperData.arrangementId,
                temp: 0,
                sourceIp: paperData.sourcIp,  //undefined
                answerPaperRecordId: paperData.answerPaperRecordId,
                studentTestActivityScoreId: paperData.studentTestActivityScoreId,
                paperAnswerResult: paperData.paperAnswerResult
            }
            return paperAnswer
        },
        goExamList () {
            this.$router.push({
                name: 'examList'
            })
        },
        submitExamFn () {

        },
        goQue (qid) {
            this.questionList.forEach((item, index)=> {
                if (item.questionId === qid) {
                    this.currentIndex = index
                }
            })
        },
        firstPop () {
            this.countTimer = setInterval(() => {
                // console.log(this.countDown)
                this.countDown--
                if (this.countDown <= 0) {
                    clearInterval(this.countTimer)
                }
            }, 1000)
        },
        closePop () {
            this.isShowPop = false
            // this.isShowCamera = true
        }
        
    },
    beforeDestroy () {
        clearInterval(this.countTimer)
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
                .nextBtn.gray{
                    background: rgba(231, 236, 241, 1);
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
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .tishu {
                    height: 60px;
                    line-height: 60px;
                    font-size: 16px;
                    text-align: center;
                    background: rgba(255, 255, 255, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .timu {
                    height: calc(100% - 220px);
                    background: rgba(235, 249, 255, 1);
                    box-shadow: inset 0px 14px 10px -15px #7ea9bb;
                    .tips {
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        .done {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            background: rgba(93, 174, 255, 1);
                            border-radius: 2px;
                        }
                        .nodo {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            background: rgba(255, 255, 255, 1);
                            border-radius: 2px;
                            border: 1px solid rgba(156, 165, 173, 1);
                        }
                    }
                    .tikaCon {
                        padding-left: 20px;
                        h4 {
                            font-size: 13px;
                            font-weight: 500;
                            color: #404E6F;
                        }
                        .tiItem {
                            display: inline-block;
                            width: 24px;
                            height: 24px;
                            line-height: 23px;
                            text-align: center;
                            border: 1px solid #9CA5AD;
                            background: #fff;
                            color: #666a77;
                            border-radius: 12px;
                            margin-left: 10px;
                            margin-bottom: 10px;
                            cursor: pointer;
                        }
                        .tiItem.done{
                            background: #5DAEFF;
                            border: 1px solid #5DAEFF;
                            color: #fff;
                        }
                    }
                }
                .submitBox {
                    background-color: #fff;
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .submitBtn {
                        width: 150px;
                        height: 40px;
                        color: #fff;
                        background: linear-gradient(45deg, #0067FF 0%, #2692FF 100%);
                        box-shadow: 0px 4px 20px 0px rgb(187 197 205 / 50%);
                        border-radius: 3px;
                        text-align: center;
                        line-height: 40px;
                        font-size: 18px;
                        margin-bottom: 8px;
                        cursor: pointer;
                    }
                    .helpLink {
                        color: #9CA5AD;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .popConSlot {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>