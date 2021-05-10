<template>
    <div>
        <!-- 考生答案 -->
        <div class="answer" v-html="question.answerContent && question.answerContent.content ? question.answerContent.content : '未作答'">
        </div>
        <!-- 解析 -->
        <detail :question="question">
            <div>【正确答案】</div>
            <div class="ml20">
                <p v-html="question.answer && question.answer.content ? question.answer.content : ''"></p>
            </div>
        </detail>
    </div>
</template>
<script>
import Detail from './Detail'
export default {
  name: 'EssayQuestionDetail',
  props: ['question'],
  components: {
    Detail
  },
  data () {
    return {
    }
  },
  created () {
    this.initialFn()
  },
  methods: {
    initialFn () {
      
    }
  }
}
</script>
<style scoped>
.answer {
  border: 1px solid #ccc;
  min-height: 40px;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 13px;
  line-height: 20px;
}
</style>