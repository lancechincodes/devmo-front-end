import './Landing.css'
import logo from '../../assets/logo.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
    
    return (
        <div className="landing-page">
            <img 
                key="logo"
                className="logo"
                src={logo} 
                alt="Devmo Logo"
        />
        </div>
    );
};

export default Landing;