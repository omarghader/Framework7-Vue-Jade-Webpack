import template from './template.jade'
import './style.css'

import {mapActions, mapState} from 'vuex'
import moment from 'moment'
import mixins from '@/mixins'


export default {
  name: 'Home',
  template: template(),
  mixins: [mixins],
  data () {
    return {

    }
  },
  created() {
    // this.$on("ptr:refresh", this.ptrRefresh)
  },
  computed: {
      ...mapState({
      // arrow functions can make the code very succinct!
      posts: state => state.post.data,

      // passing the string value 'count' is same as `state => state.count`
      pagination: state => state.post.pagination,
      page: state => state.post.pagination.page,

    }),

  },

  methods: {
    ...mapActions(['getPostList', 'getNextPage', 'resetPagination']),

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

    onInfiniteScroll: function() {
      if (!this.posts || this.posts.length === 0 ) return

      this.getNextPage({
        perPage: this.pagination.perPage,
        page: this.pagination.page + 1
      })
    },

    ptrRefresh: function() {

      this.resetPagination()

      setTimeout(()=>{
        this.getPostList()
        mainApp.$f7.ptr.done()
      } , 1000)
    },

    like: function(post) {
      this.openLoginModal(()=>{
        console.log('like')
      })

    },

    comment: function(post) {
      this.openLoginModal(()=>{
        console.log('comment')
      })
    },

    share: function(post) {

    },

  },

  mounted() {

    // this.getPostList()
    this.$nextTick(function () {
     // Code that will run only after the
     // entire view has been rendered
        this.getPostList()

   })
  }
}
