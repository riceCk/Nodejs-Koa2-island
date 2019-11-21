const Router = require('koa-router');

const {RegisterValidator} = require('../../validators/validator');
const {User} = require('../../models/user');
const {success} = require('../../lib/helper');

const router = new Router({
  // 路由前缀
  prefix: '/v1/user'
})

// 注册 新增数据-post，更新数据put，查询数据get，删除数据-delete
/**
 * 思维路径
 * 接受参数 LinValidator
 * email password1 password2 nickname
 */
router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx);
  // 密码加密
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }

  const r = await User.create(user)
  success()
})

module.exports = router
