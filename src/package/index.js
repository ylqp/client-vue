import OtsMessage from './OtsMessage'
import OtsPop from './OtsPop'
import OtsPopPro from './OtsPopPro'

const packages = [
  
]

const install = Vue => {
  Vue.use(OtsMessage)
  Vue.use(OtsPop)
  Vue.use(OtsPopPro)
  packages.forEach(item => {
    Vue.component(item.name,item)
  })
}

export default install
