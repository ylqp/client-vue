// 全局自定义指令
import directive from '../directive'

// e-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const install = Vue => {
    Vue.use(directive)
    Vue.use(ElementUI)
}

export default install