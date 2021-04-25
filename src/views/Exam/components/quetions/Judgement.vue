<template>
  <div class="judge-content">
      <div 
        v-for="item in question.answerArea.optionList" 
        :key="item.id"
        class="judgeOption"
        :class="question.webData.answer == item.id ? 'chosen' : ''"
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
      
    }
  },
  methods: {
    chooseOption (id) {
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