import * as yup from "yup";

export const user = {
    name: yup.string().max(13, "Name is too long").required("Name is required"),
    birthday: yup.date().required("Birthday is required"),
    username: yup.string().max(20, "Username is too long").required("Username is required"),
    email: yup.string().email("Email is not valid").required("Email is required"),
    password: yup.string().required("Password is required"),
    gender: yup.number().min(0).max(1).required("Gender is required")
}