const router = require('express').Router();
//Rendering the index file when path is empty
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
