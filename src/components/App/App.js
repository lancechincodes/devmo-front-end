import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { DataContext } from '../../DataContext'
import { useState } from 'react'
import Landing from '../Landing/Landing'
import Gallery from '../Gallery/Gallery'
import Auth from '../Auth/Auth'
import About from '../About/About'
import Form from '../Form/Form'

function App() {
  const location = useLocation()
  const [isActive, setIsActive] = useState(false)
  const [signUp, setSignUp] = useState(true)
  const [theme, setTheme] = useState('light')
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setTheme(curr => curr === 'light' ? 'dark' : 'light')
    setDarkMode(!isDarkMode)
  }

  return (
    <AnimatePresence mode='wait'>
      <DataContext.Provider value={{isActive, setIsActive, signUp, setSignUp, isDarkMode, toggleDarkMode}}>
      <div className="App" id={theme}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Landing/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/form" element={<Form/>}/>
        </Routes>
      </div>
      </DataContext.Provider>
    </AnimatePresence>
  );
}

export default App;