const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./db/db');
const app = express();
const port = 3000;

const todo_controller = require('./controllers/todo_controller');


app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.post('/todos', (req, res) => {
  todo_controller.newTodo(req, res);
})
app.get('/todos', (req, res) => {
  todo_controller.getAll(req, res);
})

app.get('/todos/:id', (req, res) => {
  todo_controller.get(req, res);
})

app.get('/', (req,res) => {
  todo_controller.addTodo(req, res);
})

app.get('/login', (req, res) => {
  res.render('login',{
    errorMessage: req.flash('errorMessage')
  });
})

app.post('/login', (req, res) => {
  if (req.body.password === 'abc') {
    req.session.isLogin = true;
    res.redirect('/');
  } else {
    req.flash('errorMessage', 'Please input the correct password.')
    res.redirect('/login');
  }
})

app.get('/logout', (req, res) => {
  req.session.isLogin = false;
  res.redirect('/');
})


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