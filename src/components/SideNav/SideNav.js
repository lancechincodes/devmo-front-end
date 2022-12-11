import './SideNav.css'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DataContext } from '../../DataContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faTrowel, faCircleInfo, faRightFromBracket, faUserPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import post from '../../assets/post.svg'

function SideNav() {
    const { isActive, setIsActive, setSignUp } = useContext(DataContext)
    const navigate = useNavigate()

    function handleNavigate() {
        setIsActive(false)
    }

    function handleNavigateFeatured() {
        setIsActive(false)
        window.localStorage.setItem('Display', 'Featured')
    }

    function handleNavigateDiscover() {
        setIsActive(false)
        window.localStorage.setItem('Display', 'Discover')
    }
    function handleNavigateFavorites() {
        setIsActive(false)
        window.localStorage.setItem('Display', 'Favorites')
    }

    function handleNavigateSignUp() {
        setIsActive(false)
        window.localStorage.setItem('Auth', 'Sign Up')
    }

    function handleNavigateLogin() {
        setIsActive(false)
        window.localStorage.setItem('Auth', 'Login')
    }

    function handleLogout() {
        setIsActive(false)
        window.localStorage.removeItem('Token')
        window.localStorage.removeItem('Email')
        window.localStorage.setItem('Display', 'Featured')
        navigate("/gallery")
    }
    
    return (
        <div className={isActive ? "side-nav active" : "side-nav"}>
            <div className="nav-lists">
                <ul className="side-nav-list">
                    <Link to="/gallery" className="link" onClick={handleNavigateFeatured}>
                        <li className="list-element">
                            <FontAwesomeIcon className="nav-icon" icon={faFire} />
                            <p className="nav-text">Featured</p>
                        </li>
                    </Link>
                    <Link to="/gallery" className="link" onClick={handleNavigateDiscover}>
                        <li className="list-element">
                            <FontAwesomeIcon className="nav-icon" icon={faTrowel} />
                            <p className="nav-text">Discover</p>
                        </li>
                    </Link>
                    {window.localStorage.getItem('Email') &&
                        <Link to="/gallery" className="link" onClick={handleNavigateFavorites}>
                            <li className="list-element">
                                <FontAwesomeIcon className="nav-icon" icon={faHeart} />
                                <p className="nav-text">Favorites</p>
                            </li>
                        </Link>
                    }
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