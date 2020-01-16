import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from '../views/AppStack/HomeScreen';
import SettingsScreen from '../views/AppStack/SettingsScreen';

const HomeScreenDrawer = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
    },
    Settings: {
        screen: SettingsScreen,
    },
});

export default HomeScreenDrawer;
