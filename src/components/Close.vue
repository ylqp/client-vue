<template>
  <div>
      <i @click="closeFn" class="iconfont icon-exit cp"></i>
  </div>
</template>
<script>
import { exitClient } from '@/http/modules/close'
export default {
    name: 'Close',
    data () {
        return {
            
        }
    },
    methods: {
        closeFn () {
            this.$otsPop({
                content: '确定要退出程序吗？',
                success: async () => {
                    await exitClient()
                }
            })
        }
    }
}
</script>
<style scoped>
</style>