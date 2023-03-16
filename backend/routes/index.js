const express = require('express');
var router = express.Router();



router.get('/welcome',isLoggedIn, function(req, res, next) {
  console.log("hello")
  res.sendFile('/Users/sukhrajpurewal/studybuddy/backend//build/index.html');
});


router.get('/login', function(req, res, next) {
  console.log("hello")
  console.log(__dirname)
  res.sendFile('/Users/sukhrajpurewal/studybuddy/backend//build/index.html');
});

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('http://localhost:8080')
  }
}







/* GET home page. */
/*
router.get('/welcome',isLoggedIn, function(req, res, next) {
  res.redirect('/welcome')
});

router.get('/login', function(req, res, next) {
  res.redirect('/login')
});


*/
module.exports = router;
