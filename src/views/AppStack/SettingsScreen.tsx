import React, {useState, useEffect} from 'react';
import {View, Text, Switch, StyleSheet, AsyncStorage} from 'react-native';
import FONTS from '../../res/fonts';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../res/colors';
import {connect} from 'react-redux';
import {readCredentials, storeCredentials} from '../../asyncStorage';
import {AppState} from '../../store';
import firebase from 'react-native-firebase';

interface Props {
    topics: string[];
}

function SettingsScreen(p: Props) {
    useEffect(() => {
        readCredentials().then(cfg =>
            setNotificationValue(cfg.getNotifications()),
        );
    }, []);
    const handleNotificationChange = (val: boolean) => {
        setNotificationValue(val);
        if (val) {
            p.topics.forEach(topic => {
                firebase.messaging().subscribeToTopic(topic);
            });
        } else {
            p.topics.forEach(topic => {
                firebase.messaging().unsubscribeFromTopic(topic);
            });
        }
        readCredentials().then(cfg => {
            console.log(cfg);
            cfg.setNotifications(val);
            storeCredentials(cfg);
        });
    };
    const [notificationValue, setNotificationValue] = useState(false);
    return (
        <View style={style.container}>
            <View style={style.row}>
                <Text style={style.text}>Notifikacije: </Text>
                <Switch
                    onValueChange={handleNotificationChange}
                    value={notificationValue}
                />
            </View>
            {/* <CustomButton
                type="standard"
                onPress={}
                label={
                    <Text
                        style={{
                            fontFamily: FONTS.bold,
                            color: COLORS.white,
                        }}>
                        Spremi
                    </Text>
                }
            /> */}
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
        marginBottom: 16,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const mapStateToProps = (state: AppState) => ({
    topics: state.user.topics,
});

export default connect(mapStateToProps)(SettingsScreen);
