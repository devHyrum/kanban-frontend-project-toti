import React, { useContext, useState, useEffect } from 'react';
import LoaderAjustes from '../../../components/loadings/LoaderAjustes.jsx';
import './Ajustes.css';
import axios from 'axios'
import UserContext from '../../../context/UserContext.jsx';

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
  const { user, setUser } = useContext(UserContext);

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
        setUser((prevUser) => ({
          ...prevUser,
          user_photo: newImageUrl,
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

    // Mantenha o input de imagem habilitado para permitir novos uploads
    imageProfile.disabled = false; 
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
            setUser(response.data);
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
}, [userId,myUserId, setUser]);


  return (
    <div className='ajustes-conteudo'>
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

                <button onClick={() => document.getElementById('profile-image-input').click()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  width={25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>

                <input 
                  type="file" 
                  id="profile-image-input" 
                  accept="image/*"
                  style={{ display: 'none' }}  // Escondido
                  onChange={handleImageChange}  onClick={() => habilitarInput('imageProfile')} // Atualiza a imagem quando o arquivo é selecionado
                />
              </div>

              <div className="input-container">
                
                <div>
                  <label htmlFor="bio" className="floating-label">
                    Biografia
                    <button type='button' onClick={() => habilitarInput('bio')}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={17}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                  </label>
                  <textarea id="bio" type='text' className="floating-input auto-expand" maxLength="400" onChange={handleChange} value={userData.bio} rows="4" placeholder="Escreva sua biografia..."  disabled></textarea>
                </div>

                <div>
                  <label htmlFor="nome"  className="floating-label">
                    Nome
                    <button type='button' onClick={() => habilitarInput('nome')}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={17}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                  </label>
                  <input type="text" id="nome" className="floating-input" onChange={handleChange} value={userData.nome}  placeholder="Escreva seu nome..." disabled/>
                </div>
                
                <div>
                  <label htmlFor="email"  className="floating-label">
                    E-mail
                    <button  type='button' onClick={() => habilitarInput('email')}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={17}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                  </label>
                  <input type="email" id="email" className="floating-input" onChange={handleChange} value={userData.email} disabled required placeholder="Escreva seu email..."/>
                </div>
                
                <div>
                  <label htmlFor="profissao"  className="floating-label">
                    Profissão
                    <button type='button' onClick={() => habilitarInput('profissao')}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={17}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                  </label>
                  <input type="text" id="profissao" className="floating-input" onChange={handleChange} value={userData.profissao}  placeholder="Escreva sua profissão..." disabled/>
                </div>

            <div className='footer-meu-perfil'>
              <p className='creation-date'>© 2024 Kanban</p>
              <span type="text" id="profissao" className="creation-date"   placeholder=" " disabled> Perfil criado em: {userData.criacao}</span>
            </div>
              </div>
            </div>
            

            <div>
              <input type="text" id="rol" className='rol' value={userData.rol} onChange={handleChange}/>
            </div>
            

          </>
        )}
    </div>
    
  );
}