import React, {useEffect} from 'react';
import {
    View,
    ActivityIndicator,
    StatusBar,
    Text,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import {NavigationSwitchScreenProps} from 'react-navigation';
import CustomSafeArea from '../components/SafeArea';
import {readCredentials, storeCredentials} from '../asyncStorage';
import service from '../service';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {
    setNotifications,
    setTokenAndOrganisation,
} from '../userReducer/actions';
import {setPassword as setPasswordAction} from '../userReducer/actions';
import Credentials from '../asyncStorage/credentials';

interface Props extends NavigationSwitchScreenProps {
    dispatch: Dispatch;
}

function AuthLoadingScreen(p: Props) {
    useEffect(() => {
        try {
            readCredentials()
                .then(credentials => {
                    if (credentials.getToken()) {
                        service
                            .login(
                                credentials.getEmail(),
                                credentials.getPassword(),
                                true,
                            )
                            .then(res => {
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
                                    p.navigation.navigate('App');
                                });
                            })
                            .catch(() => p.navigation.navigate('Login'));
                    }
                })
                .catch(e => {
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
