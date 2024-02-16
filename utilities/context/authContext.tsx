import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { firebaseAuth } from "@/firebaseConfig";
import { OAuthProvider, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import * as AppleAuthentication from 'expo-apple-authentication';

const AuthContext = React.createContext<{
  signIn: (data: {
    email: string;
    password: string;
    setLoading?: (value: React.SetStateAction<boolean>) => void;
  }) => Promise<void> | null;
  signInWithApple: (data?: {
    setLoading?: (value: React.SetStateAction<boolean>) => void;
  }) => Promise<void> | null;
  signOut: () => Promise<void> | null;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  signInWithApple: () => null,
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
            data.setLoading != null && data.setLoading(true);

            try{
                const response = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
                setSession(response.user.toString());
            } catch(error: any) {
                console.log(error);
                alert('Sign-in failed: '+error.message);
            }
        },
        signInWithApple: async (data) => {
          data != null && data.setLoading != null && data.setLoading(true);

          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
            const { identityToken } = credential;
            if(identityToken){
              const provider = new OAuthProvider('apple.com');
              provider.addScope('email');
              provider.addScope('name');
              const credential = provider.credential({ idToken: identityToken });
              await signInWithCredential(firebaseAuth, credential).then((user) => {
                setSession(user.toString());
              });
            }
          } catch (e: any) {
            console.log(e);
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
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
