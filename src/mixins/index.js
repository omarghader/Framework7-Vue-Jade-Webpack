import {mapActions, mapState} from 'vuex'


export default {
  methods: {
    openLoginModal(callback){
      if (!this.secret && !this.username) {
        mainApp.$f7.loginScreen.open("#loginPage")
      } else {
        callback()
      }
    }
  },

  computed: {
    ...mapState({
      username: state => state.auth.login,
      secret: state => state.auth.secret,
    })
  }
}
