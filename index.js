const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = process.env.PORT || 3000;

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
  console.log('Server is running...');
})