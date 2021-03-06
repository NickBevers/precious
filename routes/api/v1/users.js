var express = require('express');
var router = express.Router();
const authenticateController = require("../../../controllers/api/v1/authenticate");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/mail", authenticateController.emailauth);
router.post("/signup", authenticateController.postsignup);
router.post("/login", authenticateController.postlogin);
router.get("/getdata", authenticateController.getAllUsers);
router.get("/confirmation/:token", authenticateController.confirmUser);

module.exports = router;
