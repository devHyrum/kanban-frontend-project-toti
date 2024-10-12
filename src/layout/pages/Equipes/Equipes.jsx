import React, { useState, useEffect } from "react";
import LoaderEquipes from "../../../components/loadings/LoaderEquipes.jsx";
import Modal from "./ModalFoto.jsx";
import './Equipes.css'

export default function Equipes() {
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar os dados de todos os usuários:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsuarios();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="equipes">
      {loading ? (
        <LoaderEquipes /> 
      ) : (
        <div className="equipes-conteudo">
          {usuarios.length > 0 ? (
            <ul className="equipe-container">
              {usuarios.map((usuario) => (
                <li key={usuario.id} className="usuario">
                  {usuario.user_photo ? (
                    <img
                      src={`http://localhost:3000/users/${usuario.id}/image`}
                      alt={usuario.name}
                      onClick={() => openModal(`http://localhost:3000/users/${usuario.id}/image`)}
                    />
                  ) : (
                    <p>Sem foto disponível</p>
                  )}
                  <div className="usuario-info">
                    <p><span>Nome:</span> {usuario.name}</p>
                    <p><span>Email:</span> <a href={`mailto:${usuario.email}`}>{usuario.email}</a></p>
                    <p><span>Descrição:</span> {usuario.description}</p>
                    <p><span>Cargo:</span> {usuario.job_title}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      )}
      
      {/* Renderiza o modal com a imagem selecionada */}
      <Modal
        isOpen={modalOpen}
        closeModal={closeModal}
        imageSrc={selectedImage}
        altText="Foto do usuário"
      />
    </div>
  );
}
