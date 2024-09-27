import React, { useState, useEffect } from "react";
import LoaderEquipes from "../loadings/LoaderEquipes.jsx";

export default function Equipes() {
  const [loading, setLoading] = useState(true);

  const [usuarios, setUsuarios] = useState([]);

  // Lista dos usuários 
  const usuariosData = [
    {
      id: 1,
      name: "João Siqueira",
      email: "joao.silva@gmail.com",
      description: "Developer everytime baby",
      job_title: "Engenheiro de Software",
      user_photo: "1726761235214-avatarTest.png"
    },
    {
      id: 2,
      name: "Maria Souza",
      email: "maria.souza@example.com",
      description: "Responsável pelo marketing digital",
      job_title: "Especialista em Marketing",      
      user_photo: null
    },
    {
      id: 3,
      name: "Carlos Lima",
      email: "carlos.lima@example.com",
      description: "Gerencia o design dos produtos",
      job_title: "Designer Gráfico",
      user_photo: null
    },
    {
      id: 9,
      name: "Francisco Lima",
      email: "francisoLima@gmail.com",
      description: "I like to drink coffee",
      job_title: "Developer",
      user_photo: "1726773311511-francis.jpg"
    },
    {
      id: 11,
      name: "Hyrum Spencer",
      email: "hyrum@gmail.com",
      description: "Estudante de Programacão Fullstack",
      job_title: "Fullstack Developer",
      user_photo: null
    },
    {
      id: 12,
      name: "Barrabás",
      email: "traidor@gmail.com",
      description: "Coordenador da equipe de trabalho",
      job_title: "Scrum muster",      
      user_photo: "1726969494839-protagonista.png"
    }
  ];

  useEffect(() => {
    // Simulando o tempo de carregamento
    setTimeout(() => {
      setUsuarios(usuariosData);
      setLoading(false);
    }, 1000); // Simula um delay de 1 segundo
  },[])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <div>
      {loading ? (
        <LoaderEquipes /> // Mostra o loader enquanto está carregando
      ) : (
        <div>
          <h1>Lista de Usuários</h1>
          {usuarios.length > 0 ? (
            <ul className="equipe-container">
            {usuarios.map((usuario) => (
              <li key={usuario.id} className="usuario">
                {usuario.user_photo ? (
                  <img
                    src={`http://localhost:3000/uploads/${usuario.user_photo}`}
                    alt={usuario.name}
                  />
                ) : (
                  <p>Sem foto disponível</p>
                )}
                <div className="usuario-info">
                  <p>Nome: {usuario.name}</p>
                  <p>Email: {usuario.email}</p>
                  <p>Descrição: {usuario.description}</p>
                  <p>Cargo: {usuario.job_title}</p>
                </div>
              </li>
            ))}
          </ul>          
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}
