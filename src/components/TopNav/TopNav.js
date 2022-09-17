import './TopNav.css'
import { useState } from 'react'
import Logo from '../Logo/Logo'
import Toggle from '../Toggle/Toggle'
import { Divide as Hamburger} from 'hamburger-react'

function TopNav() {
    const [isOpen, setOpen] = useState(false)


    return (
        <nav className="top-nav">
            <div className="left-nav">
                <Hamburger size="25" color="#264DE4" toggled={isOpen} toggle={setOpen}/>
                <Logo size="sm"/>
            </div>
            <div className="right-nav">
                <Toggle/>
            </div>
        </nav>
    );
};

export default TopNav;