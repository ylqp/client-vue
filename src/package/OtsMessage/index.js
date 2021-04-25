import Vue from 'vue'
import OtsMessage from './OtsMessage'

let instance = null;
let OtsMessageConstructor = Vue.extend(OtsMessage);

const init = () => {
  instance = new OtsMessageConstructor();
  instance.$mount();
  document.body.appendChild(instance.$el);
}

const $otsMessage = (options) => {
  if (!instance) {
    init(options);
  }
  instance.showOtsMessage(options);
}


OtsMessage.install = Vue => {
  Vue.prototype.$otsMessage = $otsMessage;
}

export default OtsMessage
