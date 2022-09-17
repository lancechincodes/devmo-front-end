import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from '../Landing/Landing'
import Gallery from '../Gallery/Gallery'
import Auth from '../Auth/Auth'
import About from '../About/About'
import Form from '../Form/Form'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Landing/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/form" element={<Form/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;