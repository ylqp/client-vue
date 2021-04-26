<template>
  <div>
      <vue-ueditor-wrap v-model="content" :config="editorConfig"></vue-ueditor-wrap>
  </div>
</template>
<script>
import getEditorConfig from '@/help/Editor/editorConfig'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'EssayQuestion',
  props: ['question'],
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      content: '',
      editorConfig: {}
    }
  },
  created () {
    this.editorConfig = getEditorConfig('EssayQuestion')
  },
  methods: {
    initialEditor () {
      this.content = this.question.webData.answer
    }
  },
  watch: {
    question: {
      handler: 'initialEditor',
      immediate: true
    },
    content: {
      handler (newContent, oldContent) {
        this.question.webData.answer = newContent
        if (newContent) {
          this.question.webData.isAnswer = true
        } else {
          this.question.webData.isAnswer = false
        }

        // 处理复合题isAnswer
        if (this.question.webData.parQueId) {
            this.$eventBus.$emit('dealCompositeIsAnswer', this.question.webData.parQueId)
        }
      }
    }
  }
}
</script>
<style scoped>
</style>