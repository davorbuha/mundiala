import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import NewsScreen from '../views/AppStack/NewsScreen';
import NewsDetailsScreen from '../views/AppStack/NewsDetailsScreen';
import {getNavigationOptionsWithAction} from './navigationHelpers';
import LogoTitle from '../views/AppStack/components/LogoTitle';
import NavBarItem from '../components/NavBarItem';
import COLORS from '../res/colors';

const NewsStack = createStackNavigator(
    {
        News: NewsScreen,
        NewsDetails: NewsDetailsScreen,
    },
    {
        headerMode: 'none',
    },
);

export default NewsStack;
