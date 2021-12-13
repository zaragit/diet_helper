import React, {createContext, useContext, useState} from 'react';

export interface User {
  id: string;
  displayName: string;
  age: number;
  height: number;
  weight: number;
}

interface UserContextValue {
  user: User | null;
  setUser(user: User | null): void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserContextProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext.Provider is not found.');
  }

  return userContext;
}
