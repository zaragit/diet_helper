import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignScreen from "../screens/SignScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import { useAuthContext } from "../contexts/AuthContext";
import WelcomeScreen from "../screens/WelcomeScreen";

export type AuthStackParamList = {
  Sign: { isSignUp: boolean };
  ForgotPassword: undefined;
  Welcome: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStack() {
  const { user, profile } = useAuthContext();

  return (
    <Stack.Navigator
      initialRouteName={user && !profile ? "Welcome" : "Sign"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Sign" component={SignScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
