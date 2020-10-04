const todoModel = require('../models/todo');

const todoController = {
  getAll: (req, res) => {
    todoModel.getAll((err, results) => {
      if (err) console.log(err);
      res.render('todos', {
        todos: results
      })

    });
  },

  get: (req, res) => {
    const id = req.params.id
    todoModel.get(id, (err, results) => {
      if (err) console.log(err);
      if (!results[0]) {
        res.render('todo', {
          todo: 'Empty'
        })
        return 
      }
      res.render('todo', {
        todo: results[0]
      })
    });
  },
  addTodo: (req, res) => {
    res.render('addTodo', {
      isLogin: req.session.isLogin
    })
  },
  newTodo: (req, res) => {
    const content = req.body.content;
    todoModel.add(content, (err) => {
      if (err) console.log(err);
      res.redirect('/todos');
    })
  }
};

module.exports = todoController;