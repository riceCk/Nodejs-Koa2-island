const {sequelize} = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize');
const {Favor} = require('./favor');

/**
 * 图书数据库
 */
class HotBook extends Model {
  /**
   * 查询Boos表种的数据
   * 通过group分组查询Favor表中对应喜欢的该图书的数量
   * @returns {Promise<void>}
   */
  static async getAll () {
    const books = await HotBook.findAll({
      order: [
          'index'
      ]
    })
    const ids = []
    books.forEach(book => {
      ids.push(book.id)
    })
    const favors = await Favor.findAll({
      where: {
        art_id: {
		  [Op.in]: ids
        }
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']] // 需要的那些特定字段
    })
    return favors
  }
}

HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
}, {
  sequelize,
  tableName: 'hot_book'
})

module.exports = {
  HotBook
}

