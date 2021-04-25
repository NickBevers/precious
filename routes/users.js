var express = require('express');
var router = express.Router();
const authenticateController = require("../controllers/authenticate");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup", authenticateController.postsignup);

module.exports = router;
