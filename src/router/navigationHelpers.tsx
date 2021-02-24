import React from 'react';
import {View} from 'react-native';
import {
    NavigationScreenConfig,
    NavigationRoute,
    NavigationParams,
} from 'react-navigation';
import {
    StackNavigationOptions,
    StackNavigationProp,
} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import COLORS from '../res/colors';

export const getNavigationOptions = (title, backgroundColor, color) => ({
    title,
    headerTitle: title,
    headerStyle: {
        backgroundColor,
    },
    headerTitleStyle: {
        color,
    },
    headerTintColor: color,
});

export const getNavigationOptionsWithAction = (
    navigation,
    headerTitle,
    backgroundColor,
    color,
    headerLeft,
    headerRight,
    style?,
): NavigationScreenConfig<any, any> => {
    return {
        headerTitle,
        headerStyle: {
            backgroundColor,
            borderBottomColor:
                navigation.state.routeName === 'MyAccount'
                    ? '#f2f2f2'
                    : COLORS.primary,
            borderBottomWidth: 1,
            ...style,
        },
        headerTitleStyle: {
            color,
        },
        headerTitleAlign: 'center',
        headerTintColor: color,
        headerLeft,
        headerRight,
    };
};

export const getDrawerNavigationOptions = (
    title,
    backgroundColor,
    titleColor,
    drawerIcon,
) => ({
    title,
    headerTitle: title,
    headerStyle: {
        backgroundColor,
    },
    headerTitleStyle: {
        color: titleColor,
    },
    headerTintColor: titleColor,
    drawerLabel: title,
    drawerIcon,
});

export const getDrawerConfig = (
    drawerWidth,
    drawerPosition,
    initialRouteName,
) => ({
    drawerWidth,
    drawerPosition,
    initialRouteName,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
});
