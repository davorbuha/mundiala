import {createStackNavigator} from 'react-navigation-stack';
import HomeScreenDrawer from './HomeScreenDrawer';

const AppStack = createStackNavigator(
    {
        Home: HomeScreenDrawer,
    },
    {},
);

export default AppStack;
