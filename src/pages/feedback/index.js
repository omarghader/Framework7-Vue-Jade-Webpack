import template from './template.jade'

var name = 'feedback'

export default {
  name,
  template: template({name}),

  data: () => ({
    textarea: '',
    isAndroid: true,
  }),

  methods: {
    onSubmit() {
      var textarea = this.textarea
      this.$nextTick( () =>
        mainApp.$f7.dialog.alert(textarea, 'Feedback Sent')
      )
      this.textarea = ''
    },
  },
}
