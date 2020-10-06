const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./db/db');
const app = express();
const port = 3000;

const todo_controller = require('./controllers/todo_controller');
const user_controller = require('./controllers/user.controller');
const comment_controller = require('./controllers/comment_controller');

app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
})


app.post('/todos', (req, res) => {
  todo_controller.newTodo(req, res);
})
app.get('/todos', (req, res) => {
  todo_controller.getAll(req, res);
})
app.get('/todos/:id', (req, res) => {
  todo_controller.get(req, res);
})

app.get('/', comment_controller.index, redirectBack);

function redirectBack(req, res) {
  res.redirect('back');
}
app.get('/login', user_controller.login);
app.post('/login', user_controller.handleLogin, redirectBack)
app.get('/logout', user_controller.logout)
app.get('/register', user_controller.register);
app.post('/register', user_controller.handleRegister, redirectBack);

app.post('/comments', comment_controller.addComment);
app.get('/delete_comments/:id', comment_controller.delete);
app.get('/update_comments/:id', comment_controller.update);
app.post('/update_comments/:id', comment_controller.handleUpdate);

app.listen(port, () => {
  db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('Database connected as id ' + db.threadId);
  });
  console.log('Server is running...');
})