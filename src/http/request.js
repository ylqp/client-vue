/**
 * code: 接口名称
 * data: 参数
 * callback: 回调函数
 */
const SENT = process.env.NODE_ENV === 'development' ? 'Sent_Post' : 'Sent'

const request = async (code, data) => {
    return new Promise((resolve, reject) => {
        window.OTS[SENT](code, null, data, function (data) {
            resolve(JSON.parse(data))
        }, null)
    })
}
export default request
