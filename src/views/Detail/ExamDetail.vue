<template>
    <div class="exam-page">
        <div class="top">
            <!-- <div class="title f22">{{pageData.title}}</div>
            <div class="exit">
                <div class="exitBtn">
                    <i class="iconfont icon-exit02 f14"></i>
                    <span class="ml5" @click="goExamList">退出考试</span>
                </div>
            </div> -->
        </div>
        <div class="mainCon">
            <div class="left">
                <!-- <div class="daBiaoTi mb20">
                    <span class="f18 fb ml20 col_grayZ">{{`${currentQue.daBiaoTiNum}、${currentQue.daBiaoTiName}`}}</span>
                    
                </div>
                <div class="queArea">
                    <Question :queItem="currentQue" />
                </div>
                <div class="footer mt20 mb20">
                    <div class="nextBtn" :class="isCanNext ? '' : 'gray'" @click="getNextQue">下一题</div>
                </div> -->
            </div>
            <div class="right">
                <!-- <div id="cameraArea" class="camArea" v-if="isShowCamera"></div>
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
                        <div class="submitBtn" @click="submitExamFn">
                            <i class="iconfont icon-tijiao"></i>
                            <span class="ml10">交卷</span>
                        </div>
                        <div class="helpLink">考试遇到问题？</div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { examDetail } from '@/http/modules/common'
export default {
    name: 'ExamDetail',
    data () {
        return {
            pageData: {

            }
        }
    },
    created () {
        this.getDetailInfo()
    },
    methods: {
        async getDetailInfo () {
            let params = {
                answerPaperRecordId: '37a47882-95a1-49e2-999a-7e30f1840ac7'
            }
            const { data } = await examDetail(params)
            console.log(JSON.parse(data) )
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
    
</style>