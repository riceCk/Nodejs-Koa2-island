const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize');
const axios = require('axios');
const util = require('util');

const {Favor} = require('./favor');

class Book extends Model {
  // constructor(id) {
	// super()
	// this.id = id
  // }

  static async detail(id) {
	const url = util.format(global.config.yushu.detailUrl, id)
	const detail = await axios.get(url)
	return detail.data
  }

  // 搜索书籍
  static async searchFromYuShu(q, start, count, summary = 1) {
	const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), start, count, summary);
	const result = await axios.get(url);
	return result.data
  }

  // 获取喜欢书籍数量
  static async getMyFavorBookCount(uid) {
    const count = await Favor.count({
	  where: {
	    type: 400,
		uid
	  }
	})
	return count
  }
}

/**
 *
 */
Book.init({
  id: {
	type: Sequelize.INTEGER,
	primaryKey: true  // 主键
  },
  fav_nums: {
	type: Sequelize.INTEGER,
	defaultValue: 0  // 默认值
  }
}, {
  sequelize,
  tableName: 'book'
})

module.exports = {
  Book
}
