// read action type and perform case that matches it
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
        case 'setGithubRepo':
            return { ...state, githubRepo: action.payload}
        case 'setNameCharactersRemaining':
            return { ...state, nameCharactersRemaining: 15 - action.payload.length}
        case 'setDescriptionCharactersRemaining':
            return { ...state, descriptionCharactersRemaining: 100 - action.payload.length}
        default:
            throw new Error()
    }
}

// actions to set properties of the form
export const ACTION = {
    SET_NAME: 'setName',
    SET_DESCRIPTION: 'setDescription',
    SET_PROJECT_URL: 'setProjectUrl',
    SET_IMAGE: 'setImage',
    SET_GITHUB_REPO: 'setGithubRepo',
    SET_NAME_CHARACTERS_REMAINING: 'setNameCharactersRemaining',
    SET_DESCRIPTION_CHARACTERS_REMAINING: 'setDescriptionCharactersRemaining'
}