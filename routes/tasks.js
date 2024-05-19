// ruta para las tareas

var express = require('express');
var router = express.Router();

const mysql = require('mysql2')

var conection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'Ardi_192*',
  database : 'mysql'
});

let tasks = []

/* Get  */
router.get('/getTasks', function(req, res, next) {
  let queryGetTastks = 'SELECT * FROM TASKS';
  conection.query(queryGetTastks,(err,results,filds)=>{
    if(err){
      res.status(500).json(err);
    }else{
      res.status(200).json(results);
    }
  })
});

/* Post  */
router.post('/addTasks', function(req, res, next) {
  if (req.body && req.body.name && req.body.description && req.body.dueDate) {
    let queryCreateTasks = 'INSERT INTO TASKS (name,description,dueDate) \
    VALUES ("'+req.body.name+'","'+req.body.description+'","'+req.body.dueDate+'")'
    conection.query(queryCreateTasks,(err, results, filds) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(results)
      }
  });
} 
});
  /* Delete */
router.delete('/removeTasks/:id', function(req, res, next) {
  if (req.params && req.params.id) {
    let id = req.params.id;
    let queryDeleteGoals = 'DELETE FROM TASKS WHERE id ="'+id+'"';
    conection.query(queryCreateGoals,(err, results, filds) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(results)
      }
    }) 
  }  
});
module.exports = router;
