import { ACTION } from './formReducer'

export const formFields = [
    {
        label: "Project Name",
        type: "text",
        reducerType: ACTION.SET_NAME
    },
    {
        label: "Description",
        type: "text",
        reducerType: ACTION.SET_DESCRIPTION
    },
    {
        label: "Project URL",
        type: "url",
        reducerType: ACTION.SET_PROJECT_URL
    }
]