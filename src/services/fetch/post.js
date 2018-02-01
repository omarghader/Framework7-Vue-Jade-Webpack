import { fetchFactory, URL, fixtures } from './utils'

var name = 'post'

export default fetchFactory({
  url: URL[name],
  fixture: fixtures[name],
  parser: '',
})

/**
 * Свойство контейнера
 * @param {string} number — номер контейнера
 * @param {unixtime} date_in — дата поступления (прихода) контейнера
 * @param {unixtime} date_out — дата убытия (расхода) контейнера
 * @param {string} type — тип контейнера
 * @param {number} size — размер контейнера
 * @param {boolean} load — загрузка контейнера
 * @param {string} transport — название транспорта, с которым прибыл (убыл) контейнер
 * @param {string} kontr — наименование контрагента
 * @param {string} konos — номер коносамента
 * @param {string} sklad_in — склад поступления (прихода) контейнера
 * @param {string} sklad_out — склад убытия (расхода) контейнера
 */
export class Container {
  constructor(data) {
    this._id = data._id
    this.date = data.date
    this.owner = data.owner
    this.medias = data.medias

  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{ContainerInfo}> data - подробные свойства контейнера
 */
function parseContainerList({ data }) {
  return {
    message: data.message,
    // data: data.table.map( item => new Container(item) ),
  }
}
