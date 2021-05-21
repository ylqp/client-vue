import Vue from 'vue'
import OtsPopPro from './OtsPopPro'

let instance = null;
let OtsPopProConstructor = Vue.extend(OtsPopPro);

const init = () => {
  instance = new OtsPopProConstructor();
  instance.$mount();
  document.body.appendChild(instance.$el);
}

const $otsPopPro = (options) => {
  if (!instance) {
    init(options);
  }
  return instance.popInit(options)
}


OtsPopPro.install = Vue => {
  Vue.prototype.$otsPopPro = $otsPopPro;
}

export default OtsPopPro