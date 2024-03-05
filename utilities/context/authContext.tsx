import React, { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { UserModel } from "../models/UserModel";
import { useStorageState } from "../hooks/useStorageState";
import { AnyObject } from "yup";

const AuthContext = React.createContext<{
  signIn: (uid: string) => Promise<any>;
  signOut: () => void;
  //getUserData: () => UserModel | void;
  session?: string | null;
  user?: UserModel | null;
  updateUser: (data: AnyObject) => void;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => {},
  //getUserData: () => {},
  session: null,
  user: null,
  updateUser: () => {},
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async (uid: string) => {
    try {
      const userData = await firestore().collection("users").doc(uid).get();

      if (userData.exists) {
        const user = userData.data();
        const newSession = {
          id: uid,
          username: user!.username,
          name: user!.name,
          birthday: user!.birthday,
          email: user!.email,
          gender: user!.gender,
        };
        setUser(newSession);
        setSession(uid);
        return 200;
      }else{
        return 300;
      }
    } catch (error) {
      console.log(error);
    }
  };


  const signOut = async () => {
    try {
      await auth().signOut();

      setSession(null);
      setUser(null);
    } catch (error) {
      console.log(error);
      alert("Sign-out failed: " + error);
    }
  };

  const updateUser = (data: AnyObject) => {
    setUser({...user, ...data} as UserModel);
  }

  const contextValue = {
    signIn,
    signOut,
    session,
    user,
    updateUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
