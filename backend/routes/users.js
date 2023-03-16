const express = require('express');
const router = express.Router();
const User = require('../user.model');

router.post('/auth', async function(req, res, next) {
  const { username, password } = req.body;
  res.redirect('/welcome');

  User.findOne({ username: username }, function(err, user) {
    console.log(req.session)
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    req.session.user = user;
  });
  
});


module.exports = router;
