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
  },
  index: (req, res, ) => {
    commentModel.getAll((err, results) => {
      if (err) {
        req.flash('errorMessage', err.toString());
      }
      res.render('index', {
        comments: results
      })
    })
  },

  delete: (req, res) => {
    commentModel.delete(req.session.username,req.params.id, (err) => {
      res.redirect('/')
    });
  },

  update: (req, res) => {
    commentModel.get(req.params.id, (err, result) => {
      res.render('update', {
        comment: result
      })
    });
  },

  handleUpdate: (req, res) => {
    commentModel.update(req.session.username, req.params.id, req.body.content, (err) => {
      res.redirect('/');
    })
  }
};

module.exports = commentController;