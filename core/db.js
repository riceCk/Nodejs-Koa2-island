/**
 * 数据库的代码处理
 */

const Sequelize = require('sequelize');
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    // create_time update_time 字段是否自动加上
	timestamps: true,
	//  delete_time 字段是否自动加上
	paranoid: true,
	// 重置create_time update_time delete_time 字段名
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deletedAt: 'deleted_at'
  }
})
// 初始化表
// force: true 如果表已经存在，将会丢弃表
// alter: true 如果表已存在，不过丢弃，如果不存在会直接创建表
sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}
