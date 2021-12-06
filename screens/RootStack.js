import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import LoginScreen from './LoginScreen';
import JoinScreen from './JoinScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="MainTab">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerBackVisible: false}}
      />
      <Stack.Screen
        name="Join"
        component={JoinScreen}
        options={{headerBackVisible: false}}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
