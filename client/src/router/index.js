import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Member from '@/components/Member'
import Homepage from '@/components/Homepage'
import testvuetify from '@/components/testvuetify'
import Worksheet from '@/components/Worksheet'
import Workdetails from '@/components/Workdetails'


import Vuetify from 'vuetify'
//import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    }
    ,
    {
      path: '/List',
      name: 'List',
      component: List
    }
    ,
    {
      path: '/Member',
      name: 'Member',
      component: Member
    }
    ,
    {
      path: '/testvuetify',
      name: 'testvuetify',
      component: testvuetify
    }
    ,
    {
      path: '/Worksheet',
      name: 'Worksheet',
      component: Worksheet
    }
    ,
    {
      path: '/Workdetails',
      name: 'Workdetails',
      component: Workdetails
    }
    ,
    {
      path: '/Workdetails/:id',
      name: 'Workdetails',
      component: Workdetails
    }
    
  ]
})
