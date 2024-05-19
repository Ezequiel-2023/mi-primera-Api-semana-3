// App servidor 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// rutas 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goalsRouter = require('./routes/goals');
var tasksRouter = require('./routes/tasks')
const { error } = require('console');
const router =  express.Router();
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2')

var conection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'Ardi_192*',
  database : 'mysql'
});

conection.connect((err) => {
  if (err) {
    console.log('no se pudo conectar' + err.stack)
  } else {
    console.log('Conectado a la base de datos')
  }
});

let queryCreateDB = 'CREATE DATABASE IF NOT EXISTS CONTROL_TAREAS_METAS';

let queryCreateTableGoals = ` CREATE TABLE IF NOT EXISTS GOALS (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  dueDate VARCHAR(255) NOT NULL
 )`;

let queryCreateTableTasks = `CREATE TABLE IF NOT EXISTS TASKS (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  dueDate VARCHAR(255) NOT NULL
)`;


conection.query(queryCreateDB, (err, results, filds)=>{
  if (err){
    console.log(err);
    return;
  }else{
  console.log('base de datos creada')
  console.log(results); 
  console.log(filds)
  }
})

conection.query(queryCreateTableGoals, (err, results, filds)=>{
  if (err){
    console.log(err);
    return;
  }else{
  console.log('tabla de metas creada')
  console.log(results); 
  console.log(filds)
  }
})

conection.query(queryCreateTableTasks, (err, results, filds)=>{
  if (err){
    console.log(err);
    return;
  }else{
  console.log('tabla tareas creada')
  console.log(results); 
  console.log(filds)
  }
})


conection.destroy()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use('/', router);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

router.use((req, res, next) =>{
   if(req.headers.authorization && req.headers.authorization === 'desarrolloDeAplicacionesWeb'){
    next();
   }else{
    res.status(401).json({'error':'no se estan enviado las credenciales'})
   }

});

//utilizar app para la ruta 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goals', goalsRouter);
app.use('/tasks', tasksRouter)

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

module.exports = app;
