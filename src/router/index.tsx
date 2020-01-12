import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthLoadingScreen from '../views/AuthLoadingScreen';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const MainNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    },
);

const Router = createAppContainer(MainNavigator);

export default Router;
