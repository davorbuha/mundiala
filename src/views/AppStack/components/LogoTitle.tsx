import React from 'react';
import {Image} from 'react-native';

function LogoTitle() {
    return (
        <Image
            resizeMode="contain"
            style={{height: 30}}
            source={require('../../../res/images/logo-login.png')}
        />
    );
}

export default LogoTitle;
