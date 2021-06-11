<template>
  <div class="message">
     <template v-if="!isMsgDetail">
       <TopLine name="消息中心" />
       <TabsLine :tabList="tabs" :initId="initId" @changeStatus="changeStatus" :isShowSearch="false" />
       <div class="mt20 list-main">
        <div class="tableLine">
            <div class="tline thead">
                <div class="item w70 tl" title="活动名称">消息内容</div>
                <div class="item w30" title="有效期">发送时间</div>
            </div>
            <div class="tline cp" v-for="(el) in msgList" :key="el.id" @click="goDetail(el)">
                <div class="item w70 tl">{{el.messageBody}}</div>
                <div class="item w30">{{el.messageTime}}</div>
            </div>
        </div>
        <el-pagination v-show="total && total > 10"
          layout="prev, pager, next"
          :current-page.sync="msgListParams.cutPageData.pageNo"
          :total="total">
        </el-pagination>
       </div>
     </template>
     <template v-else>
       <TopLine :name="detailTabName" />
       <div class="messageDetail">
          <div class="curMsg">
              <div class="f13 col_grayQ">推送时间：{{currentMsgItem.messageTime}}</div>
              <div class="mt30 f16 col_grayZ">{{currentMsgItem.messageBody}}</div>
          </div>
          <div class="msgBottom col_grayZ">
              <!-- <div class="lastMsg cp" :visible="lastMsg_vm.length>0" :click="getMsg_c('last')">上一条</div>
              <div class="lastMsg cp" :visible="lastMsg_vm.length<1">已是最新消息</div>
              <div class="nextMsg cp" :visible="nextMsg_vm.length>0" :click="getMsg_c('next')">下一条</div>
              <div class="nextMsg cp" :visible="nextMsg_vm.length<1">已是最后一条</div> -->
              <div class="cp" @click="goMsg('last')">上一条</div>
              <div class="cp" @click="goMsg('next')">下一条</div>
          </div>
       </div>
       <button class="goBack" @click="isMsgDetail = false">返回</button>
     </template>
  </div>
</template>
<script>
import TopLine from './components/TopLine'
import TabsLine from './components/TabsLine'
import { getMsgList, readMsg } from '@/http/modules/msg'
export default {
    name: 'MsgList',
    components: {
      TopLine,
      TabsLine
    },
    data () {
      return {
        tabs: [{id: 1, name: '系统消息', type: 'SystemMess'}, { id: 2, name: '活动消息', type: 'Group'}, { id: 3, name: '个人消息', type: 'UserMess'}],
        isMsgDetail: false,
        initId: 1,
        msgList: [{messageBody: '待缴费倒计时放几道算法几道算法角度看附件', messageTime: '2019-12-09'},{messageBody: '22222', messageTime: '2019-12-09'},{messageBody: '3333', messageTime: '2019-12-09'},],
        total: 2,
        currentMsgItem: {},
        msgListParams: {
            messageType: 'SystemMess',//messageType ：SystemMess-系统  Group-活动  UserMess-用户
            cutPageData: {
              pageNo: 1,
              pageSize: 10
            },
            onlyUnread: false
        }
      }
    },
    computed: {
      detailTabName () {
        return this.tabs.filter(item => item.id === this.initId)[0].name
      }
    },
    created () {
      this.getMsgs()
    },
    methods: {
      async getMsgs () {
        console.log(JSON.stringify(this.msgListParams))
        const  { data }  = await getMsgList(this.msgListParams)
        let msgData = JSON.parse(data)
        console.log(msgData)
        this.msgList = msgData.messageList
        
        if (!this.msgList.length) {
          this.$message('暂无消息')
        }
      },
      changeStatus (id) {
        this.initId = id
        let currentItem = this.tabs.filter(item => item.id === id)[0]
        this.msgListParams.messageType = currentItem.type
        this.getMsgs()
      },
      goDetail (el) {
        this.isMsgDetail = true
        this.currentMsgItem = el
      },
      goMsg (type) {

        let currentIndex 
        this.msgList.forEach((item, index) => {
          if (item === this.currentMsgItem) {
            currentIndex = index
          }
        })
        if (type === 'last') {
          if (this.msgList[currentIndex - 1]) {
            this.currentMsgItem = this.msgList[currentIndex - 1]
          } else {
            this.$message('已经是第一条啦~')
          }
        }
        if (type === 'next') {
          if (this.msgList[currentIndex + 1]) {
            this.currentMsgItem = this.msgList[currentIndex + 1]
          } else {
            this.$message('已经是最后一条啦~')
          }
        }
      },
      dealReadMsg (id) {
          readMsg({messageId: id})
      }
    },
    watch: {
      currentMsgItem: {
        handler: (newVal, oldVal) => {
          readMsg({messageId: newVal.messageId})
        },
        deep: true
      }
    }
}
</script>
<style lang="less" scoped>
.message {
  position: relative;
  .goBack {
    position: absolute;
    top: 0px;
    right: 40px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    color: #9CA5AD;
    cursor: pointer;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px #eaebec;
    border-radius: 3px;
    border: 1px solid #BBC5CD;
    cursor: pointer;
  }
}
.messageDetail {
    height: 80%;
    width: 100%;
    background-color: #FFF;
    box-shadow: 0px 2px 6px 0px #eaebec;
    border-radius: 2px;
    margin: auto;
    position: relative;
    top: 40px;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .msgBottom {
      display: flex;
      justify-content: space-between;
    }
}
</style>