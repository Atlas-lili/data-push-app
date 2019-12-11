import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:null
  },
  mutations: {
    rewriteUserinfo (state, obj) {
      state.userinfo = obj;
    }
  },
  actions: {

  }
})
