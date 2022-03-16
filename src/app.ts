import createError from 'http-errors';
import express, {Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import expressLayouts from "express-ejs-layouts";
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import booksRouter from './routes/books';

const flash = require('express-flash')
const session = require('express-session');


import fs from 'fs';
const database = require('../database');
const users = require('../users');
// const config = require('config')

const app = express();
app.use(cors());
// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "../assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "../assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "../assets/js")))
app.use('/webfonts', express.static(path.resolve(__dirname, "../assets/webfonts")))


app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret: 'secret token',
//   resave: false,
//   saveUninitialized: true,
//   unset: 'destroy',
//   // store: store,
//   name: 'session cookie name',
//   // genid: (req) => {
//   //     // Returns a random string to be used as a session ID
//   // }
// }));


//app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', booksRouter);

// app.use(session({
//   secret:'secret',
//   cookies:{message:6000},
//   resave:false,
//   saveUninitialized:false
// }))
// app.use(flash())


// import os from 'os'

// app.use(function(req, res, next) {
//   console.log(`The os `);
//   if (req.headers.authorization?.trim().length) {
//     console.log("authorization present");
    
//   }else{
//     console.log("authorization not present");
    
//   }
//   console.log(`${req.headers['user-agent']}`)
//   next();
  
  
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
