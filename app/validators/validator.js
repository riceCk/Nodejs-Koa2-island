/**
 * 校验器规则
 * LinValidator 的使用标准，必须按照这样校验
 */
const {LinValidator, Rule} = require('../../core/lin-validator')
const {User} = require('../models/user');
const {LoginType, ArtType} = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
	super()
	this.id = [
	  new Rule('isInt', '需要是正整数', {min: 1})
	]
  }
}

/**
 * user.js注册账号校验器
 */
class RegisterValidator extends LinValidator {
  constructor() {
	super()
	this.email = [
	  new Rule('isEmail', '不符合Email规范')
	]
	this.password1 = [
	  // 用户指定范围，
	  new Rule('isLength', '密码至少6个字符，最多32个字符', {
		min: 6,
		max: 32
	  }),
	  new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
	]
	this.password2 = this.password1
	this.nickname = [
	  new Rule('isLength', '昵称不符合规范', {
		min: 4,
		max: 32
	  })
	]
  }

  /**
   * 判断密码是否一致
   */
  validatePassword(vals) {
	const psw1 = vals.body.password1
	const psw2 = vals.body.password2
	if (psw1 !== psw2) {
	  throw new Error('两次输入的密码不一致，请重新输入')
	}
  }

  async validateEmail(vals) {
	const email = vals.body.email
	// 查询sql的模板
	const user = await User.findOne({
	  where: {
		email: email
	  }
	})
	if (user) {
	  throw new Error('email已存在')
	}
  }

}

/**
 * 校验
 * account 邮箱/openid  数量4-32
 * secret  可以为空 可以不传
 * type        登录的方式 数值必传
 * token.js 账号登录token校验器
 */
class TokenValidator extends LinValidator {
  constructor() {
	super()
	this.account = [
	  new Rule('isLength', '不符合账号规则', {
		min: 4,
		max: 32
	  })
	]
	this.secret = [
	  // 必须要传入吗？
	  // 1. 可以为空 可以不传
	  // 2. 空  不为空
	  // web 账号+密码
	  // 登录 多元化  小程序  密码
	  //  微信 打开小程序 合法用户
	  new Rule('isOptional'),
	  new Rule('isLength', '至少6个字符', {
		min: 6,
		max: 128
	  })
	]
  }

  validateLoginType(vals) {
	const checker = new Checker(LoginType)
	checker.check.bind(checker)
  }
}

class Checker {
  constructor (type) {
    this.enumType = type
  }

  check(vals) {
	let type = vals.body.type || vals.path.type
	if (!type) {
	  throw new Error('type是必须参数')
	}
	type = parseInt(type)
	if (!this.enumType.isThisType(type)) {
	  throw new Error('type参数不合法')
	}
  }
}

/**
 * 校验传的token是否存在
 */
class NotEmptyValidator extends LinValidator {
  constructor() {
	super();
	this.token = [
	  new Rule('isLength', '不允许为空', {min: 1})
	]
  }
}

/**
 * 点赞信息接口
 */
class LikeValidator extends PositiveIntegerValidator {
  constructor() {
	super()
	const checker = new Checker(ArtType)
	this.validateType = checker.check.bind(checker)
  }
}

class ClassicValidator extends LikeValidator {
	constructor () {
	  super()
	}
}

class SearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = [
    	new Rule('isLength', '搜索关键词不能为空', {
    	  min: 1,
		  max: 16
		})
	]
	 this.start = [
	 	new Rule('isInt', 'start不符合规范', {
	 	  min: 0,
		  max: 60000
		}),
		 new Rule('isOptional', '', 0 )
	 ]
	this.count = [
		new Rule('isInt', 'count不符合规范', {
		  min: 1,
		  max: 20
		}),
		new Rule('isOptional', '', 20)
	]
  }
}

class AddShortCommentValidator extends PositiveIntegerValidator{
  constructor () {
    super()
    this.content = [
    	new Rule('isLength', '必须在1到24个字符之间', {
    	  min: 1,
		  max: 24
		})
	]
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator,
  SearchValidator,
  AddShortCommentValidator
}
