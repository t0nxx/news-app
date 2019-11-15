import * as admin from 'firebase-admin';
const serviceAccount = require('../config/fcmConfig.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: 'https://new-app-474e9.firebaseio.com'
    databaseURL: 'https://hakaya-c75ca.firebaseio.com'
});


export function sendNotification(message) {
    admin.messaging().sendMulticast(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}