import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import MyAccountGeneralScreen from '../views/AppStack/MyAccountGeneralScreen';
import MyAccountAccessInformationScreen from '../views/AppStack/MyAccountAccessInformationScreen';
import COLORS from '../res/colors';
import FONTS from '../res/fonts';
import {createStackNavigator} from 'react-navigation-stack';
import PasswordScreen from '../views/AppStack/PasswordScreen';

const TabNavigatior = createMaterialTopTabNavigator(
    {
        General: MyAccountGeneralScreen,
        AccessInformation: MyAccountAccessInformationScreen,
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: COLORS.primary,
            },
            indicatorStyle: {
                backgroundColor: COLORS.white,
            },
            labelStyle: {
                fontFamily: FONTS.bold,
                color: COLORS.white,
                fontSize: 12,
            },
        },
    },
);

const MyAccountTabNavigatior = createStackNavigator(
    {
        TabNavigatior: TabNavigatior,
        PasswordScreen: PasswordScreen,
    },
    {
        headerMode: 'none',
        initialRouteName: 'TabNavigatior',
    },
);

export default MyAccountTabNavigatior;
