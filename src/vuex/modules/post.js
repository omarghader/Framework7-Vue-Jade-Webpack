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
  [POST_LIST](state, {payload, append}) {

    if (append === 'true' ) {
      // push new data to state
      var initialData = state.data
      var newData = payload.data
      payload.data = initialData.concat(newData)

    }

    state = Object.assign(state, payload)

    let objCopy = Object.assign({}, state)
    objCopy.data = objCopy.data.slice(0, Math.min(objCopy.data.length - 1, 29))
    Storage.set(name, objCopy)
  },

  [SET_PAGINATION](state, pagination) {
    state.pagination = pagination
    Storage.set(name, state)
  }

}

// actions
export const actions = {
  getPostList({ /*actions,*/ commit, state }, additionalParams={}) {

    mainApp.$f7.preloader.show()

    fetch.post({params: {...state.pagination}}).then( payload => {

      console.log(payload, additionalParams)
      commit(POST_LIST, {payload, append: additionalParams.append || 'false'})

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
      setTimeout(()=>{
          mainApp.$f7.preloader.hide()
      },500)

    })
  },

  getNextPage({dispatch, commit, state}, pagination) {
    commit(SET_PAGINATION, pagination )
    dispatch('getPostList',  {append:'true'})
  },

  resetPagination({commit, state}) {
    commit(SET_PAGINATION, {
      perPage: state.pagination.perPage,
      page: 1
    })
  }
}
