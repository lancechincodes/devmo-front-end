import './SideNav.css'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function SideNav({isActive}) {
    
    return (
        <div className={isActive ? "side-nav active" : "side-nav"}>
            <div className="nav-lists">
                <ul>
                    <Link to="/gallery">
                        <li>Featured</li>
                    </Link>
                    <Link to="/auth">
                        <li>Discover</li>
                    </Link>
                    <Link to="/about">
                        <li>About us</li>
                    </Link>
                </ul>

                <ul>
                <Link to="/">
                        <li>Sign up</li>
                    </Link>
                    <Link to="/">
                        <li>Login</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default SideNav;