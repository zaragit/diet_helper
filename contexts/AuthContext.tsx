import { User } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";
import { Profile } from "../libs/Profile";

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext.Provider is not found.");
  }

  return authContext;
}
