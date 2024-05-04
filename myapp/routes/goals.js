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
    req.body.id = timeStamp.toString()
    goals.push(req.body)
    res.json(goals)
  });

  /* Delete */
router.delete('/removeGoals/:id', function(req, res, next) {
  let id = req.params.id;
  goals = goals.filter(goal => goal.id !== id);
  res.json(goals)
});

module.exports = router;
