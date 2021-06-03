<template>
    <div class="testLive">
        <div class="liveBox">
            <!-- <div class="live" id="cameraArea"></div> -->
            <camera-box class="live" :IsLiveCheck="true" :IsFaceDetect="false"/>
            <div class="liveBtn mt15" :class="isFreezeSumbit ? 'freeze' : ''" @click="startCheck">
                <i class="iconfont icon-camera mr5"></i>
                <span>开始检测</span>
            </div>
        </div>
        <div class="tipBox p20">
            <div class="f30 fb col_black">请确保本人操作，将正脸面向屏幕</div>
            <div class="mt20 f14 col_grayZ">点击【开始检测】，倒计时3秒后请根据文字提示做相关动作完成校验。</div>
            <div class="tips">{{tips}}</div>
        </div>
    </div>
</template>
<script>
import CameraBox from '../../../../components/CameraBox.vue'
import { getLiveInfo, startRec, stopRec, faceLive } from '@/http/modules/common'
import { takePhoto, hideCamera } from '@/http/modules/camera'

export default {
    name: 'TakeLive',
    components: { CameraBox },
    data () {
        return {
            isFreezeSumbit: false,
            tips: '请准备...',
            tipTimer: null,
            param: {}
        }
    },
    created () {
        this.initialFn()
    },
    methods: {
        async initialFn () {
            const paperData = JSON.parse(window.localStorage.getItem('paperData'))
            //人脸识别参数
            this.param = {
                arrangementId: paperData.arrangementId,//考试id
                answerPaperId: paperData.answerPaperRecordId,//试卷id
                type: 2,//1-开始 2-结束 3-进行中
                basePhoto: paperData.userFaceImageUrl,
                corpuscleCode: ""
            }
            const { data } = await getLiveInfo(this.param)
            this.param.corpuscleCode = JSON.parse(data).corpuscleCode
            console.log(this.param)
        },
        startCheck () {
            if (this.isFreezeSumbit) {
                return
            }
            // 置灰检测按钮
            this.isFreezeSumbit = true
            let corpuscleCode = this.param.corpuscleCode.split(",")
            let readyNum = 10;
            let readyNum3 = 3;
            let showTime = () => {

                if (readyNum >= 8) {
                    this.tips = readyNum3
                    readyNum3--
                } else if (readyNum == 7) {

                    // 开始录像
                    startRec()
                }
                else if (readyNum >= 4 && readyNum <= 7) {
                    this.tips = corpuscleCode[0] == 1 ? "请张张嘴" : "请眨眨眼"
                }
                else if (readyNum >= 1 && readyNum <= 3) {
                    this.tips = corpuscleCode[1] == 1 ? "请张张嘴" : "请眨眨眼"
                   
                } if (readyNum == 0) {
                    clearInterval(this.tipTimer)
                    this.tips = '检测中...'

                    // 结束录制
                    this.dealVideo()
                }
                readyNum--
            }
            
            if (this.tipTimer !== null ) {
                 clearInterval(this.tipTimer)
                 this.tipTimer = null
            }
            this.tipTimer = setInterval(showTime, 1000)
        },
        dealVideo () {
            stopRec(this.param)
                .then(async ({ data }) => {
                    await hideCamera()
                    console.log(data)
                    // 处理视频结果即进行对比
                    return faceLive(JSON.parse(data))
                }).then(({ data }) => {
                    // 对比视频的结果
                    console.log(JSON.parse(data))
                    data = JSON.parse(data)
                    let nextObj = {}

                    if (data.photoEndTest) {
                        nextObj.content = '请重新检测。'
                        nextObj.isNeedCancel = false
                        nextObj.okCallBack = () => {
                            this.resetLive()
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
                            this.resetLive()
                        })
                    } else {
                        this.$emit('goNext')
                    }
                }).catch(() => {
                    // 重新拍照
                    this.$otsPopPro({
                        content: '请重新检测。',
                        isNeedCancel: false,
                    }).then(() => {
                        this.resetLive()
                    }).catch(() => {
                        this.resetLive()
                    })
                })
        },
        resetLive () {
            // 恢复检测按钮
            this.isFreezeSumbit = false
            this.tips = '请准备...'
            this.$camera.openPure()
        }
    },
    beforeDestroy () {
        clearInterval(this.tipTimer)
    }
}
</script>
<style lang="less" scoped>
.testLive {
    display: flex;
    .liveBox {
        width: 640px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .live {
            width: 640px;
            height: 480px;
            background: #272E40;
            background-image: url('../../../../assets/images/liveCheckViewer.png');
            background-repeat: no-repeat;
            background-size: 500px;
            background-position: center;
        }
        .liveBtn {
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
        .liveBtn.freeze {
            background: #9CA5AD;
        }
    }
    .tipBox {
        width: 500px;
        height: 480px;
        background: #EBF9FF;
        .tips {
            font-size: 64px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #198CFF;
            line-height: 64px;
            margin-top: 105px;
            text-align: center;
        }
    }
}
</style>