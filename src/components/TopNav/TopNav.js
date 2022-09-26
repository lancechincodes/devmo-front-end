import './TopNav.css'
import { useState } from 'react'
import Logo from '../Logo/Logo'
import Toggle from '../Toggle/Toggle'
import { Divide as Hamburger} from 'hamburger-react'
import SideNav from '../SideNav/SideNav'

function TopNav({isActive, setIsActive}) {
    const [isOpen, setOpen] = useState(false)

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
                    <Toggle/>
                </div>
            </nav>
            <SideNav isActive={isActive}/>
        </>

    );
};

export default TopNav;