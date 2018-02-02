import Storage from '@/services/Storage'
import fetch from '@/services/fetch'
import { CHECK_LOGIN, CHECK_EXIT, RESET_AUTH } from '../mutation-types'

export let name = 'auth'

var defaults = {
  login: '',
  password: '',
  message: '',
  secret: '',
  name_expeditor: '',
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [CHECK_LOGIN](state, data) {
    state = Object.assign(state, data)
    Storage.set(name, state)
  },

  [CHECK_EXIT](state) {
    Storage.clear()
    state = Object.assign({}, defaults)
  },

  [RESET_AUTH](state, name) {
    console.log('RESET_AUTH')
    state[name] = null
  },
}

// actions
export const actions = {
  login({ commit }, payload) {
    var { login, password, callback = null } = payload

    if (!login && !password) { return }

    var settings = {
      headers: { Authorization: `Basic ${btoa(login + ':' + password)}` },
    }

    // console.log(this.$f7, "F7.showIndicator()")
    console.log(mainApp)
    mainApp.$f7.preloader.show()
    setTimeout(() => {
      mainApp.$f7.preloader.hide()
    }, 1000)
    commit(CHECK_LOGIN, {login, password})

    fetch.auth.login(settings).then( data => {
      data.password = password
      commit(CHECK_LOGIN, data)

      if (callback) { callback() }

      return true
    }).catch( ({ data, status }) => {
      if (status === 401) {
        commit(CHECK_LOGIN, data)
        // TODO: router.go({name: 'login'})
      }

      return true
    }).then(()=>{
      mainApp.$f7.preloader.hide()
    })
  },

  // logout({ commit }) {
  //   F7.showIndicator()
  //   commit(RESET_AUTH, 'login')
  //
  //   fetch.auth.logout().catch( error => {
  //     return error
  //   }).then( () => {
  //     commit(CHECK_EXIT)
  //     F7.hideIndicator()
  //   })
  // },
  //
  // reLogin({ actions, state }, { callback }) {
  //   console.log('>>> state =', state)
  //   actions.login({
  //     login: state.auth.login,
  //     password: state.auth.password,
  //     callback: callback,
  //   })
  // },

  clearAuth({ commit }) {
    console.log('Clear Auth ', RESET_AUTH)
    commit(RESET_AUTH, 'message')
  },
}
