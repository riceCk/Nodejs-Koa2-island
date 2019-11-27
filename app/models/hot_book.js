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
		  [Op.in]: ids,
          type: 400
        }
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']] // 需要的那些特定字段
    })
    books.forEach(book => {
      HotBook._getEachBookStatus(book, favors)
    })
    return books
  }

  /**
   * 将getAll查询到的图书详情和我喜欢的图书数量结合一起
   */
  static _getEachBookStatus (book, favors) {
    let count = 0;
    favors.forEach(favor => {
      if (book.id === favor.art_id) {
        count = favor.get('count')
      }
    })
    book.setDataValue('fav_nums', count);
    return book
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

