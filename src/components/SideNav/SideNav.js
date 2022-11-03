import './SideNav.css'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DataContext } from '../../DataContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faTrowel, faCircleInfo, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import post from '../../assets/post.svg'

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
                        <li className="list-element">
                            <FontAwesomeIcon className="nav-icon" icon={faFire} />
                            <p className="nav-text">Featured</p>
                        </li>
                    </Link>
                    <Link to="/gallery" className="link" onClick={handleNavigate}>
                        <li className="list-element">
                            <FontAwesomeIcon className="nav-icon" icon={faTrowel} />
                            <p className="nav-text">Discover</p>
                        </li>
                    </Link>
                    <Link to="/about" className="link" onClick={handleNavigate}>
                        <li className="list-element">
                            <FontAwesomeIcon className="nav-icon" icon={faCircleInfo} />
                            <p className="nav-text">About us</p>
                        </li>
                    </Link>
                </ul>

                <ul className="side-nav-list">
                    {window.localStorage.getItem('Email') ? (
                        <Link to="/gallery" className="link" onClick={handleLogout}>
                            <li className="list-element">
                                <FontAwesomeIcon className="nav-icon" icon={faRightFromBracket} />
                                <p className="nav-text">Logout</p>
                            </li>
                        </Link>
                    ) :
                    (
                        <>
                            <Link to="/auth" className="link" onClick={handleNavigateSignUp}>
                                <li className="list-element">
                                    <FontAwesomeIcon className="nav-icon" icon={faUserPlus} />
                                    <p className="nav-text">Sign up</p>
                                </li>
                            </Link>
                            <Link to="/auth" className="link" onClick={handleNavigateLogin}>
                                <li className="list-element">
                                    <FontAwesomeIcon className="nav-icon" icon={faRightFromBracket} />
                                    <p className="nav-text">Login</p>
                                </li>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SideNav;