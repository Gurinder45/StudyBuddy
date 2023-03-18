const express = require('express');
const router = express.Router();
const User = require('../user.model');

router.post('/auth', async function(req, res, next) {
  const { username, password } = req.body;
  
  User.findOne({ username: username }, function(err, user) {
    
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    req.session.user = user;
    req.session.regenerate(function(err) {
      if (err) {
        console.log(err)
      } else {
        // the session has been regenerated, do something with it
      }
    });
    res.redirect('/');
  });
  
});

router.get('/check-logged-in', async function(req, res, next) {
  console.log(req.session.user)
  let loggedIn = false
  if(req.session.user){
    loggedIn = true
  }
  
  res.json({ loggedIn });
});


module.exports = router;
