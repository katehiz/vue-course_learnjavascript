import Vue from 'vue';
import App from '@/app.vue';
import router from '@/router.js';
import store from '@/store.js';
import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false;

Vue.use(router);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
