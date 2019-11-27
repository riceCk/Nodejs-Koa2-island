/**
 * 查询flow表关联其他三个表的查询逻辑
 * */


const {Op} = require('sequelize');
const {flatten} = require('lodash');

const {Movie, Sentence, Music} = require('./classic');



class Art {
  constructor (art_id, type) {
    this.art_id = art_id
	this.type = type
  }
  async getDetail (uid) {
	const art = await Art.getData(+this.art_id, +this.type)
	const {Favor} = require('./favor');
	if (!art) {
	  throw new global.errs.NotFound();
	}
		const like = await Favor.userLikeIt(+this.art_id, +this.type, uid);
	return {
	  art,
	  like_status: like
	}
  }
  static async getData(art_id, type) {
	let art = null
	const finder  = {
	  where: {
		id: art_id,
	  }
	}
	switch (type) {
	  case 100:
		art = await Movie.findOne(finder)
		break;
	  case 200:
		art = await Music.findOne(finder)
		break;
	  case 300:
		art = await Sentence.findOne(finder)
		break;
	  case 400:
		// 书籍
		  const {Book} = require('./book');
		  art = await Book.findOne(finder);
		  if (!art) {
		    art = await Book.create({
			  id: art_id,
			})
		  }
		break;
	  default:
		break;
	}
	// if (art && art.image) {
	//   let imageUrl = art.dataValues.image
	//   art.dataValues.image = global.config.host + imageUrl
	// }
	return art
  }

  static async getList(artInfoList) {
	const artInfoObj = {
	  100: [],
	  200: [],
	  300: []
	}
	for (let artInfo of artInfoList) {
	  artInfoObj[artInfo.type].push(artInfo.art_id)
	}
	const arts = []
	for (let key in artInfoObj) {
	  const ids = artInfoObj[key]
	  if (ids.length === 0) {
		continue;
	  }
	  arts.push(await Art.__getListByType(artInfoObj[key], +key))
	}
	return flatten(arts)
  }

  static async __getListByType(ids, type) {
	let arts = []
	const finder = {
	  where: {
		id: {
		  [Op.in]: ids
		},
	  }
	}
	const scope = 'bh'
	switch (type) {
	  case 100:
		arts = await Movie.findAll(finder)
		break;
	  case 200:
		arts = await Music.findAll(finder)
		break;
	  case 300:
		arts = await Sentence.findAll(finder)
		break;
	  case 400:
		// 书籍
		break;
	  default:
		break;
	}
	return arts
  }
}

module.exports = {
  Art
}
