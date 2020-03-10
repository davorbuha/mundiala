import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from '../views/AppStack/HomeScreen';
import SettingsScreen from '../views/AppStack/SettingsScreen';
import NavBarItem from '../components/NavBarItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../res/colors';
import {
    getDrawerNavigationOptions,
    getDrawerConfig,
    getNavigationOptionsWithAction,
} from './navigationHelpers';
import React from 'react';
import {DrawerActions} from 'react-navigation-drawer';
import LogoTitle from '../views/AppStack/components/LogoTitle';

const getDrawerIcon = (iconName, tintColor) => (
    <Icon name={iconName} size={20} color={tintColor} />
);

const homeDrawerIcon = ({tintColor}) => getDrawerIcon('home', tintColor);
const userDrawerIcon = ({tintColor}) => getDrawerIcon('cog', tintColor);

const homeNavOptions = getDrawerNavigationOptions(
    'Početna',
    COLORS.primary,
    'white',
    homeDrawerIcon,
);
const settingsNavOptions = getDrawerNavigationOptions(
    'Postavke',
    COLORS.primary,
    'white',
    userDrawerIcon,
);

const getDrawerItem = navigation => (
    <NavBarItem
        iconName="bars"
        onPress={() => {
            if (navigation.state.isDrawerOpen === false) {
                // check if drawer is not open, then only open it
                navigation.dispatch(DrawerActions.openDrawer());
            } else {
                // else close the drawer
                navigation.dispatch(DrawerActions.closeDrawer());
            }
        }}
    />
);

const HomeScreenDrawer = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: homeNavOptions,
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: settingsNavOptions,
        },
    },
    getDrawerConfig(300, 'left', 'Home'),
);

HomeScreenDrawer.navigationOptions = ({navigation}) =>
    getNavigationOptionsWithAction(
        () => <LogoTitle />,
        COLORS.primary,
        'white',
        () => getDrawerItem(navigation),
    );

export default HomeScreenDrawer;
