import {mapActions, mapState} from 'vuex'

import template from './template.jade'
import style from './style.scss'

export let name = 'popover-lang'

export default res => new Promise( resolve => resolve({
  template: template({name, style}),

  computed: {
    ...mapState({
      langs: state => state.locales.langs
    })
  },

  created() {
     Events.$on('open:popup:langs', ()=>{
       mainApp.$f7.popover.open("#popover-lang")
     });
     Events.$on('open:actionSheet:langs', this.openActionSheet);

  },

  methods: {
    ...mapActions(['changeLang']),

    handleChangeLang(lang) {
      mainApp.$f7.popover.close("#popover-lang")
      this.changeLang(lang)
    },

    openActionSheet() {
      var buttons = this.langs.map( lang => ({
        text: lang.value,
        onClick: () => this.changeLang(lang.key),
      }))

      buttons.unshift({text: this.$t('settings.lang'), label: true})


      var actionSheet = mainApp.$f7.actions.create({
        buttons: buttons
      })
      actionSheet.open()
    },

  },
}))
