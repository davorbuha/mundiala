import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LoginModal from './conponents/LoginModal';

function LoginScreen() {
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    useEffect(() => {
        setLoginModalVisible(true);
    }, []);
    return (
        <ImageBackground
            source={require('../../res/images/background.png')}
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <LoginModal visible={loginModalVisible} />
        </ImageBackground>
    );
}

export default LoginScreen;
