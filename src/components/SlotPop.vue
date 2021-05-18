<template>
    <div class="popBg" v-show="isShowPop">
        <div class="popBox">
            <div class="popTopLine col_grayZ">
                <span class="f14">{{tipTitle}}</span>
            </div>
            <div class="popCon">
                <img :src="iconImg" alt="" class="mb20" v-if="isNeedIcon">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
const iconList = {
    warning:  require('@/assets/images/pop-warning.png'),
    message: require('@/assets/images/pop-message.png'),
    wlan:  require('@/assets/images/pop-wlan-error.png'),
    camera: require('@/assets/images/pop-camera-error.png'),
}
export default {
    name: 'SlotPop',
    props: {
        tipTitle: {
            type: String,
            default: '提示'
        },
        iconType: {
            type: String,
            default: 'warning'
        },
        isShowPop: {
            type: Boolean,
            default: false
        },
        isNeedIcon: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {

        }
    },
    computed: {
        iconImg () {
            return iconList[this.iconType]
        }
    },
    created () {
        this.initExamNote()
    },
    methods: {
        initExamNote () {
            console.log(123)
        }
    }
}
</script>
<style lang="less" scoped>
.popBg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.popBox {
    position: relative;
    min-width: 480px;
    min-height: 360px;
    background: #FFF;
    overflow: hidden;
    box-shadow: 0px 10px 40px 0px rgb(39 46 64 / 80%);
    border-radius: 4px;
    z-index: 1001;
    font-size: 14px;
}
.popTopLine {
    height: 42px;
    line-height: 42px;
    padding: 0 20px;
    border-bottom: 1px solid #E7ECF1;
}
.popCon {
    max-height: 500px;
    overflow: auto;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.popFooter {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    .cancelBtn {
        padding: 8px 20px;
        background: #FFFFFF;
        border-radius: 3px;
        border: 1px solid #BBC5CD;
        cursor: pointer;
    }
    .okBtn {
        padding: 8px 20px;
        background: linear-gradient(45deg,rgba(0,103,255,1) 0%,rgba(38,146,255,1) 100%);
        border-radius: 3px;
        border: 1px solid rgba(231, 236, 241, 1);
        color: #fff;
        cursor: pointer;
    }
}
</style>