/**
 * 全局异常处理中间件
 * error 堆栈调用信息
 * error 简化 清晰明了的信息 给前端
 * HTTP Status Code 2xx,3xx,4xx,5xx
 * error_code 详情，开发者自己定义10001，20003
 * request_url当前请求的url
 */
const {HttpException} = require('../core/http-exception')
const catchError = async (ctx, next) => {
  try {
	await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
	const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException) {
      // 开发环境 and 不是HttpException
      throw error
	}
	if (isHttpException) {
	  ctx.body = {
	    msg: error.msg,
		error_code: error.errorCode,
		request: `${ctx.method} ${ctx.path}`
	  }
	  ctx.status = error.code
	} else {
	  ctx.body = {
	    msg: 'we made a mistake (╯﹏╰)',
		error_code: 999,
		request: `${ctx.method} ${ctx.path}`
	  }
	  ctx.status = 500
	}
  }
}

module.exports = catchError
