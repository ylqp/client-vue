<template>
    <div style="height: 100%">
        <el-container style="height: 100%">
            <el-aside width="120px">
              <Nav />
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Nav from './Nav.vue'
export default {
  name: 'HomeLayout',
  components: {
      Nav
  }
}
</script>
<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
    background-color: rgba(250,251,252,1);
    color: #333;
  }
</style>
