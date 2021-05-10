<template>
    <div class="exam-page">
        <div class="top">
            <div class="title f22">{{pageData.title}}</div>
            <div class="f16 col_grayZ">交卷时间：{{pageData.quessubmittime}}</div>
            <div class="exit">
                <div class="exitBtn" @click="goExamList">
                    <i class="iconfont icon-exit02 f14"></i>
                    <span class="ml5" @click="goExamList">返回</span>
                </div>
            </div>
        </div>
        <div class="mainCon">
            <div class="left">
                <div v-for="item in questionBack" :key="item.id">
                    <div class="daBiaoTi mb20">
                        <span class="f18 fb ml20 col_grayZ">{{`${item.sequenceNumber}、${item.name}`}}</span>
                    </div>
                    <div class="queArea" v-for="queItem in item.questions" :key="queItem.id">
                         <question-detail :queItem="queItem" />
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="tika">
                    <div class="score">
                        <span class="fb f24 col_green">{{pageData.achievement}}</span>
                        <span>分</span>
                    </div>
                    <div class="time">
                        <img src="@/assets/images/time.png" class="mr5">
                        <span>{{pageData.useTime}}</span>
                    </div>
                    <div class="tishu">
                        <img src="@/assets/images/tika.png" class="mr5" />
                        <span class="col_green">{{doneQues.length}}</span>
                        <span class="col_grayZ">/{{questionList.length}}</span>
                        <span class="col_grayQ ml5">题</span>
                    </div>
                    <div class="timu">
                        <div class="tips">
                            <span class="right mr5"></span>
                            <span>正确</span>
                            <span class="wrong mr5 ml15"></span>
                            <span>错误</span>
                            <span class="noJudge mr5 ml15"></span>
                            <span>不判断</span>
                        </div>
                        <el-scrollbar class="tikaCon" style="height:calc(100% - 50px)">
                            <div v-for="item in questionBack" :key="item.id">
                                <h4>{{`${item.usedsequence}、${item.name}`}}</h4>
                                <div class="mt15 mb5">
                                    <span class="tiItem" 
                                          :class="queItem.answerStatus == 1 ? 'correct' : (queItem.answerStatus == 0 ? 'noJudge' : 'wrong')"
                                          v-for="(queItem, index) in item.questions" :key="queItem.id"
                                          @click="goQue(queItem.id)"
                                    >
                                        {{index + 1}}
                                    </span>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                    <!-- <div class="submitBox">
                        <div class="submitBtn" @click="submitExamFn">
                            <i class="iconfont icon-tijiao"></i>
                            <span class="ml10">交卷</span>
                        </div>
                        <div class="helpLink">考试遇到问题？</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import QuestionDetail from './components/QuestionDetail.vue'
import { examDetail } from '@/http/modules/common'
export default {
    name: 'ExamDetail',
    components: {
        QuestionDetail
    },
    data () {
        return {
            pageData: {
                // 考试名称
                title: '',
                // 交卷时间
                quessubmittime: '',
                // 得分
                achievement: 0,
                // 考试用时
                useTime: '',
            },
            // 试题包
            questionBack: [],
            // 试题列表
            questionList: [],

        }
    },
    computed: {
        doneQues () {
            return this.questionList.filter(item => item.answerContent)
        }
    },
    created () {
        this.getDetailInfo()
    },
    methods: {
        async getDetailInfo () {
            let id = this.$route.query.id
            if (!id) {
                this.$message.error('报错啦~ 请退出重试');
                return
            }
            let params = {
                answerPaperRecordId: id
                //'067b8d4e-89c0-44fe-b2c0-7c47c36ead7c'
            }
            const { data } = await examDetail(params)
            let detailInfo = JSON.parse(data)
            
            /**
             * 详情基本信息=> 页面需要
             */
            this.copyPageData(this.pageData, detailInfo)
            // console.log(this.pageData)
            /**
             * 试题包
             */
            let questionBack = detailInfo.paperStructures.filter(item => item.questions.length > 0)
            let questionList = []
            questionBack.forEach(item => {
                item.questions.forEach(queItem => {
                    questionList.push(queItem)
                })
            })
            

            this.questionBack = questionBack
            this.questionList = questionList
        },
        copyPageData (obj, dataObj) {

            Object.keys(obj).forEach(item => {
                obj[item] = dataObj[item] ? dataObj[item] : obj[item]
            })
        },
        goQue (id) {
            document.getElementById(id).scrollIntoView(true)
        },
        goExamList () {
            this.$router.push({
                name: 'examList'
            })
        },
    },

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
            overflow: auto;
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
                height: calc(100% - 15px);
                .time,
                .score {
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
                        .right {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            background: #22E99D;
                            border-radius: 2px;
                        }
                        .wrong {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            background: #FF536B;
                            border-radius: 2px;
                        }
                        .noJudge {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            background: #7784A1;
                            border-radius: 2px;
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
                        .tiItem.correct{
                            background: #22E99D;
                            border: 1px solid #22E99D;
                            color: #fff;
                        }
                        .tiItem.wrong{
                            background: #FF536B;
                            border: 1px solid #FF536B;
                            color: #fff;
                        }
                        .tiItem.noJudge{
                            background: #7784A1;
                            border: 1px solid #7784A1;
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
    
</style>