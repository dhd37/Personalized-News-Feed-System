const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const app = express();
const articlesRouter = require('./routes/articles');
const topicsRouter = require('./routes/topics');
const authorsRouter = require('./routes/authors');
const commentsRouter = require('./routes/comments');



// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/comments', commentsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});


// helmet for log in security
app.use(helmet());
// Apply rate limiting to all request
const limiter = rateLimit({
  windowMs: 15 * 60 *1000,
  max: 100,
})
app.use(limiter);

module.exports = app;


