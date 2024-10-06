import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeProvider.jsx'; // Certifique-se de ajustar o caminho
import './ThemeSwitcher.css'
import light from '../../../assets/Sidebar/lightMode.svg'
import dark from '../../../assets/Sidebar/darkMode.svg'
import daltonismo from '../../../assets/Sidebar/daltonismoMode.svg'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='theme-switcher'>
      <button onClick={() => toggleTheme('light')} disabled={theme === 'light'}>
        <img src={light} alt="light" />
      </button>
      <button onClick={() => toggleTheme('dark')} disabled={theme === 'dark'}>
      <img src={dark} alt="dark" />
      </button>
      <button onClick={() => toggleTheme('daltonism')} disabled={theme === 'daltonism'}>
      <img src={daltonismo} alt="daltonismo" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
