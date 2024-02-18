import React, { useEffect, useState } from "react";
import { firebaseAuth, firebaseFirestore } from "@/firebaseConfig";
import { signOut as signOutFirebase } from "firebase/auth";
import { UserModel } from "../models/UserModel";
import { doc, getDoc } from "firebase/firestore";
import { useStorageState } from "../hooks/useStorageState";
import { router } from "expo-router";

const AuthContext = React.createContext<{
  signIn: (uid: string) => void;
  signOut: () => void;
  session?: string | null;
  user?: UserModel | null;
  isLoading: boolean;
}>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  user: null,
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
      const userDoc = doc(firebaseFirestore, "users", uid);
      const userData = await getDoc(userDoc);

      if (userData.exists()) {
        const user = userData.data();
        const newSession = {
          userId: uid,
          username: user.username,
          name: user.name,
          birthday: user.birthday,
          email: user.email,
          gender: user.gender,
        };
        setUser(newSession);
        setSession(uid);

        router.replace("/");
      } else {
        router.push({ pathname: "/signup", params: { isCredential: 1 } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await signOutFirebase(firebaseAuth);

      setSession(null);
      setUser(null);
    } catch (error) {
      console.log(error);
      alert("Sign-out failed: " + error);
    }
  };

  const contextValue = {
    signIn,
    signOut,
    session,
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
