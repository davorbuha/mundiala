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
} from '../../userReducer/actions';
import {storeCredentials, readCredentials} from '../../asyncStorage';
import Credentials from '../../asyncStorage/credentials';
import {setPassword as setPasswordAction} from '../../userReducer/actions';

interface Props {
    loading: {[name: string]: boolean};
    navigation: NavigationStackProp;
    dispatch: Dispatch<AnyAction>;
}

function LoginScreen(p: Props) {
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [error, setError] = useState();
    const [password, setPassword] = useState('Petar123');
    const [email, setEmail] = useState('petar@mundiala.com');
    const onOkPress = () => {
        setError(null);
        setLoginModalVisible(true);
    };
    useEffect(() => setLoginModalVisible(true), []);
    const onLoginPress = () => {
        service
            .login(email, password, true)
            .then(res => {
                p.dispatch(setNotifications(true));
                p.dispatch(setPasswordAction(password));
                storeCredentials(
                    new Credentials(email, password, res.token, true),
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
