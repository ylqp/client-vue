<template>
  <div>
      <!-- 图片上传 -->
      <camera-upload @getImgUrl="getImgUrl">
      </camera-upload>
      <vue-ueditor-wrap v-model="content" :config="editorConfig"></vue-ueditor-wrap>
      
      <!-- <img-upload v-if="isShowImgUpload" @close="closeImgUpload" @refreshContent="refreshContent"/> -->
      
  </div>
</template>
<script>
import getEditorConfig from '@/help/Editor/editorConfig'
import VueUeditorWrap from 'vue-ueditor-wrap'
import CameraUpload from '@/components/CameraUpload.vue'
export default {
  name: 'EssayQuestion',
  props: ['question'],
  components: {
    VueUeditorWrap,
    CameraUpload
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
      getImgUrl (img) {
        this.refreshContent(img)
      },
      refreshContent (data) {
        // let imgEl = document.createElement('img')
        // imgEl.imgSrc = data
        const nbsp = this.somanynbsp(100)
        let imgEl = `${nbsp}<p><img style="max-width:300px"  src="${data}"></br></p>${nbsp}`
        this.content = this.content + imgEl
      },
      somanynbsp (how) {
          var nbsps = '';
          for (var i = 0; i < how; i++) {
              nbsps = nbsps + '&nbsp;';

          }
          return nbsps;
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