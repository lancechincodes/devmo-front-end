import '../styles/Landing.css'
import logo from '../assets/logo.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// animation for logo
const logoVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: [0, 1, 1, 1],
        scale:  [1, 1, .4, 1],
        rotate: [0, 0, 270, 0],
        transition: {
            duration: 2,
            ease: "easeInOut",
            delay: 1
        },
    },
    leave: {
        opacity: 0
    }
}

function Landing() {

    const [showLogo, setShowLogo] = useState(true)
    const [showWelcome, setShowWelcome] = useState(false)


    setTimeout(() => {
        setShowLogo(false)
    }, 4000)

    setTimeout(() => {
        setShowWelcome(true)
    }, 5000)


    return (
        <div className="landing-page">
            {/* Animate presence delays unmounting until delay animations are done */}
            <AnimatePresence>
                {showLogo && 
                    <motion.img 
                        key="logo"
                        className="logo"
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                        exit="leave"
                        src={logo} 
                        alt="Devmo Logo"
                />}
            </AnimatePresence>

            {showWelcome && 
                <div className="welcome">
                    <p className="welcome-message">Welcome to</p>
                    <div className="brand">
                        <p className="brand-letters">DEVM</p>
                        <img className="brand-logo" src={logo} alt="Devmo Logo as an O"/>
                    </div>
                </div>
            }
        </div>
    );
};

export default Landing;