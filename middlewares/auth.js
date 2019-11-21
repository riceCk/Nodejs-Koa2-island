/**
 * 中间件
 * 用来识别token的值是否有效
 **/
const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
	// 设置api接口的级别，为了与用户级别对比
	this.level = level || 1
	// 普通用户分级8，管理员用户分级16
	Auth.USER = 8
	Auth.ADMIN = 16
	Auth.SUPER_ADMIN = 32
  }

  /**
   * token 检测
   * token 开发者 如何 传递令牌
   * token body header 约定
   * HTTP 规定 身份证验证机制 HttpBasicAuth
   * @returns {Function}
   */
  get m() {
	return async (ctx, next) => {
	  const userToken = basicAuth(ctx.req)
	  let errMsg = 'token不合法'
	  let decode;
	  if (!userToken || !userToken.name) {
		throw new global.errs.Forbbiden(errMsg)
	  }
	  try {
		decode = jwt.verify(userToken.name, global.config.security.secretKey)
	  } catch (error) {
		// 1.token不合法
		// 1. token 过期
		if (error.name === 'TokenExpiredError') {
		  errMsg = 'token已过期'
		}
		throw new global.errs.Forbbiden(errMsg)
	  }
	  if (decode.scope < this.level) {
		errMsg = '权限不足'
		throw new global.errs.Forbbiden(errMsg)
	  }
	  ctx.auth = {
		uid: decode.uid,
		scope: decode.scope
	  }
	  await next()
	}
  }

  /**
   * 判断token令牌是否有效
   */
  static verigyToken(token) {
	try {
	  jwt.verify(token, global.config.security.secretKey)
	  return true
	} catch (error) {
	  return false
	}
  }
}

module.exports = {
  Auth
}
