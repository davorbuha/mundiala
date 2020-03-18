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
    headerTitle,
    backgroundColor,
    color,
    headerLeft,
    headerRight,
    style?,
): NavigationScreenConfig<
    StackNavigationOptions,
    StackNavigationProp<NavigationRoute<NavigationParams>, NavigationParams>,
    unknown
> => ({
    headerTitle,
    headerStyle: {
        backgroundColor,
        ...style,
    },
    headerTitleStyle: {
        color,
    },
    headerTitleAlign: 'center',
    headerTintColor: color,
    headerLeft,
    headerRight,
});

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
