<template>
  <div class="blank-content">
      <div v-for="(el, index) in inputAreaList" :key="el.id">
        <el-input class="mt20" v-model="el.content" v-if='!isEditor' @blur="blankFn">
          <i slot="prefix" class="inputNum">{{`${index+1}:`}}</i>
        </el-input>
        <!-- <Editor :isBlank='isEditor' :contentObj="el" v-else/> -->
        <vue-ueditor-wrap v-model="el.content" :config="editorConfig" v-else></vue-ueditor-wrap>
      </div>
  </div>
</template>
<script>
import getEditorConfig from '@/help/Editor/editorConfig'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'BlankFilling',
  props: ['question'],
  components: {
    VueUeditorWrap,
  },
  data () {
    return {
      editorConfig: {},
      isEditor: false,
      inputAreaList: []
    }
  },
  created () {
    if (this.isEditor) {
      // 编辑器设置
      this.editorConfig = getEditorConfig('BlankFilling')
    }
  },
  computed: {
    
  },
  watch: {
    // 如果 `inputAreaList` 发生改变，这个函数就会运行
    question: {
      handler: 'initialAnswer',
      immediate: true
    },
  },
  methods: {
    initialAnswer () {
      let answers = this.question.webData.answer ? this.question.webData.answer : [] // 此时为数组
      let tempInputList = JSON.parse(JSON.stringify(this.question.answerArea.inputAreaList)) 
      if (answers.length) {
        answers.forEach(answerItem => {
          tempInputList.forEach(item => {
            if (answerItem.id === item.id) {
              item.content = answerItem.content
            }
          })
        })
      }
      this.inputAreaList = tempInputList
    },
    blankFn () {
      let answerList = []
      let doneList = this.inputAreaList.filter(item => item.content)
      if (doneList.length) {
          doneList.forEach(item => {
              answerList.push({
                id: item.id,
                content: item.content
              })
          })
          this.question.webData.answer = answerList
          this.question.webData.isAnswer = true
      } else {
          this.question.webData.answer = answerList
          this.question.webData.isAnswer = false
      }

      // 处理复合题isAnswer
      if (this.question.webData.parQueId) {
          this.$eventBus.$emit('dealCompositeIsAnswer', this.question.webData.parQueId)
      }
    }
  },
  
}
</script>
<style scoped>
.el-input__prefix {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>