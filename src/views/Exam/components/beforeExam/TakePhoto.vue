<template>
    <div>
        <div class="testPhoto">
            <div class="cameraBox">
                <div class="camera"></div>
                <div class="testBtn mt15">
                    <i class="iconfont icon-camera mr5"></i>
                    <span>拍照检测</span>
                </div>
            </div>
            <div class="tipBox ml20">
                <div class="pic"></div>
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
export default {
    name: 'TakePhoto'
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
            background: skyblue;
        }
    }
}
</style>