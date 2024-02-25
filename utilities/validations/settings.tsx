import * as yup from "yup";
import { user } from "./yup/user";

export interface TypesSchemaProfile {
    name: string,
    birthday: Date,
    gender: number
}

export const schemaProfile = yup.object().shape({
    name: user.name,
    birthday: user.birthday,
    gender: user.gender
});

export interface TypesSchemaAccount {
    email: string,
    username: string,
}

export const schemaAccount = yup.object().shape({
    email: user.email,
    username: user.username,
});