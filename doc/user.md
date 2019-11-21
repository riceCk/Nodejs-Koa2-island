## 用户注册

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
