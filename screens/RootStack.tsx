import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {User, useUserContext} from '../contexts/UserContext';
import SignScreen from './SignScreen';
import WelcomeScreen from './WelcomeScreen';
import {subscribeAuth} from '../lib/auth';
import {getUser} from '../lib/users';

export type RootStackParamList = {
  Sign: {isSignUp: boolean};
  Welcome: {
    id: string;
  };
  MainTab: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async (currentUser: User) => {
      unsubscribe();

      if (!currentUser) {
        return;
      }

      const profile = await getUser(currentUser.id);

      if (!profile) {
        return;
      }

      setUser(profile);
    });
  }, [setUser]);

  return (
    <Stack.Navigator>
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
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
