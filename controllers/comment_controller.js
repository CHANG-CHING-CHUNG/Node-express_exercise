const db =require('../models');
const Comment = db.Comment;
const User = db.User;

const commentController = {
  addComment: (req, res, next) => {
    const { userId } = req.session;
    const { content } = req.body;
    if (!userId || !content) {
      req.flash('errorMessage', '缺少必要欄位')
      return next();
    }
   
    Comment.create({
      UserId: userId,
      content
    }).then(() => {
      res.redirect('/');
    })  

  },
  index: (req, res, ) => {
    Comment.findAll({
      include: User
    }).then((comments) => {
      res.render('index', {
        comments
      })
    })
  },

  delete: (req, res) => {

    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(comment => {
      return comment.destroy();
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/');
    })
  },

  update: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
      }
    }).then(comment => {
      res.render('update', {
        comment
      })
    })
  },

  handleUpdate: (req, res) => {

    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(comment => {
      return comment.update({
        content: req.body.content
      });
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/');
    })
  }
};

module.exports = commentController;