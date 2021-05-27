<template>
  <div id="app">
    <router-view />
    <Shurufa class="shurufa"/>
  </div>
</template>
<script>
import Shurufa from './components/Shurufa.vue'
export default {
    name: 'app',
    components: {
      Shurufa
    },
    methods: {
      
    }
}
</script>
<style>
  body,html,#app {
    height: 100%;
  }
  .el-pagination {
    text-align: center;
  }
  .el-scrollbar .el-scrollbar__wrap{
      overflow-x: hidden !important;
      /* overflow: scroll;
      width: 110%;
      height: 120%; */
  }
  .el-input__prefix {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .shurufa {
    position: fixed;
    bottom: 2px;
    right: 20px;
  }
  table {
    margin: auto;
  }
  table td, table th{
    text-align: center !important;
  }
  [v-cloak] {
    opacity: 0;
  }
</style>
