import {mapActions, mapState} from 'vuex'


export default {
  methods: {
    openLoginModal(callback){
      if (!this.secret && !this.username) {

        const toastLogin = mainApp.$f7.toast.create({
          text: this.$t("login.needLogin"),
          closeButton: false,
          closeButtonText: 'Login',
          closeButtonColor: 'red',
          closeTimeout: 2000,
          // on: {
          //   close: function () {
          //     mainApp.$f7.loginScreen.open("#loginPage")
          //   },
          // }
        })

        toastLogin.open()

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
