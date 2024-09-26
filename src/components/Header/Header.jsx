import React, { useEffect, useState } from 'react';
import userTest from './userTest.png'
import { Link, useLocation, useParams } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const { id } = useParams();  // Pega o id da URL
  const [user, setUser] = useState(null);  // Estado para armazenar as informações do usuário

  const location = useLocation();

  // Função para buscar as informações do usuário
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`);
      const data = await response.json();
      console.log("Data:",data)
      
      setUser(data);
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const getTitle = () => {
    switch(location.pathname){
      case `/${id}/kanban/dashboard`:
        return 'Tarefas e mais...';
      case `/${id}/kanban/groups`:
        return 'O Melhor time!';
      case `/${id}/kanban/reports`:
        return 'Está concluído.';
      case `/${id}/kanban/myProfile`:
        return 'Meu Perfil';
      case `/${id}/kanban/help`:
        return 'Ajuda';
      default:
        return user ? `Bem-Vindo ${user.name}!` : 'Bem-Vindo!';
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
