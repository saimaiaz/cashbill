// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Paginate from 'vuejs-paginate'
import vuetify from '@/plugins/vuetify'

require('../node_modules/bootstrap/dist/css/bootstrap.css')

Vue.config.productionTip = false
// Vue.component('paginate', Paginate)

/* eslint-disable no-new */
new Vue(
  {
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    vuetify,
  }

)
