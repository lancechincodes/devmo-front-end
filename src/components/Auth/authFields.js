import { ACTION } from './authReducer'

export const loginFields = [
    {
        label: "Email",
        type: "email",
        reducerType: ACTION.SET_EMAIL,
    },
    {
        label: "Password",
        type: "password",
        reducerType: ACTION.SET_PASSWORD
    }
]

export const signUpFields = [
    {
        label: "First name",
        type: "text",
        reducerType: ACTION.SET_FIRST_NAME
    },
    {
        label: "Last name",
        type: "text",
        reducerType: ACTION.SET_LAST_NAME
    },
    {
        label: "Email",
        type: "email",
        reducerType: ACTION.SET_EMAIL
    },
    {
        label: "Password",
        type: "password",
        reducerType: ACTION.SET_PASSWORD
    },
    {
        label: "Confirm password",
        type: "password",
        reducerType: ACTION.SET_CONFIRM_PASSWORD
    }
]