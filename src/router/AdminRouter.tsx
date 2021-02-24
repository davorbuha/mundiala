import {createStackNavigator} from 'react-navigation-stack';
import AdminHomeScreen from '../views/AdminStack/AdminHomeScreen';
import CreateEventScreen from '../views/AdminStack/CreateEventScreen';
import SendPushScreen from '../views/AdminStack/SendPushScreen';

const AdminRouter = createStackNavigator(
    {
        AdminHome: AdminHomeScreen,
        CreateEvent: CreateEventScreen,
        SendPush: SendPushScreen,
    },
    {headerMode: 'none'},
);

export default AdminRouter;
