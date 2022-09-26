import './SideNav.css'
import { useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DataContext } from '../../DataContext';

function SideNav() {
    const { isActive, setIsActive } = useContext(DataContext)

    function handleNavigate() {
        setIsActive(false)
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
                <Link to="/auth" className="link" onClick={handleNavigate}>
                        <li className="list-element">Sign up</li>
                    </Link>
                    <Link to="/auth" className="link" onClick={handleNavigate}>
                        <li className="list-element">Login</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default SideNav;