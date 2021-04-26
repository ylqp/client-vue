<template>
  <div id="app">
    <router-view />
  </div>
</template>

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
  
</style>
