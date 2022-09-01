import '../styles/App.css';
import { Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import Gallery from './Gallery'
import Auth from './Auth'
import About from './About'
import Form from './Form'

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