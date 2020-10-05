const db = require('../db/db');

const commentModel = {
  add: (username, content, cb) => {
    db.query(
      'insert into comments(username, content) values(?, ?)', 
      [username, content], 
      (error, results, fields) => {
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

module.exports = commentModel;