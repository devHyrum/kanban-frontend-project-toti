import React, { useEffect, useState } from 'react';
import { Link, useLocation,  } from 'react-router-dom';
import './Header.css';
import userTest from './userTest.png'

export default function Header({userId}) {
  const [user, setUser] = useState(null);  // Estado para armazenar as informações do usuário

  const location = useLocation();

  // Função para buscar as informações do usuário
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const getTitle = () => {
    switch (location.pathname) {
      case `/${userId}/kanban/dashboard`:
        return 'Tarefas e mais...';
      case `/${userId}/kanban/groups`:
        return 'O Melhor time!';
      case `/${userId}/kanban/reports`:
        return 'Está concluído.';
      case `/${userId}/kanban/myProfile`:
        return 'Meu Perfil';
      case `/${userId}/kanban/help`:
        return 'Ajuda';
      default:
        return user ? `Bem-Vindo ${user.name}!` : 'Bem-Vindo!';
    }
  };

  return (
    <>
      <header>
        <h1>{getTitle()}</h1>
        <Link to={`/${userId}/kanban/myProfile`}>
          {user ? (
            <img src={`http://localhost:3000/users/${userId}/image`} alt={user.name} />
          ) : (
            <img src={userTest} alt="Usuário padrão" />
          )}
        </Link>
      </header>
      <hr />
    </>
  );
}
