const AWS = require('aws-sdk');
const config = require('../configs/appConfigs');
const SimpleCrypto = require("simple-crypto-js").default;

const simpleCrypto = new SimpleCrypto(config.ENCODE_KEY);
AWS.config.update(config.AWS_CONFIGS);

const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-1" });
module.exports = {
    add: async user => {
        const params = {
            TableName: "user",
            Key: {
                id: user.name
            },
        }
        try {
            try {
                const data = await docClient.get(params).promise();
                if (data.Item.id) {
                    throw ('Ten dang nhap ton tai!');
                }
            } catch (err) {

            }
            const putParams = {
                TableName: "user",
                Item: {
                    id: user.name,
                    password: user.pass
                },
            }
            // console.log(putParams)
            return docClient.put(putParams).promise();

        } catch (err) {
            throw err;
        }
    },
    get: async (user) => {
        const params = {
            TableName: "user",
            Key: {
                id: user.name,
            }
        }
        try {
            const data = await docClient.get(params).promise();
            const password = simpleCrypto.decrypt(data.Item.password);
            console.log(password);
            console.log(user.pass);
            if (password == user.pass) {
                const user = { ...data.Item };
                delete user.password;
                return user;
            }
            throw ('Sai password')
        } catch (err) {
            throw err;
        }
    }
}

