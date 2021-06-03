import Vue from 'vue'
import OtsPopPro from './OtsPopPro'

let instance = null;
let OtsPopProConstructor = Vue.extend(OtsPopPro)
let count = 0
const init = () => {
  instance = new OtsPopProConstructor()
  instance.$mount();
  // document.body.appendChild(instance.$el);
  count++ 
  let popKeyDOM = document.createElement('div')
  popKeyDOM.id = `pop_${count}`
  popKeyDOM.appendChild(instance.$el)
  document.body.appendChild(popKeyDOM)
  instance.count = count
}

const $otsPopPro = (options) => {
  init(options);
  
  return instance.popInit(options)
}


OtsPopPro.install = Vue => {
  Vue.prototype.$otsPopPro = $otsPopPro;
}

export default OtsPopPro