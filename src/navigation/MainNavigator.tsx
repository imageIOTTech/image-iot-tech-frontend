import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Profile } from '../pages';
import Edit from '../pages/Edit';

export type MainStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Edit: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {


  return (
    <Stack.Navigator initialRouteName='Edit' screenOptions={
      { headerShown: false }}>  
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Edit' component={Edit} />
    </Stack.Navigator>
  )
}

export default MainNavigator