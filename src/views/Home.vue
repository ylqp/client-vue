<template>
  <div class="home">
    <el-button>er</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import OTS from '/OTSClientJSBase.js'
import { getTenate } from '@/http/modules/common'
export default {
  name: 'Home',
  async mounted () {
    
    const { data } = await getTenate()
  }
}
</script>
