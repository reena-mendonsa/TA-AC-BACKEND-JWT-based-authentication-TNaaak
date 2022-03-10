var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

require('dotenv').config();


mongoose.connect(
  'mongodb://localhost/conduit-api',
    (err) => {
    console.log(err ? err : 'connected to db');
  }
);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/login');
var profileRouter = require('./routes/profiles');
var articleRouter = require('./routes/articles');
var tagRouter = require('./routes/tags');
var userRouter = require('./routes/user');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/users', usersRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/articles', articleRouter);
app.use('/api/tags', tagRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ errors: { body: [err] } });
});

module.exports = app;