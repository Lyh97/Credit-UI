import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginstatic: false,
    loginvisible: false,
    user: {},
    API: 'http://localhost:8888/'
  },
  mutations: {
    updateLogin (state, user) {
      state.loginstatic = !state.loginstatic
      state.user = user
    },
    updatevisible (state) {
      state.loginvisible = !state.loginvisible
    },
    quit (state) {
      state.islogin = false
      state.username = ''
    }
  }
})
