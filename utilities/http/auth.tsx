import { firebaseAuth, firebaseFirestore } from "@/firebaseConfig";
import {
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  TypesSchemaSignUp,
  TypesSchemaSignUpWithCredential,
} from "../validations/signup";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSession } from "../context/authContext";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";

export async function httpSignInWithEmailAndPassword(
  signIn: Function,
  email: string,
  password: string
) {
  try {
    signInWithEmailAndPassword(firebaseAuth, email, password).then((data) => {
      router.replace('/');
    }).catch((error) => {
      console.log(error);
    });
  } catch (error: any) {
    console.log(error);
  }
}

export async function signInWithApple(signIn: Function) {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    // signed in
    const { identityToken } = credential;
    if (identityToken) {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");
      const credential = provider.credential({ idToken: identityToken });

      await signInWithCredential(firebaseAuth, credential).then((user) => {
        const userDoc = doc(firebaseFirestore, "users", user.user.uid);
       getDoc(userDoc).then((response) => {
        if (!response.exists()) {
          router.push({ pathname: "/signup", params: { isCredential: 1 } });
        }else{
          router.replace('/');
        }
      });
      }).catch((error) => {
        console.log(error);
      });
    }
  } catch (e: any) {
    console.log(e);
    if (e.code === "ERR_REQUEST_CANCELED") {
      // handle that the user canceled the sign-in flow
    } else {
      // handle other errors
    }
  }
}

export function httpSignUpWithEmailAndPassword(signIn: Function, props: TypesSchemaSignUp) {
  //Check if somebody has the same username

  createUserWithEmailAndPassword(firebaseAuth, props.email, props.password)
    .then((userCredential) => {
      setDoc(
        doc(firebaseFirestore, "users", userCredential.user.uid),
        {
          username: props.username,
          email: props.email,
          name: props.name,
          birthday: props.birthday,
          gender: props.gender,
          score: 0,
        },
        { merge: true }
      )
        .then(() => {
          router.replace('/');
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

export function httpSignUpWithCredential(
  signIn: Function,
  props: TypesSchemaSignUpWithCredential
) {
  //Check if somebody has the same username
  const uid = firebaseAuth.currentUser?.uid;
  if (uid != null) {
    setDoc(
      doc(firebaseFirestore, "users", uid),
      {
        username: props.username,
        email: props.email,
        name: props.name,
        birthday: props.birthday.getTime(),
        gender: props.gender,
        score: 0,
      },
      { merge: true }
    ).then(() => {
      router.replace('/');
    });
  }
}
