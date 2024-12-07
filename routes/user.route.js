const router = require('express').Router();
// when path consit 'profile' then rendering user data
router.get('/profile', async (req, res, next) => {
  const person = req.user;
  res.render('profile', { person });
});

module.exports = router;
