import Vue from 'vue'
import Router from 'vue-router'
import Log from './views/Log/index'
import Sys from './views/Sys/index'
import WeatherAitNow from './views/WeatherAirNow/index'
import City from './views/City/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login'
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
          path: 'weather-air-now/:city_name?',
          name:'weather-air-now',
          component:WeatherAitNow,
          props: true
        },{
          path: 'weather-air-now/city/:city_name?',
          name: 'weather-air-now-city',
          component: City,
          props: true
        },{
          path: 'default-city',
          name:'default-city',
          component:City
        }
      ]
    },
  ]
})
