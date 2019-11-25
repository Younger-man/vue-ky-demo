import Vue from 'vue';
import Modal from './modal.vue';

Modal.install = function install(opt) {
  const options = opt;
  const ModalClass = Vue.extend(Modal);
  const component = new ModalClass({
    data: options,
  }).$mount();
  document.getElementById('app').appendChild(component.$el);
};

export default Modal;
