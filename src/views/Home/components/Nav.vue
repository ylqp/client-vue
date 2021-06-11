<template>
  <div class="nav-container">
    <div class="ots-logo-container">
      <span class="f24 fb">OTS</span>
      <span class="f12 ml3">2.0</span>
    </div>
    <div class="userinfo-container">
      <div class="avatar">
        <img src="@/assets/images/user.png">
      </div>
      <div class="username f15">{{userInfo.realName}}</div>
      <div class="user-state f12">
        <span class="state"></span>
        <span>在线</span>
      </div>
      <div class="userinfoBox">
        <div class="userImg">
          <img :src="userInfo.userFaceImageUrl" alt="">
        </div>
        <div class="userCon">
          <div>
            <div class="col_grayQ f12">
              <i class="iconfont icon-user f12"></i>
              <span class="ml5">姓名</span>
            </div>
            <p class="col_black f14 mt10">{{userInfo.realName}}</p>
          </div>
          <div class="mt20">
            <div class="col_grayQ f12">
              <i class="iconfont icon-cred f12"></i>
              <span class="ml5">身份证</span>
            </div>
            <p class="col_black f14 mt10">{{userInfo.certificateCode ? userInfo.certificateCode : '未填写'}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-container">
      <ul>
        <li v-if="isOpenMessage">
          <div class="tabItem"
               :class="this.$route.name === 'msgList' ? 'on' : ''"
               @click="$router.push({
                 name: 'msgList'
               })"
          >
            <i class="iconfont icon-msg"></i>
            <p>消息中心</p>
            <div class="msgCount" v-show="msgCount"></div>
          </div>
        </li>
        <li v-if="isOpenPay">
          <div class="tabItem"
               :class="this.$route.name === 'payList' ? 'on' : ''" 
               @click="$router.push({
                 name: 'payList'
               })"
          >
            <i class="iconfont icon-pay"></i>
            <p>支付中心</p>
          </div>
        </li>
        <!-- 考试类型 -->
        <li v-for="(item, index) in examTypes" :key="item.id">
          <div  class="tabItem"
                :class="that.$route.name === 'examList' && that.$route.params.id === item.id ? 'on' : ''"
                @click="getExamList(item)"
          >
            <i class="iconfont" :class="index % 2 === 0 ? 'icon-zuoye' : 'icon-kaoshi' "></i>
            <p>{{item.activityTypeName}}</p>
          </div>
        </li>
      </ul>
      <div class="logout" @click="goLogin">
        <span>注销</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserSimpleInfo, getExamType, getNav } from '@/http/modules/common'
import { navMsg, countMsg } from '@/http/modules/msg'
export default {
    name: 'Nav',
    data () {
        return {
            userInfo: {},
            examTypes: [],
            that: {},
            isOpenMessage: false,
            isOpenPay: false,
            msgTimer: null,
            msgCount: false
        }
    },
    computed: {
        ...mapState('user', ['userFPSettings']),
    },
    methods: {
      async getInfo () {
        const { data } = await getUserSimpleInfo()
        if (JSON.parse(data)) {
          this.userInfo = JSON.parse(data)
        }
      },
      async getExamInfo (userId) {
        let param = { userId }
        const { data } = await getExamType(param)
        let examInfo = JSON.parse(data)
        this.examTypes = examInfo.ActivityTypes
      },
      // 获取支付和消息中心是否开启
      async getNavFlag () {
        const { data } = await getNav()
        let navInfo = JSON.parse(data)
        // console.log(navInfo)
        this.isOpenMessage = navInfo.isOpenMessage
        this.isOpenPay = navInfo.isOpenPay
        
        // 处理消息轮询
        if (this.isOpenMessage) {
            // 先执行一次
            this.dealMsgCount()
            this.msgTimer = setInterval(this.dealMsgCount, 300000)//5分钟轮询一次
        }
      },
      async dealMsgCount () {
          const { data } = await countMsg()
          if (parseInt(data) > 0) {
            this.msgCount = true
          }
      },
      goLogin () {
        this.$otsPop({
          content: '确实要退出到登录页面？',
          success: () => {
            this.$router.push({
              name: 'Login'
            })
          }
        })
      },
      getExamList (item) {
          this.$router.push({
              name: 'examList',
              params: {
                id: item.id,
                takePhotoInTest: item.takePhotoInTest
              }
          })
          window.localStorage.setItem('examTypeId', item.id)
      },
      async openMsg () {
        await navMsg()
      }
    },
    created () {
      this.that = this
      this.getInfo()
      this.getExamInfo(this.userFPSettings.userId)
      this.getNavFlag()
      this.openMsg()
    },
    mounted () {
        // console.log(this.userFPSettings)
    },
    beforeDestroy () {
      if (!this.msgTimer) {
        clearInterval(this.msgTimer)
      }
    }
}
</script>
<style lang="less" scoped>
  .icon-kaoshi {
    color: #fff;
  }
  .nav-container {
    height: 100%;
    background: linear-gradient(45deg,rgba(0,103,255,1) 0%,rgba(38,146,255,1) 100%);
  }
  .ots-logo-container {
    height: 60px;
    border-bottom: 1px solid rgba(13,131,255,1);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .userinfo-container {
    height: 183px;
    border-bottom: 1px solid rgba(0,124,255,1);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .userinfoBox {
      position: fixed;
      left: 110px;
      top: 90px;
      width: 315px;
      height: 170px;
      background: rgba(255,255,255,1);
      z-index: 10;
      box-shadow: 0px 6px 30px 0px rgb(39 46 64 / 30%);
      padding: 20px;
      border-radius: 3px;
      display: none;
      .userImg{
        width: 95px;
        height: 128px;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-height: 100%;
          max-width: 100%;
        }
      }
      .userCon {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .userinfoBox:after{
      content: "";
      display: block;
      position: absolute;
      left:-16px;
      top:25px;
      width: 0;
      height: 0;
      border: 8px solid #fff;
      border-color: transparent #fff transparent transparent;
    }
  }
  .userinfo-container:hover .userinfoBox {
    display: flex;
  }
  .userinfo-container .avatar {
    width: 62px;
    height: 62px;
    margin-top: 32px;
  }
  
  .userinfo-container .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .userinfo-container .username {
    margin: 12px 0 8px;
  }
  .userinfo-container .state {
    background: rgba(34,233,157,1);
    display: inline-flex;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .tab-container {
      height: calc(100% - 243px);
      background: url('../../../assets/images/cbg.png') no-repeat;
      background-position: bottom;
      position: relative;
      .logout {
        position: absolute;
        bottom: 30px;
        text-align: center;
        width: 100%;
        span {
          cursor: pointer;
          color: #FFF;
          background: rgba(51,135,255,1);
          border-radius: 3px;
          border: 1px solid rgba(73,148,255,1);
          padding: 6px 18px;
        }
      }
  }
  .tabItem {
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 12px 0;
  }
  .tabItem i {
    margin: 0 10px;
    font-size: 14px;
  }
  .tabItem:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
  .tabItem.on {
    background-color: rgba(255, 255, 255, 0.12);
  }
  .msgCount{
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff4444;
    margin-left: 5px;
    margin-top:3px;
  }
</style>
