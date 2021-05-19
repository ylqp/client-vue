<template>
    <div class="testLive">
        <div class="liveBox">
            <div class="live">

            </div>
            <div class="liveBtn mt15">
                <i class="iconfont icon-camera mr5"></i>
                <span>开始检测</span>
            </div>
        </div>
        <div class="tipBox"></div>
    </div>
</template>
<script>
export default {
    name: 'TakeLive'
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
    }
    .tipBox {
        width: 500px;
        height: 480px;
        background: #EBF9FF;
    }
}

</style>