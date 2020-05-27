import Vue from 'vue'
import Router from 'vue-router'
import Log from './views/Log/index'
import Sys from './views/Sys/index'
// import WeatherAitNowView from './views/WeatherAirNow/index'
// import WeatherAitNow from './components/WeatherAirNow'
// import WeatherHistoryView from './views/WeatherHistory/index'
// import WeatherHistory from './components/WeatherHistory'
// import EpidemicTotals from './components/TotalHistory'
// import EpidemicNow from './views/EpidemicNow/index'
// import EpidemicNows from './components/TotalLocalization'
// import EpidemicPatient from './views/EpidemicPatient/index'
// import EpidemicPatients from './components/CityDCSpecific'
// import EpidemicCity from './views/EpidemicCity/index'
// import EpidemicCitys from './components/ProvinceLocalization'

import City from './views/City/index'
import ConfSub from './views/ConfSub/index'
// import EpidemicTotal from './views/EpidemicTotal/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Sys/weather-air-now'
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
          component:()=>import('./views/WeatherAirNow/index'),
          props: true
        },{
          path: 'weather-air-now/city/:city_name?',
          name: 'weather-air-now-city',
          component: City,
          props: true
        },{
          path: 'weather-history/:city_name?',
          name:'weather-history',
          component:()=>import('./views/WeatherHistory/index'),
          props: true
        },{
          path: 'weather-history/city/:city_name?',
          name: 'weather-history-city',
          component: City,
          props: true
        },{
          path: 'epidemic-total',
          name: 'epidemic-total',
          component: ()=>import('./views/EpidemicTotal/index')
        },{
          path: 'epidemic-now',
          name: 'epidemic-now',
          component: ()=>import('./views/EpidemicNow/index')
        },{
          path: 'epidemic-patient-relation',
          name: 'epidemic-patient-relation',
          component: ()=>import('./views/EpidemicPatient/index')
        },{
          path: 'epidemic-city-relation',
          name: 'epidemic-city-relation',
          component: ()=>import('./views/EpidemicCity/index')
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
      component:()=>import('./components/WeatherAirNow'),
      props: true
    }, {
      path: '/push/weather-history/:city',
      component:()=>import('./components/WeatherHistory'),
      props: true
    }, {
      path:'/push/epidemic-total',
      component:()=>import('./components/TotalHistory'),
      props:true
    }, {
      path:'/push/epidemic-now',
      component:()=>import('./components/TotalLocalization'),
      props:true
    }, {
      path:'/push/epidemic-patient-relation',
      component:()=>import('./components/CityDCSpecific'),
      props:true    
    }, {
      path:'/push/epidemic-city-relation',
      component:()=>import('./components/ProvinceLocalization'),
      props:true   
    }
  ]
})
