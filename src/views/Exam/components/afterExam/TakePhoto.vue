<template>
    <div>
        <div class="testPhoto">
            <div class="cameraBox">
                <!-- <div class="camera" id="cameraArea"></div> -->
                <camera-box  class="camera" :IsLiveCheck="IsLiveCheck" :IsFaceDetect="false" />
                <div class="testBtn mt15" @click="takePhotoCheck">
                    <i class="iconfont icon-camera mr5"></i>
                    <span>拍照提交</span>
                </div>
            </div>
            <div class="tipBox ml20">
                <div class="pic"><img :src="baseUrl" alt=""></div>
                <div class="mt30 f14 lh22 fb col_grayZ">
                    <p class="mt5">1.请确保左边窗口中能清晰的看到您本人的视频头像。</p>
                    <p class="mt5">2.请保持光源充足，不要逆光操作。 </p>
                    <p class="mt5">3.请正脸面对摄像头并确保整个脸部进入识别窗口。 </p>
                    <p class="mt5">4.系统识别后自动提交试卷。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CameraBox from '@/components/CameraBox.vue'
import { takePhoto, hideCamera } from '@/http/modules/camera'
import { resetAnswerPaperStartTime } from '@/http/modules/common'

export default {
    name: 'TakePhoto',
    components: { CameraBox },
    data () {
        return {
            // 开始拍照配置
            config: {},
            baseUrl: '',
            IsLiveCheck: false,
            takePhotoParams: {}
        }
    },
    created () {
        this.initialFn()
    },
    methods: {
        initialFn () {
            const paperData = JSON.parse(window.localStorage.getItem('paperData'))
            this.baseUrl = paperData.userFaceImageUrl

            this.takePhotoParams = {
                //考试id
                arrangementId: paperData.arrangementId,
                //试卷id
                answerPaperId: paperData.answerPaperRecordId,
                //1-开始 2-结束 3-进行中
                type: 2,
                basePhoto: paperData.userFaceImageUrl
            }
        },
        takePhotoCheck () {
            console.log(this.takePhotoParams)
            hideCamera().then(async () => {
                let { data } = await takePhoto(this.takePhotoParams)
                data = JSON.parse(data)
                console.log(data)
                
                let nextObj = {}
                if (data.photoEndTest) {
                    nextObj.content = '请重新拍照上传。'
                    nextObj.isNeedCancel = false
                    nextObj.okCallBack = () => {
                        this.$camera.openPure()
                    }
                } else {
                    nextObj = null
                }
                
                if (nextObj !== null) {
                    // 重新拍照
                    
                    this.$otsPopPro({
                        ...nextObj
                    }).then(() => {
                        nextObj.okCallBack && nextObj.okCallBack()
                    }).catch(() => {
                        this.$camera.openPure()
                    })
                } else {
                    this.$emit('goNext')
                }
            }).catch(() => {
                // 重新拍照
                this.$otsPopPro({
                    content: '请重新拍照上传。',
                    isNeedCancel: false,
                }).then(() => {
                    this.$camera.openPure()
                }).catch(() => {
                    this.$camera.openPure()
                })
            })
        },
    },
    beforeDestroy () {
        this.$camera.close()
    }
}   
</script>
<style lang="less" scoped>
.testPhoto {
    display: flex;
    .cameraBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        .camera {
            width: 640px;
            height: 480px;
            background: #808080;
        }
        .testBtn {
            width: 110px;
            height: 34px;
            background: #1DDA97;
            color: #fff;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }
    .tipBox {
        width: 340px;
        .pic {
            height: 280px;
            // background: skyblue;
            // text-align: center;
            img {
                height: 100%;
            }
        }
    }
}
</style>