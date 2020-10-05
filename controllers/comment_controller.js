const commentModel = require('../models/comments');

const commentController = {
  addComment: (req, res, next) => {
    const { username} = req.session;
    const { content } = req.body;
    if (!username || !content) {
      req.flash('errorMessage', '缺少必要欄位')
      return next();
    }
    commentModel.add(username, content, (err) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      res.redirect('/');
    })
  }
};

module.exports = commentController;