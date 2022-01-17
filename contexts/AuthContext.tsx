import { User } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
