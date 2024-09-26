import React from 'react'
import userTest from './userTest.png'
import { Link, useLocation  } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const location = useLocation();
  const getTitle = () => {
    switch(location.pathname){
      case'/kanban/dashboard':
        return 'Tarefas e mais...';
      case '/kanban/groups':
        return 'O Melhor time!';
      case '/kanban/reports':
        return 'Esta concluído.';
      case '/kanban/myProfile':
        return 'Meu Perfil';
      case '/kanban/help':
        return 'Ajuda';
      default:
        return 'Bem-Vindo Usuário!'
    }
  }
  return (
    <>
      <header>
        <h1>{getTitle()}</h1>
        <Link to="/kanban/myProfile">
          <img src={userTest} alt="userTest"/>
        </Link>
      </header>
      <hr/>
    </>
  )
}
