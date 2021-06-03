<template>
  <span :class="`${type}Btn`">
      {{name}}
  </span>
</template>
<script>
export default {
    name: 'OtsButton',
    props: {
        type: {
            type: String,
            default: 'ok'
        },
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
.cancelBtn {
    padding: 8px 20px;
    border-radius: 4px;
    border: 1px solid #dde1ee;
    color: #545f6a;
    background: #fff;
    box-shadow: 1px 1px 2px #dde1ee;
    cursor: pointer;
}
</style>