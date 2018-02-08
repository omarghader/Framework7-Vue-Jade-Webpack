import Storage from '@/services/Storage'
import fetch from '@/services/fetch'
import { POST_LIST , SET_PROGRESS, SET_PAGINATION } from '../mutation-types'

export let name = 'post'

var defaults = {
  sortBy : '',
  pagination: {
    perPage: 20,
    page : 1
  },
  data: [],
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [POST_LIST](state, payload) {

    // push new data to state
    var initialData = state.data
    var newData = payload.data
    payload.data = initialData.concat(newData)

    state = Object.assign(state, payload)

    let objCopy = Object.assign({}, state)
    objCopy.data = objCopy.data.slice(0, Math.min(objCopy.data.length - 1, 29))
    // console.log('state', objCopy)
    Storage.set(name, objCopy)
  },

  [SET_PAGINATION](state, pagination) {
    state.pagination = pagination
    Storage.set(name, state)
  }

}

// actions
export const actions = {
  getPostList({ /*actions,*/ commit, state }) {
    // commit(SET_PROGRESS, true)
    fetch.post({params: {...state.pagination}})
    .then( payload => {
      console.log(payload)
      commit(POST_LIST, payload)
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

  getNextPage({dispatch, commit, state}, pagination) {
    commit(SET_PAGINATION, pagination )
    dispatch('getPostList')
  }
}
