import React, {useEffect} from 'react';
import {View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native';
import {NavigationSwitchScreenProps} from 'react-navigation';
import CustomSafeArea from '../components/SafeArea';
import {
    readCredentials,
    readNotifications,
    storeCredentials,
    storeNotifications,
} from '../asyncStorage';
import service from '../service';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {
    setNotifications,
    setTokenAndOrganisation,
    setPushTopics,
    setUserEmail,
    setUserBanners,
    setAdmin,
    setPushTopicNames,
    setRPN,
} from '../userReducer/actions';
import {setPassword as setPasswordAction} from '../userReducer/actions';
import Credentials from '../asyncStorage/credentials';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';
import {hideBackground} from '../backgroundReducer/actions';

interface Props extends NavigationSwitchScreenProps {
    dispatch: Dispatch;
}

function AuthLoadingScreen(p: Props) {
    useEffect(() => {
        try {
            readCredentials()
                .then((credentials) => {
                    if (credentials.getToken()) {
                        service
                            .login(
                                credentials.getEmail(),
                                credentials.getPassword(),
                                true,
                            )
                            .then(async (res) => {
                                const n = await readNotifications();
                                if (!n || Object.keys(n).length === 0) {
                                    await storeNotifications(
                                        res.rpn.reduce(
                                            (prev, curr) => ({
                                                ...prev,
                                                [curr.value]: true,
                                            }),
                                            {},
                                        ),
                                    );
                                }
                                p.dispatch(setRPN(res.rpn));
                                p.dispatch(
                                    setPushTopicNames(res.pushTopicNames),
                                );
                                if (res.profilType === 'admin') {
                                    p.dispatch(setAdmin());
                                }
                                const notif = await readNotifications();
                                console.log(notif);
                                Object.keys(notif).forEach((key) => {
                                    if (notif[key]) {
                                        firebase
                                            .messaging()
                                            .subscribeToTopic(key);
                                    } else {
                                        firebase
                                            .messaging()
                                            .unsubscribeFromTopic(key);
                                    }
                                });
                                // if (credentials.getNotifications()) {
                                //     res.pushTopics.forEach((topic) => {
                                //         firebase
                                //             .messaging()
                                //             .subscribeToTopic(topic);
                                //     });
                                // } else {
                                //     res.pushTopics.forEach((topic) => {
                                //         firebase
                                //             .messaging()
                                //             .unsubscribeFromTopic(topic);
                                //     });
                                // }
                                p.dispatch(
                                    setNotifications(
                                        credentials.getNotifications(),
                                    ),
                                );
                                p.dispatch(
                                    setPasswordAction(
                                        credentials.getPassword(),
                                    ),
                                );
                                p.dispatch(setPushTopics(res.pushTopics));
                                storeCredentials(
                                    new Credentials(
                                        credentials.getEmail(),
                                        credentials.getPassword(),
                                        res.token,
                                        credentials.getNotifications(),
                                    ),
                                ).then(() => {
                                    p.dispatch(
                                        setTokenAndOrganisation(
                                            res.token,
                                            res.organisations,
                                        ),
                                    );
                                    p.dispatch(
                                        setUserEmail(credentials.getEmail()),
                                    );
                                    p.dispatch(setUserBanners(res.banners));
                                    p.dispatch(hideBackground());
                                    p.navigation.navigate('App');
                                    setTimeout(() => SplashScreen.hide(), 100);
                                });
                            })
                            .catch(() => {
                                p.navigation.navigate('Login');
                                setTimeout(() => SplashScreen.hide(), 100);
                            });
                    }
                })
                .catch(() => {
                    setTimeout(() => SplashScreen.hide(), 100);
                    p.navigation.navigate('Login');
                });
        } catch (e) {
            p.navigation.navigate('Login');
        }
    }, []);
    return (
        <CustomSafeArea style={style.container}>
            <View>
                <StatusBar barStyle="default" />
                <ActivityIndicator color="white" size="large" />
            </View>
        </CustomSafeArea>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        opacity: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect()(AuthLoadingScreen);
