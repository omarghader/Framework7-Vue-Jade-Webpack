import template from './template.jade'
import './style.css'

import {
  mapActions,
  mapState
} from 'vuex'
import moment from 'moment'
import ImageCompressor from 'image-compressor.js';

// import editor from '@/components/editor.vue'

export default {
  name: 'publisher',
  template: template(),
  // components: {
  //   editor
  // },
  data() {
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

      const data = {
        text: this.text,
        rawPhotos: this.photos
      }

      console.log('data', data)
      this.$f7.preloader.show('app.submitting')
      this.$http.post("api/v1/posts", data).then((res) => {
        console.log('res ', res)

        this.$f7.preloader.hide()
        this.$f7.popup.close('#publisherPopup')
      }).catch((error) => {
        console.log('error ', error)
      })

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

    compressImage(file) {

      if (!file) {
        return;
      }

      const imageCompressor = new ImageCompressor();

      return imageCompressor.compress(file, {
          quality: .6,
          convertSize: 10e6
        })
        .then((result) => {
          // Handle the compressed image file.
          return result
        })
        .catch((err) => {
          // Handle the error
          console.log(err.message);

        })
    },


    handleChoosePhotos(files) {
      // reset photos
      this.photos = []

      // render images
      for (var file of files) {
        // this.renderImage(file)
        console.log('[file]', file)
        this.compressImage(file).then((result) => {
          console.log('[compressed]', result)
          this.renderImage(result)
        })
      }
    },

  },

  mounted() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered

    })
  }

}
