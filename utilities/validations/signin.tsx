import * as yup from "yup";
import { user } from "./yup/user";

export const schemaSignIn = yup.object().shape({
    email: user.email,
    password: user.password
});
