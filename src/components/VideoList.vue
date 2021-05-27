<template>
    <div class="pr">
        <div class="currentCamera" @mouseover="dealShow(true)">
            <img src="@/assets/images/icon-camera.png">
            <span class="mr10 ml10">{{currentCamera}}</span>
            <i class="iconfont f13 mt2" :class="isShowCameraList ? 'icon-shang' : 'icon-xia'" v-if="videoList > 1"></i>
        </div>
        <div class="cameraList" v-show="isShowCameraList" @mouseleave="dealShow(false)">
            <div class="cameraItem" v-for="(item, index) in videoList" :key="item.Key" @click="selectVideo(index)">
                {{item.Value}}
            </div>
        </div>
    </div>
</template>
<script>
import { getVideoList, selectVideo, getCamera } from '@/http/modules/camera'
export default {
    name: 'VideoList',
    data () {
        return {
            isShowCameraList: false,
            currentCamera: '摄像头1',
            videoList: []
        }
    },
    created () {
        this.getVideo()
    },
    methods: {
        async getVideo () {
            const { data } = await getVideoList()
            console.log('video:', data)
            this.videoList = JSON.parse(data) 
        },
        dealShow (type) {

            let webShow = type
            // 多个摄像头才会显示列表
            this.isShowCameraList = webShow && this.videoList.length > 1

        },
        async selectVideo (index) {
            this.isShowCameraList = false
            this.currentCamera = this.videoList[index].Value
            const { data } = await selectVideo({selectIndex: index})
            console.log(index)
        }
    }
}
</script>
<style lang="less" scoped>
.currentCamera {
    display: flex;
    height: 24px;
    justify-content: center;
    align-items: center;
    margin-bottom: 3px;
}
.cameraList {
    color: #fff;
    border-radius: 3px;
    text-align: center;
    position: absolute;
    width: 100%;
    .cameraItem {
        height: 32px;
        line-height: 32px;
        background: rgba(39, 46, 64, 0.8);
        cursor: pointer;
    }
    .cameraItem:hover{
        background: rgba(25, 140, 255, 0.8);
    }
}

</style>