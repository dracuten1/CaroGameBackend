const dbService = require('../../services/dynamoDb_service');
const config = require('../../configs/appConfigs');
const jwt = require('jsonwebtoken');
const SimpleCrypto = require("simple-crypto-js").default;
const simpleCrypto = new SimpleCrypto(config.ENCODE_KEY);


exports.login = async (req, res) => {
    const { username, password } = req.body;
    const userLogin = {
        name: username,
        pass: password
    }
    dbService.get(userLogin).then(user => {
        console.log(user);
        const token = generateJWT(user.id);
        res.json({ user, token });
    }).catch(err => {
        res.json({ err, msg: 'Login fail' })
    });
};
exports.register = (req, res) => {
    const { username, password } = req.body;
    const user = {
        name: username,
        pass: simpleCrypto.encrypt(password)
    }
    dbService.add(user).then(data => {
        const token = generateJWT(name);
        res.json({ name, token });
    }).catch(err => {
        res.json({ err, msg: 'Register fail' })
    });
};
exports.googleLogin = function (req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    const user = req.user;
    const {name,id} = user;
    const token = generateJWT(user.name);
    res.json({ name, token,id });
};
exports.facebookLogin = function (req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    const user = req.user;
    const {name,id} = user;
    const token = generateJWT(user.name);
    res.json({ name, token,id });
};

const generateJWT = (userId) => {
    const token = jwt.sign(userId, config.JWT_SECRET);
    return token;
}

