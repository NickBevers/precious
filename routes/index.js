var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect('http://localhost:3000/login.html')
  res.redirect('https://preciouscoin.herokuapp.com/login.html')
});


module.exports = router;
