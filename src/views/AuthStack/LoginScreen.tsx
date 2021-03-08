import React, {useState, useEffect} from 'react';
import LoginModal from './components/LoginModal';
import service from '../../service';
import {AppState} from '../../store';
import {connect} from 'react-redux';
import ErrorModal from './components/ErrorModal';
import {Dispatch, AnyAction} from 'redux';
import {NavigationStackProp} from 'react-navigation-stack';
import {
    setTokenAndOrganisation,
    setNotifications,
    setPushTopics,
    setUserEmail,
    setUserBanners,
    setAdmin,
    setPushTopicNames,
    setRPN,
} from '../../userReducer/actions';
import {
    readNotifications,
    storeCredentials,
    storeNotifications,
} from '../../asyncStorage';
import Credentials from '../../asyncStorage/credentials';
import {setPassword as setPasswordAction} from '../../userReducer/actions';
import firebase from 'react-native-firebase';
import {hideBackground} from '../../backgroundReducer/actions';

interface Props {
    loading: {[name: string]: boolean};
    navigation: NavigationStackProp;
    dispatch: Dispatch<AnyAction>;
}

function LoginScreen(p: Props) {
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [error, setError] = useState();
    const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const onOkPress = () => {
        setError(null);
        setLoginModalVisible(true);
    };
    const onOkRegisterPress = (cb: () => void) => () => {
        cb();
        setShowRegisterSuccess(false);
        setLoginModalVisible(true);
    };
    useEffect(() => setLoginModalVisible(true), []);
    const onRegisterPress = (mail: string, then: () => void) => {
        service.signUp(mail).then((res) => {
            if (res.data.error) {
                const err: any = new Error(res.data.error_msg);
                setLoginModalVisible(false);
                setError(err);
            } else {
                setShowRegisterSuccess(true);
                setLoginModalVisible(false);
                then();
            }
        }).catch;
    };
    const onLoginPress = () => {
        service
            .login(email, password, true)
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
                p.dispatch(setPushTopicNames(res.pushTopicNames));
                if (res.profilType === 'admin') {
                    p.dispatch(setAdmin());
                }
                const notif = await readNotifications();
                Object.keys(notif).forEach((key) => {
                    if (notif[key]) {
                        firebase.messaging().subscribeToTopic(key);
                    } else {
                        firebase.messaging().unsubscribeFromTopic(key);
                    }
                });
                p.dispatch(hideBackground());
                res.pushTopics.forEach((topic) => {
                    firebase.messaging().subscribeToTopic(topic);
                });
                p.dispatch(setPushTopics(res.pushTopics));
                p.dispatch(setNotifications(true));
                p.dispatch(setPasswordAction(password));
                storeCredentials(
                    new Credentials(email, password, res.token, true),
                ).then(() => {
                    p.dispatch(setUserEmail(email));
                    p.dispatch(
                        setTokenAndOrganisation(res.token, res.organisations),
                    );
                    p.dispatch(setUserBanners(res.banners));
                    p.navigation.navigate('App');
                });
            })
            .catch((e) => {
                setLoginModalVisible(false);
                setError(e);
            });
    };
    const props = {
        password,
        email,
        setPassword,
        setEmail,
        onLoginPress,
        visible: loginModalVisible,
        loading: p.loading,
        onRegisterPress,
        showRegisterSuccess,
        onOkRegisterPress: onOkRegisterPress(() => setLoginModalVisible(true)),
    };
    return (
        <>
            <LoginModal {...props} />
            <ErrorModal onOkPress={onOkPress} error={error} />
        </>
    );
}

const mapStateToProps = (state: AppState) => ({
    loading: state.loading,
});

export default connect(mapStateToProps)(LoginScreen);
