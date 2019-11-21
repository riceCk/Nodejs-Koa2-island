const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize');

/**
 * 做“我喜欢”功能表
 */
class Favor extends Model {
  // 业务表

}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
})
