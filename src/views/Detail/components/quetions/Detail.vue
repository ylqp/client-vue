<template>
    <!-- 解析 -->
    <div class="mt20 detailCon col_grayZ">
        <div class="answer" @click="isShowAnswerDetail = !isShowAnswerDetail">
            <div class="answerCon">
                <!-- <div class="w70px">【答&nbsp;案】</div>
                <div class="ml20">
                    <span class="mr10">正确答案</span>
                    <i class="col_green">{{rightAnswer}}</i>
                </div>
                <div class="ml20">
                    <span class="mr10">您的答案</span>
                    <i class="col_blue">{{yourAnswer}}</i>
                </div> -->
                <slot></slot>
                <div class="ml20" :class="isCorrect ? 'col_green' : 'col_red'" v-if="isJudge">
                    {{isCorrect ? '回答正确' : '回答错误'}}
                </div>
            </div>
            <div class="cp col_blue">
                <span v-show="!isShowAnswerDetail">展开<i class="el-icon-arrow-down ml5"></i></span>
                <span v-show="isShowAnswerDetail">收起<i class="el-icon-arrow-up ml5"></i></span>
            </div>
        </div>
        <div class="answerDetail mt10" v-show="isShowAnswerDetail">
            <div class="detailItem mb10" v-if="!isJudge && question.answerScore">
                <div class="mr20 w70px">【得&nbsp;分】</div>
                <p class="col_green" v-html="question.answerScore"></p>
            </div>
            <div class="detailItem"> 
                <div class="mr20 w70px">【解&nbsp;析】</div>
                <p v-html="question.solvingProcess"></p>
            </div>
            <div class="mt10 detailItem" v-if="question.category">
                <div class="mr20 w70px">【知&nbsp;识&nbsp;点】</div>
                <p v-html="question.category.value"></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Detail',
    props: ['question'],
    data () {
        return {
            isShowAnswerDetail: false,
            isCorrect: false,
            isJudge: false,
        }
    },
    created () {
        this.initialFn()
    },
    methods: {
        initialFn () {
            // 回答判断 单选题  多选题  判断题 展示回答正确OR错误
            if (this.question.answerMode === 'SingleSelection' || this.question.answerMode === 'MultiSelection' || this.question.answerMode === 'Judgement') {
                this.isJudge = true
                if (this.question.answerCorrect != null && JSON.parse(this.question.answerCorrect)) {
                    this.isCorrect = true
                }
            }
             
        }
    }
}
</script>
<style lang="less" scoped>
    .detailCon {
        width: 100%;
        background: rgba(235,249,255,1);
        border-radius: 4px;
        padding: 8px 12px;
        .answer {
            display: flex;
            justify-content: space-between;
            .answerCon {
                display: flex;
            }
        }
        .answerDetail {
            .detailItem {
                display: flex;
            }
            .detailItem div{
                flex-shrink: 0;
            }
        }
    }
</style>