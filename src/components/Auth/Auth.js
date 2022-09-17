import './Auth.css'
import TopNav from '../TopNav/TopNav'
import { useReducer } from 'react'
import TextField from '@mui/material/TextField';
import { signUpFields } from './signUpFields';

function Auth() {
    return (
        <div className="auth-page">
            <TopNav/>
            <form className="auth-form" type="submit">
                <h1 className="auth-heading">Sign Up</h1>
                <div className="text-fields">
                    {signUpFields.map((textField, idx) => (
                        <TextField
                            key={idx} 
                            className="outlined-basic" 
                            label={textField.label}
                            variant="outlined" 
                            required={true}
                            type={textField.type}
                        />
                    ))}
                </div>
            </form>
        </div>
    );
};

export default Auth;