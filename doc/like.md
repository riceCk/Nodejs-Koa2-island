## 点赞接口

**注：**
所有的业务接口设中间token拦截，所以`Basic Auth`中需要设置传入token

### 添加点赞数据

#### URL

```bash
POST     /v1/like
```

#### Parameters:
* art_id: 该数据的id（必填）
* type：该数据的类型（必填）

### Response 200:
```bash
{
  error_code: 0
  msg: "ok"
  request: "POST /v1/like/cancel"
}
```

### 取消点赞数据

#### URL

```bash
POST     /v1/like/cancel
```

#### Parameters:
* art_id: 该数据的id（必填）
* type：该数据的类型（必填）

### Response 200:
```bash
{
  error_code: 0
  msg: "ok"
  request: "POST /v1/like/cancel"
}
```

