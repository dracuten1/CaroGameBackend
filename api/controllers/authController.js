const dbService = require('../../services/dynamoDb_service');
const config = require('../../configs/appConfigs');
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
    const { name, password } = req.body;
    const user = {
        name: name,
        pass: password
    }
    dbService.get(user).then(data => {
        const token = generateJWT(name);
        res.json({ name, token });
    }).catch(err => {
        res.json({ err, msg: 'Login fail' })
    });
};
exports.register = (req, res) => {
    const { name, password } = req.body;
    const user = {
        name: name,
        pass: password
    }
    dbService.add(user).then(data => {
        const token = generateJWT(name);
        res.json({ name, token });
    }).catch(err => {
        res.json({ err, msg: 'Register fail' })
    });
};

const generateJWT = (userId) => {
    const token = jwt.sign(userId, config.JWT_SECRET);
    return token;
}

