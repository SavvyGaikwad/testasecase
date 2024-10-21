// flag quiz/main.js
const dynamoDB = require('../config/awsConfig');

function saveUserScore(username, gameName, score) {
    const params = {
        TableName: 'YourDynamoDBTable', // Replace with your DynamoDB table name
        Item: {
            UserName: username,
            GameName: gameName,
            Score: score,
            Timestamp: new Date().toISOString() // Optional: to track when the score was saved
        }
    };

    dynamoDB.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

// Function to get username from user
function getUserNameAndScore() {
    const username = prompt("Please enter your username:");
    const gameName = "Flag Quiz"; // Or use a dynamic way to get the game name
    const score = Math.floor(Math.random() * 100); // Example score, replace with actual score logic

    // Save score to DynamoDB
    saveUserScore(username, gameName, score);
}

// Call this function after the game ends
getUserNameAndScore();
