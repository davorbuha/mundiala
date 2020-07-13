import React, {useEffect} from 'react';
import Router from './src/router';
import {Provider} from 'react-redux';
import store from './src/store';
import Background from './src/components/Background';
import firebase from 'react-native-firebase';
import {StatusBar} from 'react-native';
import Loading from './src/components/Loading';

function App() {
    useEffect(() => {
        checkPermission();
        firebase.notifications().onNotification(notification => {
            firebase.notifications().displayNotification(notification);
        });
    }, []);

    return (
        <Provider store={store}>
            <>
                <Loading>
                    <Background />
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={'#f2f2f2'}
                    />
                    <Router />
                </Loading>
            </>
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
