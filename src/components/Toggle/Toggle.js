import { useState } from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import './Toggle.css'

function Toggle() {
  const [mode, setMode] = useState('light');
  return (
    <DarkModeToggle
      mode={mode}
      dark="Dark"
      light="Light"
      size="sm"
      inactiveTrackColor="#e2e8f0"
      inactiveTrackColorOnHover="#f8fafc"
      inactiveTrackColorOnActive="#cbd5e1"
      activeTrackColor="#334155"
      activeTrackColorOnHover="#1e293b"
      activeTrackColorOnActive="#0f172a"
      inactiveThumbColor="#264DE4"
      activeThumbColor="#ffffff"
      onChange={(mode) => {
        setMode(mode);
      }}
    />
  );
}

export default Toggle;