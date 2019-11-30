module.exports = {
  /**
   * div:开发环境
   * prod：生产环境
   */
  environment: 'dev',
  database: {
    dbName: 'island',
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '123456'
  },
  security: {
	secretKey: "abcdefg",
	expiresInTwoHours: 60 * 60 * 2, // 令牌过期时间
	expiresInMonth: 60 * 60 * 24 * 30// 令牌过期时间
  },
  wx: {
	appId: 'wx204a0653c330ea4e',
	appSecret: 'ea97b73cd80d15ba1573d730250ca353',
  	loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu: {
	detailUrl: 'http://t.yushu.im/v2/book/id/%s',
	keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host: 'https://island.youbego.top/'
}
