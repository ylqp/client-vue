<template>
  <div class="logoBg">
      <el-card class="box-card">
        <div class="schoolLogo">
          <img src="@/assets/images/logo1.png" alt="">
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="userName">
            <el-input 
              clearable 
              v-model="form.userName" 
              placeholder="请输入用户名" 
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              clearable 
              type="password" 
              v-model="form.password" 
              placeholder="请输入密码"
              prefix-icon="iconfont icon-pass"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkCode" v-if="needCheckCode">
            <div class="checkCodeBox">
                <el-input 
                  clearable 
                  v-model="form.checkCode" 
                  class="checkCode" 
                  placeholder="验证码"
                  prefix-icon="iconfont icon-check"
                ></el-input>
                <img :src= "checkCodeImg" @click="handleCheckCode"/>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="loginBtn"  @click="loginIn"  @keyup.enter="loginIn">登录</div>
          </el-form-item>
        </el-form>
        <close class="closeCom" />
      </el-card>
  </div>
</template>
<script>
import { login, getCheckCode } from '@/http/modules/login'
import { getTenate } from '@/http/modules/common'
import { mapActions, mapState } from 'vuex'
import Close from '@/components/Close.vue'
const loginStatus = {
    'needCheckCode': '需要验证码',
    'checkCodeError': '验证码错误',
    'noUserName': '用户名不存在',
    'maxFailTime': '半小时内错误次数超过5次',
    'passwordError': '密码错误',
    'userDisenabled': '用户停用',
    'userNorole': '用户无权限',
    'orgDisenabled': '组织机构已停用',
    'noArrangements': '目前无需要参加的考试活动',
    'otherIsLogin': '已经在其他设备登录此账号'
}
export default {
  name: 'Login',
  components: {
    Close
  },
  data () {
    return {
      checkCodeImg: '',
      // 需要验证码
      needCheckCode: false,
      loginParams: {
        name: "",
        pass: "",
        checkCode: "",
      },
      form: {
        userName: '',
        password: '',
        checkCode: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapState('examType', ['examTypeList']),
  },
  methods: {
    ...mapActions('user', ['getUserFPSettings']),
    ...mapActions('examType', ['geExamTypeList']),
    async loginIn () {
      // this.$otsMessage({
      //   content : '测试message',
      // })
      // return
      // 1. 表单验证
      await this.$refs.form.validate()
      // 2. 处理参数
      this.loginParams.name = this.form.userName
      this.loginParams.pass = this.form.password
      this.loginParams.checkCode =this.form.checkCode
      // 3. 调接口并处理结果
      const { data } = await login(this.loginParams)
      if (JSON.parse(data.succeeded)) {
        // 获取用户信息
        await this.getUserFPSettings()
        // 获取考试列表信息
        await this.geExamTypeList()
        // 跳转首页
        this.$router.push({
          name: 'examList',
          params: {
            id: this.examTypeList[0].id
          }
        })
      } else {
        // 处理错误
        this.handleFalse(data.reason)
      }
    },
    handleFalse (reason) {
      let loginStatus = this.getLoginStatus(reason)
      if (reason === 'needCheckCode') {
          this.handleCheckCode()
      }
      this.$message.error(loginStatus)
    },
    async handleCheckCode () {
      this.needCheckCode = true
      const { data } = await getCheckCode()
      // 刷新最新验证码
      this.checkCodeImg = 'data:image/png;base64,' + data
    },
    getLoginStatus (reason) {
      return loginStatus[reason] || '登录失败，请联系管理员'
    }
  },
  async mounted () {
    const { data } = await getTenate()
  }
}
</script>
<style lang="less" scoped>
.logoBg {
  background: url('../assets/images/loginbg.png');
  background-size: 100% 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    position: relative;
    width: 380px;
    .schoolLogo {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 150px;
        height: 50px;
      }
    }
    .loginBtn {
      width: 300px;
      height: 50px;
      background: linear-gradient(45deg,rgba(36,205,139,1) 0%,rgba(29,218,151,1) 100%);
      border-radius: 4px;
      margin: auto;
      margin-top: 20px;
      line-height: 50px;
      font-size: 18px;
      color: #FFF;
      letter-spacing: 8px;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
    }
  }
}
.el-form-item {
  display: flex;
  justify-content: center;
}
.el-input /deep/ .el-input__inner{
    width: 300px;
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
}
.checkCodeBox {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .checkCode /deep/ .el-input__inner {
    width: 180px;
  }
  img {
    width: 120px;
  }
}
.closeCom {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
