## 期刊

**注：**
所有的业务接口设中间token拦截，所以`Basic Auth`中需要设置传入token

### 最新一期期刊

#### URL
```bash
GET     /v1/classic/latest
```

#### Response 200:
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

#### Response_description:
* content：期刊内容
* fav_nums: 点赞次数
* image: 图片
* index: 期号
* like_status: 是否点赞
* pubdate: 发布日期
* title: 期刊题目
* type: 期刊类型,这里的类型分为:100 电影 200 音乐 300 句子
* id: 期刊在数据中序号，供点赞使用
