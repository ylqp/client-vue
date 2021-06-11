import router from '@/router'
import { getIsClientLogin } from '@/http/modules/common'
import { exitClient } from '@/http/modules/close'
const clientFn = {
    // 回登录页
    goLogin: function () {
        router.push({
            name: 'Login'
        })
    },
    // 回首页
    goHome: function () {
        const examTypeId = window.localStorage.getItem('examTypeId')
        getIsClientLogin().then((val) => {
            if (val.data == 'true') { // 退出程序
                exitClient()
            } else { // 返回列表
                router.push({
                    name: 'examList',
                    params: {
                        id: examTypeId ? examTypeId : ''
                    }
                })
            }
        })
    }
}

export default clientFn