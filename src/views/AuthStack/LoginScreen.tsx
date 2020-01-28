import React, {useState, useEffect} from 'react';
import LoginModal from './components/LoginModal';
import service from '../../service';
import {AppState} from '../../store';
import {connect} from 'react-redux';
import ErrorModal from './components/ErrorModal';
import {Dispatch, AnyAction} from 'redux';
import {NavigationStackProp} from 'react-navigation-stack';
import {setTokenAndOrganisation} from '../../userReducer/actions';
import {storeCredentials, readCredentials} from '../../asyncStorage';
import Credentials from '../../asyncStorage/credentials';
import {AsyncStorage} from 'react-native';

interface Props {
    loading: {[name: string]: boolean};
    navigation: NavigationStackProp;
    dispatch: Dispatch<AnyAction>;
}

function LoginScreen(p: Props) {
    useEffect(() => {
        try {
            readCredentials()
                .then(credentials => {
                    if (credentials.getToken()) {
                        // service
                        //     .checkToken(credentials.getToken(), true)
                        //     .then(check => {
                        //         if (!check) {
                        //             p.dispatch(
                        //                 setToken(credentials.getToken()),
                        //             );
                        //             p.navigation.navigate('App');
                        //         } else {
                        service
                            .login(
                                credentials.getEmail(),
                                credentials.getPassword(),
                                true,
                            )
                            .then(res => {
                                storeCredentials(
                                    new Credentials(email, password, res.token),
                                ).then(() => {
                                    p.dispatch(
                                        setTokenAndOrganisation(
                                            res.token,
                                            res.organisations,
                                        ),
                                    );
                                    p.navigation.navigate('App');
                                });
                            });
                        // }
                        // });
                    }
                })
                .catch(() => setLoginModalVisible(true));
        } catch (e) {
            setLoginModalVisible(true);
        }
    }, []);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [error, setError] = useState();
    const [password, setPassword] = useState('Petar123');
    const [email, setEmail] = useState('petar@mundiala.com');
    const onOkPress = () => {
        setError(null);
        setLoginModalVisible(true);
    };
    const onLoginPress = () => {
        service
            .login(email, password, true)
            .then(res => {
                storeCredentials(
                    new Credentials(email, password, res.token),
                ).then(() => {
                    p.dispatch(
                        setTokenAndOrganisation(res.token, res.organisations),
                    );
                    p.navigation.navigate('App');
                });
            })
            .catch(e => {
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
