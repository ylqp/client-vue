<template>
    <div>
        <slot-pop :isShowPop="isShowPop" :isNeedIcon="false">
            <div class="mainCon">
                <div class="imgBox">
                    <img :src="imgSrc" alt="" width="250px" height="250px">
                </div>
                <p class="col_blue f14 fb tc mt10 lh30">
                    请用微信扫描上方二维码，将答案拍照上传，手机端提示上传成功后，点击下方的【上传成功】按钮，完成答案上传。
                </p>
                <div class="dealBtn mt10">
                    <button class="cancelBtn cp mr30" @click="exit">关闭</button>
                    <ots-button name="上传成功" @click.native="getImg"/>
                </div>
            </div>
        </slot-pop>
    </div>
</template>
<script>
import OtsButton from './Button/OtsButton.vue'
import SlotPop from './SlotPop.vue'
import { getUploadImgQR, getUploadImg} from '@/http/modules/imgUpload'
import { dealImgData } from '@/help/common.js'
export default {
    components: { SlotPop, OtsButton, },
    name: 'ImgUpload',
    data () {
        return {
            isShowPop: false,
            imgSrc: ''
        }
    },
    created () {
        this.initQR()
    },
    methods: {
        async initQR () {
            const  { data }  = await getUploadImgQR()
            this.imgSrc = dealImgData(data)
            this.isShowPop = true
        },
        async getImg () {
            const { data } = await getUploadImg()
            if (data) {
                // let imgEl = document.createElement('img')
                // imgEl.imgSrc = data
                const nbsp = this.somanynbsp(100)
                // let imgEl = `${nbsp}<p><img  src="${data}"></br></p>${nbsp}`
                let imgEl = `<img  src="${data}">`

                this.$emit('refreshContent', imgEl)
                this.exit()
            }
        },
        exit () {
            this.$emit('close')
        },
        somanynbsp (how) {
            var nbsps = '';
            for (var i = 0; i < how; i++) {
                nbsps = nbsps + '&nbsp;';

            }
            return nbsps;
        }
    }
}
</script>
<style lang="less" scoped>
.cancelBtn {
    border: 1px solid #dde1ee;
    color: #545f6a;
    background: #fff;
    box-shadow: 1px 1px 2px #dde1ee;
    padding: 8px 20px;
}
.mainCon {
    width: 480px;
}
.dealBtn {
    display: flex;
    justify-content: center;
}
.imgBox {
    display: flex;
    justify-content: center;
}
</style>