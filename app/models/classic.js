/**
 * 实体三个表
 * 建设 music sentence movie 表
 **/
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize');

/**
 * image 图片
 * content: 内容
 * pubdate: 时间
 * fav_nums: 点赞数
 * title: 标题
 * type: 代号
 */
const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

/**
 * 电影表
 */
class Movie extends Model {

}

Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})

/**
 * 杂志
 */
class Sentence extends Model {

}

Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})

/**
 * 音乐表
 */
class Music extends Model {

}

const musicFields = Object.assign({
  url: Sequelize.STRING
}, classicFields)
Music.init(musicFields, {
	  sequelize,
	  tableName: 'music'
})

module.exports = {
  Movie,
  Sentence,
  Music
}

