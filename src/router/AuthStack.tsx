import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../views/AuthStack/LoginScreen';

const AuthStack = createStackNavigator(
    {
        Login: LoginScreen,
    },
    {
        headerMode: 'none',
    },
);

export default AuthStack;
