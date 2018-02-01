import template from './template.jade'
import './style.css'

import {mapActions, mapState} from 'vuex'
import moment from 'moment'

export default {
  name: 'Home',
  template: template(),
  data () {
    return {

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
    ...mapActions(['getPostList']),

    fromNow: function (timestamp){
      return moment(timestamp).fromNow()
    },

    openPhotoBrowser: function(post){

      var photoBrowserUrls = post.medias.photos_url

      var pb =  this.$f7.photoBrowser.create({
        photos : photoBrowserUrls,
        theme: 'dark'
      });

      pb.open()

    },
    doSomething: function () {
      console.log('hi')
    }
  },
  created() {
  },

  mounted() {

    // this.getPostList()
    this.$nextTick(function () {
     // Code that will run only after the
     // entire view has been rendered
        this.getPostList()
        console.log('mounted')


   })
  }
}
