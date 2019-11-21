const {sequelize} = require('../../core/db');

const {Sequelize, Model} = require('sequelize');

const {Art} = require('./art');

/**
 * 做“我喜欢”功能表
 */
class Favor extends Model {
  // 业务表
  /**
   * 添加喜欢数据
   * @param art_id
   * @param type
   * @param uid
   */
  static async like (art_id, type, uid) {
    // 1 添加记录
    // 2 classic.js fav_nums
    const data = {art_id, type, uid}
    const favor = await Favor.findOne({
      // 判断表如果有当前数据就不添加
      where: data
    })
    if (favor) {
      throw new global.errs.LikeError()
    }
    // 数据库事务
    return sequelize.transaction(async t=> {
	  await Favor.create(data, {transaction: t})
      const art = await Art.getData(art_id, type)
      // 对art中查到的某个数据表进行fav_nums字段喜欢加1
      await art.increment('fav_nums', {by: 1, transaction: t})
    })
  }

  /**
   * 删除当前数据
   */
  static async dislike (art_id, type, uid) {
// 1 添加记录
	// 2 classic.js fav_nums
	const data = {art_id, type, uid}
	const favor = await Favor.findOne({
	  // 判断表如果有当前数据就不添加
	  where: data
	})
	if (!favor) {
	  throw new global.errs.DislikeError()
	}
	// 数据库事务
	return sequelize.transaction(async t=> {
	  await favor.destroy({
        force: false, // false:软删除，true:正式的物理删除
		transaction: t
      })
	  const art = await Art.getData(art_id, type)
	  // 对art中查到的某个数据表进行fav_nums字段喜欢加1
	  await art.decrement('fav_nums', {by: 1, transaction: t})
	})
  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}
