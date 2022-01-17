import { NavigationContainer } from "@react-navigation/native";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import { useAuthContext } from "../contexts/AuthContext";
import { subscribeAuth } from "../libs/Auth";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

function RootNavigator() {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = subscribeAuth(
      (authenticatedUser: User) => {
        setUser(authenticatedUser);
        setLoading(false);
        return unsubscribeAuthStateChanged;
      }
    );
  }, [setUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default RootNavigator;
