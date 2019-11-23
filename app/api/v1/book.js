const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/book'
});

const {HotBook} = require('../../models/hot_book');
router.get('/hot_list',async (ctx, next) => {
  const hostBook = await HotBook.getAll()
  ctx.body = hostBook
})

module.exports = router
