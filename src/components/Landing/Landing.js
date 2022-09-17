import './Landing.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { logoVariants, fadeVariants } from '../../animation'
import Logo from '../Logo/Logo'

function Landing() {
    const [startAnimation, setStartAnimation] = useState(true)
    const [secondAnimation, setSecondAnimation] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setStartAnimation(false)
        }, 3000)
    
        setTimeout(() => {
            setSecondAnimation(true)
        }, 4000)
    
        setTimeout(() => {
            setSecondAnimation(false)
        }, 6000)

        setTimeout(() => {
            navigate("/gallery")
        }, 8000)
    }, [])

    return (
        <div className="landing-page">
            <AnimatePresence>
                {startAnimation && <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 375 374.999991" 
                    className="logo"
                    width="100"
                >
                    <motion.path
                        d="M 278.941406 187.441406 C 278.941406 237.9375 237.90625 278.941406 187.441406 278.941406 C 136.980469 278.941406 95.941406 237.9375 95.941406 187.441406 C 95.941406 149.199219 119.695312 116.804688 153.128906 103.1875 L 153.128906 128.46875 C 132.691406 140.359375 118.816406 162.164062 118.816406 187.441406 C 118.816406 225.265625 149.589844 256.066406 187.441406 256.066406 C 225.265625 256.066406 256.066406 225.265625 256.066406 187.441406 C 256.066406 162.195312 242.195312 140.359375 221.753906 128.46875 L 221.753906 103.1875 C 255.191406 116.804688 278.941406 149.199219 278.941406 187.441406 Z M 198.878906 164.566406 L 176.003906 164.566406 L 176.003906 73.066406 L 198.878906 73.066406 Z M 187.441406 4.441406 C 86.359375 4.441406 4.441406 86.390625 4.441406 187.441406 C 4.441406 288.496094 86.359375 370.441406 187.441406 370.441406 C 288.496094 370.441406 370.441406 288.496094 370.441406 187.441406 C 370.441406 86.390625 288.496094 4.441406 187.441406 4.441406 "
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeIn" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                        exit="exit"
                    />
                </motion.svg>}
            </AnimatePresence>

            <AnimatePresence>
                {secondAnimation && <motion.div
                    className="welcome-container"
                    variants={fadeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <p className="welcome-to">
                        WELCOME TO
                    </p>

                    <div>
                        <Logo size="md"/>
                    </div>                
                </motion.div>}
            </AnimatePresence>
        </div>
    )
};

export default Landing;