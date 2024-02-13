import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { firebaseAuth } from "@/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext<{
  signIn: (data: {
    email: string;
    password: string;
    setLoading: (value: React.SetStateAction<boolean>) => void;
  }) => Promise<void> | null;
  signOut: () => Promise<void> | null;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
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
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data) => {
            data.setLoading(true);

            try{
                const response = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
                console.log("Hola: "+response.user.toString());
                setSession(response.user.toString());
            } catch(error: any) {
                console.log(error);
                alert('Sign-in failed: '+error.message);
            }
        },
        signOut: async () => {
            try {
                const response = await signOut(firebaseAuth);
                setSession(null);
            }catch(error: any){
                console.log(error);
                alert('Sign-out failed: '+error.message);
            }

        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
