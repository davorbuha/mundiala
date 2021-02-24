import MyAccountTabNavigatior from './MyAccountTabNavigatior';
import {getNavigationOptionsWithAction} from './navigationHelpers';
import LogoTitle from '../views/AppStack/components/LogoTitle';
import COLORS from '../res/colors';
import NavBarItem from '../components/NavBarItem';
import {StackActions} from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
// import HomeScreenDrawer from './HomeScreenDrawer';
import NewsScreen from '../views/AppStack/NewsScreen';
import CalendarScreen from '../views/AppStack/CalendarScreen';
import NewsDetailsScreen from '../views/AppStack/NewsDetailsScreen';
import PasswordScreen from '../views/AppStack/PasswordScreen';
import HomeScreen from '../views/AppStack/HomeScreen';
import PresenceScreen from '../views/AppStack/PresenceScreen';
import BillingScreen from '../views/AppStack/BillingScreen';
import AdminRouter from './AdminRouter';

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        News: NewsScreen,
        Calendar: CalendarScreen,
        NewsDetails: NewsDetailsScreen,
        Pressence: PresenceScreen,
        Billing: BillingScreen,
        Admin: AdminRouter,
        MyAccount: {
            path: 'MyAccount',
            screen: MyAccountTabNavigatior,
            navigationOptions: ({navigation}: any) =>
                getNavigationOptionsWithAction(
                    navigation,
                    () => <LogoTitle />,
                    COLORS.primary,
                    'white',
                    () => (
                        <NavBarItem
                            onPress={() => navigation.goBack()}
                            iconName="arrow-left"
                        />
                    ),
                    null,
                    {
                        shadowColor: 'transparent',
                        elevation: 0,
                    },
                ),
        },
        PasswordScreen: PasswordScreen,
    },
    {
        headerMode: 'none',
    },
);

const HomeStack = createStackNavigator(
    {
        App: AppStack,
        MyAccount: MyAccountTabNavigatior,
    },
    {
        initialRouteName: 'App',
        defaultNavigationOptions: ({navigation}: any) => {
            return getNavigationOptionsWithAction(
                navigation,
                () => <LogoTitle />,
                '#f2f2f2',
                'white',
                () => {
                    if (
                        navigation.state.routes[
                            navigation.state.routes.length - 1
                        ]?.routeName !== 'Home'
                    )
                        return (
                            <NavBarItem
                                onPress={() => {
                                    navigation.dispatch(StackActions.pop({}));
                                }}
                                iconName="chevron-left"
                            />
                        );
                },
                () => {
                    if (
                        navigation.state.routes[0].routeName !== 'TabNavigatior'
                    ) {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MyAccount')}
                                style={{marginRight: 16}}>
                                <FontAwesomeIcon
                                    name="user"
                                    color={COLORS.primary}
                                    size={30}
                                />
                            </TouchableOpacity>
                        );
                    }
                },
                {
                    shadowColor: 'transparent',
                    elevation: 0,
                },
            );
        },
    },
);

export default HomeStack;
