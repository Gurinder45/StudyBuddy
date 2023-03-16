const express = require('express');
var router = express.Router();





/* GET home page. */
/*
router.get('/welcome',isLoggedIn, function(req, res, next) {
  res.redirect('/welcome')
});

router.get('/login', function(req, res, next) {
  res.redirect('/login')
});

function isLoggedIn(req, res, next) {
  if (!req.session || !req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}
*/
module.exports = router;
