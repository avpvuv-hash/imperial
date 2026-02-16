const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

function sendPushNotification(token, title, body) {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: token,
    };

    return admin.messaging().send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
            return response;
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            throw error;
        });
}

module.exports = { sendPushNotification };