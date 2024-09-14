import React, { useState, useEffect } from 'react';
import LoaderAjustes from '../loadings/LoaderAjustes.jsx';

export default function Ajustes() {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);
  return (
    <div>
      {loading ? (
        <LoaderAjustes/>):
        (
          <div>
            <h1>Ajustes</h1>
            <p>Esta é a página de Configurações!</p>
          </div>
        )}
    </div>
  );
}