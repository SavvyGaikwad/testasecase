// awsConfig.js

const AWS = require('aws-sdk');

// Configure the AWS SDK with your credentials
AWS.config.update({
    accessKeyId: 'AKIAZQ3DSF3KWMBOIRG3',       // Replace with your actual AWS Access Key ID
    secretAccessKey: 'QqrH5owAnEZKGUeTAEstsFetkEK0JTKAc6L67DcO', // Replace with your actual AWS Secret Access Key
    region: 'eu-north-1'                      // Your AWS region
});

module.exports = AWS; // Export the AWS object for use in other files
