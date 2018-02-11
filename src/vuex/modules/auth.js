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

    mainApp.$f7.preloader.show()

    commit(CHECK_LOGIN, {login, password})

    fetch.auth.login(settings).then( data => {
      data.password = password
      commit(CHECK_LOGIN, data)

      if (callback) { callback() }
      console.log('closeLogin')
      mainApp.$f7.loginScreen.close("#loginPage")
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

  logout({ commit }) {

    mainApp.$f7.preloader.show()
    commit(RESET_AUTH, 'login')
    commit(RESET_AUTH, 'secret')

    fetch.auth.logout().catch( error => {
      return error
    }).then( () => {
      commit(CHECK_EXIT)
      setTimeout(()=> {
        mainApp.$f7.preloader.hide()
      }, 1000)
    })
  },

  reLogin({ actions, state }, { callback }) {
    console.log('>>> state =', state)
    actions.login({
      login: state.auth.login,
      password: state.auth.password,
      callback: callback,
    })
  },

  clearAuth({ commit }) {
    commit(RESET_AUTH, 'message')
  },
}
