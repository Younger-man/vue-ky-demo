import Vue from 'vue';
import { store } from '@/business';
import '@/css/base.css';
import '@/css/reset.css';
import '@/css/retina.less';
import modal from './components/modal/index';
import promptTip from './components/prompt-tips/index';
import App from './app.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$modal = modal.install;
Vue.prototype.$promptTip = promptTip.install;
Vue.component(promptTip.name, promptTip);

const bus = new Vue();
Vue.mixin({
  data() {
    return {
      bus,
    };
  },
});

const vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

vue.$router.push({ name: 'home' });
