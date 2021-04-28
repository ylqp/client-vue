<template>
  <div>
      <TopLine name="支付中心" />
      <TabsLine :tabList="tabs" :initId="initId" @changeStatus="changeStatus" :isShowSearch="false" />
      <template v-if="currentId===1">
        <div class="mt20 list-main-only">
          <div class="tableLine">
              <div class="tline thead">
                  <div class="item w30 tl" title="考试名称">考试名称</div>
                  <div class="item w25" title="考试时间">考试时间</div>
                  <div class="item w15" title="考试次数">考试次数</div>
                  <div class="item w15" title="金额">金额</div>
                  <div class="item w15" title="操作">操作</div>
              </div>
              <div class="tline" v-for="(el) in payList" :key="el.id">
                  <div class="item w30 tl">
                    <el-checkbox v-model="el.checked" @change="changeSingle"></el-checkbox>
                    <span class="ml10">{{el.testactivityarrangementname}}</span>
                  </div>
                  <div class="item w25">{{el.starttime}} —— {{el.endtime}}</div>
                  <div class="item w15">
                    <span>{{el.alreadyexamcnt}}</span>/
                    <span class="fb">{{el.answertime}}</span>
                  </div>
                  <div class="item w15"><span class="col_red">{{`￥${el.fee}`}}</span></div>
                  <div class="item w15">
                    <div class="payBtn">
                      <span class="btnItem" @click="goPay(el.testactivityarrangementid)">支付</span>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <div class="payFooter">
            <div class="flex_start">
                <div class="cp">
                    <el-checkbox v-model="isAllCheck" @change="checkAll_c"></el-checkbox>
                    <span class="ml10">全选</span>
                </div>
                <div class="flex_start">
                    <span class="mr5 ml15">已选订单:</span>
                    <span class="col_red fb f14 mr3">{{totalPayNum}}</span>
                    <span>个</span>
                </div>
            </div>
            <div class="allPay flex_start">
                <span>合计</span>
                <span class="ml5 mr20 col_red f16 fb">{{'￥' + totalPayMoney}}</span>
                <button @click="MultiPay_c">合并支付</button>
            </div>
          </div>
      </template>
      <template v-else>
        <div class="mt20 list-main">
          <div class="tableLine">
              <div class="tline thead">
                  <div class="item w30 tl" title="考试名称">考试名称</div>
                  <div class="item w25" title="订单编号">订单编号</div>
                  <div class="item w15" title="付款方式">付款方式</div>
                  <div class="item w15" title="金额">金额</div>
                  <div class="item w15" title="付款时间">付款时间</div>
              </div>
              <div class="tline" v-for="(el) in payedList" :key="el.id">
                  <div class="item w30 tl">{{el.arrangementName}}</div>
                  <div class="item w25">{{el.payCenterOrderNo}}</div>
                  <div class="item w15">{{el.payType}}</div>
                  <div class="item w15"><span class="col_red">{{`￥${el.money}`}}</span></div>
                  <div class="item w15">{{el.createDate}}</div>
              </div>
          </div>
          <el-pagination v-show="total && total > 10"
            layout="prev, pager, next"
            :current-page.sync="payedParams.pageNo"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
        </div>
      </template>
      <!-- 支付弹窗 -->
      <Pay v-if="isShowPay" :ids="payIds" :callback="getPay" @closePay="closePay" />
  </div>
</template>
<script>
import TopLine from './components/TopLine'
import TabsLine from './components/TabsLine'
import Pay from './components/pay'
import { getPayList, getPayedList } from '@/http/modules/pay'
export default {
    name: 'PayList',
    components: {
      TopLine,
      TabsLine,
      Pay,
    },
    data () {
      return {
        tabs: [{id: 1, name: '待付费考试'}, {id: 2, name: '付费记录'}],
        initId: 1,
        currentId: 1,
        payList: [],
        payedList: [],
        total: 0,
        isAllCheck: false,
        isShowPay: false,
        payIds: '',
        payedParams: {
            userType:"1", //1 学生， 2 管理员
            pageSize:10,//一页显示几行 Integer
            pageNo:1 //第几页 Integer
        },
        imgSrc: '',
        // 调用支付接口返回信息
        payData: {}
      }
    },
    computed: {
      totalPayNum: function () {
        return this.payList.filter(item => item.checked).length
      },
      totalPayMoney: function () {
        // var fee = 0;
        // $.each(this.payList, function (index, el) {
        //     if(el.isCheck){
        //         fee = (fee*1000 + el.fee*1000)/1000
        //     }
        // });
        // return fee;
        let checkedList = this.payList.filter(item => item.checked)
        return checkedList.reduce((total, item) => {
          return (total * 1000 + item.fee * 1000) / 1000
        }, 0)
      }
    },
    created () {
      this.initHandler()
    },
    methods: {
      closeDialog () {
        this.$message('123')
      },
      initHandler () {
        this.getPay() 
      },
      async getPayed () {
        const { data } = await getPayedList(this.payedParams)
        
        this.payedList = data.payments
        this.total = data.total

      },
      async getPay () {
        this.isAllCheck = false
        const { data } = await getPayList()
        let list = data.arrangements
        // 
        list.map(item => {
            //item.checked = false
            this.$set(item, 'checked', false) // 这里，给对象添加属性，用$set方法。
            return item
        })
        this.payList = list
      },
      changeStatus (id) {
        this.currentId = id
        if (this.currentId === 1) {
          this.getPay()
        } else {
          this.getPayed()
        }
      },
      MultiPay_c () {
        let checkedList = this.payList.filter(item => item.checked)
        if (!checkedList.length) {
          this.$message('请勾选要支付的考试！')
          return
        }

        let ids = []
        checkedList.forEach(item => {
          ids.push(item.testactivityarrangementid)
        })
        console.log(ids)
        this.goPay(ids.join())
      },
      goPay (id) {
        if (this.isShowPay) {
          return
        }

        this.isShowPay = true
        this.payIds = id
      },
      closePay () {
        this.isShowPay = false
      },
      checkAll_c () {
        this.payList.forEach(element => {
          element.checked = this.isAllCheck
        })
      },
      changeSingle () {
        this.isAllCheck = this.totalPayNum === this.payList.length
      },
      handleCurrentChange (val) {
        this.payedParams.pageNo = val
        this.getPayed()
      },
      payCallback () {
        console.log('ok')
      }
    }
}
</script>
<style scoped>
.list-main-only { height: calc(100% - 170px); overflow: auto; }
.payFooter{
	width: 100%;
    height: 48px;
    background: #FFFFFF;
    box-shadow: 0px -6px 12px 0px rgb(0 0 0 / 12%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
}
.singlePay {

    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px #eaebec;
    border-radius: 3px;
    border: 1px solid #198CFF;
    padding: 5px 15px;
    color: #198cff;
    cursor: pointer;
}
.allPay button{
	width: 92px;
	height: 36px;
	background: linear-gradient(45deg, #0067FF 0%, #2692FF 100%);
	border-radius: 3px;
	color: #fff;
  
}
button {
	border: none;
  cursor: pointer;
}
.flex_start{
	display: flex;
	align-items: center;
}
.payBtn .btnItem {
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px #eaebec;
    border-radius: 3px;
    border: 1px solid #198CFF;
    padding: 5px 15px;
    color: #198cff;
    cursor: pointer;
}
</style>