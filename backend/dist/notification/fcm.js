"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require('../config/fcmConfig.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://new-app-474e9.firebaseio.com'
});
function sendNotification(message) {
    admin.messaging().sendMulticast(message)
        .then((response) => {
        console.log('Successfully sent message:', response);
    })
        .catch((error) => {
        console.log('Error sending message:', error);
    });
}
exports.sendNotification = sendNotification;
//# sourceMappingURL=fcm.js.map