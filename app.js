const Koa = require('koa');
const parser = require('koa-bodyparser'); // 获取post参数插件
const catchError = require('./middlewares/exception')
const InitManager = require('./core/init');

// require('./app/models/flow')

// 应用程序对象
const app = new Koa();

// 中间件 -> 函数
app.use(catchError)
app.use(parser())
InitManager.initCore(app)

app.listen(3000)
