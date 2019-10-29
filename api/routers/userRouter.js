const userController = require('../controllers/userController');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', userController.aboutMe);
// router.post('/register',userController.register);

module.exports = router;
