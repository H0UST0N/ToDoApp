import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const stackRoutes = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerShown: false
    }}>

    <stackRoutes.Screen 
      name="Login" 
      component={Login}  
      options={{headerLeft: () => null, gestureEnabled: false}} 
    />

    <stackRoutes.Screen name="Home" component={Home} />

  </stackRoutes.Navigator>
);

export default AppRoutes;
