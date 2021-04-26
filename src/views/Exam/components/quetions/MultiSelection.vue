<template>
    <div class="multi-content">
        <div  v-for="(el, index) in optionList" 
              :key="el.id" 
              class="choiceOption"
              :class="el.chosen ? 'choiced' : ''"
              @click="chooseOption(el)"
        >
            <div class="option">{{options[index]}}</div>
            <div class="optCon ml5" v-html="el.content"></div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'MultiSelection',
    props: ['question'],
    data () {
        return {
            optionList: []
        }
    },
    created () {
        // this.initialOption()
    },
    computed: {
        ...mapState(['options'])
    },
    methods: {
        initialOption () {
            console.log(123)
            let options = this.question.answerArea.optionList
            let answers = this.question.webData.answer ? this.question.webData.answer : [] // 此时为数组
            options.forEach(item => {
                item.chosen = false
            }) 
            if (answers.length) {
                answers.forEach(id => {
                    options.forEach(item => {
                        if (id == item.id) {
                            item.chosen = true
                        }
                    }) 
                })
            }
            this.optionList = options
        },
        chooseOption (el) {
            // console.log(el.chosen)
            el.chosen = !el.chosen
            // 数据更改 试图强制更新
            this.$forceUpdate()
            // 处理答案
            let answer = []
            const chosenList = this.optionList.filter(item => item.chosen)
            if (chosenList.length) {
                chosenList.forEach(item => {
                    answer.push(item.id)
                })
                this.question.webData.answer = answer
                this.question.webData.isAnswer = true
            } else {
                this.question.webData.answer = ''
                this.question.webData.isAnswer = false
            } 

            // 处理复合题isAnswer
            if (this.question.webData.parQueId) {
                this.$eventBus.$emit('dealCompositeIsAnswer', this.question.webData.parQueId)
            }
        }
    },
    watch: {
        question: {
            handler: 'initialOption',
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