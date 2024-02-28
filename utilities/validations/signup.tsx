import * as yup from "yup";
import { user } from "./yup/user";

export interface TypesSchemaSignUp {
    name: string,
    birthday: Date,
    username: string,
    email: string,
    password: string,
    passwordRepeat: string,
    gender: number
}

export const schemaSignUp = yup.object().shape({
    name: user.name,
    birthday: user.birthday,
    username: user.username,
    email: user.email,
    password: user.password,
    passwordRepeat: user.passwordRepeat,
    gender: user.gender
});

export interface TypesSchemaSignUpWithCredential {
    name: string,
    birthday: Date,
    username: string,
    email: string,
    gender: number
}

export const schemaSignUpWithCredential = yup.object().shape({
    name: user.name,
    birthday: user.birthday,
    username: user.username,
    email: user.email,
    gender: user.gender
});