import {mapActions, mapState} from 'vuex'
import template from './template.jade'

var name = 'settings-index'

export default {
  name,
  template: template({ name }),

  computed: {
    ...mapState({
      settings: state => state.settings || [],
    })
  },

  methods: {
    ...mapActions(['toggleNotify']),

    handleToggleNotify: function(e) {
      this.toggleNotify(e.target.name)
    },

    openLangs() {
      console.log('openLangs')
      Events.$emit('open:actionSheet:langs')
    },
  },
}
