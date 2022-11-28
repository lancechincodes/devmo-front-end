import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import './Toggle.css'

function Toggle() {
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

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