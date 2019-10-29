const aws = require('../../configs/awsConfig');
exports.login = (req, res) => {
    const { name, password } = req.body;
    res.json({ name, password });
};
exports.register = (req, res) => {
    const { name, password } = req.body;
    res.json({ name, password });
};

