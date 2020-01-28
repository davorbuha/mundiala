import React, {Component} from 'react';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {NavigationStackOptions} from 'react-navigation-stack';
import {getNavigationOptionsWithAction} from '../../router/navigationHelpers';
import LogoTitle from './components/LogoTitle';
import COLORS from '../../res/colors';
import NavBarItem from '../../components/NavBarItem';
import {View} from 'react-native';

interface Props {
    navigation: StackNavigationProp;
}

class MyAccountScreen extends Component<Props> {
    static navigationOptions(p: Props): NavigationStackOptions {
        return getNavigationOptionsWithAction(
            () => <LogoTitle />,
            COLORS.primary,
            'white',
            () => (
                <NavBarItem
                    onPress={() => p.navigation.goBack()}
                    iconName="arrow-left"
                />
            ),
        );
    }

    public render() {
        return <View style={{flex: 1}}></View>;
    }
}

export default MyAccountScreen;
