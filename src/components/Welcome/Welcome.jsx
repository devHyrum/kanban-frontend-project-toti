import React, { useState, useEffect } from 'react';
import LoaderWelcome from '../loadings/LoaderWelcome';
import welcomePicture from './welcomePicture.svg'
import './Welcome.css'

export default function Welcome({id}) {

  const [loading, setLoading] = useState(true); 

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);
  return (
    <>
    <div className='welcome'>
      {loading ? (
        <LoaderWelcome />
      ) : (
        <>
        <div className='welcome-conteudo'>
          <img src={welcomePicture} alt="welcomePicture" />
          <div>
            <h1>Bem-vindo todo mundo!</h1>
            <p>Escolha uma das opções no menu à esquerda para começar.</p>
          </div>
        </div>
        </>
      )}
    </div>
    </>
  )
}
