import Vue from 'vue'
import Router from 'vue-router'
import View1 from './views/View1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/1-1'
    }, {
      path: '/1-1',
      name: '1-1',
      component: View1
    },
  ]
})
