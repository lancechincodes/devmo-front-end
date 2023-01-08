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
import { FormHelperText } from '@mui/material';

function Auth() {
    // Auth form state management
    const [state, dispatch] = useReducer(authReducer, 
        {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''})

    // Router
    const navigate = useNavigate()

    // Context
    const { isActive, setIsActive } = useContext(DataContext)

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Validation state
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    // Helper text validation if error
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false)
    const [emailInUseError, setEmailInUseError] = useState(false)

    // Login page validation
    const [loginError, setLoginError] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    
    // Regex for checking validity of email
    function isValidEmail(email) {
        let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(email).search (filter) !== -1;
    }

    // Regex for checking validity of password
    function isValidPassword(password) {
        let filter = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // min 8 characters, at least one uppercase letter, and one special character
        return String(password).search (filter) !== -1
    }

    // Welcome message state
    const [welcomeMessage, setWelcomeMessage] = useState('Welcome back to Devmo.')

    // Switch between login and signup pages
    function handleSwitch() {
        setWelcomeMessage('Welcome back to Devmo.')
        // clear state after switching between login and sign up
        signUpFields.forEach(field => {
            dispatch({type: field.reducerType, payload: ''})
        })
        window.localStorage.getItem('Auth') === 'Sign Up' ? window.localStorage.setItem('Auth', 'Login') : window.localStorage.setItem('Auth', 'Sign Up')
        setFirstNameError(false)
        setLastNameError(false)
        setEmailError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)
        setInvalidEmail(false)
        setInvalidPassword(false)
        setInvalidConfirmPassword(false)
    }

    // Post requests to sign up and login as well as validation
    function handleSubmit(e) {
        e.preventDefault()
        if (window.localStorage.getItem('Auth') === 'Sign Up') {
            if (state.password !== state.confirmPassword) {
                setInvalidConfirmPassword(true)
                if (state.firstName === '') setFirstNameError(true)
                else setFirstNameError(false)

                if (state.lastName === '') setLastNameError(true)
                else setLastNameError(false)

                // error will show if email is empty OR its an invalid email
                if (state.email === '' || isValidEmail(state.email) === false) setEmailError(true)
                else setEmailError(false)

                // helper text for email will show only if it is an invalid email
                if (state.email === '') setInvalidEmail(false) // reset helper text if cleared
                else if (isValidEmail(state.email) === false) setInvalidEmail(true)

                if (state.password === '' || isValidPassword(state.password) === false) setPasswordError(true)
                else setPasswordError(false)

                // helper text for password will show only if it is an invalid password
                if (state.password === '') setInvalidPassword(false)
                else if (isValidPassword(state.password) === false) setInvalidPassword(true)

                if (state.confirmPassword === '' || isValidPassword(state.confirmPassword) === false) setConfirmPasswordError(true)
                else setConfirmPasswordError(false)

                return // do not make post request if passwords do not match
            }
            else {
                setInvalidConfirmPassword(false)
            }

            axios.post('http://localhost:8000/api/users/signup', {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password
            })
                .then(res => {
                    setWelcomeMessage('Welcome to Devmo.')
                    window.localStorage.setItem('Auth', 'Login')
                    // clear state after signing up and before redirect to login
                    signUpFields.forEach(field => {
                        dispatch({type: field.reducerType, payload: ''})
                    })
                })
                .catch(err => {
                    // console.log(err.response.data)
        
                    if (state.firstName === '') setFirstNameError(true)
                    else setFirstNameError(false)

                    if (state.lastName === '') setLastNameError(true)
                    else setLastNameError(false)

                    // error will show if email is empty OR its an invalid email
                    if (state.email === '' || isValidEmail(state.email) === false || err.response.data === 'Email is already in use') setEmailError(true)
                    else setEmailError(false)

                    // first helper text for email will show only if email is already in use
                    if (err.response.data === 'Email is already in use') setEmailInUseError(true)
                    else setEmailInUseError(false)

                    // second helper text for email will show only if it is an invalid email
                    if (state.email === '') setInvalidEmail(false) // reset helper text if cleared
                    else if (isValidEmail(state.email) === false) setInvalidEmail(true)

                    if (state.password === '' || isValidPassword(state.password) === false) setPasswordError(true)
                    else setPasswordError(false)

                    // helper text for password will show only if it is an invalid password
                    if (state.password === '') setInvalidPassword(false)
                    else if (isValidPassword(state.password) === false) setInvalidPassword(true)

                    if (state.confirmPassword === '' || isValidPassword(state.confirmPassword) === false) setConfirmPasswordError(true)
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
                    setLoginError(true)
                    if (state.email !== '' && state.password !== '') setLoginErrorMessage(err.response.data)
                    else setLoginErrorMessage('')
                })
        }
    }

    // Toggle password visibility function
    function handleClickShowPassword(e) {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    // Toggle confirm password visibility function
    function handleClickShowConfirmPassword(e) {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };
    
    return (
        <div className="auth-page">
            <TopNav isActive={isActive} setIsActive={setIsActive}/>

            {window.localStorage.getItem('Auth') === 'Sign Up' && <form className="auth-form" type="submit">
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
                            defaultValue={state.firstName}
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
                            defaultValue={state.firstName}
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
                            defaultValue={state.lastName}
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
                            defaultValue={state.lastName}
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
                            defaultValue={state.email}
                        />
                    }
                    {emailError &&
                        <>
                            <TextField
                                error 
                                className="auth-form outlined-basic" 
                                label={signUpFields[2].label}
                                variant="outlined" 
                                required={true}
                                type={signUpFields[2].type}
                                onChange={(e) => dispatch({ type: signUpFields[2].reducerType, payload: e.target.value})}
                                defaultValue={state.email}
                            />
                            {invalidEmail && 
                                <FormHelperText className="component-helper-text">
                                    Invalid email
                                </FormHelperText>
                            }
                            {emailInUseError && 
                                <FormHelperText className="component-helper-text">
                                    Email is already in use
                                </FormHelperText>

                            }
                        </>
                       
                    }

                    {!passwordError &&
                        <FormControl 
                            sx={{ m: 1, width: '25ch' }} 
                            variant="outlined" 
                            className="auth-form outlined-basic"                                 
                            required={true}
                            defaultValue={state.password}
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
                        <>
                            <FormControl 
                                error
                                sx={{ m: 1, width: '25ch' }} 
                                variant="outlined" 
                                className="auth-form outlined-basic"                                 
                                required={true}
                                defaultValue={state.password}
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
                            {invalidPassword && 
                                <FormHelperText className="component-helper-text">
                                    Password must contain at least 8 characters, 1 uppercase character, and 1 special character
                                </FormHelperText>
                            }
                        </>
                    }

                    {!confirmPasswordError &&
                        <FormControl 
                            sx={{ m: 1, width: '25ch' }} 
                            variant="outlined" 
                            className="auth-form outlined-basic"                                 
                            required={true}
                            defaultValue={state.confirmPassword}
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
                    <>
                        <FormControl 
                            error
                            sx={{ m: 1, width: '25ch' }} 
                            variant="outlined" 
                            className="auth-form outlined-basic"                                 
                            required={true}
                            defaultValue={state.confirmPassword}
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
                        {invalidConfirmPassword && 
                                <FormHelperText className="component-helper-text">
                                    Password and confirmation password do not match
                                </FormHelperText>
                        }
                    </>
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

            {window.localStorage.getItem('Auth') === 'Login' && <form className="auth-form" type="submit">
                <div className="auth-heading">
                    <h1 className="auth-title">LOGIN</h1>
                    <p className="auth-description">{welcomeMessage}</p>
                </div>
                <div className="text-fields">
                    {!loginError &&
                        <TextField
                            className="auth-form outlined-basic" 
                            label="Email"
                            variant="outlined" 
                            required={true}
                            type="email"
                            onChange={(e) => dispatch({ type: loginFields[0].reducerType, payload: e.target.value})}
                        />
                    } 

                    {loginError && 
                         <TextField
                            error
                            className="auth-form outlined-basic" 
                            label="Email"
                            variant="outlined" 
                            required={true}
                            type="email"
                            onChange={(e) => dispatch({ type: loginFields[0].reducerType, payload: e.target.value})}
                        />
                    }

                    {!loginError &&
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
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label={"Password"}
                                required={true}
                            />
                        </FormControl>
                    }

                    {loginError && 
                        <>
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
                                    onChange={(e) => dispatch({ type: loginFields[1].reducerType, payload: e.target.value})}
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
                            <FormHelperText className="component-helper-text">
                                {loginErrorMessage}
                            </FormHelperText> 
                        </>
                    }
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