import OtsMessage from './OtsMessage'

const packages = []

const install = Vue => {
  Vue.use(OtsMessage)
  packages.forEach(item => {
    Vue.component(item.name,item)
  })
}

export default install
