<template>
    <div class="multi-content">
        <div  v-for="(el, index) in optionList" 
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
  components: { Detail },
    name: 'MultiSelectionDetail',
    props: ['question'],
    data () {
        return {
            optionList: [],
            rightAnswer: '',
            yourAnswer: '',
        }
    },
    created () {
        this.initialFn()
    },
    computed: {
        ...mapState(['options'])
    },
    methods: {
        initialFn () {
            let options = this.question.answerArea.optionList
            this.optionList = options

            // 正确答案处理
            let rightList = []
            let answers = this.question.answer.idList
            answers.forEach(answer => {
                options.forEach((option, index) => {
                    if (answer === option.id) {
                        rightList.push(this.options[index])
                    }
                })
            })
            this.rightAnswer = rightList.join()

            // 你的答案处理
            let yourAnswerIds = this.question.answerContent !== null ? this.question.answerContent.idList : ''
            if (!yourAnswerIds) {
                this.yourAnswer = '未作答'
            } else {
                let yourAnswerList = []
                yourAnswerIds.forEach(answer => {
                    options.forEach((option, index) => {
                        if (answer === option.id) {
                            yourAnswerList.push(this.options[index])
                        }
                    })
                })

                this.yourAnswer = yourAnswerList.join()
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