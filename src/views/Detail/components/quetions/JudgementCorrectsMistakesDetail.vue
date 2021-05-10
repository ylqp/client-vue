<template>
    <div>
        <div class="judgeCorrect-content">
          <div 
            v-for="item in question.answerArea.optionList" 
            :key="item.id"
            class="judgeOption"
          >
            <i class="iconfont" :class="item.webContent==='正确' ? 'icon-dui' : 'icon-cuo'"></i>
            {{item.webContent}}
          </div>
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
import Detail from './Detail.vue'
export default {
  name: 'JudgementCorrectsMistakesDetail',
  props: ['question'],
  components: {
    Detail
  },
  data () {
    return {
      rightAnswer: '',
      yourAnswer: '',
      isCorrect: true
    }
  },
  created () {
      this.initialFn()
  },
  methods: {
      initialFn () {
          this.question.answerArea.optionList.forEach(item => {
            if (item.content === '对' || item.content === '正确' || item.content === 'T') {
              item.webContent = '正确'
            }
            if (item.content === '错' || item.content === '错误' || item.content === 'F') {
              item.webContent = '错误'
            }
          })

          //  处理答案
          let answer = this.question.answer.id
          let yourAnswer = this.question.answerContent != null ? this.question.answerContent.id : ''
          if (!yourAnswer) {
            this.yourAnswer = '未作答'
          }
          let options = this.question.answerArea.optionList
          options.forEach(option => {
            if (answer === option.id) {
              this.rightAnswer = option.webContent
            }
            if (yourAnswer && yourAnswer === option.id) {
              this.yourAnswer = option.webContent
            }
          })

          // 判断改错文本
          if (this.question.answer.content) {
            this.rightAnswer = this.rightAnswer + `,${this.question.answer.content}`
          }
          if (this.question.answerContent && this.question.answerContent.content) {
            this.yourAnswer = this.yourAnswer + `,${this.question.answerContent.content}`
          }
      }
  }
}
</script>
<style scoped>
.judgeOption {
    display: inline-block;
    width: 90px;
    height: 40px;
    background: rgba(156, 165, 173, 1);
    border-radius: 100px;
    color: #FFF;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 30px;
}
.chosen {
  background: #4499ff;
}
.correctBox {
  margin-top: 20px;
  padding: 0 30px
}
</style>