import React, {Component} from 'react';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {NavigationStackOptions} from 'react-navigation-stack';
import {getNavigationOptionsWithAction} from '../../router/navigationHelpers';
import LogoTitle from './components/LogoTitle';
import COLORS from '../../res/colors';
import NavBarItem from '../../components/NavBarItem';
import {View} from 'react-native';
import service from '../../service';
import {connect} from 'react-redux';
import {AppState} from '../../store';

interface Props {
    token: string;
    organisationId: number;
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

    public componentDidMount() {
        const {token, organisationId} = this.props;
        service
            .getUserProfile(token, organisationId)
            .then(res => console.log(res));
    }

    public render() {
        return <View style={{flex: 1}}></View>;
    }
}

const mapStateToProps = (state: AppState) => ({
    token: state.user.token,
    organisationId: state.user.organisations[0].id,
});

export default connect(mapStateToProps)(MyAccountScreen);
