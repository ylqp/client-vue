<template>
    <div>
        <div class="testPhoto">
            <div class="cameraBox">
                <!-- <div class="camera" id="cameraArea"></div> -->
                <camera-box  class="camera" :IsLiveCheck="IsLiveCheck" :IsFaceDetect="false" />
                <div class="testBtn mt15" @click="takePhotoCheck">
                    <i class="iconfont icon-camera mr5"></i>
                    <span>拍照检测</span>
                </div>
            </div>
            <div class="tipBox ml20">
                <div class="pic"><img :src="baseUrl" alt=""></div>
                <div class="mt30 f14 lh22 fb col_grayZ">
                    <p class="mt5">1.请确保左边窗口中能清晰的看到您本人的视频头像。</p>
                    <p class="mt5">2.请保持光源充足，不要逆光操作。 </p>
                    <p class="mt5">3.请正脸面对摄像头并确保整个脸部进入识别窗口。 </p>
                    <p class="mt5">4.系统识别后自动开始考试。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CameraBox from '@/components/CameraBox.vue'
import { takePhoto, hideCamera } from '@/http/modules/camera'
export default {
    name: 'TakePhoto',
    components: { CameraBox },
    data () {
        return {
            // 开始拍照配置
            config: {},
            baseUrl: '',
            IsLiveCheck: false,
            takePhotoParams: {},
            paperData: {}
        }
    },
    created () {
        this.initialFn()
    },
    methods: {
        initialFn () {
            const paperData = JSON.parse(window.localStorage.getItem('paperData'))
            this.paperData = paperData

            this.baseUrl = paperData.userFaceImageUrl

            this.takePhotoParams = {
                //考试id
                arrangementId: paperData.arrangementId,
                //试卷id
                answerPaperId: paperData.answerPaperRecordId,
                //1-开始 2-结束 3-进行中
                type: 1,
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
                if (data.photoBeginAboveThreeTimes && this.paperData.canNotEnterOverTimes == 1) {
                    // 超过拍照次数  且 不通过不让考试
                    nextObj.content = '<div>您的人脸识别验证未通过 </div><div>不能进入考试！</div>'
                    nextObj.isNeedCancel = false
                    nextObj.okCallBack = () => {
                        // 跳出检测
                        this.goExamList()
                    }
                } else if (data.photoBeginAboveThreeTimes) {
                    nextObj.content = '<div class="tc">您的人脸识别验证未通过 </div><div class="tc">将在人工审核之后确定本次考试成绩是否有效！</div>'
                    nextObj.cancelName = '尝试再次验证'
                    nextObj.okName = '确定是我本人'
                    nextObj.okCallBack = () => {
                        // 跳转考试页
                        this.$emit('goNext', true)// 表示学生本人确认
                        this.$camera.openPure()
                    }
                } else if (data.photoBeginTest) {
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