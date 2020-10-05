const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {

  login: (req, res) => {
    res.render('user/login')
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },

  register: (req, res) => {
    res.render('user/register');
  },

  handleRegister: (req, res, next) => {
    const {username, password, nickname} = req.body;
    if (!username || !password || !nickname) {
      req.flash('errorMessage', '缺少必要欄位')
      return next();
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      userModel.add({
        username,
        nickname,
        password: hash
      }, (err)=> {
        if (err) {
          req.flash('errorMessage', err.toString());
          return next();
        }
        req.session.username = username;
        res.redirect('/');
      })
    });
  },

  handleLogin: (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '該填的沒填')
      return next()
    }
   
    userModel.get(username, (err, user) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next()
      }
      if (user == undefined) {
         req.flash('errorMessage', '無該使用者');
         return next()
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if (err || !result) {
           req.flash('errorMessage', '密碼錯誤!')
           return next()
        }

        req.session.username = user.username;
        res.redirect('/')
    });
    })
  }
};

module.exports = userController;