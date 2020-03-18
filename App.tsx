import React, {useEffect} from 'react';
import Router from './src/router';
import {Provider} from 'react-redux';
import store from './src/store';
import Background from './src/components/Background';
import firebase from 'react-native-firebase';

function App() {
    useEffect(() => {
        checkPermission();
        firebase.notifications().onNotification(notification => {
            firebase.notifications().displayNotification(notification);
        });
    }, []);

    return (
        <Provider store={store}>
            <Background>
                <Router />
            </Background>
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

// async function getToken() {
//     let fcmToken = await firebase.messaging().getToken();
//     console.log('token ', fcmToken);
// }
export default App;
