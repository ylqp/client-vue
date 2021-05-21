// 全局自定义指令
import directive from '../directive'
//全局组件
import packages from '../package'
// less
import less from 'less'
// e-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// viewer 使用
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'


//常量
import * as constant from '../config/constant'

Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': false, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
const install = Vue => {
    Vue.use(directive)
    Vue.use(packages)
    Vue.use(less)
    Vue.use(ElementUI)
    Vue.use(Viewer)

    Vue.prototype.$constant = constant
}

export default install
