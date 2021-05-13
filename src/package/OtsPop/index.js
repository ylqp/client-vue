import Vue from 'vue'
import OtsPop from './OtsPop'

let instance = null;
let OtsPopConstructor = Vue.extend(OtsPop);

const init = () => {
  instance = new OtsPopConstructor();
  instance.$mount();
  document.body.appendChild(instance.$el);
}

const $otsPop = (options) => {
  if (!instance) {
    init(options);
  }
  instance.popInit(options)
}


OtsPop.install = Vue => {
  Vue.prototype.$otsPop = $otsPop;
}

export default OtsPop