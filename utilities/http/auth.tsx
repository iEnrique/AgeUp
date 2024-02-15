import { firebaseAuth, firebaseFirestore } from "@/firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { TypesSchemaSignUp, schemaSignUp } from "../validations/signup";
import { Firestore, addDoc, collection, getFirestore } from "firebase/firestore";
import { useSession } from "../context/authContext";

export function httpSignUp(props: TypesSchemaSignUp){
    console.log('arrived here!');

    //Check if somebody has the same username

    createUserWithEmailAndPassword(firebaseAuth, props.email, props.password).then((userCredential) => {
        addDoc(collection(firebaseFirestore, "users"), {
            uid: userCredential.user.uid,
            username: props.username,
            email: props.email,
            name: props.name,
            birthday: props.birthday,
            score: 0
        }).then(() => {
            const { signIn } = useSession();

            signIn({email: props.email, password: props.password});

        }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
}