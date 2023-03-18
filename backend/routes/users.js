const express = require('express');
const router = express.Router();
const User = require('../user.model');

router.post('/auth', async function(req, res, next) {
  console.log("heeee")
  const { username, password } = req.body;
  
  User.findOne({ username: username, password: password }, function(err, user) {
    
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    

    req.session.regenerate(function(err) {
      if (err) {
        console.log(err)
        res.status(500).send('Session regeneration failed');
      } else {
        req.session.user = user;
        console.log(req.session)
        console.log(req.sessionID)
        // the session has been regenerated, do something with it
        res.status(200).send('Login successful');
      }
    });
  });
  
});

router.post('/signup', async function(req,res,next){
  const { username, password, university, courses } = req.body;

  // create a new user with the provided information
  const user = new User({
    username: username,
    password: password,
    university: university,
    courses: courses
  });

  // save the new user to the database
  try {
    await user.save();
    req.session.regenerate(function(err) {
      if (err) {
        console.log(err)
        res.status(500).send('Session regeneration failed');
      } else {
        req.session.user = user;
        console.log(req.session)
        console.log(req.sessionID)
        // the session has been regenerated, do something with it
        res.status(200).send('Login successful');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
})

router.get('/check-username/:username', async (req, res) => {
  const username = req.params.username;
  // Check if username exists in database
  const user = await User.findOne({ username: username });
  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

router.get('/check-logged-in', async function(req, res, next) {
  console.log(req.session)
  console.log(req.sessionID)
  let loggedIn = false
  if(req.session.user){
    loggedIn = true
  }
  
  res.json({ loggedIn });
});


router.get('/logout', function(req, res, next) {
  let loggedOut = true
  req.session.destroy(function(err) {
    if (err) {
      loggedOut = false
    }

    res.json({ loggedOut });
  });
});


module.exports = router;
