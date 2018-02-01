import { randomDate, randomNumb, randomChar, ContainerNumb } from './utils'

var TYPES
const SIZES = [ 3, 5, 10, 20, 40, 45 ]
const STOCK = ['ПИК', 'ВМКТ']
const KONTR = 'ООО МАЭРСК'


/**
  * User definition
  * @param {string} _id - unique user id
  * @param {string} displayname — user displayed name
  * @param {string} profile_img_url — url pointing to the img of the user
  */
 class User {
   constructor() {
     this._id = `${randomChar(1)}-${randomNumb(9)}`
     this.displayname = `${randomChar(1)} ${randomChar(5)}`
     this.profile_img_url = 'http://www.claimcash.in/cadmin/uploads/stores/pro.jpg'
  }
 }

 /**
   * Media definition
   * @param {string} _id - unique user id
   * @param {string} displayname — user displayed name
   * @param {string} profile_img_url — url pointing to the img of the user
   */
  class Media {
    constructor() {
      this._id = `${randomChar(5)}-${randomNumb(9)}`
      this.text = randomChar(20)
      this.photos_url = ['https://42mzqz26jebqf6rd034t5pef-wpengine.netdna-ssl.com/wp-content/uploads/2013/02/landscape_taxonomy_04.jpg',
      'https://42mzqz26jebqf6rd034t5pef-wpengine.netdna-ssl.com/wp-content/uploads/2013/02/landscape_taxonomy_04.jpg']
      this.timestamp = randomDate()
      this.comments_count = randomNumb(2)
      this.likes_count = randomNumb(2)
   }
  }

export class Post {
  constructor() {
    this._id = ContainerNumb()
    this.date = randomDate()
    this.owner = new User()
    this.medias = new Media()

  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{Container}> data — свойства контейнера
 */
export default () => {
  // TYPES = Object.keys(posts)

  return new Promise( resolve => resolve({
    message: 'Fixture container list',
    data: Array.from(Array(randomNumb(1)), () => new Post())
  }))

}
