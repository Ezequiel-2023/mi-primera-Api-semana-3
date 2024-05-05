// ruta para las tareas

var express = require('express');
var router = express.Router();

// creamos nuestro arreglo para las respuestas 
let tasks = []

/* Get  */
router.get('/getTasks', function(req, res, next) {
  res.json(tasks)
});

/* Post  */
router.post('/addTasks', function(req, res, next) {
    let timeStamp = Date.now()+Math.random();
    req.body.id = timeStamp.toString()
    tasks.push(req.body)
    res.json(tasks)
  });

  /* Delete */
router.delete('/removeTasks/:id', function(req, res, next) {
  let id = req.params.id;
  tasks = tasks.filter(task => task.id !== id);
  res.json(tasks)
});

module.exports = router;
