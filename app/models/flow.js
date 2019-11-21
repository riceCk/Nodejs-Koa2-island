/**
 * 建设业务表
 * flow
 **/
const {sequelize} = require('../../core/db');

const {Sequelize, Model} = require('sequelize');

class Flow extends Model {

}

/**
 * id本身的id号
 * art_id 实体表的id号
 * type :100  Movie, 200 Music, 300 Sentence
 */
Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'flow'
})

module.exports = {
  Flow
}
