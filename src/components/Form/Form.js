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
    // use reducer for form's state management
    const [state, dispatch] = useReducer(formReducer, 
        {name: '', description: '', projectUrl: '', image: '', githubRepo: '', nameCharactersRemaining: 15, descriptionCharactersRemaining: 100})
    const [selectedTech, setSelectedTech] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()
    const { project } = window.localStorage.getItem('Form') === 'Update' ? location.state : {"name": "", "description": "", "projectUrl": "", "githubRepo": ""}
    const [showNameCharactersRemaining, setShowNameCharactersRemaining] = useState(false)
    const [showDescriptionCharactersRemaining, setShowDescriptionCharactersRemaining] = useState(false)
    
    useEffect(() => {
        if (window.localStorage.getItem('Form') === 'Update') {
            dispatch({type: ACTION.SET_NAME, payload: project.name})
            dispatch({type: ACTION.SET_DESCRIPTION, payload: project.description})
            dispatch({type: ACTION.SET_PROJECT_URL, payload: project.projectUrl})
            dispatch({type: ACTION.SET_GITHUB_REPO, payload: project.githubRepo})        
            setSelectedTech(project.technologies)   
        } 
    }, [])

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
                formData.append("technologies", JSON.stringify(selectedTech)) // must stringify arrays in formData
                formData.append("githubRepo", state.githubRepo) // must stringify arrays in formData

                axios.get('http://localhost:8000/api/projects')
                    .then(res => {
                        formData.append("popularity", res.data.length + 1) // res.data.length + 1 = nth project uploaded
                        axios.post(`http://localhost:8000/api/projects`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
                            .then(() => {
                                navigate('/gallery') // navigate to successful submission page
                            })
                            .catch(err => console.log(err))
                            })
                    })
                    .catch(err => console.log(err))
            .catch(err => console.log(err))
    }

    function handleCancel() {
        navigate(-1)
    }

    function handleUpdate(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", state.name)
        formData.append("description", state.description)  
        formData.append("projectUrl", state.projectUrl)
        formData.append("image", state.image)
        formData.append("owner", JSON.stringify(project.owner)) // must stringify object in formData                
        formData.append("technologies", JSON.stringify(selectedTech)) // must stringify arrays in formData
        formData.append("githubRepo", state.githubRepo) // must stringify arrays in formData
        formData.append("popularity", project.popularity)

        axios.patch(`http://localhost:8000/api/projects/${project._id}`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => {
                console.log(res)
            })
            .then(() => {
                navigate(-1)
            })
            .catch(err => console.log(err))
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
                        defaultValue={window.localStorage.getItem("Form") === "Update" ? project.name : ""}
                    />
             
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
                        defaultValue={window.localStorage.getItem("Form") === "Update" ? project.description : ""}
                    />

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


                    <TextField
                        className="outlined-basic"
                        label="Project URL"
                        variant="outlined"
                        type="text"
                        onChange={(e) => dispatch({type: ACTION.SET_PROJECT_URL, payload: e.target.value})}
                        required={true}
                        defaultValue={window.localStorage.getItem("Form") === "Update" ? project.projectUrl : ""}
                    />
                    <TextField
                        className="outlined-basic"
                        label="GitHub Repo"
                        variant="outlined"
                        type="text"
                        onChange={(e) => dispatch({type: ACTION.SET_GITHUB_REPO, payload: e.target.value})}
                        defaultValue={window.localStorage.getItem("Form") === "Update" ? project.githubRepo : ""}
                    />
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
                    <MultipleSelectCheckmarks 
                        selectedTech={selectedTech} 
                        setSelectedTech={setSelectedTech}
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
                    <div
                        className="submit-post-btn"
                        type="submit"
                        onClick={handlePost}
                    >
                        Share
                    </div>
                )}
            </form>
        </div>
    );
};

export default Form;