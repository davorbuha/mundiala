import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {Text, View} from 'react-native';
import MyAccountTabNavigatior from './MyAccountTabNavigatior';
import {getNavigationOptionsWithAction} from './navigationHelpers';
import LogoTitle from '../views/AppStack/components/LogoTitle';
import COLORS from '../res/colors';
import NavBarItem from '../components/NavBarItem';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import NewsStack from './NewsStack';
import CalendarStack from './CalendarStack';
import {StackActions} from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BillingScreen from '../views/AppStack/BillingScreen';
import PresenceScreen from '../views/AppStack/PresenceScreen';

const AppTabs = createBottomTabNavigator(
    {
        News: {
            screen: NewsStack,
            navigationOptions: {
                tabBarLabel: ({focused}) => (
                    <View style={{marginBottom: 6, bottom: -3}}>
                        <Icon
                            style={{alignSelf: 'center'}}
                            name={'newspaper-o'}
                            size={30}
                            color={focused ? COLORS.success : COLORS.primary}
                        />
                        <Text
                            style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                color: focused
                                    ? COLORS.success
                                    : COLORS.primary,
                            }}>
                            Novosti
                        </Text>
                    </View>
                ),
            },
        },
        Calendar: {
            screen: CalendarStack,
            navigationOptions: {
                tabBarLabel: ({focused}) => (
                    <View style={{marginBottom: 6, bottom: -3}}>
                        <Icon
                            style={{marginBottom: 2, alignSelf: 'center'}}
                            name={'calendar'}
                            size={28}
                            color={focused ? COLORS.success : COLORS.primary}
                        />
                        <Text
                            style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                color: focused
                                    ? COLORS.success
                                    : COLORS.primary,
                            }}>
                            Kalendar
                        </Text>
                    </View>
                ),
            },
        },
        Pressence: {
            screen: PresenceScreen,
            navigationOptions: {
                tabBarLabel: ({focused}) => (
                    <View style={{marginBottom: 6, bottom: -5}}>
                        <MaterialIcons
                            style={{alignSelf: 'center', bottom: -4}}
                            name={'event-available'}
                            size={38}
                            color={focused ? COLORS.success : COLORS.primary}
                        />
                        <Text
                            style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                color: focused
                                    ? COLORS.success
                                    : COLORS.primary,
                            }}>
                            Prisutnost
                        </Text>
                    </View>
                ),
            },
        },
        Billing: {
            screen: BillingScreen,
            navigationOptions: {
                tabBarLabel: ({focused}) => (
                    <View style={{marginBottom: 6, bottom: -3}}>
                        <MaterialIcons
                            style={{alignSelf: 'center', bottom: -4}}
                            name={'local-atm'}
                            size={38}
                            color={focused ? COLORS.success : COLORS.primary}
                        />
                        <Text
                            style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                color: focused
                                    ? COLORS.success
                                    : COLORS.primary,
                            }}>
                            Članarina
                        </Text>
                    </View>
                ),
            },
        },
        // SettingsScreen: {
        //     screen: SettingsScreen,
        //     navigationOptions: {
        //         tabBarLabel: ({focused}) => (
        //             <Icon
        //                 style={{marginBottom: 8, alignSelf: 'center'}}
        //                 name={'cog'}
        //                 size={30}
        //                 color={focused ? COLORS.success : COLORS.primary}
        //             />
        //         ),
        //     },
        // },
    },
    {
        defaultNavigationOptions: {
            tabBarOptions: {
                style: {
                    borderTopColor: COLORS.primary,
                    borderTopWidth: 1,
                    justifyContent: 'center',
                    height: 55,
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
