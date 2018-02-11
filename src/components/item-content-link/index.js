import template from './template.jade'
import partial from './item-content.jade'

export let name = 'item-content-link'

export default {
  props: [
    'icon',
    'title',
    'after',
    'subtitle',
    'text',
  ],
  template: template(),
  components: { partial: partial },
}
