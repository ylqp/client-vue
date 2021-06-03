<template>
  <div>
      <div id="cameraArea"></div>
  </div>
</template>
<script>
export default {
    name: 'CameraBox',
    props: {
        IsLiveCheck: {
            type: Boolean,
            default: false
        },
        IsFaceDetect: {
            type: Boolean,
            default: true
        }
    },
    mounted () {
        let cameraConfig = {
            // 人像框
            IsLiveCheck: this.IsLiveCheck,
            // 人脸追踪
            IsFaceDetect: this.IsFaceDetect
        }
        this.$camera.open(cameraConfig)
    },
    beforeDestroy () {
        this.$camera.close()
    }
}
</script>
<style scoped>
#cameraArea {
    width: 100%;
    height: 100%;
}
</style>