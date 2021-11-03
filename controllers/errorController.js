const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `${err.path} ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const errorPath = Object.keys(err.keyPattern)[0];
  // const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

  const message = `${errorPath} already exists!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errorPath = Object.values(err.errors).map(el => el.path);
  const errors = Object.values(err.errors).map(el => el.message);

  // const message = `${errorPath.join(',')}: Invalid input data. ${errors.join(', ')}`;
  const message = `${errorPath[0]} ${errors[0]}`;
  
  return new AppError(message, 400);
};

const handleValidationErrorTwo = err => {

  const errorPath = Object.values(err.errors).map(el => el.path);
  const errors = Object.values(err.errors).map(el => el.message);

  // const message = `${errorPath.join(',')}: Invalid input data. ${errors.join(', ')}`;
  const message = `${errorPath[0]} ${errors[0]}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

//   // B) RENDERED WEBSITE
//   console.error('ERROR 💥', err);
//   return res.status(err.statusCode).json({
//     title: 'Something went wrong!',
//     msg: err.message
//   });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        isOperational: true,
        status: err.status,
        message: err.message
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      isOperational: true,
      status: 'error',
      message: 'Something went very wrong!'
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  // if (err.isOperational) {
  //   return res.status(err.statusCode).json({
  //     title: 'Something went wrong!',
  //     msg: err.message
  //   });
  // }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).json({
    isOperational: true,
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    console.log(error)
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (typeof error._message !== 'undefined' && error._message.split(' ')[1] === 'validation') error = handleValidationErrorTwo(error)
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};