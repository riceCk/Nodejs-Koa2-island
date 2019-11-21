const requireDirectory = require('require-directory')
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    this.initLoadRouters()
    this.loadHttpException()
    this.loadConfig()
  }
  /**
   * 自动注册/app/api下面的路由
   */
  static initLoadRouters() {
    // process.cwd() 工作目录(始终不变island）
    // __dirname 文件所在
    const apiDirectory = `${process.cwd()}/app/api`
    // 可以逐一导出目录下面的文件
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    // 判断是否是router路由，如果是进行router注册
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  /**
   * 将/config/config.js模块导入全局global中
   * @param path
   */
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath);
    global.config = config
  }

  /**
   * 将http-exception异常处理类定义到全局上
   */
  static loadHttpException() {
    const errors = require('./http-exception');
    global.errs = errors
  }
}

module.exports = InitManager
