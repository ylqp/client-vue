import { submitExam, getIsClientLogin } from '@/http/modules/common'
import { exitClient } from '@/http/modules/close'
const goExamList = () => {
    window.WEBOTS.$router.push({
        name: 'examList'
    })
}
const submit = async (answerData) => {
    const  { data }  = await submitExam(answerData)
    let rdata = JSON.parse(data)
    let type = rdata.temp == 1 ? 1 : 0
    // console.log(rdata)
    if (rdata.success == "true") {
        window.WEBOTS.$otsPopPro({
            content: type == 0 ? '试卷提交成功！' : '保存成功',
            isNeedCancel: false
        }).then(() => {
            return getIsClientLogin()
        }).then((val) => {
            if (val.data == 'true') { // 退出程序
                exitClient()
            } else { // 返回列表
                goExamList()
            }
        })
    } else {
        window.WEBOTS.$otsPopPro({
            content: type == 0 ? '试卷提交失败，请稍后重试！' : '保存失败',
            isNeedCancel: false
        }).then(() => {
            
        })
    }
}

export default submit