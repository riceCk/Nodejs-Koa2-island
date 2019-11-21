const Router = require('koa-router');

const router = new Router({
  prefix: '/v1/classic'
})

const {PositiveIntegerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth');
const {Flow} = require('../../models/flow');

router.get('/latest', new Auth().m, async (ctx, next) => {
  // 排序
  const flow = await Flow.findOne({
    order: [
        ['index', 'DESC']
    ]
  })
  ctx.body = flow
})

module.exports = router
