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
    console.log(123)
    // window.OTS.Sent_Post('GetSchoolLogo', null, null, function (data) {
    //   console.log(JSON.parse(data))
    // }, null)
    const { data } = await getTenate()
    console.log(data)
  }
}
</script>
