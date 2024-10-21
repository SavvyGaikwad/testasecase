// awsConfig.js

const AWS = require('aws-sdk');


// Configure AWS
// Configure the AWS SDK with your credentials
 region: 'eu-north-1', // Replace with your preferred region
            accessKeyId: 'AKIAZQ3DSF3KTWAKBFVT', // Replace with your access key
            secretAccessKey: 'xsdRFjfPZ+9XwuV8pFxgo0OzzJWaoQkDogGyw3LK                     // Your AWS region
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;




