const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/book'
});

const {HotBook} = require('../../models/hot_book');
const {Book} = require('../../models/book');
const {Favor} = require('../../models/favor');
const {Auth} = require('../../../middlewares/auth');
const {Comment} = require('../../models/book-comment');
const {success} = require('../../lib/helper');
const {PositiveIntegerValidator, SearchValidator, AddShortCommentValidator} = require('../../validators/validator');

/**
 * 热门书籍列表
 */
router.get('/hot_list',async (ctx, next) => {
  const hostBook = await HotBook.getAll()
  ctx.body = hostBook
})

/**
 * 书籍详情
 */
router.get('/:id/detail', async ctx =>{
  const v = await new PositiveIntegerValidator().validate(ctx);
  const book = new Book(v.get('path.id'));
  ctx.body = await book.detail()
})

/**
 * 搜索书籍
 */
router.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx);

  ctx.body = await Book.searchFromYuShu( v.get('query.q'), v.get('query.start'), v.get('query.count'), v.get('query.count'), v.get('query.summary'))

})

/**
 * 获取喜欢书籍数量
 */
router.get('/favor/count', new Auth().m, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid);
  ctx.body = {
    count
  }
})

/**
 * 获取书籍点赞情况
 */
router.get('/:book_id/favor', new Auth().m, async ctx =>{
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  });
  ctx.body = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'));
})

/**
 * 新增短评
 */
router.post('/add/short_comment', new Auth().m, async ctx => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'book_id'
  })
  await Comment.addComment(v.get('body.book_id'), v.get('body.content'));
  success()
});

/**
 * 获取短评
 */
router.get('/:book_id/short_comment', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  });
  ctx.body = await Comment.getComments(v.get('path.book_id'))

});

/**
 * 获取热搜关键字
 */
router.get('/hot_keyword', async ctx => {
  ctx.body = {
    'hot': ['Python', '哈利·波特', '村上春树', '东野圭吾', '白夜行', '韩寒', '金庸', '王小波']
  }
})

module.exports = router
