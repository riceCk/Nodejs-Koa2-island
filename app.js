const Koa = require('koa');
const path =require('path');
const parser = require('koa-bodyparser'); // 获取post参数插件
const catchError = require('./middlewares/exception')
const InitManager = require('./core/init');
const static = require('koa-static'); // 静态资源插件

// require('./app/models/hot_book')

// 应用程序对象
const app = new Koa();

// 中间件 -> 函数
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, './static')))
InitManager.initCore(app)

app.listen(3000)
