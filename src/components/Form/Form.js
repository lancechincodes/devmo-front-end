import './Form.css'
import MultipleSelectChip from './MultipleSelectChip';

function Form() {
    


    return (
        <div className="form-page">
            <form className="share-form">
                <input type="text" placeholder="Title"/>
                <br/>
                <textarea type="text" placeholder="Description"/>
                <br/>
                <input type="url" placeholder="Project URL"/>
                <input type="file"/>
                <MultipleSelectChip/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;