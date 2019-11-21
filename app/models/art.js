/**
 * 查询flow表关联其他三个表的查询逻辑
 * */


const {Movie, Sentence, Music} = require('./classic');


class Art {
  static async getData(art_id, type) {
	let art = null
	const finder = {
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
		break;
	  default:
		break;
	}
	return art
  }
}

module.exports = {
  Art
}
