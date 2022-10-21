import './Form.css'
import { useState, useReducer } from "react";
import { MultiSelect } from "react-multi-select-component";
import { formReducer, ACTION } from './formReducer'; // import formReducer file
import { techOptions } from './techOptions';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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

        console.log(technologies)

        formData.append("technologies", JSON.stringify(technologies)) // must stringify arrays in formData
        axios.post(`http://localhost:8000/api/projects`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => console.log(res))
            .then(() => {
                navigate('/gallery')
            })
    }

    return (
        <div className="form-page">
            <form className="share-form" type="submit">
                <input 
                    className="fields"
                    type="text" 
                    placeholder="Title"
                    onChange={(e) => dispatch({type: ACTION.SET_NAME, payload: e.target.value })}
                /><br/>
                <textarea 
                    className="fields"
                    type="text" 
                    placeholder="Description"
                    onChange={(e) => dispatch({type: ACTION.SET_DESCRIPTION, payload: e.target.value})}
                /><br/>
                <input 
                    className="fields"
                    type="url" 
                    placeholder="Project URL"
                    onChange={(e) => dispatch({type: ACTION.SET_PROJECT_URL, payload: e.target.value})}
                /><br/>
                <input 
                    className="file-field"
                    type="file"
                    onChange={(e) => dispatch({type: ACTION.SET_IMAGE, payload: e.target.files[0]})}
                /><br/>
                <MultiSelect
                    hasSelectAll={false}
                    options={techOptions}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
                <br/>
                <button 
                    className="post-btn"
                    type="submit"
                    onClick={handlePost}
                >
                    Submit
                </button>
            </form>
            <p>{state.title}</p>
            <p>{state.description}</p>
            <p>{state.projectUrl}</p>
            <pre>{JSON.stringify(selected)}</pre>

        </div>
    );
};

export default Form;