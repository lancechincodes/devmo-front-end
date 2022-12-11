import './Form.css'
import { useState, useReducer, useEffect } from "react";
import { formReducer, ACTION } from './formReducer'; // import formReducer file
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import TopNav from '../TopNav/TopNav';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks';

function Form() {
    // Use reducer for form's state management
    const [state, dispatch] = useReducer(formReducer, 
        {name: '', description: '', projectUrl: '', image: '', githubRepo: '', nameCharactersRemaining: 15, descriptionCharactersRemaining: 100})
    const [selectedTech, setSelectedTech] = useState([]);

    // Router
    const navigate = useNavigate()
    const location = useLocation()

    // Destructuring project to edit properties
    const { project } = window.localStorage.getItem('Form') === 'Update' ? location.state : {"name": "", "description": "", "projectUrl": "", "githubRepo": ""}
    
    // Helper text for characters remaining state
    const [showNameCharactersRemaining, setShowNameCharactersRemaining] = useState(false)
    const [showDescriptionCharactersRemaining, setShowDescriptionCharactersRemaining] = useState(false)

    // Validation state
    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [projectUrlError, setProjectUrlError] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [techError, setTechError] = useState(false)
    const [invalidProjectUrl, setInvalidProjectUrl] = useState(false)
    const [invalidGithubUrl, setInvalidGithubUrl] = useState(false)

    // Regex for checking validity of url
    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    // Upon mount on update pages, set state to project to edit properties
    useEffect(() => {
        if (window.localStorage.getItem('Form') === 'Update') {
            dispatch({type: ACTION.SET_NAME, payload: project.name})
            dispatch({type: ACTION.SET_DESCRIPTION, payload: project.description})
            dispatch({type: ACTION.SET_PROJECT_URL, payload: project.projectUrl})
            dispatch({type: ACTION.SET_GITHUB_REPO, payload: project.githubRepo})        
            setSelectedTech(project.technologies)   
        } 
    }, [])

    // Post request or validation
    function handlePost(e) {
        e.preventDefault()

        // add owner to form data
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                // console.log(res)
                const usersArr = res.data
                const loggedOnUser = usersArr.find(user => user.email === window.localStorage.getItem('Email'))
       
                const formData = new FormData()
                formData.append("name", state.name)
                formData.append("description", state.description)  
                formData.append("projectUrl", state.projectUrl)
                formData.append("image", state.image)
                formData.append("owner", JSON.stringify(loggedOnUser)) // must stringify object in formData
                if (selectedTech.length !== 0) formData.append("technologies", JSON.stringify(selectedTech)) // must stringify arrays in formData
                formData.append("githubRepo", state.githubRepo)

                axios.get('http://localhost:8000/api/projects')
                    .then(res => {
                        formData.append("popularity", res.data.length + 1) // res.data.length + 1 = nth project uploaded
                        axios.post(`http://localhost:8000/api/projects`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
                            .then(() => {
                                navigate('/gallery') // navigate to successful submission page
                            })
                            .catch(err => {
                                console.log(err)

                                if (state.name === '') setNameError(true)
                                else setNameError(false)

                                if (state.description === '') setDescriptionError(true)
                                else setDescriptionError(false)

                                // error will show if project url is empty OR its an invalid url
                                if (state.projectUrl === '' || isValidUrl(state.projectUrl) === false) {
                                    setProjectUrlError(true)
                                }
                                else {
                                    setProjectUrlError(false)
                                }

                                // helper text for project url will only show if it is an invalid url
                                if (state.projectUrl === '') {
                                    setInvalidProjectUrl(false)
                                }
                                else if (isValidUrl(state.projectUrl) === false) {
                                    setInvalidProjectUrl(true)
                                }

                                // helper text for github repo will only show if github repo url is not blank AND it is an invalid url
                                if (state.githubRepo !== '' && isValidUrl(state.githubRepo) === false) {
                                    setInvalidGithubUrl(true)
                                }
                                else {
                                    setInvalidGithubUrl(false)
                                }

                                if (state.image === '') setImageError(true)
                                else setImageError(false)

                                if (selectedTech.length === 0) setTechError(true)
                                else setTechError(false)
                            })
                        })
                    })
                    .catch(err => console.log(err))
            .catch(err => console.log(err))
    }

    // Back button
    function handleCancel() {
        navigate(-1)
    }

    // Patch request or validation
    function handleUpdate(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", state.name)
        formData.append("description", state.description)  
        formData.append("projectUrl", state.projectUrl)
        formData.append("image", state.image)
        formData.append("owner", JSON.stringify(project.owner)) // must stringify object in formData                
        if (selectedTech.length !== 0) formData.append("technologies", JSON.stringify(selectedTech)) // must stringify arrays in formData
        formData.append("githubRepo", state.githubRepo) // must stringify arrays in formData
        formData.append("popularity", project.popularity)
        formData.append("likes", project.likes)

        axios.patch(`http://localhost:8000/api/projects/${project._id}`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                navigate(-1)
            })
            .catch(err => {
                console.log(err)

                if (state.name === '') setNameError(true)
                else setNameError(false)

                if (state.description === '') setDescriptionError(true)
                else setDescriptionError(false)

                // error will show if project url is empty OR its an invalid url
                if (state.projectUrl === '' || isValidUrl(state.projectUrl) === false) {
                    setProjectUrlError(true)
                }
                else {
                    setProjectUrlError(false)
                }

                // helper text for project url will only show if it is an invalid url
                if (state.projectUrl === '') {
                    setInvalidProjectUrl(false)
                }
                else if (isValidUrl(state.projectUrl) === false) {
                    setInvalidProjectUrl(true)
                }

                // helper text for github repo will only show if github repo url is not blank AND it is an invalid url
                if (state.githubRepo && isValidUrl(state.githubRepo) === false) {
                    setInvalidGithubUrl(true)
                }
                else {
                    setInvalidGithubUrl(false)
                }

                if (state.image === '') setImageError(true)
                else setImageError(false)

                if (selectedTech.length === 0) setTechError(true)
                else setTechError(false)
            })
    }

    return (
        <div className="form-page">
            <TopNav/>
            <form className="share-form" type="submit">
                {window.localStorage.getItem("Form") === 'Post' &&
                    <div className="form-heading">
                        <h1 className="gallery-title">NEW DEVMO</h1>
                        <p className="gallery-description">Inspire on.</p>
                    </div>
                }
                {window.localStorage.getItem("Form") === 'Update' &&
                    <div className="form-heading">
                        <h1 className="gallery-title">EDIT DEVMO</h1>
                        <p className="gallery-description">Refactor and refine.</p>
                    </div>
                }
                <div className="post-text-fields">
                    {!nameError && 
                        <TextField
                            className="devmo-form outlined-basic"
                            label="Project Name"
                            variant="outlined"
                            type="text"
                            onChange={(e) => {
                                setShowNameCharactersRemaining(true)
                                dispatch({type: ACTION.SET_NAME, payload: e.target.value})
                                dispatch({type: ACTION.SET_NAME_CHARACTERS_REMAINING, payload: e.target.value})    
                            }}
                            required={true}
                            inputProps={{ maxLength: 15 }}
                            defaultValue={window.localStorage.getItem("Form") === "Update" ? project.name : state.name}
                        />
                    }

                    {nameError && 
                        <TextField
                            error
                            className="devmo-form outlined-basic"
                            label="Project Name"
                            variant="outlined"
                            type="text"
                            onChange={(e) => {
                                setShowNameCharactersRemaining(true)
                                dispatch({type: ACTION.SET_NAME, payload: e.target.value})
                                dispatch({type: ACTION.SET_NAME_CHARACTERS_REMAINING, payload: e.target.value})    
                            }}
                            required={true}
                            inputProps={{ maxLength: 15 }}
                            defaultValue={state.name}
                        />
                    }
             
                    {window.localStorage.getItem("Form") === "Update" && showNameCharactersRemaining && (
                        <FormHelperText className="component-helper-text">
                            {state.nameCharactersRemaining} characters remaining
                        </FormHelperText>
                    )}

                    {window.localStorage.getItem("Form") === "Post" && 
                        <FormHelperText className="component-helper-text">
                            {state.nameCharactersRemaining} characters remaining
                        </FormHelperText>
                    }
           
                    {!descriptionError &&
                        <TextField
                            className="devmo-form outlined-basic"
                            label="Description"
                            variant="outlined"
                            type="text"
                            onChange={(e) => {
                                setShowDescriptionCharactersRemaining(true)
                                dispatch({type: ACTION.SET_DESCRIPTION, payload: e.target.value})
                                dispatch({type: ACTION.SET_DESCRIPTION_CHARACTERS_REMAINING, payload: e.target.value})    
                            }}
                            multiline
                            rows={3}
                            required={true}
                            inputProps={{ maxLength: 100 }}
                            defaultValue={window.localStorage.getItem("Form") === "Update" ? project.description : state.description}
                        />
                    }

                    {descriptionError &&
                        <TextField
                            error
                            className="devmo-form outlined-basic"
                            label="Description"
                            variant="outlined"
                            type="text"
                            onChange={(e) => {
                                setShowDescriptionCharactersRemaining(true)
                                dispatch({type: ACTION.SET_DESCRIPTION, payload: e.target.value})
                                dispatch({type: ACTION.SET_DESCRIPTION_CHARACTERS_REMAINING, payload: e.target.value})    
                            }}
                            multiline
                            rows={3}
                            required={true}
                            inputProps={{ maxLength: 100 }}
                            defaultValue={state.description}
                        />
                    }

                    {window.localStorage.getItem("Form") === "Update" && showDescriptionCharactersRemaining && (
                        <FormHelperText className="component-helper-text">
                            {state.descriptionCharactersRemaining} characters remaining
                        </FormHelperText>
                    )}

                    {window.localStorage.getItem("Form") === "Post" && 
                        <FormHelperText className="component-helper-text">
                            {state.descriptionCharactersRemaining} characters remaining
                        </FormHelperText>
                    }

                    {!projectUrlError &&
                        <TextField
                            className="outlined-basic"
                            label="Project URL"
                            variant="outlined"
                            type="text"
                            onChange={(e) => dispatch({type: ACTION.SET_PROJECT_URL, payload: e.target.value})}
                            required={true}
                            defaultValue={window.localStorage.getItem("Form") === "Update" ? project.projectUrl : state.projectUrl}
                        />
                    }

                    {projectUrlError &&
                        <>
                            <TextField
                                error
                                className="outlined-basic"
                                label="Project URL"
                                variant="outlined"
                                type="text"
                                onChange={(e) => dispatch({type: ACTION.SET_PROJECT_URL, payload: e.target.value})}
                                required={true}
                                defaultValue={state.projectUrl}
                            />
                            {invalidProjectUrl && 
                                <FormHelperText className="component-helper-text">
                                    Invalid URL
                                </FormHelperText>
                            }
                        </>   
                    }
                    
                    {!invalidGithubUrl &&
                        <TextField
                            className="outlined-basic"
                            label="GitHub Repo"
                            variant="outlined"
                            type="text"
                            onChange={(e) => dispatch({type: ACTION.SET_GITHUB_REPO, payload: e.target.value})}
                            defaultValue={window.localStorage.getItem("Form") === "Update" ? project.githubRepo : state.githubRepo}
                        />
                    }

                    {invalidGithubUrl && 
                    <>
                        <TextField
                            error
                            className="outlined-basic"
                            label="GitHub Repo"
                            variant="outlined"
                            type="text"
                            onChange={(e) => dispatch({type: ACTION.SET_GITHUB_REPO, payload: e.target.value})}
                            defaultValue= {state.githubRepo}
                        />
                         <FormHelperText className="component-helper-text">
                            Invalid URL
                        </FormHelperText>
                    </>
                    }

                    {!imageError &&
                        <TextField
                            className="file-name"
                            type="file"
                            onChange={(e) => dispatch({type: ACTION.SET_IMAGE, payload: e.target.files[0]})}
                            label="Project Thumbnail (Landscape)"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required={true}
                        />
                    }

                    {imageError &&
                        <TextField
                            error
                            className="file-name"
                            type="file"
                            onChange={(e) => dispatch({type: ACTION.SET_IMAGE, payload: e.target.files[0]})}
                            label="Project Thumbnail (Landscape)"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required={true}
                        />
                    }
        
                    <MultipleSelectCheckmarks 
                        selectedTech={selectedTech} 
                        setSelectedTech={setSelectedTech}
                        techError={techError}
                    />
                </div>
                
                {window.localStorage.getItem("Form") === 'Update' ? (
                    <div className="update-btn-div">
                        <div
                        className="update-post-btn"
                        type="submit"
                        onClick={handleCancel}
                        id="cancel-btn"
                        >
                        Cancel
                        </div>
                        <div
                        className="update-post-btn"
                        type="submit"
                        onClick={handleUpdate}
                        id="save-btn"
                        >
                        Save
                        </div>
                    </div>
                ) : (
                    <div className="update-btn-div">
                        <div
                        className="update-post-btn"
                        type="submit"
                        onClick={handleCancel}
                        id="cancel-btn"
                        >
                        Cancel
                        </div>
                        <div
                        className="update-post-btn"
                        type="submit"
                        onClick={handlePost}
                        id="share-btn"
                        >
                        Share
                    </div>
                    </div>
                  
                )}
            </form>
        </div>
    );
};

export default Form;