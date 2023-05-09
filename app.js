const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session");
const session_secret = require("config/env.config")
require("express-async-errors");

const { errorHandler } = require("./middleware/error.middleware");
const { httpResponse } = require("./utils/http-responses");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/renderRouters/users');

const app = express();
// mongoose.connect('mongodb://127.0.0.1:27017/usersDB').then(() => {
//   console.log("DB is connected.");
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: session_secret,
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.use(errorHandler);

module.exports = app;
