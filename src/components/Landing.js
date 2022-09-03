import '../styles/Landing.css'
import logo from '../assets/logo.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { logoVariants } from '../animation'

function Landing() {
    const [showLogo, setShowLogo] = useState(true)
    const [beginningAnimation, setBeginningAnimation] = useState(true)

    setTimeout(() => {
        setBeginningAnimation(false)
    }, 3000)

    setTimeout(() => {
        setShowLogo(false)
    }, 8000)

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
                        animate={beginningAnimation ? "beginning" : "end"}
                        exit="leave"
                        src={logo} 
                        alt="Devmo Logo"
                />}
            </AnimatePresence>
        </div>
    );
};

export default Landing;