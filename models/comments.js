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

  getAll: (cb) => {
    db.query(
      'SELECT U.nickname, C.content, C.id, C.username FROM comments as C LEFT JOIN users as U ON U.username = C.username ORDER BY C.id DESC', (error, results, fields) => {
        if (error) return cb(error);
        cb(null, results)
    });
  },

  delete: (username, id, cb) => {
    db.query(
      'delete FROM comments where username = ? AND id = ?', 
      [username, id], 
      (error, results, fields) => {
        if (error) return cb(error);
        cb(null, results)
      }
    )
  },

  get: (id, cb) => {
    db.query(
      'SELECT U.nickname, C.content, C.id, C.username FROM comments as C LEFT JOIN users as U ON U.username = C.username WHERE C.id = ?', [id],(error, results, fields) => {
        if (error) return cb(error);
        cb(null, results[0] || {})
    });
  },

  update: (username, id, content, cb) => {
    db.query(
      'UPDATE comments SET content = ? WHERE id = ? AND username = ?', 
      [content, id, username], 
      (error, results, fields) => {
        if (error) return cb(error);
        cb(null, results)
      }
    )
  }
}

module.exports = commentModel;