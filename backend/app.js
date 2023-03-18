var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
const db = require('./db'); // Import the database connection
var app = express();
app.use(
  session({
      name: 'session',
      secret: 'customer',
      resave:false,
      maxAge: 30*60*1000,
      saveUninitialized: true
  })
)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
var options = {
  dotfiles: 'ignore',
  extensions: ['htm','html','json']
}

/*
app.use('/',express.static(path.join(__dirname, 'build'),options));

app.get('/*', async function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//server from the react build folder


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});



module.exports = app;
