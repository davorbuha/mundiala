import React from 'react';
import {Image, View, Text, Dimensions} from 'react-native';

function LogoTitle() {
    return (
        <Image
            resizeMode="cover"
            style={{
                width: 150,
                height: 36,
                resizeMode: 'contain',
                alignSelf: 'center',
            }}
            source={require('../../../res/images/logo-login.png')}
        />
    );
}

export default LogoTitle;
