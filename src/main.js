import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Loader from './components/loader/Loader.vue';

createApp(App)
  .use(store)
  .use(router)
  .component('loader', Loader)
  .mount('#app');
