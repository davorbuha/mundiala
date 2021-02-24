import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import FONTS from '../../res/fonts';
import {connect} from 'react-redux';
import {
    readCredentials,
    readNotifications,
    storeCredentials,
} from '../../asyncStorage';
import {AppState} from '../../store';
import firebase from 'react-native-firebase';
import {NavigationStackOptions} from 'react-navigation-stack';
import {PushTopicName} from '../../types/login';

interface Props {
    topics: string[];
    rpn: PushTopicName[];
}

interface State {
    [key: string]: boolean;
}

class SettingsScreen extends React.Component<Props, State> {
    state: State = {};
    static navigationOptions(): NavigationStackOptions {
        return {
            title: 'Postavke',
        };
    }
    public componentDidMount() {
        readNotifications().then((res) => {
            this.setState(res);
        });
    }
    public handleNotificationChange = (field: string) => (val: boolean) => {
        const newState = {...this.state, [field]: val};
        this.setState(newState);
        Object.keys(newState).forEach((key) => {
            if (newState[key]) {
                firebase.messaging().subscribeToTopic(key);
            } else {
                firebase.messaging().unsubscribeFromTopic(key);
            }
        });

        readCredentials().then((cfg) => {
            storeCredentials(cfg);
        });
    };
    public render() {
        return (
            <View style={style.container}>
                <Text style={{...style.text, marginBottom: 16}}>
                    Notifikacije:{' '}
                </Text>
                {this.props.rpn.map((item) => (
                    <View style={style.row}>
                        <Text style={style.text}>{item.name}</Text>
                        <Switch
                            value={this.state[item.value]}
                            onValueChange={this.handleNotificationChange(
                                item.value,
                            )}
                        />
                    </View>
                ))}
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
        width: '50%',
        marginBottom: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const mapStateToProps = (state: AppState) => ({
    topics: state.user.topics,
    rpn: state.user.rpn,
});

export default connect(mapStateToProps)(SettingsScreen);
