import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LogoTitle from './components/LogoTitle';

class HomeScreen extends Component {
    // static navigationOptions = {
    //     headerTitle: () => <LogoTitle />,
    // };
    public render() {
        return (
            <View>
                <Text>HomeScreen</Text>
            </View>
        );
    }
}

export default HomeScreen;
