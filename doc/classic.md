# 期刊

**注：**
所有的业务接口设中间token拦截，所以`Basic Auth`中需要设置传入token

## 1、最新一期期刊

### URL
```bash
GET     /v1/classic/latest
```

### Response 200:
```bash
{
  "id": 1,
  "image": "imges/movie.8.png",
  "content": "人生不如意是十有八九哈哈哈",
  "pubdate": "2018-06-22",
  "fav_nums": 165,
  "title": "李安《饮食男女》",
  "type": 100,
  "created_at": "2019-11-21T07:41:20.000Z",
  "updated_at": "2019-06-21T07:41:08.000Z",
  "deleted_at": null,
  "index": 8
}
```

### Response_description:
* content：期刊内容
* fav_nums: 点赞次数
* image: 图片
* index: 期号
* like_status: 是否点赞
* pubdate: 发布日期
* title: 期刊题目
* type: 期刊类型,这里的类型分为:100 电影 200 音乐 300 句子
* id: 期刊在数据中序号，供点赞使用


## 2、点赞接口

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

## 3、查询下一期刊数据

### URL
```bash
GET     /v1/classic/:index/next
```

### Response 200:
```bash
{
  "id": 1,
  "image": "imges/movie.8.png",
  "content": "人生不如意是十有八九哈哈哈",
  "pubdate": "2018-06-22",
  "fav_nums": 167,
  "title": "李安《饮食男女》",
  "type": 100,
  "created_at": "2019-11-21T07:41:20.000Z",
  "updated_at": "2019-11-22T02:37:00.000Z",
  "deleted_at": null,
  "index": 8,
  "like_status": true
}
```

#### Response_description
* id: 期刊在数据中序号，供点赞使用
* content：期刊内容
* fav_nums: 点赞次数
* image: 图片
* index: 期号
* pubdate: 发布日期
* title: 期刊题目
* type: 期刊类型,这里的类型分为:100 电影 200 音乐 300 句子
* like_status: 是否点赞

## 4、获取上一期刊数据

### URL
```bash
GET     /v1/classic/:index/previous
```

### Response 200:
```bash
{
  "id": 1,
  "image": "imges/movie.8.png",
  "content": "人生不如意是十有八九哈哈哈",
  "pubdate": "2018-06-22",
  "fav_nums": 167,
  "title": "李安《饮食男女》",
  "type": 100,
  "created_at": "2019-11-21T07:41:20.000Z",
  "updated_at": "2019-11-22T02:37:00.000Z",
  "deleted_at": null,
  "index": 8,
  "like_status": true
}
```

#### Response_description
* id: 期刊在数据中序号，供点赞使用
* content：期刊内容
* fav_nums: 点赞次数
* image: 图片
* index: 期号
* pubdate: 发布日期
* title: 期刊题目
* type: 期刊类型,这里的类型分为:100 电影 200 音乐 300 句子
* like_status: 是否点赞


## 5、获取点赞信息
### URL
```bash
GET      /v1/classic/:type/:id/favor
```

### Response 200:
```bash
{
  "fav_nums": 167,
  "like_status": true
}
```

## 6、获取我喜欢的期刊

### URL
```bash
GET      /classic/favor
```
### Response 200:
```bash
[
  {
    "id": 1,
    "image": "imges/movie.8.png",
    "content": "人生不能像做菜，把所有的料准备好才下锅",
    "pubdate": "2018-06-22",
    "fav_nums": 168,
    "title": "李安《饮食男女》",
    "type": 100,
    "created_at": "2019-11-21T07:41:20.000Z",
    "updated_at": "2019-11-22T06:42:40.000Z",
    "deleted_at": null
  },
  {
    "id": 2,
    "image": "imges/movie.4.png",
    "content": "撒旦法哈克斯奋达科技哎四点，阿斯蒂芬进口量啥都解放路",
    "pubdate": "2018-06-22",
    "fav_nums": 69,
    "title": "宫崎骏《起风了》",
    "type": 100,
    "created_at": "2019-11-21T13:24:36.000Z",
    "updated_at": "2019-11-22T08:43:39.000Z",
    "deleted_at": null
  }
]
```


## 7、获取期刊信息

### URL
```bash
GET      /:type/:id
```

### Response 200:
```bash
{
    content: "人生不能像做菜，把所有的料准备好才下锅"
    created_at: "2019-11-21T07:41:20.000Z"
    deleted_at: null
    fav_nums: 168
    id: 1
    image: "imges/movie.8.png"
    like_status: true
    pubdate: "2018-06-22"
    title: "李安《饮食男女》"
    type: 100
    updated_at: "2019-11-22T06:42:40.000Z"
}
```
