import OtsMessage from './OtsMessage'
import OtsPop from './OtsPop'

const packages = [
  
]

const install = Vue => {
  Vue.use(OtsMessage)
  Vue.use(OtsPop)
  packages.forEach(item => {
    Vue.component(item.name,item)
  })
}

export default install
