import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeProvider.jsx'; // Certifique-se de ajustar o caminho
import './ThemeSwitcher.css'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='theme-switcher'>
      <button onClick={() => toggleTheme('light')} disabled={theme === 'light'}>
        Claro
      </button>
      <button onClick={() => toggleTheme('dark')} disabled={theme === 'dark'}>
        Escuro
      </button>
      <button onClick={() => toggleTheme('daltonism')} disabled={theme === 'daltonism'}>
        Daltonismo
      </button>
    </div>
  );
};

export default ThemeSwitcher;
