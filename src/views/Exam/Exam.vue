<template>
    <div class="exam-page">
        <div class="top">
            <div class="title f22">{{pageData.title}}</div>
            <div class="exit">
                <div class="exitBtn" @click="exitExam">
                    <i class="iconfont icon-exit02 f14"></i>
                    <span class="ml5">退出考试</span>
                </div>
            </div>
        </div>
        <div class="mainCon" v-if="questionBack.length">
            <div class="left">
                <div class="daBiaoTi mb20">
                    <span class="f18 fb ml20 col_grayZ mr15">{{`${currentQue.daBiaoTiNum}、${currentQue.daBiaoTiName}`}}</span>
                    <!-- 显示题目 小括号后边的东西 -->
                    <span class="col_grayQ">(</span>
                    <span class="col_grayQ">{{`共${currentQue.totalquestion}道小题，共${currentQue.totalscore}分`}}</span>
                    <span class="col_grayQ" v-show="currentQue.comment">{{currentQue.comment}}</span>
                    <span class="col_grayQ">)</span>
                </div>
                <div class="queArea">
                    <Question :queItem="currentQue" :isFlex="true" />
                </div>
                <div class="footer mt20 mb20">
                    <div class="nextBtn" :class="isCanNext ? '' : 'gray'" @click="getNextQue">下一题</div>
                </div>
            </div>
            <div class="right">
                <!-- <div id="cameraArea" class="camArea" v-if="isShowCamera"></div> -->
                <camera-box  class="camArea" v-if="isShowCamera" />
                <div class="tika">
                    <div class="time" v-if="isShowTime">
                        <img src="@/assets/images/time.png" class="mr5" />
                        <span>{{pageData.countDownTime}}</span>
                    </div>
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
                        <div class="submitBtn"
                             :class="isFreezeSumbit ? 'freeze' : ''"
                            @click="submitExamFn">
                            <i class="iconfont icon-tijiao"></i>
                            <span class="ml10">交卷</span>
                        </div>
                        <!-- <div class="helpLink">考试遇到问题？</div> -->
                        <help-pop />
                    </div>
                </div>
            </div>
        </div>
        <!-- 开始弹窗 -->
        <slot-pop :isShowPop="isShowPop">
            <div class="popConSlot">
                <template v-if="isStart && isTipsPop">
                    <p class="col_red f20 fb tc mb10">注意：考试已经开始，请<span>{{haveTime}}</span>分钟内提交！</p>
                    <p class="col_red f20 fb tc mt10 mb20" v-if="startCount>0"><span>{{startCount}}</span>秒后关闭</p>
                    <ots-button class="mt20" v-else name="确定"  @click.native="popOkFn('start')" />
                </template>
                <template v-else>
                    <p class="col_blue f20 fb tc mb10">确定退出考试？</p>
                    <p class="col_red f20 fb tc mb10" v-if="isTipsPop">请在<span>{{limitTime}}</span>之前点击交卷按钮完成考试！</p>
                    <div class="popBtnLine">
                        <ots-button name="取消" type="cancel"  @click.native="isShowPop = false" />
                        <ots-button name="确定"  @click.native="popOkFn()" />  
                    </div>
                </template>
                
            </div>
        </slot-pop>
    </div>
</template>
<script>
import watermark from '@/plugins/shuiyin'
import { getExam, submitExam, tempSave, ifStartExam, getIsClientLogin, openRandomCamera, closeRandomCamera } from '@/http/modules/common'
import { dealQueItemAnswer, mountQueItemAnswer, copyPageData, getExamFlag } from '@/help/Exam/index'
import { exitClient } from '@/http/modules/close'
import SlotPop from '../../components/SlotPop.vue'
import OtsButton from '../../components/Button/OtsButton.vue'
import CameraBox from '../../components/CameraBox.vue'
import HelpPop from '../../components/HelpPop.vue'
import Question from './components/Question'
import { mapState } from 'vuex'
export default {
    name: 'Exam',
    components: {
        Question,
        SlotPop,
        OtsButton,
        CameraBox,
        HelpPop,
    },
    data () {
        return {
            isStart: true,
            isTipsPop: false,
            haveTime: 0,
            startCount: 6,
            startCountTimer: null,
            limitTime: '',
            isShowPop: false,
            text: 1,
            isShowCamera: false,
            isShowTime: true,
            isFreezeSumbit: false,
            // 活动名称
            arrangementName: '',
            // 原始试题包
            questionBack: [],
            // 一层试题包
            questionList: [],
            // 当前试题
            currentQue: {},
            // 当前index
            currentIndex: -1,
            isCanNext: true,
            // 从开始接口获取到 ===> 需要传回submit的参数
            initialParam: {},
            // 页面用的数据
            pageData: {
                title: '',
                // 倒计时定时器
		        countDownTimer: null,
                countDownTime: "",
                // 定时保存定时器
                tempTimer: null
            }
        }
    },
    computed: {
        ...mapState('user', ['userFPSettings']),
        doneQues () {
            return this.questionList.filter(item => item.webData.isAnswer)
        }
    },
    created () {
        // console.log(this.$route.query)
        this.getExamInfo()
        window.WEBOTS.$client.submit = this.goNextRoute
    },
    mounted () {
        // 处理复合题isAnswer
        this.$eventBus.$on('dealCompositeIsAnswer', (qid) => {

            let queItem = this.questionList.filter(item => item.questionId === qid)[0]

			queItem.webData.isAnswer = queItem.subqustionList.every(function (item, index) {
		    	// console.log(index + '---------' + item.webData.isAnswer)
		    	return item.webData.isAnswer
		    })
        })
        // 是否人脸识别
        this.isShowCamera = this.$route.query.isFace == 1 ? true : false
        // 开始随机拍照处理
        this.dealRandomCamera()
        // 处理水印
        // console.log('watermark_txt', this.userFPSettings)
        // watermark.show({"watermark_txt": '1jjjjjjjjjjjjjjjjjjjjjj'})
    },
    methods: {
        /**
         * 处理开始考试接口
         */
        async getExamInfo () {
            
            
            // 判断可否考试（删）
            // let params = {
            //     isFaceTest: this.$route.query.isFace,
            //     arrangementId: this.$route.query.eid
            // }
            // const { cdata } = await ifStartExam(params)
            // console.log(cdata)
            console.log(this.$route.query.isFace)
            const { data } = await getExam(this.$route.query.isFace, {arrangementId: this.$route.query.eid})
            let examInfo = JSON.parse(data)
            // 验证是否可以正常考试
            const examFlag = getExamFlag(examInfo.answerPaperFlag);
            if (!examFlag.isAnswer) { // 提示信息
                this.$message.error(examFlag.msg)
                this.$router.push({
                    name: 'examList'
                })
                return
            }
            /**
             * 考试基本信息=> 页面需要
             */
            var options = copyPageData(examInfo)
            this.pageData = Object.assign(this.pageData, options)
            console.log(this.pageData)
            
            // let { arrangementName } = examInfo
            // this.arrangementName = arrangementName
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
                // tempSaveAnswerExpire
            }
            // console.log(this.initialParam)
            /**
             * 题目处理
             */
            let questionBack = examInfo.paper.psOutputDto ? examInfo.paper.psOutputDto : []
            questionBack = questionBack.filter(item => item.paperQuestionList)
            console.log('questionBack',questionBack)
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
            /**
             * 考试配置项处理=====>倒计时 临时保存 水印  等
             */
            this.dealExamOptions()
        },
        /**
         * 处理下一道题
         */
        getNextQue () {
            
            if (!this.isCanNext) {
                this.$message('已经是最后一题啦~')
                return
            }
            this.currentIndex++
        },
        goQue (qid) {
            this.questionList.forEach((item, index)=> {
                if (item.questionId === qid) {
                    this.currentIndex = index
                }
            })
        },
        async submitExamFn () {
            if (this.isFreezeSumbit) {
                this.$message('不可重复提交')
                return
            }
            // 判断是否
            if (this.doneQues.length !== this.questionList.length) {
                this.$otsPopPro({
                    content: '你有未答试题，确定交卷吗？',
                }).then(() => {
                    this.goNextRoute()
                }).catch(() => {

                })
            } else {
                this.$otsPopPro({
                    content: '交卷后不能对试卷进行修改，确认交卷？',
                }).then(() => {
                    this.goNextRoute()
                }).catch(() => {
                            
                })
            }   
        },
        goNextRoute () {
            this.doTempSaveFn().then(() => {
                // 如果需要拍照
                if (this.pageData.photoEndTest) {
                    // 提交考试的参数
                    const params = this.getSubmitParams(0)
                    window.localStorage.setItem('paperAnswer', JSON.stringify(params))
                    this.$router.push({
                        name: 'endExam',
                        query: this.$route.query
                    })
                } else {
                    // 不需要则直接提交
                    this.submit(0)
                }
            })
        },
        async submit (type) {
            // 提交考试的参数
            const params = this.getSubmitParams(type)
            // console.log(params)
            this.isFreezeSumbit = true
            const  { data }  = await submitExam(params)
            
            let rdata = JSON.parse(data)
            // console.log(rdata)
            if (rdata.success == "true") {
                this.$otsPopPro({
                    content: type == 0 ? '试卷提交成功！' : '保存成功'
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
                    content: type == 0 ? '试卷提交失败，请稍后重试！' : '保存失败'
                }).then(() => {
                    this.isFreezeSumbit = false
                })
            }
        },
        /**
         * 获取考试答案
         */
        getSubmitParams (temp) {
            let questionAnswerList = []
            // 获取试题答案列表
            this.questionBack.forEach(item => {
                item.paperQuestionList.forEach(item => {
                    const answerItem = dealQueItemAnswer(item)
                    questionAnswerList.push(answerItem)
                })
            })

            questionAnswerList = questionAnswerList.filter(item => item && JSON.stringify(item) !== '{}')

            let paperAnswerResult = {
                answerPaperRecordId: this.initialParam.answerPaperRecordId,
                questionAnswerList: questionAnswerList
            }
            let params = {
                // 从start接口获取的参数
                ...this.initialParam,
                // 保存还是提交
                temp,
                sourceIp: '',
                // 试题答案
                paperAnswerResult: JSON.stringify(paperAnswerResult)
            }
            return params
        },
        /**
         * 处理考试设置项
         */
        dealExamOptions () {
            // 开启倒计时
            this.dealCountdown ()
            // 开启临时保存
            this.tempSaveFn()
            // 开启提示
            this.startOrExitTips()
        },
        startOrExitTips () {
            if (this.pageData.timeLimitEnabled && this.pageData.paperTime > 0) {
                let haveTime = parseInt(this.pageData.paperTime - (this.pageData.useTime / 60))
                this.haveTime = haveTime == 0 ? 1 : haveTime
                this.isShowPop = true
                this.isTipsPop = true
                this.startCountTimer = setInterval(() => {
                    this.startCount--
                    if (this.startCount <= 0) {
                        clearInterval(this.startCountTimer)
                        this.startCountTimer = null
                    }
                }, 1000)
                this.getLimitTime()
			} else {
				console.log('不需要提示')
			}
        },
        tempSaveFn () {
            if (this.pageData.tempSaveAnswer) {
                let time = parseInt(this.pageData.tempSaveAnswerTime, 10)
                this.pageData.tempTimer = setInterval(this.doTempSaveFn, time * 1000)
            }
        },
        /**
         * 临时保存调用
         */
        doTempSaveFn () {
            
            // 提交考试的参数
            const params = this.getSubmitParams(1)

            // 临时保存参数
            const oInterParam = {
                arrangementId: params.arrangementId,
                answerPaperRecordId: params.answerPaperRecordId,
                paperAnswerResult: params.paperAnswerResult,
                tempSaveAnswerExpire: params.tempSaveAnswerExpire
            }
            console.log(oInterParam)
            // const { data } = await tempSave (oInterParam)
            return tempSave (oInterParam)
        },
        /**
         * 处理倒计时
         */
        dealCountdown () {
			if (this.pageData.timeLimitEnabled && this.pageData.paperTime > 0) {
				this.Univertimer(this.pageData.paperTime * 60 - this.pageData.useTime)
                let haveTime = this.pageData.paperTime * 60 - this.pageData.useTime
			} else {
				console.log('不需要倒计时')
				this.isShowTime = false
			}
		},
        getLimitTime () {
            let t = new Date()//你已知的时间
            let t_s = t.getTime()//转化为时间戳毫秒数
            let havetime = parseInt(this.pageData.paperTime * 60 - this.pageData.useTime)
            t.setTime(t_s + havetime * 1000)//设置新时间比旧时间多一分钟

            let oYear = t.getFullYear()
            let oMonth = t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1)
            let oDay = t.getDate() < 10 ? "0" + t.getDate() : t.getDate()
            let oHour = t.getHours() < 10 ? "0" + t.getHours() : t.getHours()
            let oMinute = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()
            let oSecond = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()

            let oTime = oYear + '-' + oMonth + '-' + oDay + " " + oHour + ":" + oMinute + ":" + oSecond;//最后拼接时间
            this.limitTime = oTime
        },
        Univertimer (intDiff) {

            this.pageData.countDownTimer = setInterval(mytimer, 1000)
            let that = this
            function mytimer() {
                
                var minute = 0,
                    second = 0; //时间默认值        
                if (intDiff > 0) {
                    minute = Math.floor(intDiff / 60)
                    second = Math.floor(intDiff) - (minute * 60)
                }
                if (minute <= 9) minute = '0' + minute
                if (second <= 9) second = '0' + second
                // $('.sDate').html(minute + ':' + second);
                that.pageData.countDownTime = minute + ':' + second
                // console.log(that.pageData.countDownTime)
                if (intDiff <= 0) {

                	console.log('倒计时完成')
                	clearInterval(that.pageData.countDownTimer)
                    // 自动提交
                    that.$otsMessage({content: "考试结束，请验证提交。"})
                	that.goNextRoute()
                }
                intDiff--;
            };
        },
        /**
         * 退出考试
         */
        exitExam () {
            this.isShowPop = true
        },
        goExamList () {
            this.doTempSaveFn().then(() => {
                this.$client.goHome()
            })
        },
        dealRandomCamera () {
            if (!this.isShowCamera) {
                return
            }
            // 开启随机拍照
            openRandomCamera()
        },
        popOkFn (type) {
            this.isShowPop = false
            if (type == 'start') {
                this.isStart = false
            } else {
                this.goExamList()
            }
        }
    },
    beforeDestroy () {
        clearInterval(this.pageData.countDownTimer)
        clearInterval(this.pageData.tempTimer)
        clearInterval(this.startCountTimer)
        // 清除水印
        watermark.clear()
        // 执行一次临时保存
        this.doTempSaveFn().then(() => {
            if (this.isShowCamera) { // 关闭随机拍照
                console.log('关闭随机拍照')
                closeRandomCamera()
            }
        })
        window.WEBOTS.$client.submit = null
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
                position: relative;
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
                    position: absolute;
                    width: 100%;
                    bottom: 0;
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
                    .submitBtn:hover {
                        background: linear-gradient(45deg, rgba(22, 144, 255, 1) 0%, rgba(39, 168, 255, 1) 100%);
                    }
                    .submitBtn.freeze {
                        background: #9CA5AD;
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
        align-items: center;
        .popBtnLine {
            display: flex;
            width: 280px;
            margin: 10px auto;
            justify-content: space-around;
        }
    }
</style>