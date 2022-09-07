import './App.css';
import { Routes, Route } from 'react-router-dom'
import Landing from '../Landing/Landing'
import Gallery from '../Gallery/Gallery'
import Auth from '../Auth/Auth'
import About from '../About/About'
import Form from '../Form/Form'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;