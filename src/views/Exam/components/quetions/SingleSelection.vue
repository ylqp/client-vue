<template>
    <div class="single-content">
        <div  v-for="(el, index) in answerArea.optionList" 
              :key="el.id" 
              class="choiceOption"
              :class="answer==el.id? 'choiced' : ''"
              @click="choiceOption(el)"
        >
            <div class="option">{{options[index]}}</div>
            <div class="optCon ml5" v-html="el.content"></div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'SingleSelection',
    props: ['question'],
    data () {
        return {
            answerArea: this.question.answerArea,
            answer: this.question.webData.answer
        }
    },
    computed: {
        ...mapState(['options'])
    },
    methods: {
        choiceOption (el) {

            this.answer = el.id

            this.question.webData.answer = el.id
            this.question.webData.isAnswer = true

            // 处理复合题isAnswer
            if (this.question.webData.parQueId) {
                this.$eventBus.$emit('dealCompositeIsAnswer', this.question.webData.parQueId)
            }

        }
    },
    watch: {
        question: {
            handler (newContent) {
                this.answerArea = newContent.answerArea
                this.answer = newContent.webData.answer
            },
            immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
    .choiceOption {
        margin-top: 8px;
        font-size: 19px;
        cursor: pointer;
        border-radius: 26px;
        padding: 8px;
        display: flex;
        align-items: center;
        .option {
            width: 40px;
            height: 40px;
            color: #FFF;
            text-align: center;
            line-height: 40px;
            border-radius: 20px;
            background: rgba(212, 225, 238, 1);
            flex-shrink: 0;
        }
        .optCon {
            color: #7784A1;
            font-size: 18px;
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