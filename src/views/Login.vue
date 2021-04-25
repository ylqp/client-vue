<template>
  <div>
      <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="用户名" prop="userName">
            <el-input clearable v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input clearable type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode" v-if="loginParams.needCheckCode">
            <div class="checkCodeBox">
                <el-input clearable v-model="form.checkCode" class="checkCode"></el-input>
                <img :src= "checkCodeImg" @click="handleCheckCode"/>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginIn"  @keyup.enter="loginIn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>
<script>
import { login } from '@/http/modules/login'
import { getTenate } from '@/http/modules/common'
import { mapActions, mapState } from 'vuex'
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
  data () {
    return {
      checkCodeImg: '',
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
      this.$otsMessage({
        content : '测试message',
      })
      return
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
      }
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
<style scoped>
</style>
