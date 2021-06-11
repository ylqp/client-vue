<template>
    <div class="exit">
        <div class="exitBtn">
            <i class="iconfont icon-exit02 f14"></i>
            <span class="ml5" @click="goExamList">退出考试</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ExitExam',
    props: [{
        name: {
            type: String,
            default: '退出考试',
        }
    }],
    methods: {
        goExamList () {
            this.$client.goHome()
        },
    }
}
</script>
<style scoped>
.exitBtn {
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    border: 1px solid rgba(187, 197, 205, 1);
    color: #7784A1;
    cursor: pointer;
    width: 88px;
    height: 34px;
    line-height: 34px;
    text-align: center;
}
</style>