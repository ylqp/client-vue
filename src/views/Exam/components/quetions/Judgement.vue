<template>
  <div class="judge-content">
      <div 
        v-for="item in optionList" 
        :key="item.id"
        class="judgeOption"
        :class="answer == item.id ? 'chosen' : ''"
        @click="chooseOption(item.id)"
      >
        <i class="iconfont" :class="item.webContent==='正确' ? 'icon-dui' : 'icon-cuo'"></i>
        {{item.webContent}}
      </div>
  </div>
</template>
<script>
export default {
  name: 'Judgement',
  props: ['question'],
  data () {
    return {
      answer: this.question.webData.answer,
      optionList: []
    }
  },
  created () {
    this.initialOption()
  },
  methods: {
    initialOption () {
      let options = this.question.answerArea.optionList
      options.forEach(item => {
        if (item.content === '对' || item.content === '正确' || item.content === 'T') {
          item.webContent = '正确'
        }
        if (item.content === '错' || item.content === '错误' || item.content === 'F') {
          item.webContent = '错误'
        }
      })
      this.optionList = options
    },
    chooseOption (id) {
      this.answer = id
      this.question.webData.answer = id
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
</style>