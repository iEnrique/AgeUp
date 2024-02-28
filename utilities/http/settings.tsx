import { firebaseApp, firebaseFirestore } from "@/firebaseConfig";
import { useSession } from "../context/authContext";
import {
  TypesSchemaAccount,
  TypesSchemaPassword,
  TypesSchemaProfile,
} from "../validations/settings";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import * as firebase from "firebase/app";
import "firebase/auth";

export function httpSettings(
  uid: string,
  updateUser: Function,
  data: TypesSchemaProfile | TypesSchemaAccount
) {
  //Check if somebody has the same username
  return new Promise((resolve, reject) => {
    if (uid != null) {
      setDoc(doc(firebaseFirestore, "users", uid), data, { merge: true }).then(
        () => {
          updateUser(data);
          router.back();
          resolve(undefined);
        }
      );
    }
  });
}

export function httpSettingPassword(
  data: TypesSchemaPassword
) {
  return new Promise((resolve, reject) => {
    var user = getAuth().currentUser;

    if (user != null && user.email != null) {
      var credential = EmailAuthProvider.credential(
        user.email,
        data.oldPassword
      );

      reauthenticateWithCredential(user, credential)
        .then(function () {
          updatePassword(user!, data.password)
            .then(() => {
              resolve(undefined);
            })
            .catch((error) => {
              throw Error("Error");
            });
        })
        .catch((error) => {
          throw Error("Error");
        });
    } else {
      throw Error("Error");
    }
  });
  // Prompt the user to re-provide their sign-in credentials
}
