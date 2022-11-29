import { useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { DataContext } from '../../DataContext'
import './Toggle.css'

function Toggle() {
  const { theme, setTheme } = useContext(DataContext)

  const toggleDarkMode = () => {
    setTheme(curr => curr === 'light' ? 'dark' : 'light')
    window.localStorage.setItem('Theme', theme)
  }

  return (
    <DarkModeSwitch
      style={{ marginBottom: '0' }}
      checked={window.localStorage.getItem('Theme') ? (window.localStorage.getItem('Theme') === 'light' ? true : false) : true}
      onChange={toggleDarkMode}
      size={30}
      moonColor={'#264DE4'}
      sunColor={'#264DE4'}
    />
  );
}

export default Toggle;