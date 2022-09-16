import './Form.css'
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
    { label: "JavaScript", value: "javascript" },
    { label: "React", value: "react" },
    { label: "Express", value: "express"},
];

function Form() {
    const [selected, setSelected] = useState([]);

    return (
        <div className="form-page">
            <form className="share-form">
                <input type="text" placeholder="Title"/><br/>
                <textarea type="text" placeholder="Description"/><br/>
                <input type="url" placeholder="Project URL"/><br/>
                <input type="file"/><br/>
                <MultiSelect
                    hasSelectAll={false}
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;