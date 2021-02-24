import React, {useEffect} from 'react';
import {Text, Platform} from 'react-native';
import Router from './src/router';
import {Provider} from 'react-redux';
import store from './src/store';
import Background from './src/components/Background';
import firebase from 'react-native-firebase';
import {StatusBar} from 'react-native';
import Loading from './src/components/Loading';
import {readNotifications} from './src/asyncStorage';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

function App() {
    useEffect(() => {
        checkPermission();
        const channel = new firebase.notifications.Android.Channel(
            'mundiala',
            'mundiala',
            firebase.notifications.Android.Importance.Max,
        ).setDescription('A natural description of the channel');
        firebase.notifications().android.createChannel(channel);
        this.unsubscribeFromNotificationListener = firebase
            .notifications()
            .onNotification((notification) => {
                if (Platform.OS === 'android') {
                    const localNotification = new firebase.notifications.Notification()
                        .setSound('default')
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setSubtitle(notification.subtitle)
                        .setBody(notification.body)
                        .setData(notification.data)
                        .android.setChannelId('mundiala') // e.g. the id you chose above
                        .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
                        .android.setPriority(
                            firebase.notifications.Android.Priority.High,
                        );

                    firebase
                        .notifications()
                        .displayNotification(localNotification)
                        .catch((err) => console.error(err));
                } else if (Platform.OS === 'ios') {
                    const localNotification = new firebase.notifications.Notification()
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setSubtitle(notification.subtitle)
                        .setBody(notification.body)
                        .setData(notification.data)
                        .ios.setBadge(notification.ios.badge);

                    firebase
                        .notifications()
                        .displayNotification(localNotification)
                        .catch((err) => console.error(err));
                }
            });
    }, []);
    return (
        <Provider store={store}>
            <Loading>
                <>
                    <Background />
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={'#f2f2f2'}
                    />
                    <Router />
                </>
            </Loading>
        </Provider>
    );
}

async function checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        // getToken();
    } else {
        requestPermission();
    }
}

async function requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        // getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
}
export default App;
