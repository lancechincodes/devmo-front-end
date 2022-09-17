import './Auth.css'
import TopNav from '../TopNav/TopNav'
import { useReducer, useState } from 'react'
import TextField from '@mui/material/TextField';
import { signUpFields } from './signUpFields';
import { authReducer } from './authReducer'
import axios from 'axios'

function Auth() {
    const [signUp, setSignUp] = useState(true)
    const [error, setError] = useState(null)
    const [state, dispatch] = useReducer(authReducer, 
        {firstName: '', lastName: '', password: '', confirmPassword: ''})


    function handleSubmit(e) {
        e.preventDefault()
        if (signUp) {
            if (state.password !== state.confirmPassword) {
                setError('Password and confirmation password does not match')
                return
            }

            axios.post('http://localhost:8000/api/users/signup', {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password
            })
                .then(res => console.log(res))
        }
    }

    return (
        <div className="auth-page">
            <TopNav/>
            <form className="auth-form" type="submit">
                <h1 className="auth-heading">SIGN UP</h1>
                <div className="text-fields">
                    {signUpFields.map((textField, idx) => (
                        <TextField
                            key={idx} 
                            className="outlined-basic" 
                            label={textField.label}
                            variant="outlined" 
                            required={true}
                            type={textField.type}
                            onChange={(e) => dispatch({ type: textField.reducerType, payload: e.target.value})}
                        />
                    ))}
                </div>
                <button
                    className="auth-button"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </form>
            <p>{state.firstName}</p>
            <p>{state.lastName}</p>
            <p>{state.email}</p>
            <p>{state.password}</p>
            <p>{state.confirmPassword}</p>
        </div>

    );
};

export default Auth;