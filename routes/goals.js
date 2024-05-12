// ruta para las metas 

var express = require('express');
var router = express.Router();

// creamos nuestro arreglo para las respuestas 
let goals = []

/* Get  */
router.get('/getGoals', function(req, res, next) {
  res.json(goals)
});

/* Post  */
router.post('/addGoals', function(req, res, next) {
  let timeStamp = Date.now()+Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
      req.body.id = timeStamp.toString()
      tasks.push(req.body)
      res.status(200).json(tasks)
  } else {
    res.status(400).json({error:'no se enviaron los parametros correctos'})
  }  
});

  /* Delete */
router.delete('/removeGoals/:id', function(req, res, next) {
   if (req.params && req.params.id) {
      let id = req.params.id;
      tasks = tasks.filter(task => task.id !== id);
      res.json(tasks)
   }   else {
    res.status(200).json(tasks)
  }
});

module.exports = router;
