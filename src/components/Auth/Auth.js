import './Auth.css'
import { useReducer, useState, useContext } from 'react'
import { signUpFields, loginFields } from './authFields';
import { authReducer } from './authReducer'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../DataContext';
import TopNav from '../TopNav/TopNav'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { ButtonGroup } from '@mui/material';

function Auth() {
    const [error, setError] = useState(null)
    const [state, dispatch] = useReducer(authReducer, 
        {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''})
    const navigate = useNavigate()
    const { isActive, setIsActive, signUp, setSignUp } = useContext(DataContext)

    function handleSwitch() {
        setSignUp(!signUp)
    }

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
                .then(res => {
                    console.log(res)
                    setSignUp(!signUp)
                    console.log(signUp)
                })
                .catch(err => {
                    console.log(err.response.data)
                    setError(err.response.data)
                })
        }
        else {
            axios.post(`http://localhost:8000/api/users/login`, {
                email: state.email,
                password: state.password
            })
                .then(res => {
                    // console.log(res.data)
                    window.localStorage.setItem("Token", res.data)
                    window.localStorage.setItem("Email", state.email)
                })
                .then(() => {
                    navigate('/gallery')
                })
                .catch(err => {
                    setError("Provided email or password is incorrect")
                })
        }
    }

    return (
        <div className="auth-page">
            <TopNav isActive={isActive} setIsActive={setIsActive}/>

            {signUp && <form className="auth-form" type="submit">
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
                <div
                    className="auth-button"
                    onClick={handleSubmit}
                >
                    Sign up
                </div>
                <p className="switch">Already have an account?  
                    <span className="bold" onClick={handleSwitch}> Login</span>
                </p>
            </form>}

            {!signUp && <form className="auth-form" type="submit">
                <h1 className="auth-heading">LOGIN</h1>
                <div className="text-fields">
                    {loginFields.map((textField, idx) => (
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
                <div
                    className="auth-button"
                    onClick={handleSubmit}
                >
                    Log in
                </div>
                <p className="switch">Need an account?  
                    <span className="bold" onClick={handleSwitch}> Sign up</span>
                </p>
            </form>}

            <p>{state.firstName}</p>
            <p>{state.lastName}</p>
            <p>{state.email}</p>
            <p>{state.password}</p>
            <p>{state.confirmPassword}</p>
        </div>

    );
};

export default Auth;