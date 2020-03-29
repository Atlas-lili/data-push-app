import Vue from 'vue'
import Router from 'vue-router'
import Log from './views/Log/index'
import Sys from './views/Sys/index'
import WeatherAitNowView from './views/WeatherAirNow/index'
import WeatherAitNow from './components/WeatherAirNow'
import WeatherHistoryView from './views/WeatherHistory/index'
import WeatherHistory from './components/WeatherHistory'
import EpidemicNow from './views/EpidemicNow/index'

import City from './views/City/index'
import ConfSub from './views/ConfSub/index'
import EpidemicTotal from './views/EpidemicTotal/index'

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
          component:WeatherAitNowView,
          props: true
        },{
          path: 'weather-air-now/city/:city_name?',
          name: 'weather-air-now-city',
          component: City,
          props: true
        },{
          path: 'weather-history/:city_name?',
          name:'weather-history',
          component:WeatherHistoryView,
          props: true
        },{
          path: 'weather-history/city/:city_name?',
          name: 'weather-history-city',
          component: City,
          props: true
        },{
          path: 'epidemic-now',
          name: 'epidemic-now',
          component: EpidemicNow
        },{
          path: 'epidemic-total',
          name: 'epidemic-total',
          component: EpidemicTotal
        },{
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
      path: '/push/weather-air-now/:city',
      component:WeatherAitNow,
      props: true
    }, {
      path: '/push/weather-history/:city',
      component:WeatherHistory,
      props: true
    }
  ]
})
