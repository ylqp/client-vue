<template>
  <div>
      <!-- 支付弹窗 -->
      <el-dialog
        title="提示"
        width="480px"
        top="22vh"
        :visible.sync="dialogVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false"
        @close="closeDialog"
      >
        <div>
            <div class="payCon" v-show="!isPayed">
                <img :src="imgSrc" alt="" width="250px" height="250px">
                <div class="fb col_blue mt30 f15">{{`请使用 ${payData.paymentMethod} 扫码支付考试费 【${payData.fee}】 元`}}</div>
            </div>
            <div class="payCon" v-show="isPayed">
                <img src="@/assets/images/QRPaymentDone.png" alt="" width="140px" height="140px">
                <div class="fb col_blue mt30 f15">支付成功</div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <template v-if="!isPayed">
                <el-button size="small" @click="exitPay">关闭</el-button>
                <el-button size="small" type="primary" @click="payed_c">支付完成</el-button>
            </template>
            <template v-else>
                <el-button size="small" @click="dealSuccess">关闭</el-button>
                <!-- <el-button size="small" type="primary" @click="payed_c">支付完成</el-button> -->
            </template>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { dealPay, getRequestById } from '@/help/pay'
export default {
    name: 'Pay',
    props: ['ids', 'callback'],
    data () {
        return {
            isPayed: false,
            dialogVisible: false,
            imgSrc: '',
            payData: {
                
            },
            resultTimer: null
        }
    },
    created () {
        this.goPay(this.ids)
    },
    methods: {
        closeDialog () {
            this.$message('123')
        },
        async goPay (id) {
            const payData = await dealPay(id)
            this.payData = payData
            console.log(payData)
            this.imgSrc = 'data:image/png;base64,' + payData.QrImage
            this.dialogVisible = true
            this.payNo = payData.payCenterOrderNo

            // 开始结果轮询
            this.resultTimer = setInterval(async () => {
                const data = await getRequestById(this.payNo)
                if (data.succeeded) {
                    this.isPayed = true
                    console.log(this.resultTimer)
                    clearInterval(this.resultTimer)
                }
            }, 3000)
            
        },
        payed_c () {
            this.exitPay()
            this.callback && this.callback()
        },
        dealSuccess () {
            this.exitPay()
            this.callback && this.callback()
        },
        exitPay () {
            this.isPayed = false
            clearInterval(this.resultTimer)
            this.$emit('closePay')
        }
    },
    watch: {
        // ids
    }
}
</script>
<style scoped>
.payCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>