import Vue from 'vue';
import PromptTip from './prompt-tips.vue';

/* 
    通过extend创建一个子类，实例化之后挂载到具体的dom元素上
  
*/

PromptTip.install = function(el, opt) {
  const options = opt;
  const PromptTipClass = Vue.extend(PromptTip);
  const component = new PromptTipClass({
    data: options,
  }).$mount();
  document.getElementById(el).appendChild(component.$el);
};

export default PromptTip;
