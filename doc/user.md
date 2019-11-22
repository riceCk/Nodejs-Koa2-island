# 用户接口

## 1、用户注册

### URL:
```bash
POST    /v1/user/register
```

### Parameters:
* nickname: 用户名（必填），满足4-32位字符
* email： 邮箱（必填），必须满足邮箱格式，邮箱具有唯一性
* password1: 密码（必填），至少6-32字符，不能过于简单
* password2: 必填，通password1要求，且与password1一致

### Response 200:
```bash
{
  "msg": "ok",
  "error_code": 0,
  "request": "POST /v1/user/register"
}
```


## 2、利用token注册

### 用户登录

#### URL
```bash
POST    /v1/token
```

#### Parameters:
* account: 邮箱/微信openid（必填），满足4-32字符
* secret：密码（选填），当微信登录的时候就不用天，密码至少6位
* type：登录方式码
   - 100：普通用户登录
   - 101：小程序登录
   - 102：移动端登录（暂未开发）
   - 200：管理员登录


### Response 200:
```bash
{
  "token": TOKEN
}
```

### token认证

#### URL 
```bash
POST    /v1/token/verify
```

#### Parameters:
* token: 登录的时候传给用户的token

#### Response 200:
```bash
{
  "is_valid": true
}
```
