const Router = require('koa-router');

const {TokenValidator, NotEmptyValidator} = require('../../validators/validator');
const {User} = require('../../models/user');
const {LoginType} = require('../../lib/enum');

// 进行token生成
const {generateToken} = require('../../../core/util');
const {Auth} = require('../../../middlewares/auth');
const {WXManager} = require('../../services/wx');

const router = new Router({
  // 路由前缀
  prefix: '/v1/token'
})

/**
 * * 传参：
 * @param account
 * @param secret
 * @param type
 * API 权限公开api
 * token过期不合法
 */
router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  // 业务逻辑
  // 1.在API接口编写
  // 2.Model 分层
  let token;
  switch (v.get('body.type')) {
	  // 普通用户邮箱登录
	case LoginType.USER_EMAIL:
	  token = await emailLogin(v.get('body.account'), v.get('body.secret'))
	  break;
	  // 小程序登录
	case LoginType.USER_MINI_PROGRAM:
	  token = await WXManager.codeToToken(v.get('body.account'))
	  break
	  // 管理员用户
	case LoginType.ADMIN_EMAIL:
	  break;
	default:
	  throw new global.errs.ParameterException('没有相应的处理函数')
  }
  ctx.body = {
	token
  }
})

/**
 * 传参：
 * @param token
 * 判断token令牌是否生效的接口
 */
router.post('/verify', async (ctx, next) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verigyToken(v.get('body.token'))
  ctx.body = {
	result
  } 
})

/**
 *    邮箱登录判断账号密码是否正确
 * @param account 账号
 * @param secret 密码
 * @returns Token
 */
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}

module.exports = router
