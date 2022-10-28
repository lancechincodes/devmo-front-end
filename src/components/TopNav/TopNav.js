import './TopNav.css'
import { useState, useContext } from 'react'
import { Divide as Hamburger} from 'hamburger-react'
import { DataContext } from '../../DataContext'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import Toggle from '../Toggle/Toggle'
import SideNav from '../SideNav/SideNav'
import post from '../../assets/post.svg'

function TopNav() {
    const [isOpen, setOpen] = useState(false)
    const { isActive, setIsActive } = useContext(DataContext)

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
                    <Logo size="sm"/>
                </div>
                <div className="right-nav">
                    {window.localStorage.getItem('Email') && 
                    <Link to="/form">
                        <img className="post-btn" src={post} alt="Post button"/>
                    </Link>
                    }
                    <Toggle/>
                </div>
            </nav>
            <SideNav/>
        </>

    );
};

export default TopNav;