import Expo from 'expo-server-sdk';

// Create a new Expo SDK client
const expo = new Expo();
// import * as admin from 'firebase-admin';
// const serviceAccount = require('../config/fcmConfig.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     // databaseURL: 'https://new-app-474e9.firebaseio.com'
//     databaseURL: 'https://hakaya-c75ca.firebaseio.com'
// });



export async function sendNotification(messages) {
    // admin.messaging().sendMulticast(message)
    //     .then((response) => {
    //         console.log('Successfully sent message:', response);
    //     })
    //     .catch((error) => {
    //         console.log('Error sending message:', error);
    //     });
    try {
        const send = await expo.sendPushNotificationsAsync(messages);
        console.log(send);
    } catch (error) {

        console.log(error);
    }
}