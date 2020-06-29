import Vue from 'vue'
import Router from 'vue-router'
import Log from './views/Log/index'
import Sys from './views/Sys/index'

import City from './views/City/index'
import ConfSub from './views/ConfSub/index'

import Histogram from './views/Histogram/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Sys/histogram'
    }, {
      path: '/Login',
      name: 'Login',
      component: Log
    }, {
      path: '/Logon',
      name: 'Logon',
      component: Log
    }, {
      path: '/Sys',
      name: 'Sys',
      component: Sys,
      children: [
        {
          path: 'histogram',
          name: 'histogram',
          component: Histogram
        }, {
          path: 'default-city',
          name:'default-city',
          component:City
        }, {
          path:'conf-sub',
          name: 'conf-sub',
          component: ConfSub,
        }
      ]
    }, {
      path: '/push/histogram',
      component: Histogram
    }
  ]
})
