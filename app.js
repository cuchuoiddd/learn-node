import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import bodyParser from 'body-parser'
// import bb from 'express-busboy'
import SourceMapSupport from 'source-map-support'
import http from 'http'
import SocketIo from 'socket.io'

// define our app using express
const app = express();
const port = process.env.PORT || '1993'
const server = http.createServer(app);
const io = SocketIo(server);

// express-busboy to parse multipart/form-data
// bb.extend(app);

// import router
import indexRouter from './routes/routes_index'
import usersRouter from './routes/routes_users'

// view engine setup

app.set('views', path.join(__dirname, 'App/views'))
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
 *	Using database config
 */
 import databaseConfig from './config/mongodb';
 databaseConfig();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

// add Source Map Support
SourceMapSupport.install();

app.use(function(req, res, next) {
  req.io = io;  
  next();
});

// use router
app.use('/'     , indexRouter)
   .use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


server.listen(port, err => {
  if(err) console.log(err);
    console.log("Server listen port on ", port);
});
