import React, { createContext, useEffect, useState } from 'react';
import { setToken } from './utils';
import firebase from './firebase';

interface InitialStateProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: firebase.User | null;
  error: firebase.auth.Error | null;
  handleLogout: () => void;
}

const initialState: InitialStateProps = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  error: null,
  handleLogout: () => {},
};

export const UserContext = createContext<InitialStateProps>(initialState);

export default function AuthUserContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<firebase.auth.Error | null>(null);

  useEffect(() => {
    try {
      const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          setToken(await user.getIdToken());
          setUser(user);
          setAuthenticated(true);
          setLoading(false);
        }
      });
      return () => unsubscriber();
    } catch (err) {
      setError(err);
    }
  }, []);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ isLoading, isAuthenticated, user, error, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
}
