import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import FONTS from '../../res/fonts';
import {connect} from 'react-redux';
import {readCredentials, storeCredentials} from '../../asyncStorage';
import {AppState} from '../../store';
import firebase from 'react-native-firebase';
import {NavigationStackOptions} from 'react-navigation-stack';

interface Props {
    topics: string[];
}

interface State {
    notificationValue: boolean;
}

class SettingsScreen extends React.Component<Props, State> {
    state: State = {notificationValue: false};
    static navigationOptions(): NavigationStackOptions {
        return {
            title: 'Postavke',
        };
    }
    public componentDidMount() {
        readCredentials().then(cfg =>
            this.setState({notificationValue: cfg.getNotifications()}),
        );
    }
    public handleNotificationChange = (val: boolean) => {
        this.setState({notificationValue: val});
        if (val) {
            this.props.topics.forEach(topic => {
                firebase.messaging().subscribeToTopic(topic);
            });
        } else {
            this.props.topics.forEach(topic => {
                firebase.messaging().unsubscribeFromTopic(topic);
            });
        }
        readCredentials().then(cfg => {
            cfg.setNotifications(val);
            storeCredentials(cfg);
        });
    };
    public render() {
        return (
            <View style={style.container}>
                <View style={style.row}>
                    <Text style={style.text}>Notifikacije: </Text>
                    <Switch
                        onValueChange={this.handleNotificationChange}
                        value={this.state.notificationValue}
                    />
                </View>
            </View>
        );
    }
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
