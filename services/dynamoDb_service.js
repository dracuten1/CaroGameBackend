var AWS = require('aws-sdk');
const config = require('../configs/appConfigs');

AWS.config.update(config.AWS_CONFIGS);
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-1" });
module.exports = {
    add: user => {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: "user",
                Item: {
                    id: user.name,
                    password: user.pass
                },
            }
            docClient.put(params, function (err, data) {
                console.log(data);
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    },
    get: async (user) => {
        const params = {
            TableName: "user",
            Key: {
                id: user.name,
            }
        }
        try {
            return await docClient.get(params).promise();
        } catch (err) {
            throw err;
        }
    }
}

