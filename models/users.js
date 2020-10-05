const db = require('../db/db');

const userModel = {
  add: (user, cb) => {
    db.query(
      'insert into users(username, password, nickname) values(?, ?, ?)', 
      [user.username, user.password, user.nickname], (error, results, fields) => {
        if (error) return cb(error);
        cb(null, results)
      }
    )
  },

  get: (username, cb) => {
    db.query(
      'SELECT * FROM users WHERE username = ?', [username] , (error, results, fields) => {
        if (error) return cb(error);
        cb(null, results[0])
    });
  },
}

module.exports = userModel;