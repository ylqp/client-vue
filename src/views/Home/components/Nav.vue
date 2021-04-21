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
    </div>
    <div class="tab-container">
      <ul>
        <li>
          <div class="tabItem"
               :class="this.$route.name === 'msgList' ? 'on' : ''"
               @click="$router.push({
                 name: 'msgList'
               })"
          >
            <i class="iconfont icon-msg"></i>
            <p>消息中心</p>
          </div>
        </li>
        <li>
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
                @click="$router.push({
                  name: 'examList',
                  params: {
                    id: item.id,
                    takePhotoInTest: item.takePhotoInTest
                  }
               })"
          >
            <i class="iconfont" :class="index % 2 === 0 ? 'icon-zuoye' : 'icon-kaoshi' "></i>
            <p>{{item.activityTypeName}}</p>
          </div>
        </li>
      </ul>
      <div class="logout">
        <span>注销</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserSimpleInfo, getExamType } from '@/http/modules/common'
export default {
    name: 'Nav',
    data () {
        return {
            userInfo: {},
            examTypes: [],
            that: {}
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
      }
    },
    created () {
      this.that = this
      this.getInfo()
      this.getExamInfo(this.userFPSettings.userId)
    },
    mounted () {
        // console.log(this.userFPSettings)
    }
}
</script>
<style lang="less" scoped>
  .icon-kaoshi {
    color: #fff;
  }
  .nav-container {
    height: 100%;
    background: linear-gradient(45deg,rgba(0,103,255,1) 0%,rgba(38,146,255,1) 100%);;
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
</style>
