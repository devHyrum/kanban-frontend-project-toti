import React, { useState, useEffect } from 'react';
import LoaderAjustes from '../loadings/LoaderAjustes.jsx';
import './Ajustes.css';
import axios from 'axios'

const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};
function habilitarInput(inputId) {
  const inputElement = document.getElementById(inputId);
  const saveButton = document.getElementById('btn-salvar');

  if (inputElement) {
    inputElement.disabled = !inputElement.disabled; 
    saveButton.disabled = false;
    saveButton.style.backgroundColor = "#4CAF50";
  }
};
export default function Ajustes({ userId, myUserId }) { // Recebe o ID do usuário como prop
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [showMensagem, setShowMensagem] = useState(false);
  const [imagem, setImagem] = useState(null);  // Estado para a imagem selecionada
  const [previewImage, setPreviewImage] = useState(null); // Estado para a visualização da imagem
  const [loading, setLoading] = useState(true); // Estado para o controle do loading
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    idUserImage: '',
    bio: '',
    nome: '',
    email: '',
    profissao: '',
    rol: '',
    userphoto:'',
  });

  // Função para manipular a seleção de imagem
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setImagem(file);  // Armazena a imagem no estado
        // Gerar a URL de visualização da imagem
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);  // Atualiza a imagem de preview
        };
        reader.readAsDataURL(file);  // Lê o arquivo da imagem
        // Habilitar o botão de salvar e mudar a cor para verde
        const saveButton = document.getElementById('btn-salvar');
        saveButton.disabled = false;
        saveButton.style.backgroundColor = "#4CAF50";  // Verde
    }
};

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.nome);
      formData.append("email", userData.email);
      formData.append("description", userData.bio);
      formData.append("jobTitle", userData.profissao);
      formData.append("roleId", userData.rol);
      
        // Se o usuário não escolheu uma nova imagem, envia o nome da imagem existente
        if (imagem) {
          formData.append("imagem", imagem);  // Nova imagem selecionada
      } 
      // Enviar os dados modificados para o backend
      await axios.put(`http://localhost:3000/users/${myUserId}`, formData, 
        {headers: {
        'Content-Type': 'multipart/form-data',  // Garantir que o tipo de conteúdo seja multipart
        }
      });
      setMensagemSucesso('Dados salvos com sucesso!');
      setShowMensagem(true);
      setTimeout(() => {
        setShowMensagem(false); // Oculta a mensagem
        setMensagemSucesso(''); // Limpa o texto da mensagem
      }, 3000);
      // Atualizar a imagem do perfil com a nova URL (após o upload)
      if (imagem) {
        const newImageUrl = `http://localhost:3000/users/${userData.idUserImage}/image`;
        setUserData((prevData) => ({
            ...prevData,
            userphoto: newImageUrl,
        }));
    }
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      setMensagemSucesso('Erro ao salvar os dados. Tente novamente.');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData(prevData => ({
        ...prevData,
        [id]: value
    }));
};

  

  
  const mudarCorBotao = () => {
    // Seleciona o botão pelo ID e altera a cor diretamente
    const botao = document.getElementById('btn-salvar');
    const bio = document.getElementById ('bio');
    const email = document.getElementById ('email');
    const nome = document.getElementById ('nome');
    const profissao = document.getElementById ('profissao');
    const imageProfile = document.getElementById ('profile-image-input');
    bio.disabled = true;
    email.disabled = true;
    nome.disabled = true;
    profissao.disabled = true;
    botao.disabled = true;
    imageProfile.disabled = true;
    botao.style.backgroundColor = 'gray'; 
  };

  // Efeito para buscar os dados do usuário ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${myUserId}`);
            const roleValue = response.data.role_name === "Admin" ? 1 : 2;
            setUserData({
                idUserImage: response.data.id || 'id do usuario',
                bio: response.data.description || 'Uma breve descrição sua!',
                nome: response.data.name || 'Seu nome',
                email: response.data.email || 'seu@email.com',
                profissao: response.data.job_title || 'Sua profissão',
                userphoto: response.data.user_photo || null,
                rol: roleValue,
                criacao: formatarData(response.data.created_at) || '00/00/00'
            });

            console.log(userData.userphoto)
            const timer = setTimeout(() => {
              setLoading(false); 
            }, 2000);
            return () => clearTimeout(timer); 
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
            setLoading(false);
        }
    };

    fetchData();
}, [userId]);


  return (
    <div>
      {loading ? (
        <LoaderAjustes/>):
        (
          <>
            <button type='button' id="btn-salvar" className='btn-salvar' onClick={() => {handleSave(); mudarCorBotao();}}>Salvar</button>
            {mensagemSucesso && (
              <p className="mensagem-sucesso">{mensagemSucesso}</p>
            )}
            <div className="user-info">
              <div className='image'>
              <img id='profile' 
                src={previewImage || `http://localhost:3000/users/${userData.idUserImage}/image`} 
                alt="Profile Photo" 
              />

                {/* <button onClick={() => document.getElementById('profile-image-input').click()}>
alterar
                </button> */}

                <input 
                  type="file" 
                  id="profile-image-input" 
                  accept="image/*"
                  // style={{ display: 'none' }}  // Escondido
                  onChange={handleImageChange}  onClick={() => habilitarInput('imageProfile')} // Atualiza a imagem quando o arquivo é selecionado
                />
              </div>

              <div className="input-container">
                <div>
                  <label htmlFor="bio" className="floating-label">
                    Biografia
                    <button type='button' onClick={() => habilitarInput('bio')}>
alterar
                    </button>
                  </label>
                  <textarea id="bio" className="floating-input auto-expand" maxLength="400" onChange={handleChange} value={userData.bio} rows="4" placeholder=" "  disabled></textarea>
                </div>

                <div>
                  <label htmlFor="nome"  className="floating-label">
                    Nome
                    <button type='button' onClick={() => habilitarInput('nome')}>
alterar
                    </button>
                  </label>
                  <input type="text" id="nome" className="floating-input" onChange={handleChange} value={userData.nome}  placeholder="" disabled/>
                </div>
                
                <div>
                  <label htmlFor="email"  className="floating-label">
                    E-mail
                    <button  type='button' onClick={() => habilitarInput('email')}>
alterar
                    </button>
                  </label>
                  <input type="email" id="email" className="floating-input" onChange={handleChange} value={userData.email}  placeholder=" " disabled/>
                </div>
                
                <div>
                  <label htmlFor="profissao"  className="floating-label">
                    Profissão
                    <button type='button' onClick={() => habilitarInput('profissao')}>
alterar
                    </button>
                  </label>
                  <input type="text" id="profissao" className="floating-input" onChange={handleChange} value={userData.profissao}  placeholder=" " disabled/>
                </div>
              </div>
            </div>
            <div>
              <input type="text" id="rol" className='rol' value={userData.rol} onChange={handleChange}/>
            </div>
            

            <div className='footer-meu-perfil'>
              <p className='creation-date'>© 2024 Kanban</p>
              <span type="text" id="profissao" className="creation-date"   placeholder=" " disabled> Perfil criado em: {userData.criacao}</span>
            </div>

          </>
        )}
    </div>
    
  );
}