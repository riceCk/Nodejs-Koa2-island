const bcrypt = require('bcryptjs');
const {sequelize} = require('../../core/db');

const {Sequelize, Model} = require('sequelize');
/**
 * 建立User表的mysql
 */
class User extends Model {
  /**
   * 判断邮箱和密码是否正确
   * @param email
   * @param plainPassword
   * @returns {Promise<User>}
   */
	static async verifyEmailPassword (email, plainPassword) {
		const user = await User.findOne({
			where: {
			  email
			}
		})
	  if (!user) {
	    throw new global.errs.NotFound('账号不存在')
	  }
	  const correct = bcrypt.compareSync(plainPassword, user.password)
	  if (!correct) {
	    throw new global.errs.AuthFiled('密码不正确')
	  }
	  return user
	}
  /**
   * 利用openid查询
   * @param openid
   */
  static getUserByOpenid(openid) {
    const user = User.findOne({
	  where: {
	    openid
	  }
	})
	return user
  }

  /**
   * 添加数据openid加入user表
   */
  static async registerByOpenid(openid) {
    return await User.create({
	  openid
	})
  }
}

User.init({
  // 定义user数据库字段以及字段类型
  id: {
    // 主键关系型数据库
    // 主键：不能重复不能为空
    // 注册User id 设计 id编号系统60001 60002
    // 自动增长
    type: Sequelize.INTEGER,
    primaryKey: true, // 设置主键
    autoIncrement: true  // 自动增长
  },
  nickname: Sequelize.STRING,
  email: {
	type: Sequelize.STRING(128),
	unique: true // 唯一性设置
  },
  password: {
    // 扩展观察者模式
    // 针对password加密
	type: Sequelize.STRING,
    set(val) {
	  const salt = bcrypt.genSaltSync(10);
	  const psw = bcrypt.hashSync(val, salt);
	  this.setDataValue('password', psw);
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true // 唯一性设置
  },
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}
