export const authReducer = (state, action) => {
    switch(action.type) {
        case 'setSignUp':
            return { ...state, signUp: !state.signUp }
        case 'setFirstName':
            return { ...state, firstName: action.payload }
        case 'setLastName':
            return { ...state, lastName: action.payload }
        case 'setEmail':
            return { ...state, email: action.payload }
        case 'setPassword':
            return { ...state, password: action.payload }
        case 'setConfirmPassword':
            return { ...state, confirmPassword: action.payload }
        default:
            throw new Error()
    }
}

export const ACTION = {
    SET_SIGN_UP: "setSignUp",
    SET_FIRST_NAME: "setFirstName",
    SET_LAST_NAME: "setLastName",
    SET_EMAIL: "setEmail",
    SET_PASSWORD: "setPassword",
    SET_CONFIRM_PASSWORD: "setConfirmPassword"
}