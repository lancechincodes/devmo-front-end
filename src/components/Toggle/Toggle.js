import { useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { DataContext } from '../../DataContext'
import './Toggle.css'

function Toggle() {
  const { isDarkMode, toggleDarkMode } = useContext(DataContext)

  return (
    <DarkModeSwitch
      style={{ marginBottom: '0' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={30}
      moonColor={'#264DE4'}
      sunColor={'#264DE4'}
    />
  );
}

export default Toggle;