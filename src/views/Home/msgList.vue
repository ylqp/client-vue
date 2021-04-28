<template>
  <div>
     <TopLine name="消息中心" />
     <TabsLine :tabList="tabs" :initId="initId" @changeStatus="changeStatus" :isShowSearch="false" />
     <template v-if="!isMsgDetail">
       <div class="mt20 list-main">
        <div class="tableLine">
            <div class="tline thead">
                <div class="item w70" title="活动名称">活动名称</div>
                <div class="item w30" title="有效期">有效期</div>
            </div>
            <div class="tline" v-for="(el) in msgList" :key="el.id">
                <div class="item w70 ">{{el.testactivityarrangementname}}</div>
                <div class="item w30">{{el.starttime}} —— {{el.endtime}}</div>
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
       <div>456</div>
     </template>
  </div>
</template>
<script>
import TopLine from './components/TopLine'
import TabsLine from './components/TabsLine'
import { getMsgList } from '@/http/modules/msg'
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
        msgList: [],
        total: 2,
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
    created () {
      this.getMsgs()
    },
    methods: {
      async getMsgs () {
        console.log(JSON.stringify(this.msgListParams) )
        const  { data }  = await getMsgList(this.msgListParams)
        let msgData = JSON.parse(data)
        console.log(msgData)
        this.msgList = msgData.messageList

      },
      changeStatus (id) {
        let currentItem = this.tabs.filter(item => item.id === id)[0]
        this.msgListParams.messageType = currentItem.type
        this.getMsgs()
      }
    }
}
</script>
<style scoped>
</style>