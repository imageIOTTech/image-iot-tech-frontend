import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Login, Otp, Profile, Register, Splash, Welcome } from '../pages';
import Edit from '../pages/Edit';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import Folder from '../pages/Folder';

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Edit: undefined;
  Splash: undefined;
  Login: undefined;
  Welcome: undefined;
  Register: undefined;
  Otp: {email : String};
  Folder: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  console.log("isAuthenticated: " + isAuthenticated);

  const MainNaviga = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Edit' component={Edit} />
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    )
  }

  const AuthNaviga = () => {
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  }

  return ( 
    <Stack.Navigator initialRouteName ='Splash' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Edit' component={Edit} />
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Welcome' component={Welcome} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Otp' component={Otp} />
      <Stack.Screen name='Folder' component={Folder} />
    </Stack.Navigator>
  )
}

export default MainNavigator