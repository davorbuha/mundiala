import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreenDrawer from './HomeScreenDrawer';
import NewsScreen from '../views/AppStack/NewsScreen';
import CalendarScreen from '../views/AppStack/CalendarScreen';
import NewsDetailsScreen from '../views/AppStack/NewsDetailsScreen';
import MyAccountTabNavigatior from './MyAccountTabNavigatior';
import {getNavigationOptionsWithAction} from './navigationHelpers';
import LogoTitle from '../views/AppStack/components/LogoTitle';
import COLORS from '../res/colors';
import NavBarItem from '../components/NavBarItem';

const AppStack = createStackNavigator({
    Home: HomeScreenDrawer,
    News: NewsScreen,
    Calendar: CalendarScreen,
    NewsDetails: NewsDetailsScreen,
    MyAccount: {
        path: 'MyAccount',
        screen: MyAccountTabNavigatior,
        navigationOptions: ({navigation}) =>
            getNavigationOptionsWithAction(
                () => <LogoTitle />,
                COLORS.primary,
                'white',
                () => (
                    <NavBarItem
                        onPress={() => navigation.goBack()}
                        iconName="arrow-left"
                    />
                ),
                {
                    shadowColor: 'transparent',
                    elevation: 0,
                },
            ),
    },
});

export default AppStack;
