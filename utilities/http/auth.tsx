import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  TypesSchemaSignUp,
  TypesSchemaSignUpWithCredential,
} from "../validations/signup";
import { useSession } from "../context/authContext";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";

import { appleAuth } from '@invertase/react-native-apple-authentication';

export async function httpSignInWithEmailAndPassword(
  signIn: Function,
  email: string,
  password: string
) {
  try {
    auth().signInWithEmailAndPassword(email, password).then((data) => {
      router.replace('/');
    }).catch((error) => {
      console.log(error);
    });
  } catch (error: any) {
    console.log(error);
  }
}

export async function signInWithApple() {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,

        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

      // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }
    // signed in
    const { identityToken, nonce } = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      await auth().signInWithCredential(appleCredential).then((user) => {
        const userDoc = firestore().collection("users").doc(user.user.uid);
       userDoc.get().then((response) => {
        if (!response.exists) {
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

  auth().createUserWithEmailAndPassword(props.email, props.password)
    .then((userCredential) => {
      firestore().collection("users").doc(userCredential.user.uid).set(
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
  const uid = auth().currentUser?.uid;
  if (uid != null) {
    firestore().collection("users").doc(uid).set(
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
