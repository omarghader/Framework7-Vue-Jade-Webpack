import { fetchFactory, URL, fixtures } from './utils'

var name = 'post'

export default fetchFactory({
  url: URL[name],
  fixture: fixtures[name],
  parser: parsePostList,
})

/**
 * Свойство контейнера
 * @param {string} _id — post ID

 */
export class Post {
  constructor(data) {
    this._id = data._id
    this.date = data.date
    this.owner = data.owner
    this.body = data.body

  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{ContainerInfo}> data - подробные свойства контейнера
 */
function parsePostList({ data }) {
  return {
    message: data.message,
    data: data.members.map( item => new Post(item) ),
    pagination: data.pagination ,
  }
}
