import template from './template.jade'
import style from './style.scss'
import {mapActions, mapState} from 'vuex'

var name = 'login'

export default {
  name,
  template: template({style}),

  data: () => ({
    username: null,
    password: null,
  }),

  // vuex: {
  //   actions: {
  //     getAdvance,
  //     getProfile,
  //     getSettings,
  //     authLogin: login,
  //     clearAuth,
  //   },
  //
  //   getters: {
  //     auth: state => state.auth.login,
  //     message: state => state.auth.message,
  //   }
  // },

  created() {
    this.clearAuth('message')

    if (this.auth) {
      setTimeout(this.redirect, 1000)
    }
  },

  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      auth: state => state.auth.login,
      message: state => state.auth.message,

    }),
  },
  methods: {
    ...mapActions({
      getAdvance: 'getAdvance',
      getProfile: 'getProfile',
      getSettings: 'getSettings',
      authLogin: 'login',
      clearAuth: 'clearAuth',
    }),

    onFocus() {
      this.clearAuth('message')
    },
    onChange(event) {
      console.log(this.username)
      // this.clearAuth('message')
    },
    onSubmit() {
      console.log(this.username, this.password)
      this.authLogin({
        username: this.username,
        password: this.password,
        // redirect if auth ok
        callback: this.redirect,
      })
    },

    redirect() {
      // this.getAdvance()
      // this.getProfile()
      // this.getSettings()

      var route = {
        name: 'tabs',
        params: {tab: 'containers'}
      }

      this.$router.go(route)
    },
  },

}
