// import formatSumm from 'mixins/filters/formatSumm'
import {mapActions, mapState} from 'vuex'

import menu from './menu'
import style from './style.scss'
import template from './template.jade'

export let name = 'panel-left'

var image = '//vsct.info/assets/i/jpg/main_svcs_01.jpg'

export default resolve => new Promise( resolve => resolve({
  // mixins: [formatSumm],
  template: template({name, style}),

  data: () => ({isIos:true, menu, image}),

  computed: {
    ...mapState({
      companyName: state => state.auth.name_expeditor,
      summa: state => '', ///state.advance.summa,
      gravatar_hash:  '',//state => state.settings.gravatar_hash

    }),
    src() {
      var hash = this.gravatar_hash
      return hash ? `//s.gravatar.com/avatar/${hash}?s=80` : null
    },
    style() {
      return `background-image:url(${this.image})`
    },
  },
  filters: {
    summaTitle(summa = 0) {
      return this.$t('advance.advanceTitle', {summa})
    },
  }
}))
