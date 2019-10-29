const authController = require('../controllers/authController');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login',authController.login);
router.post('/register',authController.register);

module.exports = router;
