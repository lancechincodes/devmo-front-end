import './TopNav.css'
import { useState, useContext, useEffect } from 'react'
import { Divide as Hamburger} from 'hamburger-react'
import { DataContext } from '../../DataContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Logo from '../Logo/Logo'
import Toggle from '../Toggle/Toggle'

import SideNav from '../SideNav/SideNav'
import post from '../../assets/post.svg'

function TopNav() {
    const [isOpen, setOpen] = useState(false)
    const { isActive, setIsActive } = useContext(DataContext)
    const [initials, setInitials] = useState('')

    function handleNavigateFeatured() {
        window.localStorage.setItem('Display', 'Featured')
        setIsActive(false)
    }

    function handleNavigatePost() {
        window.localStorage.setItem('Form', 'Post')
        setIsActive(false)
    }

    function handleNavigateProfile() {
        window.localStorage.setItem('Display', 'Profile')
        setIsActive(false)
    }

    // find user and set initials of profile btn
    useEffect(() => {
        if (window.localStorage.getItem('Email')) {
            axios.get('https://devmo-api.up.railway.app/api/users')
                .then(res => {
                    const usersArr = res.data
                    const loggedOnUser = usersArr.find(user => user.email === window.localStorage.getItem('Email')) 
                    setInitials(loggedOnUser.firstName[0].toUpperCase() + loggedOnUser.lastName[0].toUpperCase())
                })
        }
    }, [])

    return (
        <>
            <nav className="top-nav">
                <div className="left-nav">
                    <div className="hamburger" onClick={() => setIsActive(!isActive)}>
                        <Hamburger 
                            size="25" 
                            color="#264DE4" 
                            toggled={isOpen} 
                            toggle={setOpen} 
                        />
                    </div>
                    <Link to="/gallery" onClick={handleNavigateFeatured}>
                        <Logo size="sm"/>
                    </Link>
                </div>
                <div className="right-nav">
                    {window.localStorage.getItem('Email') && 
                    <>
                        <Link className="form-link" to="/form" onClick={handleNavigatePost}>
                            <img className="post-btn" src={post} alt="Post button"/>
                        </Link>
                        <Link className="form-link" to="/gallery" onClick={handleNavigateProfile}>
                            <div className="profile-btn">
                                <p className="initials-text">{initials}</p>
                            </div>
                        </Link>
                    </>
                    }
                    <Toggle/>
                </div>
            </nav>
            <SideNav/>
        </>
    );
};

export default TopNav;