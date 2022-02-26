import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, View, LogBox, Alert, SafeAreaView} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';

import {store, persistor} from './redux';

import AppNavigator from './routes';
import {PersistGate} from 'redux-persist/integration/react';

import {theme} from './constants';
import {ThemeProvider} from 'react-native-elements';
import getColorTheme from './helpers/Theme';
import Config from 'react-native-config';
//import messaging from '@react-native-firebase/messaging';
//import {remoteNotification} from './services/notification';

// import OneSignal from 'react-native-onesignal';

// //OneSignal Init Code
// OneSignal.setLogLevel(6, 0);
// OneSignal.setAppId('50172376-0990-4d88-9acf-260b72d5b8d6');
// //END OneSignal Init Code

// //Prompt for push on iOS
// OneSignal.promptForPushNotificationsWithUserResponse((response) => {
//   console.log('Prompt response:', response);
// });

// //Method for handling notifications received while app in foreground
// OneSignal.setNotificationWillShowInForegroundHandler(
//   (notificationReceivedEvent) => {
//     console.log(
//       'OneSignal: notification will show in foreground:',
//       notificationReceivedEvent,
//     );
//     let notification = notificationReceivedEvent.getNotification();
//     console.log('notification: ', notification);
//     const data = notification.additionalData;
//     console.log('additionalData: ', data);
//     // Complete with null means don't show a notification.
//     notificationReceivedEvent.complete(notification);
//   },
// );

// //Method for handling notifications opened
// OneSignal.setNotificationOpenedHandler((notification) => {
//   console.log('OneSignal: notification opened:', notification);
// });

LogBox.ignoreAllLogs(true);

const Status = () => {
  const insets = useSafeAreaInsets();
  const state = useSelector(state => state.theme.theme);
  const theme = getColorTheme();

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <StatusBar
        barStyle={state ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
    </SafeAreaView>
  );
};

const App = () => {
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async data => {
  //     remoteNotification(data);
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Status />
          <ThemeProvider theme={theme}>
            <AppNavigator />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
