import { userService } from '../_services'
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('LOGIN_REQUEST', { username })
      userService.login(username, password).then(
        data => {
          commit('LOGIN_SUCCESS', data)
          router.push('/')
        },
        error => {
          commit('LOGIN_FAILURE', error)
          dispatch('authalert/error', error, { root: true })
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    gitlogin({ dispatch, commit }, { code }) {
      commit('LOGIN_REQUEST', { code })
      userService.gitlogin(code).then(
        data => {
          commit('LOGIN_SUCCESS', data)
          router.push('/')
        },
        error => {
          commit('LOGIN_FAILURE', error)
          dispatch('authalert/error', error, { root: true })
        }
      )
    },
    logout({ commit }) {
      userService.logout()
      commit('LOGOUT')
    }
  },
  mutations: {
    LOGIN_REQUEST(state, user) {
      state.user = user
      state.status = { loggingIn: true }
    },
    LOGIN_SUCCESS(state, user) {
      state.user = user
      state.status = { loggedIn: true }
    },
    LOGIN_FAILURE(state) {
      state.user = null
      state.status = {}
    },
    LOGOUT(state) {
      state.status = {}
      state.user = null
      router.push('/login')
    }
  }
}
