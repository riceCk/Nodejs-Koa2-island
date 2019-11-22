const Router = require('koa-router');

const router = new Router({
  prefix: '/v1/classic'
})

const {PositiveIntegerValidator, ClassicValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth');
const {Flow} = require('../../models/flow');
const {Art} = require('../../models/art');
const {Favor} = require('../../models/favor');

/**
 * 获取最新一条期刊信息
 */
router.get('/latest', new Auth().m, async (ctx, next) => {
  // 排序
  const flow = await Flow.findOne({
    order: [
        ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  // 修改art内置里面属性
  art.setDataValue('index', flow.index)
  ctx.body = art
})

/**
 * 查询下一期刊数据
 */
router.get('/:index/next', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const index = v.get('path.index');
  const flow = await await Flow.findOne({
    where: {
      index: index + 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  // 修改art内置里面属性
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeNext)
  ctx.body = {
	art
  }
})

/**
 * 获取当前一期的上一期
 */

router.get('/:index/previous', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  });
  const index = v.get('path.index');
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })
  if (!flow) {
	throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likePrevious);
  ctx.body = art
})

/**
 * 获取点赞信息
 */
router.get('/:type/:id/favor', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx);
  const id = v.get('path.id');
  const type = v.get('path.type');
  const art = await Art.getData(+id, +type)
  if (!art) {
	throw new global.errs.NotFound();
  }
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid);
  ctx.body = {
	fav_nums: art.fav_nums,
	like_status: like
  }
})

/**
 *
 */
router.get('/favor', new Auth().m, async ctx => {
  const uid = ctx.auth.uid
  ctx.body = await Favor.getMyClassicFavors(uid);
})

module.exports = router
