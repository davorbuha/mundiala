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

interface Props extends NavigationSwitchScreenProps {}

function AuthLoadingScreen(p: Props) {
    useEffect(() => {
        setTimeout(() => {
            p.navigation.navigate('Auth');
        }, 1000);
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

export default AuthLoadingScreen;
