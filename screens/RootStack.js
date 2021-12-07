import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {useUserContext} from '../contexts/UserContext';
import SignScreen from './SignScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user} = useUserContext();

  return (
    <Stack.Navigator initialRouteName="MainTab">
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Sign"
            component={SignScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
