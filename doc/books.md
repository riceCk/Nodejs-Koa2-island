# 书籍接口

## 1、获取热门书籍列表

### URL
```bash
GET    /v1/book/hot_list
```

### Response 200:
```bash
[
  {
    "id": 7,
    "index": 1,
    "image": "https://images-cn.ssl-images-amazon.com/images/I/313BTmdmIfL._AA218_.jpg",
    "author": "吴承恩\r\n",
    "title": "西游记 (古典名著普及文库)",
    "created_at": null,
    "updated_at": null,
    "deleted_at": null,
    "count": 2
  },
  {
    "id": 65,
    "index": 2,
    "image": "https://images-cn.ssl-images-amazon.com/images/I/313BTmdmIfL._AA218_.jpg",
    "author": "James George Frazer\r\nWilliam Shakespeare, (威廉·莎士比亚)\r\n",
    "title": "Div Into Python3",
    "created_at": null,
    "updated_at": null,
    "deleted_at": null,
    "count": 3
  }
]
```


### Response_description:
* index: 排序序号
* image: 书籍照片url
* author: 书籍作者
* title: 书籍标题
* count: 书籍“我喜欢”数量

## 2、获取书籍详细信息

### URL
```bash
GET    v1/book/:id/detail
```

### Parameters:
* id: 书籍id号

### Response 200:
```bash
{
  "author": [
    "[日]东野圭吾"
  ],
  "binding": "平装",
  "category": "小说",
  "id": 1120,
  "image": "https://img3.doubanio.com/lpic/s4610502.jpg",
  "images": {
    "large": "https://img3.doubanio.com/lpic/s4610502.jpg"
  },
  "isbn": "9787544242516",
  "pages": "467",
  "price": "29.80元",
  "pubdate": "2008-9",
  "publisher": "南海出版公司",
  "subtitle": "",
  "summary": "“只希望能手牵手在太阳下散步”，这个象征故事内核的绝望念想，有如一个美丽的幌子，随着无数凌乱、压抑、悲凉的故事片段像纪录片一样一一还原：没有痴痴相思，没有海枯石烂，只剩下一个冰冷绝望的诡计，最后一丝温情也被完全抛弃，万千读者在一曲救赎罪恶的凄苦爱情中悲切动容……",
  "title": "白夜行",
  "translator": [
    "刘姿君"
  ]
}
```


### Response_description:
* index: 排序序号
* image: 书籍照片url
* author: 书籍作者
* title: 书籍标题
* count: 书籍“我喜欢”数量

## 3、搜索书籍
```bash
GET     /v1/book/search
```

### Parameters:
* q: 检索关键字（必须）
* start: 数据开始
* content： 每次返回多少条数据


## 4、获取喜欢书籍数量

### URL:
```bash
GET     /v1/book/favor/count
```

### Response 200:
```bash
{
    count: 2
}
```

## 5、获取书籍点赞情况

### URL:
```bash
GET     /v1/book/:book_id/favor
```

### Response 200:
```bash
{
    fav_nums: 3, 
    like_status: 1
}
```

## 6、新增短评

### URL:
```bash
POST     /v1/book/add/short_comment
```

#### Parameters:
* content: 短评内容（必填），1-24字符
* book_id: 书籍id号（必填）

## 7、获取短评

### URL:
```bash
GET     /v1/book/:book_id/short_comment
```

#### Response 200:
```bash
[
  {
    "id": 1,
    "book_id": 1120,
    "content": "春风十里不如你",
    "nums": 7,
    "created_at": "2019-11-25T13:08:27.000Z",
    "updated_at": "2019-11-25T13:20:59.000Z",
    "deleted_at": null
  },
  {
    "id": 2,
    "book_id": 1120,
    "content": "嘻嘻哈哈",
    "nums": 1,
    "created_at": "2019-11-25T13:35:27.000Z",
    "updated_at": "2019-11-25T13:35:27.000Z",
    "deleted_at": null
  }
]
```

## 8、获取热搜关键字

### URL:
```bash
GET     /v1/book/hot_keyword
```

#### Response 200:
```bash
{
  "hot": [
    "Python",
    "哈利·波特",
    "村上春树",
    "东野圭吾",
    "白夜行",
    "韩寒",
    "金庸",
    "王小波"
  ]
}
```
