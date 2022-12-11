import './Auth.css'
import { useReducer, useState, useContext, useEffect } from 'react'
import { signUpFields, loginFields } from './authFields';
import { authReducer } from './authReducer'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../DataContext';
import TopNav from '../TopNav/TopNav'
import TextField from '@mui/material/TextField';
import axios from 'axios'

// for the show password icon
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';

function Auth() {
    // Error message upon unsuccessful auth
    const [error, setError] = useState(null)

    // Auth form state management
    const [state, dispatch] = useReducer(authReducer, 
        {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''})

    // Router
    const navigate = useNavigate()

    // Context
    const { isActive, setIsActive, signUp, setSignUp } = useContext(DataContext)

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Validation state
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    // Switch between login and signup pages
    function handleSwitch() {
        // clear state after switching between login and sign up
        signUpFields.forEach(field => {
            dispatch({type: field.reducerType, payload: ''})
        })
        setSignUp(!signUp)
    }

    // Post requests to sign up and login as well as validation
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
                    setSignUp(!signUp)
                    // clear state after signing up and before redirect to login
                    // signUpFields.forEach(field => {
                    //     dispatch({type: field.reducerType, payload: ''})
                    // })
                })
                .catch(err => {
                    console.log(err)
                    setError(err.response.data)
                    if (state.firstName === '') setFirstNameError(true)
                    else setFirstNameError(false)

                    if (state.lastName === '') setLastNameError(true)
                    else setLastNameError(false)

                    if (state.email === '') setEmailError(true)
                    else setEmailError(false)

                    if (state.password === '') setPasswordError(true)
                    else setPasswordError(false)

                    if (state.confirmPassword === '') setConfirmPasswordError(true)
                    else setConfirmPasswordError(false)
                })
        }
        else {
            axios.post(`http://localhost:8000/api/users/login`, {
                email: state.email,
                password: state.password
            })
                .then(res => {
                    window.localStorage.setItem("Token", res.data)
                    window.localStorage.setItem("Email", state.email)
                    window.localStorage.setItem("Display", 'Featured')
                })
                .then(() => {
                    navigate('/gallery')
                })
                .catch(err => {
                    setError("Provided email or password is incorrect")
                })
        }
    }

    // Toggle password visibility function
    const handleClickShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    // Toggle confirm password visibility function
    const handleClickShowConfirmPassword = (e) => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        console.log(state.firstName)
    })
    
    return (
        <div className="auth-page">
            <TopNav isActive={isActive} setIsActive={setIsActive}/>

            {signUp && <form className="auth-form" type="submit">
                <div className="auth-heading">
                    <h1 className="auth-title">SIGN UP</h1>
                    <p className="auth-description">Favorite, save, and share projects.</p>
                </div>
                <div className="text-fields">
                    {!firstNameError && 
                        <TextField 
                            className="auth-form outlined-basic" 
                            label={signUpFields[0].label}
                            variant="outlined" 
                            required={true}
                            type={signUpFields[0].type}
                            onChange={(e) => dispatch({ type: signUpFields[0].reducerType, payload: e.target.value})}
                            defaultText={state.firstName}
                        />  
                    }
                    {firstNameError && 
                        <TextField 
                            error
                            className="auth-form outlined-basic" 
                            label={signUpFields[0].label}
                            variant="outlined" 
                            required={true}
                            type={signUpFields[0].type}
                            onChange={(e) => dispatch({ type: signUpFields[0].reducerType, payload: e.target.value})}
                            defaultText={state.firstName}
                        />  
                    }

                    {!lastNameError && 
                        <TextField 
                            className="auth-form outlined-basic" 
                            label={signUpFields[1].label}
                            variant="outlined" 
                            required={true}
                            type={signUpFields[1].type}
                            onChange={(e) => dispatch({ type: signUpFields[1].reducerType, payload: e.target.value})}
                        />
                    }
                    {lastNameError && 
                        <TextField 
                            error
                            className="auth-form outlined-basic" 
                            label={signUpFields[1].label}
                            variant="outlined" 
                            required={true}
                            type={signUpFields[1].type}
                            onChange={(e) => dispatch({ type: signUpFields[1].reducerType, payload: e.target.value})}
                        />
                    }

                    {!emailError &&
                        <TextField 
                            className="auth-form outlined-basic" 
                            label={signUpFields[2].label}
                            variant="outlined" 
                            required={true}
                            type={signUpFields[2].type}
                            onChange={(e) => dispatch({ type: signUpFields[2].reducerType, payload: e.target.value})}
                        />
                    }
                    {emailError &&
                        <TextField
                            error 
                            className="auth-form outlined-basic" 
                            label={signUpFields[2].label}
                            variant="outlined" 
                            required={true}
                            type={signUpFields[2].type}
                            onChange={(e) => dispatch({ type: signUpFields[2].reducerType, payload: e.target.value})}
                        />
                    }

                    {!passwordError &&
                        <FormControl 
                            sx={{ m: 1, width: '25ch' }} 
                            variant="outlined" 
                            className="auth-form outlined-basic"                                 
                            required={true}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                className="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={state.password}
                                onChange={(e) => dispatch({ type: signUpFields[3].reducerType, payload: e.target.value})}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label={"Password"}
                                required={true}
                            />
                        </FormControl>
                    }
                    {passwordError &&
                        <FormControl 
                            error
                            sx={{ m: 1, width: '25ch' }} 
                            variant="outlined" 
                            className="auth-form outlined-basic"                                 
                            required={true}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                className="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={state.password}
                                onChange={(e) => dispatch({ type: signUpFields[3].reducerType, payload: e.target.value})}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label={"Password"}
                                required={true}
                            />
                        </FormControl>
                    }

                    {!confirmPasswordError &&
                        <FormControl 
                            sx={{ m: 1, width: '25ch' }} 
                            variant="outlined" 
                            className="auth-form outlined-basic"                                 
                            required={true}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                            <OutlinedInput
                                className="outlined-adornment-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={state.confirmPassword}
                                onChange={(e) => dispatch({ type: signUpFields[4].reducerType, payload: e.target.value})}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                        >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={"Confirm password"}
                                required={true}
                            />
                        </FormControl>
                    }
                    {confirmPasswordError &&
                        <FormControl 
                            error
                            sx={{ m: 1, width: '25ch' }} 
                            variant="outlined" 
                            className="auth-form outlined-basic"                                 
                            required={true}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                            <OutlinedInput
                                className="outlined-adornment-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={state.confirmPassword}
                                onChange={(e) => dispatch({ type: signUpFields[4].reducerType, payload: e.target.value})}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                        >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={"Confirm password"}
                                required={true}
                            />
                        </FormControl>
                    }
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
                <div className="auth-heading">
                    <h1 className="auth-title">LOGIN</h1>
                    <p className="auth-description">Welcome back to Devmo.</p>
                </div>
                <div className="text-fields">
                    <TextField
                        className="auth-form outlined-basic" 
                        label="Email"
                        variant="outlined" 
                        required={true}
                        type="email"
                        onChange={(e) => dispatch({ type: loginFields[0].reducerType, payload: e.target.value})}
                    />
                    <FormControl 
                        sx={{ m: 1, width: '25ch' }} 
                        variant="outlined" 
                        className="auth-form outlined-basic"                                 
                        required={true}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            className="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={state.password}
                            onChange={(e) => dispatch({ type: loginFields[1].reducerType, payload: e.target.value})}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label={"Password"}
                            required={true}
                        />
                    </FormControl>
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
        </div>

    );
};

export default Auth;