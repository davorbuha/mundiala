import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from '../views/AppStack/CalendarScreen';
import {getNavigationOptionsWithAction} from './navigationHelpers';
import LogoTitle from '../views/AppStack/components/LogoTitle';
import COLORS from '../res/colors';

const CalendarStack = createStackNavigator(
    {
        Calendar: CalendarScreen,
    },
    {
        headerMode: 'none',
    },
);

export default CalendarStack;
