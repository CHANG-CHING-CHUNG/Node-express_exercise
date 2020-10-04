const db = require('../db/db');

const todoModel = {
  getAll: (cb) => {
    db.query(
      'SELECT * FROM todos', (error, results, fields) => {
      if (error) return cb(error);
      cb(null, results)
    });
  },

  get: (id, cb) => {
    db.query(
      'SELECT * FROM todos WHERE id = ?', [id] , (error, results, fields) => {
        if (error) return cb(error);
        cb(null, results)
    });
  },
  add: (content, cb) => {
    db.query(
      'insert into todos(todo) values(?)', [content], (error, results, fields) => {
        if (error) return cb(error);
        cb(null, results)
      }
    )
  }
}

module.exports = todoModel;