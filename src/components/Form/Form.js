import './Form.css'
import { useState, useReducer } from "react";
import { MultiSelect } from "react-multi-select-component";
import { formReducer, ACTION } from './formReducer'; // import formReducer file
import { techOptions, customValueRenderer } from './multiSelectProps';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TopNav from '../TopNav/TopNav';
import TextField from '@mui/material/TextField';

function Form() {
    // use reducer for form's state management
    const [state, dispatch] = useReducer(formReducer, 
        {name: '', description: '', projectUrl: '', image: ''})
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate()

    function handlePost(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", state.name)
        formData.append("description", state.description)  
        formData.append("projectUrl", state.projectUrl)
        formData.append("image", state.image)

        let technologies = []
        for (let select of selected) {
            technologies.push(select.value)
        }

        formData.append("technologies", JSON.stringify(technologies)) // must stringify arrays in formData
        axios.post(`http://localhost:8000/api/projects`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => console.log(res))
            .then(() => {
                navigate('/gallery')
            })
    }

    return (
        <div className="form-page">
            <TopNav/>
            <form className="share-form" type="submit">
                <h1 className="form-heading">NEW DEVMO</h1>
                <div className="post-text-fields">
                    <TextField
                        className="outlined-basic"
                        label="Project Name"
                        variant="outlined"
                        type="text"
                        required={true}
                        onChange={(e) => dispatch({type: ACTION.SET_NAME, payload: e.target.value})}
                    />
                     <TextField
                        className="outlined-basic"
                        label="Description"
                        variant="outlined"
                        type="text"
                        required={true}
                        onChange={(e) => dispatch({type: ACTION.SET_NAME, payload: e.target.value})}
                        multiline
                        rows={3}
                    />
                     <TextField
                        className="outlined-basic"
                        label="Project URL"
                        variant="outlined"
                        type="text"
                        required={true}
                        onChange={(e) => dispatch({type: ACTION.SET_NAME, payload: e.target.value})}
                    />
                    <TextField
                        className="file-name"
                        type="file"
                        required={true}
                        onChange={(e) => dispatch({type: ACTION.SET_IMAGE, payload: e.target.files[0]})}
                        label="Project Thumbnail"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <MultiSelect
                        hasSelectAll={false}
                        options={techOptions}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                        valueRenderer={customValueRenderer}
                        required={true}
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