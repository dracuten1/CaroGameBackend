const dbService = require('../../services/dynamoDb_service');
exports.aboutMe = async (req, res) => {
    const user = req.user;
    res.json(user);
};
exports.updateUserInformation = async (req, res) => {
    
}


