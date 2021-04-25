/**
 * code: 接口名称
 * data: 参数
 * callback: 回调函数
 */

const SENT = process.env.NODE_ENV === 'development' ? 'Sent_Post' : 'Sent'

const request = async (code, data) => {
    let cdata = null
    if (data) {
      cdata = JSON.stringify(data)
    }
    return new Promise((resolve, reject) => {
        window.OTS[SENT](code, null, cdata, function (rdata) {
            
            let res = JSON.parse(rdata)
            let { status } = res
            if (status === 1) {
              resolve(res)
            } else {
              window.WEBOTS.$message('接口报错了')
              reject(res)
            }
        }, null)
    })
}
export default request
