import {View} from 'react-native';
import React from 'react';

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
) => ({
    headerTitle,
    headerStyle: {
        backgroundColor,
    },
    headerTitleStyle: {
        color,
    },
    headerTintColor: color,
    headerLeft,
    headerRight: () => <View />,
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
