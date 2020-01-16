import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../views/AuthStack/LoginScreen';

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            path: 'Login',
            navigationOptions: {
                cardStyle: {backgroundColor: 'transparent'},
            },
        },
    },
    {
        headerMode: 'none',
    },
);

export default AuthStack;
