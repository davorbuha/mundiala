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
import PasswordScreen from '../views/AppStack/PasswordScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import NewsStack from './NewsStack';
import CalendarStack from './CalendarStack';
import {StackActions, NavigationActions} from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SettingsScreen from '../views/AppStack/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import BillingScreen from '../views/AppStack/BillingScreen';

const AppTabs = createBottomTabNavigator(
    {
        News: {
            screen: NewsStack,
            navigationOptions: {
                tabBarLabel: ({focused}) => (
                    <Icon
                        style={{marginBottom: 8, alignSelf: 'center'}}
                        name={'newspaper-o'}
                        size={30}
                        color={focused ? COLORS.success : COLORS.primary}
                    />
                ),
            },
        },
        Calendar: {
            screen: CalendarStack,
            navigationOptions: {
                tabBarLabel: ({focused}) => (
                    <Icon
                        style={{marginBottom: 8, alignSelf: 'center'}}
                        name={'calendar'}
                        size={30}
                        color={focused ? COLORS.success : COLORS.primary}
                    />
                ),
            },
        },
        Billing: {
            screen: BillingScreen,
            navigationOptions: {
                tabBarLabel: ({focused}) => (
                    <Icon
                        style={{marginBottom: 6, alignSelf: 'center'}}
                        name={'check-circle'}
                        size={34}
                        color={focused ? COLORS.success : COLORS.primary}
                    />
                ),
            },
        },
        SettingsScreen: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: ({focused}) => (
                    <Icon
                        style={{marginBottom: 8, alignSelf: 'center'}}
                        name={'cog'}
                        size={30}
                        color={focused ? COLORS.success : COLORS.primary}
                    />
                ),
            },
        },
    },
    {
        defaultNavigationOptions: {
            tabBarOptions: {
                style: {
                    borderTopColor: COLORS.primary,
                    borderTopWidth: 1,
                    justifyContent: 'center',
                    height: 50,
                    backgroundColor: '#f2f2f2',
                },
            },
        },
    },
);

const HomeStack = createStackNavigator(
    {
        App: AppTabs,
        MyAccount: MyAccountTabNavigatior,
    },
    {
        initialRouteName: 'App',
        defaultNavigationOptions: ({navigation}) => {
            return getNavigationOptionsWithAction(
                navigation,
                () => <LogoTitle />,
                '#f2f2f2',
                'white',
                () =>
                    navigation.state.routes[0].routeName === 'General' ||
                    navigation.state.routes[0].routes.length > 1 ? (
                        <NavBarItem
                            onPress={() => {
                                navigation.dispatch(StackActions.pop({}));
                            }}
                            iconName="chevron-left"
                        />
                    ) : null,
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
