exports.AWS_CONFIGS = {
    'region': 'ap-southeast-1',
    'endpoint': 'https://dynamodb.ap-southeast-1.amazonaws.com',
    'accessKeyId': process.env.ACCESS_KEY_ID,
    'secretAccessKey': process.env.SECRECT_ACCESS_KEY
}
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ENCODE_KEY = process.env.ENCODE_KEY;
