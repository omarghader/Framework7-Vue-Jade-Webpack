import template from './template.jade'
import './style.css'

import {mapActions, mapState} from 'vuex'
import moment from 'moment'
// import editor from '@/components/editor.vue'

export default {
  name: 'publisher',
  template: template(),
  // components: {
  //   editor
  // },
  data () {
    return {
      photos: []
    }
  },
  computed: {
      ...mapState({
      // arrow functions can make the code very succinct!
      posts: state => state.post.data,

      // passing the string value 'count' is same as `state => state.count`
      perPage: state => state.post.perPage,

    }),

  },
  methods: {

    editorTextChange(text) {
      this.text = text
    },
    sendTweet() {
      this.$f7.preloader.show('app.submitting')
      setTimeout(_ => {
        this.$f7.preloader.hide()
        this.$f7.popup.close('#publisherPopup')
      }, 1500)
    },

    renderImage(file) {
       // generate a new FileReader object
       var reader = new FileReader();

       // inject an image with the src url
       reader.onload = (event) => {
         var the_url = event.target.result
         this.photos.push(the_url)
       }

       // when the file is read it triggers the onload event above.
       reader.readAsDataURL(file);
     },

     handleChoosePhotos(files) {
       // reset photos
       this.photos = []

       // render images
       for(var file of files) {
         this.renderImage(file)
       }
     }

  },

  mounted() {
    console.log('sadsa')
    this.$nextTick(function () {
     // Code that will run only after the
     // entire view has been rendered

   })
 }

}
