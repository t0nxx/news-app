"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const expo_server_sdk_1 = require("expo-server-sdk");
const expo = new expo_server_sdk_1.default();
function sendNotification(messages) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const send = yield expo.sendPushNotificationsAsync(messages);
            console.log(send);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.sendNotification = sendNotification;
//# sourceMappingURL=fcm.js.map