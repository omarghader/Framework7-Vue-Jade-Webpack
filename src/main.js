//import polyfill
import polyfill from '@/services/polyfill.js'

// Import Vue
import Vue from 'vue';
import VueI18n from 'vue-i18n'


// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app';
import panelLeft from './pages/panel-left/index.js'
import popoverLang from '@/components/popover-lang/index.js'
import itemContentLink from '@/components/item-content-link'
// import itemContent from '@/components/item-content'
// import itemContentAccordion from '@/components/item-content-accordion'
Vue.component('item-content-link', itemContentLink)
Vue.component('popover-lang', popoverLang)

Vue.component('panelLeft', panelLeft)
Vue.component('item-content-link', itemContentLink)

// Vue.component('item-content', itemContent))
// Vue.component('item-content-accordion', itemContentAccordion)

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

import store from '@/vuex/store'


Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'current', // set locale
  messages : store.state.locales, // set locale messages
})


// Init App
window.mainApp = new Vue({
  el: '#app',
  template: '<app/>',
  store,
  i18n,
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'io.omarghader.fasad', // App bundle ID
    name: 'fasad', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: Routes,
    view: {
      pushState: true,
    },
    theme: 'ios'
  },
  // Register App Component
  components: {
    app: App,
  }
});

//Event channel
window.Events = new Vue()
