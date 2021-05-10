<template>
  <div>
      <i @click="closeFn" class="iconfont icon-exit cp"></i>
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
            <div class="closeCon">
                <img src="@/assets/images/pop-warning.png" alt="" class="mb20">
                <span class="col_blue f20 fb">确定要退出程序？</span>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="exitFn">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { exitClient } from '@/http/modules/close'
export default {
    name: 'Close',
    data () {
        return {
            dialogVisible: false
        }
    },
    methods: {
        closeFn () {
            this.dialogVisible = true
        },
        async exitFn () {
            // await exitClient()
            this.$message('要关闭了')
            this.dialogVisible = false
        }
    }
}
</script>
<style scoped>
.closeCon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>