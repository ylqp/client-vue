<template>
  <div>
      <TopLine :name="examTypeInfo.activityTypeName" :isShowExit="isShowExit" />
      <TabsLine :tabList="tabs" :initId="initId" @changeStatus="changeStatus" />
      <div class="mt20 list-main">
        <div class="tableLine">
            <div class="tline thead">
                <div class="item w30" title="活动名称">活动名称</div>
                <div class="item w25" title="有效期">有效期</div>
                <div class="item w10" title="作答次数">作答次数</div>
                <div class="item w10" title="成绩">成绩</div>
                <div class="item w15" title="操作">操作</div>
            </div>
            <div class="tline" v-for="(el) in examList" :key="el.id">
                <div class="item w30 ">{{el.testactivityarrangementname}}</div>
                <div class="item w25">{{el.starttime}} —— {{el.endtime}}</div>
                <div class="item w10">
                  <span class="col_red">{{el.alreandycnt}}</span>/
                  <span class="col_black">{{el.answertime}}</span>
                </div>
                <div class="item w10">--</div><!--目前中农不想要-->
                <div class="item w15">
                  <div class="dealBtn">
                    <div class="btnItem ksks" @click="startExam(el)"></div>
                    <div class="btnItem ml30 cxcj" :class="el.isCanDetail ? '' : 'gray'"></div>
                  </div>
                </div>
            </div>
        </div>
        <el-pagination v-show="total && total > 10"
          layout="prev, pager, next"
          :current-page.sync="examListParams.pageNo"
          :total="total">
        </el-pagination>
      </div>
  </div>
</template>
<script>
import { getExamListByTypeIdAndCoursecode, ifStartExam } from '@/http/modules/common'
import { mapState } from 'vuex'
import TopLine from './components/TopLine'
import TabsLine from './components/TabsLine'
import { getStateRouter } from '@/help/HomeGoExam'
export default {
  name: 'ExamList',
  components: {
    TopLine,
    TabsLine
  },
  data () {
    return {
      topLineName: '',
      tabs: [{id: 3, name: '进行中'}, {id: 2, name: '未开始'}, {id: 4, name: '已结束'}],
      initId: 3,
      examTypeInfo: {},
      isShowExit: true,
      examListParams: {
        userId: '', // 用户id
        coursecode: "", // 学生课程code
        categoryId: "", // 题目分类id
        activitytypeid: "", //活动类型ID
        status: 3, // 进行中，未开始，已结束2||3||4
        fulltext: "", //全文检索
        pageNo: 1, // 分页 --- 页码
        pageSize: 10 // 分页 --- 每页最大数
      },
      examList: [],
      total: 0,
    }
  },
  computed: {
    ...mapState('examType', ['examTypeList']),
    ...mapState('user', ['userFPSettings']),
  },
  created () {
    this.initHandler()
  },
  methods: {
    initHandler () {

      if (!this.$route.params.id) {
        this.$router.push({
          name: 'examList',
          params: {
            id: this.examTypeList[0].id
          }
        })
      }

      let examTypeId = this.$route.params.id

      this.examTypeList.forEach(item => {
        if (item.id === examTypeId) {
          this.examTypeInfo = item
          this.examListParams.activitytypeid = item.id
        }
      });
      //
      this.examListParams.userId = this.userFPSettings.userId
      // 获取考试列表
      this.getExamList()
    },
    async getExamList () {

      const { data } = await getExamListByTypeIdAndCoursecode(this.examListParams)

      let oData = JSON.parse(data)
      // console.log(oData)
      // 处理考试列表
      let examList = oData.ActivityArrangements

      examList.map((item) => {
          if (JSON.parse(this.examTypeInfo.viewDetailsOnPage)) {
            // 过滤进行中 即没有提交时间
            item.details = item.details.filter((detailsItem, idx) => {
                return detailsItem.submittime
            })
            if (item.details.length) {
              item.isCanDetail = true
            } else {
              item.isCanDetail = false
            }
          } else {
            item.isCanDetail = false
          }
          return item
      })

      this.examList= examList
      this.total = oData.total
      console.log(examList)
    },
    async startExam (examObj) {

      // 判断可否考试
      let params = {
        isFaceTest: this.examTypeInfo.takePhotoInTest,
        arrangementId: examObj.testactivityarrangementid
      }
      const { data } = await ifStartExam(params)
      console.log(data)
      if (data.state === 0) {

        let routePath = getStateRouter(data.goWhere);
        this.$router.push({
            name: 'checkExam',
            params: {
              isFace: this.examTypeInfo.takePhotoInTest,
              eid: examObj.testactivityarrangementid
            }
        })
        if (!routePath) {
          this.$alert(data.message, '提示', {
            type: 'warning',
            callback: action => {
            }
          });
        } else {
          this.$router.push({
            name: 'checkExam',
            params: {
              isFace: this.examTypeInfo.takePhotoInTest,
              eid: examObj.testactivityarrangementid
            }
          })
        }

      } else if (data.state === 1) { // 不用跳转 只提示
        this.$alert(data.message, '提示', {
          type: 'warning',
          callback: action => {
          }
        });
      } else if (data.state === 2) {

      }

      console.log()
    },
    changeStatus (status) {
      this.examListParams.status = status
    },
    changePage () {
      console.log('page')
    }
  },
  watch: {
    '$route.path': function () {
      this.initHandler()
    },
    examListParams:  {
      handler (newContent, oldContent) {
        //
        console.log(newContent)
        this.getExamList()
      },
      // 对象需要深度监听
      deep: true
    },
  }
}
</script>
<style lang="less" scoped>
  .dealBtn {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .btnItem {
      width: 36px;
      height: 36px;
      cursor: pointer;
    }
    .btnItem.ksks{
      background: url('../../assets/images/ksks.png');
    }
    .btnItem.ksks.gray{
      background: url('../../assets/images/ksks_gray.png');
    }
    .btnItem.cxcj{
      background: url('../../assets/images/cxcj.png');
    }
    .btnItem.cxcj.gray{
      background: url('../../assets/images/cxcj_gray.png');
    }
  }
  .list-main {
    height: calc(100% - 120px);
    overflow: auto;
  }
</style>
