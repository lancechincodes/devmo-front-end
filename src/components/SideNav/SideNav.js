import './SideNav.css'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DataContext } from '../../DataContext';

function SideNav() {
    const { isActive, setIsActive, signUp, setSignUp } = useContext(DataContext)
    const navigate = useNavigate()

    function handleNavigate() {
        setIsActive(false)
    }

    function handleNavigateSignUp() {
        setIsActive(false)
        setSignUp(true)
    }

    function handleNavigateLogin() {
        setIsActive(false)
        setSignUp(false)
    }

    function handleLogout() {
        setIsActive(false)
        window.localStorage.removeItem('Token')
        window.localStorage.removeItem('Email')
        // navigate("/gallery")
    }
    
    return (
        <div className={isActive ? "side-nav active" : "side-nav"}>
            <div className="nav-lists">
                <ul className="side-nav-list">
                    <Link to="/gallery" className="link" onClick={handleNavigate}>
                        <li className="list-element">Featured</li>
                    </Link>
                    <Link to="/gallery" className="link" onClick={handleNavigate}>
                        <li className="list-element">Discover</li>
                    </Link>
                    <Link to="/about" className="link" onClick={handleNavigate}>
                        <li className="list-element">About us</li>
                    </Link>
                </ul>

                <ul className="side-nav-list">
                    {window.localStorage.getItem('Email') ? (
                        <Link to="/gallery" className="link" onClick={handleLogout}>
                            <li className="list-element">Logout</li>
                        </Link>
                    ) :
                    (
                        <>
                            <Link to="/auth" className="link" onClick={handleNavigateSignUp}>
                                <li className="list-element">Sign up</li>
                            </Link>
                            <Link to="/auth" className="link" onClick={handleNavigateLogin}>
                                <li className="list-element">Login</li>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SideNav;