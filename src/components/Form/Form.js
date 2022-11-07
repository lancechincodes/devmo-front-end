import './Form.css'
import { useState, useReducer } from "react";
import { formReducer, ACTION } from './formReducer'; // import formReducer file
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TopNav from '../TopNav/TopNav';
import TextField from '@mui/material/TextField';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks';

function Form() {
    // use reducer for form's state management
    const [state, dispatch] = useReducer(formReducer, 
        {name: '', description: '', projectUrl: '', image: '', githubRepo: ''})
    const [selectedTech, setSelectedTech] = useState([]);
    const navigate = useNavigate()

    function handlePost(e) {
        e.preventDefault()

        // add owner to form data
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                console.log(res)
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

                axios.post(`http://localhost:8000/api/projects`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
                    .then(res => console.log(res))
                    .then(() => {
                        navigate('/gallery') // navigate to successful submission page
                    })
                    .catch(err => console.log(err))
                })
            .catch(err => console.log(err))
    }

    return (
        <div className="form-page">
            <TopNav/>
            <form className="share-form" type="submit">
                <div className="form-heading">
                        <h1 className="gallery-title">NEW DEVMO</h1>
                        <p className="gallery-description">Inspire on.</p>
                    </div>
                <div className="post-text-fields">
                    <TextField
                        className="outlined-basic"
                        label="Project Name"
                        variant="outlined"
                        type="text"
                        onChange={(e) => dispatch({type: ACTION.SET_NAME, payload: e.target.value})}
                        required={true}
                    />
                    <TextField
                        className="outlined-basic"
                        label="Description"
                        variant="outlined"
                        type="text"
                        onChange={(e) => dispatch({type: ACTION.SET_DESCRIPTION, payload: e.target.value})}
                        multiline
                        rows={3}
                        required={true}
                    />
                    <TextField
                        className="outlined-basic"
                        label="Project URL"
                        variant="outlined"
                        type="text"
                        onChange={(e) => dispatch({type: ACTION.SET_PROJECT_URL, payload: e.target.value})}
                        required={true}
                    />
                    <TextField
                        className="outlined-basic"
                        label="GitHub Repo"
                        variant="outlined"
                        type="text"
                        onChange={(e) => dispatch({type: ACTION.SET_PROJECT_URL, payload: e.target.value})}
                    />
                    <TextField
                        className="file-name"
                        type="file"
                        onChange={(e) => dispatch({type: ACTION.SET_IMAGE, payload: e.target.files[0]})}
                        label="Project Thumbnail"
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

                <div
                    className="submit-post-btn"
                    type="submit"
                    onClick={handlePost}
                >
                    Share
                </div>
            </form>
        </div>
    );
};

export default Form;