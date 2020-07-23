/* eslint-disable no-unused-vars */
import { gymService } from '../_services/index'

export const gym = {
  namespaced: true,
  state: {
    status: {
      loading: false,
      loadSuccess: true
    },
    alert: {
      Message: ''
    },
    problem: null,
    update: {
      updated: true
    }
  },
  actions: {
    load({ dispatch, commit }, { id }) {
      commit('LOADING')
      gymService.details(id).then(
        data => {
          commit('LOADING_SUCCESS', data)
        },
        error => {
          dispatch('authalert/error', error, { root: true })
        }
      )
    },
    body_change({ commit }, { value }) {
      commit('BODY_CHANGE', value)
    },
    input_change({ commit }, { value }) {
      commit('INPUT_CHANGE', value)
    },
    output_change({ commit }, { value }) {
      commit('OUTPUT_CHANGE', value)
    },
    note_change({ commit }, { value }) {
      commit('NOTE_CHANGE', value)
    },
    save({ commit, state }) {
      commit('UPDATING')
      gymService.updateProblem(state.problem).then(
        data => {
          commit('UPDATED')
        },
        error => {
          commit('UPDATE_FAILED', error)
        }
      )
    },
    clear({ commit }) {
      commit('CLEAR')
    }
  },
  mutations: {
    UPDATE_FAILED(state, error) {
      state.update = { updated: false }
      state.alert.Message = error
    },
    UPDATED(state) {
      state.update = { updated: true }
    },
    CLEAR(state) {
      state.problem = null
      state.alert.Message = ''
    },
    UPDATING(state) {
      state.update = { updating: true }
    },
    LOADING(state) {
      state.status.loading = true
    },
    LOADING_SUCCESS(state, data) {
      state.status.loading = false
      state.problem = data
    },
    LOADING_DONE(state) {
      state.status.loading = false
    },
    BODY_CHANGE(state, data) {
      if (state.problem) {
        state.problem.Body = data
        state.update.updated = false
      }
    },
    INPUT_CHANGE(state, data) {
      if (state.problem) {
        state.problem.Input = data
        state.update.updated = false
      }
    },
    OUTPUT_CHANGE(state, data) {
      if (state.problem) {
        state.problem.Output = data
        state.update.updated = false
      }
    },
    NOTE_CHANGE(state, data) {
      if (state.problem) {
        state.problem.Note = data
        state.update.updated = false
      }
    }
  }
}
