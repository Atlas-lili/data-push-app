import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var defaultUserinfo = {city:"北京市"}
export default new Vuex.Store({
  state: {
    userinfo:{}
  },
  getters: {
    Userinfo: state => {
      var userinfo = state.userinfo
      if(!userinfo.token){
        userinfo = JSON.parse(localStorage.getItem('userinfo'));
        if(!userinfo){
          userinfo = {}
        }
        state.userinfo = userinfo
      }
      return {
        ...defaultUserinfo,
        ...userinfo,
      };
    }
  },
  mutations: {
    rewriteUserinfo (state, obj) {
      var userinfo = JSON.stringify(obj)
      if(!Object.keys(obj).length){
        state.userinfo = userinfo
        localStorage.removeItem("userinfo");
      } else {
        state.userinfo = JSON.parse(userinfo);
        localStorage.setItem('userinfo',userinfo);
      }
    },
    assignUserinfo (state,obj){
      var userinfo = JSON.stringify({
        ...state.userinfo,
        ...obj
      })
      state.userinfo = JSON.parse(userinfo);
      localStorage.setItem('userinfo',userinfo);
    }
  }
})
