// ruta para las metas 

var express = require('express');
var router = express.Router();
let goals = []

const mysql = require('mysql2')

var conection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'Ardi_192*',
  database : 'mysql'
});

/* Get  */
router.get('/getGoals', (req, res, next)=> {
  let queryGetGoal = 'SELECT * FROM GOALS';
  conection.query(queryGetGoal,(err,results,filds)=>{
    if(err){
      res.status(500).json(err);
    }else{
      res.status(200).json(results);
    }
  })
});

/* Post  */
router.post('/addGoals',(req, res, next)=> {
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
      let queryCreateGoals = 'INSERT INTO GOALS (name,description,dueDate) \
      VALUES ("'+req.body.name+'","'+req.body.description+'","'+req.body.dueDate+'")'
      conection.query(queryCreateGoals,(err, results, filds) => {
        if (err) {
          res.status(500).json(err)
        } else {
          res.status(200).json(results)
        }
    });
  } 
});

  /* Delete */
router.delete('/removeGoals/:id', (req, res, next)=> {
   if (req.params && req.params.id) {
      let id = req.params.id;
      let queryDeleteGoals = 'DELETE FROM GOALS WHERE id ="'+id+'"';
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
