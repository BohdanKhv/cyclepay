import { Notifications } from 'react-native-notifications';

class Notify {
    constructor() {
        // Request permissions on iOS, refresh token on Android
        Notifications.registerRemoteNotifications();

        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            // TODO: Send the token to my server so it could send back push notifications...
            console.log("Device Token Received", event.deviceToken);
        });
        Notifications.events().registerRemoteNotificationsRegistrationFailed((err) => {
            console.error(err);
        });
    }
}

export default Notify;