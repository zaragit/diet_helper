import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignScreen from "../screens/SignScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

export type AuthStackParamList = {
  Sign: { isSignUp: boolean };
  ForgotPassword: undefined;
  Welcome: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Sign"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Sign" component={SignScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
