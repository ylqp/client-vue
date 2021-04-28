/**
 * code: 接口名称
 * data: 参数
 * callback: 回调函数
 */
import Vue from 'vue'
const SENT = process.env.NODE_ENV === 'development' ? 'Sent_Post' : 'Sent'
let loadingCount = 0
const request = async (code, data) => {
    const { $eventBus } = Vue.prototype
    if (loadingCount === 0) {
      $eventBus.$loading()
    }
    loadingCount++
    let cdata = null
    if (data) {
      cdata = JSON.stringify(data)
    }
    return new Promise((resolve, reject) => {
        window.OTS[SENT](code, null, cdata, function (rdata) {
            let res = JSON.parse(rdata)
            let { status } = res
            loadingCount--
            if (loadingCount === 0) {
              $eventBus.$loading().close()
            }
            if (status === 1) {
              resolve(res)
            } else {
              console.log(res)
              window.WEBOTS.$message('接口报错了')
              reject(res)
            }
        }, null)
    })
}
export default request
