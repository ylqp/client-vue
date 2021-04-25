// 全局自定义指令
import directive from '../directive'
//全局组件
import packages from '../package'
// less
import less from 'less'
// e-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const install = Vue => {
    Vue.use(directive)
    Vue.use(packages)
    Vue.use(less)
    Vue.use(ElementUI)
}

export default install
