import Vue from 'vue'
import Vuex from 'vuex'

import { authentication } from './authentication.module'
import { authalert } from './authalert.module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    authalert
  }
})
