import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';

function App() {
  return (
    <UserContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </UserContextProvider>
  );
}

export default App;
