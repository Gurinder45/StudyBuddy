const express = require('express');
const router = express.Router();
const User = require('../user.model');

router.post('/auth', async function(req, res, next) {
  console.log("heeee")
  const { username, password } = req.body;
  
  User.findOne({ username: username }, function(err, user) {
    
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    req.session.user = user;
    console.log(req.session.user)

    req.session.regenerate(function(err) {
      if (err) {
        console.log(err)
        res.status(500).send('Session regeneration failed');
      } else {
        // the session has been regenerated, do something with it
        res.status(200).send('Login successful');
      }
    });
    
    //res.redirect('/welcome');
  });
  
});

router.post('/check-logged-in', async function(req, res, next) {
  console.log(req.session)
  let loggedIn = false
  if(req.session.user){
    loggedIn = true
  }
  
  res.json({ loggedIn });
});


module.exports = router;
