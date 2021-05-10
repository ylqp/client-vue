<template>
    <div class="single-content">
        <div  v-for="(el, index) in answerArea.optionList" 
              :key="el.id" 
              class="choiceOption"
        >
            <div class="option">{{options[index]}}</div>
            <div class="optCon ml5" v-html="el.content"></div>
        </div>
        <!-- 解析 -->
        <detail :question="question">
            <div class="w70px">【答&nbsp;案】</div>
            <div class="ml20">
                <span class="mr10">正确答案</span>
                <i class="col_green">{{rightAnswer}}</i>
            </div>
            <div class="ml20">
                <span class="mr10">您的答案</span>
                <i class="col_blue">{{yourAnswer}}</i>
            </div>
        </detail>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Detail from './Detail.vue'
export default {
    name: 'SingleSelectionDetail',
    props: ['question'],
    components: {
        Detail
    },
    data () {
        return {
            answerArea: this.question.answerArea,
            rightAnswer: '',
            yourAnswer: '',
            isCorrect: false,
            isShowAnswerDetail: false
        }
    },
    computed: {
        ...mapState(['options'])
    },
    created () {
        this.initialFn()
    },
    methods: {
        initialFn () {
            let answerId = this.question.answer.id
            let yourAnswerId = this.question.answerContent !== null ? this.question.answerContent.id : ''
            if (!yourAnswerId) {
                this.yourAnswer = '未作答'
            }
            let optionList = this.question.answerArea.optionList
            optionList.forEach((el, index) => {
                // 正确答案
                if (answerId === el.id) {
                    this.rightAnswer = this.options[index]
                }
                // 你的答案
                if (yourAnswerId && yourAnswerId === el.id) {
                    this.yourAnswer = this.options[index]
                }
            });

            // 回答判断
            if (this.question.answerCorrect != null && JSON.parse(this.question.answerCorrect)) {
                this.isCorrect = true
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .choiceOption {
        margin-top: 8px;
        font-size: 13px;
        cursor: pointer;
        border-radius: 26px;
        padding: 8px;
        display: flex;
        align-items: center;
        .option {
            width: 24px;
            height: 24px;
            color: #FFF;
            text-align: center;
            line-height: 24px;
            border-radius: 12px;
            background: rgba(212, 225, 238, 1);
        }
        .optCon {
            color: #7784A1;
            font-size: 13px;
        }
    }
    .choiceOption.choiced {
        background: #EBF9FF;
        .option {
            background: #198CFF;
        }
        .optCon {
            color: #198CFF;
            font-weight: bold;
        }

    }
</style>