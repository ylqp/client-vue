<template>
  <span class="okBtn">
      {{name}}
  </span>
</template>
<script>
export default {
    name: 'OtsButton',
    props: {
        name: {
            type: String,
            default: '确定'
        }
    }
}
</script>
<style scoped>
.okBtn {
    padding: 8px 20px;
    background: linear-gradient(45deg,rgba(0,103,255,1) 0%,rgba(38,146,255,1) 100%);
    border-radius: 4px;
    border: 1px solid rgba(231, 236, 241, 1);
    color: #fff;
    cursor: pointer;
}
</style>