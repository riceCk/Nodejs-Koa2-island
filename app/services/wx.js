/**
 * 管理微信的相关业务逻辑
 * */
const axios = require('axios')
const util = require('util');

const {User} = require('../models/user');
// 进行token生成
const {generateToken} = require('../../core/util');
const {Auth} = require('../../middlewares/auth');

class WXManager {
  /**
   * 小程序登录接口业务
   * code 小程序生成的，微信
   * openid 小程序的唯一标识
   * 小程序没有显示注册的
   * @param code 小程序进行code验证
   * @returns {Promise<void>}
   */
  static async codeToToken (code) {
    const url = util.format(global.config.wx.loginUrl,
							global.config.wx.appId,
							global.config.wx.appSecret,
							code)
	const result =  await axios.get(url)
	if (+result.status !== 200) {
	  throw new global.errs.AuthFiled('openid获取失败')
	}
	const errcode = result.data.errcode
	if (errcode) {
	  throw new global.errs.AuthFiled(result.data.errmsg)
	}
	let user = await User.getUserByOpenid(result.data.openid);
  	if (!user) {
  	  user = await User.registerByOpenid(result.data.openid)
	}
	return generateToken(user.id, Auth.USER, global.config.security.expiresInTwoHours)
  }
}

module.exports = {
  WXManager
}
