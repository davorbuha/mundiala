import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import FONTS from '../../res/fonts';

function SettingsScreen() {
    const [notificationValue, setNotificationValue] = useState(true);
    return (
        <View style={style.container}>
            <View style={style.row}>
                <Text style={style.text}>Notifikacije: </Text>
                <Switch
                    onValueChange={v => setNotificationValue(v)}
                    value={notificationValue}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        opacity: 0.6,
    },
    row: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default SettingsScreen;
