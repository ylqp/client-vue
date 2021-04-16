<template>
    <div>
        <el-container>
            <el-aside width="200px"><Nav /></el-aside>
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
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>