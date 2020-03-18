import React from 'react';
import {Image, View, Text, Dimensions} from 'react-native';

function LogoTitle() {
    return (
        <Image
            resizeMode="cover"
            style={{
                width: 150,
                height: 32,
                resizeMode: 'contain',
            }}
            source={require('../../../res/images/logo-login2.png')}
        />
    );
}

export default LogoTitle;
