<template>
  <div>
        <div class="answerDetail mt10">
            <div class="detailItem"> 
                <div class="mr20 w70px">【解&nbsp;析】</div>
                <p v-html="jiexi"></p>
            </div>
            <div class="mt10 detailItem">
                <div class="mr20 w70px">【知&nbsp;识&nbsp;点】</div>
                <p v-html="zsd"></p>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  name: 'AnswerDetail',
  props: ['jiexi', 'zsd'],
}
</script>
<style lang="less" scoped>
.answerDetail {
    .detailItem {
        display: flex;
    }
    .detailItem div{
        flex-shrink: 0;
    }
}
</style>