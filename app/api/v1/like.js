const Router = require('koa-router');

const {Auth} = require('../../../middlewares/auth');
const {LikeValidator} = require('../../validators/validator');
const {Favor} = require('../../models/favor');
const {success} = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/like'
})

/**
 * 添加“我喜欢”数据
 * art_id、type、uid
 */
router.post('/', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  });
  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

/**
 * 删除“我喜欢”的记录
 * @type {*|Router}
 */
router.post('/cancel', new Auth().m, async (ctx, next) => {
  console.log(123123)
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

module.exports = router
