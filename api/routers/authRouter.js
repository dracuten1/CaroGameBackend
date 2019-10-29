const authController = require('../controllers/authController');
module.exports = function (app) {
    app.route('/auth/login')
        .post(authController.login);
    app.route('/auth/register')
        .post(authController.register);
};