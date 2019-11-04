const userController = require('../controllers/userController');

var express = require('express');
var router = express.Router();

router.get('/', userController.aboutMe);
router.post('/updateInfomartion',userController.updateUserInformation);

module.exports = router;
