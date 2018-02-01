import Vue from 'vue'
import Vuex from 'vuex'


const STORE = {
  state: {},
  actions: [],
  mutations: [],
  modules: requireAll(require.context('./modules/', false, /\.js$/)),
  // strict: (NODE_ENV === 'develope'),
  // middlewares: (NODE_ENV === 'develope') ? [createLogger()] : []
}

Vue.use(Vuex)
export default new Vuex.Store(STORE)

/************************************************
                   helpers
===============================================*/

// https://webpack.github.io/docs/context.html#require-context
function requireAll(requireContext) {
  return requireContext.keys().reduce( (fixtures, file) => {
    var name = file.match(/\.\/(.+?)\.js/)[1]

    fixtures[name] = requireContext(file)

    return fixtures
  }, {})
}
