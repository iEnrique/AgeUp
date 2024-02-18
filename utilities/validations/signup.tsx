import * as yup from "yup";

export interface TypesSchemaSignUp {
    name: string,
    birthday: Date,
    username: string,
    email: string,
    password: string
}

export const schemaSignUp = yup.object().shape({
    name: yup.string().max(15, "Name is too long").required("Name is required"),
    birthday: yup.date().required("Birthday is required"),
    username: yup.string().max(20, "Username is too long").required("Username is required"),
    email: yup.string().email("Email is not valid").required("Email is required"),
    password: yup.string().required("Password is required")
});

export interface TypesSchemaSignUpWithCredential {
    name: string,
    birthday: Date,
    username: string,
    email: string,
}

export const schemaSignUpWithCredential = yup.object().shape({
    name: yup.string().min(1, "Name is too short").max(15, "Name is too long").required("Name is required"),
    birthday: yup.date().required("Birthday is required"),
    username: yup.string().max(20, "Username is too long").required("Username is required"),
    email: yup.string().email("Email is not valid").required("Email is required"),
});