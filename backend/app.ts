import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { Exception } from './model/objects';
// import routes
import unauthenticated from './routes/unauthenticated';
import users from './routes/users';
import goals from './routes/goals';
import { authenticatedUser } from './routes/utils/auth';

const app = express();

// setup middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger(':method :url STATUS: :status CONTENT-LENGTH: :res[content-length] RESP-TIME: :response-time ms', {
  skip: (req, _) => req.baseUrl === '/'
}));

// Base routes that do not authenticate
app.use('/', unauthenticated); // health, register, login

// Routes that authenticate
app.use('/users', authenticatedUser, users); // delete user
app.use('/goals', authenticatedUser, goals); // create goal


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler for all functions
app.use(function (err: (HttpError | Exception), req: Request, res: Response, next: NextFunction) {
  if (err.status !== 404) { // 404 stack traces are dumb. Who cares
    console.log(err);
  }

  if (err.message && err.data) {
    res.status(err.status || 500).send({message: err.message, data: err.data});
  } else if (err.message) {
    res.status(err.status || 500).send({message: err.message});
  } else if (err.data) {
    res.status(err.status || 500).send({data: err.data});
  } else {
    res.status(err.status || 500).send();
  }
});

export default app;