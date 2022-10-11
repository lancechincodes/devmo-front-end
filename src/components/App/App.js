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

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <DataContext.Provider value={{isActive, setIsActive, signUp, setSignUp}}>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Landing/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/form" element={<Form/>}/>
          </Routes>
        </DataContext.Provider>
      </AnimatePresence>
    </div>
  );
}

export default App;