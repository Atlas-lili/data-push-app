import Vue from 'vue'
import Router from 'vue-router'
import LogPage from './views/LogPage'
import Sys from './views/Sys'
import View1 from './views/View1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login'
    }, {
      path: '/Login',
      name: 'Login',
      component: LogPage
    }, {
      path: '/Logon',
      name: 'Logon',
      component: LogPage
    }, {
      path: '/Sys',
      name: 'Sys',
      component: Sys,
      children: [
        {
          path: '1-1',
          name:'1-1',
          component:View1
        }
      ]
    },
  ]
})
