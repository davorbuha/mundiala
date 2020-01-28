import {createStackNavigator} from 'react-navigation-stack';
import HomeScreenDrawer from './HomeScreenDrawer';
import NewsScreen from '../views/AppStack/NewsScreen';
import CalendarScreen from '../views/AppStack/CalendarScreen';
import NewsDetailsScreen from '../views/AppStack/NewsDetailsScreen';
import MyAccountScreen from '../views/AppStack/MyAccountScreen';

const AppStack = createStackNavigator(
    {
        Home: HomeScreenDrawer,
        News: NewsScreen,
        Calendar: CalendarScreen,
        NewsDetails: NewsDetailsScreen,
        MyAccount: MyAccountScreen,
    },
    {},
);

export default AppStack;
