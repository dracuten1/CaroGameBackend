const authController = require('../controllers/authController');

var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.post('/login', authController.login);
router.post('/register', authController.register);

router.post('/google', passport.authenticate('google-token', { session: false }), authController.googleLogin);
router.post('/facebook', passport.authenticate('facebook-token', { session: false }), authController.facebookLogin);
module.exports = router;
