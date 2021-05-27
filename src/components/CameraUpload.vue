<template>
    <div class="f16">
        <div class="col_blue cp" @click="imgUpload">
            <i class="iconfont icon-camera"></i>
            <span>拍照上传</span>
        </div>
        <div class="col_red">
            提示：拍照上传功能仅限对纸面作答内容（公式、绘图、表格、编程）进行拍照，上传其他内容一律视为无效！
            <slot />
        </div>
        <!-- 图片上传 -->
        <img-upload v-if="isShowImgUpload" @close="closeImgUpload" @refreshContent="refreshContent"/>
    </div>
</template>
<script>
import ImgUpload from './ImgUpload.vue'
export default {
    components: { ImgUpload },
    name: 'CameraUpload',
    data () {
        return {
            isShowImgUpload: false,
        }
    },
    methods: {
        imgUpload () {
            this.isShowImgUpload = true
        },
        closeImgUpload () {
            this.isShowImgUpload = false
        },
        refreshContent (img) {
            this.$emit('getImgUrl', img)
        }
    }
}
</script>
<style scoped>
</style>