const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize');

class Comment extends Model {
  /**
   * 新增评论方法
   */
  static async addComment(bookID, content) {
    // 点赞 +1
	const comment = await Comment.findOne({
	  where: {
	    book_id: bookID,
		content
	  }
	})
	if (!comment) {
		return await Comment.create({
		  book_id: bookID,
		  content,
		  nums: 1
		})
	} else {
	  return await comment.increment('nums', {
		by: 1
	  })
	}
  }

  /**
   * 查询短评方法
   */

  static async getComments (bookID) {
    const comments = await Comment.findAll({
	  where: {
	    book_id: bookID
	  }
	})
	return comments
  }

  toJSON () {
    return {
      content: this.getDataValue('content'),
	  nums: this.getDataValue('nums')
	}
  }
}

Comment.init({
  book_id: Sequelize.INTEGER,
  content: Sequelize.STRING(12),
  nums: {
    type: Sequelize.INTEGER,
	defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'comment'
})

module.exports = {
  Comment
}

