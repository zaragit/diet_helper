import { NavigationContainer } from "@react-navigation/native";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import { useAuthContext } from "../contexts/AuthContext";
import { subscribeAuth } from "../libs/Auth";
import { getProfileByUid } from "../libs/Profile";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

function RootNavigator() {
  const { user, setUser, profile, setProfile } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setTimeout(() => {
    const unsubscribeAuthStateChanged = subscribeAuth(
      async (authenticatedUser: User) => {
        setUser(authenticatedUser);

        if (authenticatedUser) {
          setProfile(await getProfileByUid(authenticatedUser.uid));
        }

        setLoading(false);
        return unsubscribeAuthStateChanged;
      }
    );
    // }, 2400);
  }, [setUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user && profile ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default RootNavigator;
