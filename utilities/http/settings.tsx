import { firebaseFirestore } from "@/firebaseConfig";
import { useSession } from "../context/authContext";
import { TypesSchemaAccount, TypesSchemaProfile } from "../validations/settings";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";

export function httpSettings(
    uid: string,
    updateUser: Function,
    data: TypesSchemaProfile | TypesSchemaAccount
  ){
    //Check if somebody has the same username
    return new Promise((resolve, reject) => {
        if (uid != null) {
          setDoc(
            doc(firebaseFirestore, "users", uid),
            data,
            { merge: true }
          ).then(() => {
            updateUser(data);
            router.back();
            resolve(undefined);
          });
        }
    });
  }