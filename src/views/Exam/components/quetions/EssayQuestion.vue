<template>
  <div>
      <div class="cameraImg f16 mb5">
        <div class="col_blue cp" @click="imgUpload">
          <i class="iconfont icon-camera"></i>
          <span>拍照上传</span>
        </div>
        <div class="col_red">
          提示：拍照上传功能仅限对纸面作答内容（公式、绘图、表格、编程）进行拍照，上传其他内容一律视为无效！
        </div>
      </div>
      <vue-ueditor-wrap v-model="content" :config="editorConfig"></vue-ueditor-wrap>
      <!-- 图片上传 -->
      <img-upload v-if="isShowImgUpload" @close="closeImgUpload" @refreshContent="refreshContent"/>
  </div>
</template>
<script>
import getEditorConfig from '@/help/Editor/editorConfig'
import VueUeditorWrap from 'vue-ueditor-wrap'
import ImgUpload from '../../../../components/ImgUpload.vue'
export default {
  name: 'EssayQuestion',
  props: ['question'],
  components: {
    VueUeditorWrap,
    ImgUpload
  },
  data () {
    return {
      isShowImgUpload: false,
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
      },
      imgUpload () {
          this.isShowImgUpload = true
      },
      closeImgUpload () {
        this.isShowImgUpload = false
      },
      refreshContent (data) {
        this.content = this.content + data
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
<style lang="less" scoped>
.cameraImg {

}
</style>