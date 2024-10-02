import React, { useState, useEffect } from 'react';
import LoaderHelp from '../../../components/loadings/LoaderHelp.jsx';
import help from '../../../assets/Help/help.svg'
import './Help.css'

export default function Help() {
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
  
      const timer = setTimeout(() => {
        setLoading(false); 
      }, 1000);
  
      return () => clearTimeout(timer); 
    }, []);
  return (
    <div>
      {loading ? (
        <LoaderHelp />
      ) : (
        <div className='help-conteudo'>
          <img src={help} alt="help" />
          <div>
            <h1>Site em Construção!</h1>
            <p>Desculpem, o <strong><em>FAQ</em></strong> estará preparado em breve!</p>
          </div>
        </div>
      )}
    </div>
  )
}
