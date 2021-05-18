/**
 * code: 接口名称
 * data: 参数
 * callback: 回调函数
 */
import Vue from 'vue'
const SENT = process.env.NODE_ENV === 'development' ? 'Sent_Post' : 'Sent'

class Loading {
  constructor () {
    this.loadingCount = 0
    this.notLoading = ['GetPaymentResult']
    this.$eventBus = Vue.prototype.$eventBus
    this.loadingInstance = null
  }
  loading (code) {
    if (this.getCode(code)) {
      if (this.loadingCount === 0) {
        this.loadingInstance = this.$eventBus.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      this.loadingCount++
    }
  }
  close (code) {
    if (this.getCode(code)) {
      this.loadingCount--
      if (this.loadingCount === 0) {
        this.loadingInstance && this.loadingInstance.close()
      }
    }
  }
  getCode (code) {
    return this.notLoading.indexOf(code) === -1 ? true : false
  }
}

let $loading = null

const request = async (code, data) => {
    if ($loading === null) {
      $loading = new Loading()
    }
    $loading.loading(code)
    let cdata = null
    if (data) {
      cdata = JSON.stringify(data)
    }
    return new Promise((resolve, reject) => {
        window.OTS[SENT](code, null, cdata, function (rdata) {
            try {
                rdata = rdata.replace(/\\'/g, "'");
                let res = JSON.parse(rdata)
                let { status } = res
                $loading.close(code)
                if (status === 1) {
                    resolve(res)
                } else {
                    console.log(res)
                    window.WEBOTS.$message('接口报错了')
                    reject(res)
                }
            } catch (error) {
                window.WEBOTS.$message(`${code}接口报错了`)
                console.log(rdata)
                $loading.close(code)
            }
            
        }, null)
    })
}
export default request
