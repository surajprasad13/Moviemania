import PushNotification, {Importance} from 'react-native-push-notification';

const remoteNotification = (data) => {
  PushNotification.localNotification({
    channelId: '12345',
    title: data.notification.title,
    message: data.notification.body,
    soundName: 'notification.mp3',
  });
};

const localNotification = () => {
  PushNotification.localNotification({
    channelId: '12345', // (required) channelId, if the channel doesn't exist, notification will not trigger.
    ticker: 'My Notification Ticker', // (optional)
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: 'https://source.unsplash.com/400x400?nature', // (optional) default: undefined
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
    subText: 'This is a subText', // (optional) default: none
    bigPictureUrl: 'https://source.unsplash.com/400x400?food', // (optional) default: undefined
    bigLargeIcon: 'ic_launcher', // (optional) default: undefined
    bigLargeIconUrl: 'https://source.unsplash.com/400x400?animal', // (optional) default: undefined
    vibrate: true, // (optional) default: true
    title: 'My Notification Title', // (optional)
    message: 'My Notification Message', // (required)
    soundName: 'notification.mp3', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  });
};

export {remoteNotification, localNotification};
