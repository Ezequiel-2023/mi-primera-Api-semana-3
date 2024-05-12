// ruta para las metas 

var express = require('express');
var router = express.Router();
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
      goals.push(req.body)
      res.status(200).json(goals)
  } else {
    res.status(400).json({error:'no se enviaron los parametros correctos'})
  }  
});

  /* Delete */
router.delete('/removeGoals/:id', function(req, res, next) {
   if (req.params && req.params.id) {
      let id = req.params.id;
      goals = goals.filter(goals => goals.id !== id);
      res.json(goals)
   }   else {
    res.status(200).json(goals)
  }
});

module.exports = router;
