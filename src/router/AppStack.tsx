import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../views/AppStack/HomeScreen';

const AppStack = createStackNavigator({Home: HomeScreen});

export default AppStack;
