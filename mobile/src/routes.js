import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import Login from './pages/Login';
import Timelineapp  from './pages/Timelineapp' ;
import New  from './pages/New' ;


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        App: createStackNavigator({
            Timelineapp,
            New
        })
    })
);

export default Routes;