<template>
    <div>
        <el-dialog
            title="提示"
            width="480px"
            top="22vh"
            :visible.sync="dialogVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :show-close="false"
        >
            <div>
                <div class="popCon">
                    <img :src="config.iconImg" alt="" class="mb20">
                    <span class="col_blue f20 fb" v-html="config.content"></span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="okFn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// this.$otsPop({
//     icon: 'message',
//     content: '哈哈哈哈哈哈',
//     cancel: () => {
//     console.log('csc')
//     },
//     success: () => {
//     console.log(123)
//     }
// })
const iconList = {
    warning:  require('@/assets/images/pop-warning.png'),
    message: require('@/assets/images/pop-message.png'),
    wlan:  require('@/assets/images/pop-wlan-error.png'),
    camera: require('@/assets/images/pop-camera-error.png'),
}
export default {
    name: 'OtsPopPro',
    data () {
        return {
            dialogVisible: true,
            config: {
                iconImg: iconList['warning'],
                content: '确定要退出程序？',
            },
            
        }
    },
    mounted () {
        // this.ok_callback = new Promise()
    },
    methods: {
        cancel () {

            this.reject()

            this.dialogVisible = false

        },
        popInit (obj) {
            this.config = Object.assign(this.config, obj);
            this.dialogVisible = true

            
            this.promise = new Promise((resolve, reject) => {
                this.reject = reject
                this.resolve = resolve
            })
            return this.promise
        },
        okFn () {

            this.resolve()

            this.dialogVisible = false

        }
    }
}
</script>
<style lang="less" scoped>
.popCon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>