## 项目介绍
[![koa](https://img.shields.io/badge/koa-%5E2.7.0-brightgreen.svg) ](https://www.npmjs.com/package/koa)
[![koa-router](https://img.shields.io/badge/koa--router-%5E7.4.0-brightgreen.svg)](https://www.npmjs.com/package/koa-router)
[![sequelize](https://img.shields.io/badge/sequelize-%5E5.6.1-brightgreen.svg)](https://www.npmjs.com/package/sequelize)
[![mysql2](https://img.shields.io/badge/mysql2-%5E1.6.5-brightgreen.svg)](https://www.npmjs.com/package/mysql2)

Node.js Koa2 实战开发微信小程序服务端API接口。

## 项目使用
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。
```
# 克隆项目代码
$ git clone https://github.com/riceCk/island.git

# 进入koa项目根目录
$ cd island

# 安装包
$ npm install

# 运行服务
$ npm run dev

# 打开浏览器输入回车：http://localhost:3000
```

## 项目亮点
基于koa2实现服务编程，async/await异步编程，class面向对象编程

- 以Koa框架为基础，进行Koa二次开发，封装属于自己的中间件
- `kou-router`的路由自动加载
- 利用`jsonwebtoken`实现token用户登录以及鉴权处理
- 应用`Sequelize`类创建实例后，创建或定义Model（模型）、执行查询、同步数据库结构等操作
- `Validator` 与 `LinValidator` 验证器进行参数验证
- 了解异步编程，`async/await`的奇妙
- 封装全局异常处理中间件

## API 说明
- [用户接口](./doc/user.md)

## 项目来源与正版教程
- 请支持正版教程：[《纯正商业级应用－Node.js Koa2开发微信小程序服务端》](https://s.imooc.com/SHHXs2R), by 慕课网：7七月老师
- [开源：lin-cms-koa](https://github.com/TaleLin/lin-cms-koa), by TaleLin Team

