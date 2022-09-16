export const formReducer = (state, action) => {
    switch(action.type) {
        case 'setName':
            return { ...state, name: action.payload }
        case 'setDescription':
            return { ...state, description: action.payload}
        case 'setProjectUrl': 
            return { ...state, projectUrl: action.payload}
        case 'setImage':
            return { ...state, image: action.payload}
        default:
            throw new Error()
    }
}

export const ACTION = {
    SET_NAME: 'setName',
    SET_DESCRIPTION: 'setDescription',
    SET_PROJECT_URL: 'setProjectUrl',
    SET_IMAGE: 'setImage',
}