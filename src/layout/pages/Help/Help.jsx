import React, { useState, useEffect, useContext } from 'react';
import LoaderHelp from '../../../components/loadings/LoaderHelp.jsx';
import help from '../../../assets/Help/help.svg'
import helpDark from '../../../assets/Help/helpDark.svg'
import helpDaltonico from '../../../assets/Help/helpDaltonico.svg'
import { ThemeContext } from '../../../context/ThemeProvider.jsx';
import './Help.css'

export default function Help() {
    const [loading, setLoading] = useState(true); 
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
  
      const timer = setTimeout(() => {
        setLoading(false); 
      }, 1000);
  
      return () => clearTimeout(timer); 
    }, []);

    const helpImage = theme === 'dark' ? helpDark : theme === 'daltonism' ? helpDaltonico : help;
  return (
    <div>
      {loading ? (
        <LoaderHelp />
      ) : (
        <div className='help-conteudo'>
          <img src={helpImage} alt="help" />
          <div>
            <h1>Site em Construção!</h1>
            <p>Desculpem, o <strong><em>FAQ</em></strong> estará preparado em breve!</p>
          </div>
        </div>
      )}
    </div>
  )
}
