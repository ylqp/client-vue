<template>
  <div>
      <div class="judgeCorrect-content">
        <div 
          v-for="item in question.answerArea.optionList" 
          :key="item.id"
          class="judgeOption"
          :class="question.webData.answer.id === item.id ? 'chosen' : ''"
          @click="chooseOption(item.id)"
        >
          <i class="iconfont" :class="item.webContent==='正确' ? 'icon-dui' : 'icon-cuo'"></i>
          {{item.webContent}}
        </div>
        <div class="correctBox" v-show="question.webData.isCorrect">
          <el-input v-model="question.webData.answer.content" @change="dealJCAnswer"></el-input>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'JudgementCorrectsMistakes',
  props: ['question'],
  data () {
    return {
      
    }
  },
  computed: {
    /**
     * 是否需要改错
     */
    isCorrect () {
      let option = this.optionList.filter(item => item.id === this.answer)
      if (option.length && option[0].webContent === '错误') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    chooseOption (optionId) {
      this.question.webData.answer.id = optionId
      // return
      //触发改错框

      let options = this.question.answerArea.optionList
      let answerOption = options.filter(item => item.id == optionId)
      if (answerOption[0].webContent == '错误') {
        this.question.webData.isCorrect = true
      } else {
        this.question.webData.isCorrect = false
      }

			this.dealJCAnswer()
    },
    /**
     * 处理多选题答案
     * 多选题答案格式 {id: 1, content: '改错内容'}
     */
    dealJCAnswer () {
      let answerData = {}
		  answerData.id = this.question.webData.answer.id
		  if (this.question.webData.isCorrect) {
		    answerData.content = this.question.webData.answer.content
		  } else {
		    answerData.content = ''
		  }
		  this.question.webData.answer = answerData
		  this.question.webData.isAnswer = true
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