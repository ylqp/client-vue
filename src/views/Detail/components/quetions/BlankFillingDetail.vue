<template>
  <div class="blank-content">
      <div v-for="(el, index) in inputAreaList" :key="el.id" class="inputItem">
        <el-input class="mt20" v-model="el.content" v-if='!isEditor' @blur="blankFn">
          <i slot="prefix" class="inputNum">{{`${index+1}:`}}</i>
        </el-input>
      </div>
      <!-- 解析 -->
      <detail :question="question">
          <div>
              <div class="flexItem">
                  <div>【正确答案】</div>
                  <div class="ml20 flexItem">
                      <div v-for="(item, index) in question.answer.pairList" :key="item.id" class="mr10">
                        <i class="mr5">{{numbers[index]}}</i>
                        <span class="col_green" v-html="item.contentList.join(';')"></span>
                      </div>
                  </div>
              </div>
              <div class="flexItem mt10">
                  <div>【您的答案】</div>
                  <div class="ml20 flexItem">
                      <div v-for="(item, index) in question.answer.pairList" :key="item.id" class="mr10">
                        <i class="mr5">{{numbers[index]}}</i>
                        <span class="col_blue" v-html="question.answerContent.pairList[index] && question.answerContent.pairList[index].content ? question.answerContent.pairList[index].content : '未作答'"></span>
                      </div>
                  </div>
              </div>
          </div>
      </detail>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Detail from './Detail.vue'
export default {
  name: 'BlankFillingDetail',
  props: ['question'],
  components: {
    Detail,
  },
  data () {
    return {
      editorConfig: {},
      isEditor: false,
      inputAreaList: []
    }
  },
  computed: {
    ...mapState(['numbers'])
  },
  created () {
    // console.log(this.question)
  },
  methods: {
    
  },
  
}
</script>
<style scoped>
.el-input__prefix {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexItem {
  display: flex;
}
</style>