import Storage from '@/services/Storage'
import fetch from '@/services/fetch'
import { POST_LIST , SET_PROGRESS } from '../mutation-types'

export let name = 'post'

var defaults = {
  sortBy : '',
  perPage: 20,
  page : 1,
  data: [],
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [POST_LIST](state, payload) {
    state = Object.assign(state, payload)
    Storage.set(name, state)
  }


}

// actions
export const actions = {
  getPostList({ /*actions,*/ commit }) {
    // commit(SET_PROGRESS, true)
    fetch.post().then( payload => {
      console.log(payload)
      commit('POST_LIST', payload)
    }).catch( error => {
      // reLogin !!!
      if (error.status === 401) {
        actions.reLogin({
          callback: () => actions.getAdvance()
        })
      }
      return error
    }).then( () => {
      // commit(SET_PROGRESS, false)
    })
  },
}
