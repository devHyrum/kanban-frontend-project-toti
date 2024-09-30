import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Boards.css'

const Boards = ({myUserId}) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa selecionada para exibição
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Define se o usuário está em modo de edição
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [listTask, setListTask] = useState([]);
  const [suggestions, setSuggestions] = useState([])
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  ;

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending',
    priority: 'low',
    user_id: '',
    category_id: '',
    task_list_id: 'Para Fazer',
    file: null
  });

  // Busca lista de usuários
const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users'); // Assumindo um endpoint que retorna os usuários
    setUsers(response.data);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};
// Filtrar sugestões conforme o input do usuário
const handleUserInput = (e) => {
  const input = e.target.value;
  setSelectedTask({ ...selectedTask, user_id: input });
  setNewTask({ ...newTask, user_id: input });

  if (input.trim() === '') {
    setSuggestions([]); // Não mostrar sugestões se o input estiver vazio
  } else {
    // Filtrar os usuários que começam com o valor digitado
    const filteredSuggestions = users.filter((user) =>
      user.name.toLowerCase().startsWith(input.toLowerCase())
    );
    
    setSuggestions(filteredSuggestions);
  }
};

// Função para quando o usuário clicar em uma sugestão
const handleSuggestionClick = (user) => {
  setSelectedTask({ ...selectedTask, user_id: user.name });
  setNewTask({ ...newTask, user_id: user.name });

  setSuggestions([]); // Esconder as sugestões
};

const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/task-categories");
    setCategories(response.data);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  }
};
// Filtrar sugestões de categorias conforme o input
const handleCategoryInput = (e) => {
  const input = e.target.value;
  setSelectedTask({ ...selectedTask, category_id: input });
  setNewTask({ ...newTask, category_id: input });

  if (input.trim() === '') {
    setCategorySuggestions([]); // Não mostrar sugestões se o input estiver vazio
  } else {
    // Filtrar as categorias que começam com o valor digitado
    const filteredSuggestions = categories.filter((category) =>
      category.name.toLowerCase().startsWith(input.toLowerCase())
    );
    setCategorySuggestions(filteredSuggestions);
  }
};

// Função para quando o usuário clicar em uma sugestão de categoria
const handleCategorySuggestionClick = (category) => {
  setSelectedTask({ ...selectedTask, category_id: category.name }); // Definir a categoria selecionada
  setNewTask({ ...newTask, category_id: category.name });
  setCategorySuggestions([]); // Esconder as sugestões
};

const fetchListTask = async () => {
  try {
    const response = await axios.get("http://localhost:3000/task-lists");
    setListTask(response.data);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  }
};

  // Função para buscar todas as tarefas
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Função para buscar detalhes de uma tarefa específica
  const fetchTaskDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks/${id}`);
      setSelectedTask(response.data); // Exibir detalhes da tarefa
      setIsEditing(false); // Não entra em modo de edição diretamente
      setShowTaskModal(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da tarefa:', error);
    }
  };

    // Função para editar a tarefa
    const editTask = async () => {
      try {
        const response = await axios.put(`http://localhost:3000/tasks/${myUserId}/tasks/${selectedTask.id}`, selectedTask, {
          headers: {
            'Content-Type': 'multipart/form-data',  // Garantir que o tipo de conteúdo seja multipart
          },
        });

        setSelectedTask(response.data);
        setShowTaskModal(false); // Fechar o modal após edição
        fetchTasks(); // Atualizar a lista de tarefas
      } catch (error) {
        console.error('Erro ao editar a tarefa:', error);
      }
    };
  

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
      setSelectedTask(response.data);
      setShowTaskModal(false);
      fetchTasks(); // Atualizar tarefas após a criação
    } catch (error) {
      console.error('Erro ao apagar a tarefa:', error);
    }
  };

  // Função para criar uma nova tarefa
  const createTask = async () => {
    try {
      // Criar uma instância de FormData para enviar o arquivo e os outros campos
      const formData = new FormData();
      formData.append('title', newTask.title);
      formData.append('description', newTask.description);
      formData.append('due_date', newTask.due_date);
      formData.append('status', newTask.status);
      formData.append('priority', newTask.priority);
      formData.append('user_id', newTask.user_id);
      formData.append('category_id', newTask.category_id);
      formData.append('task_list_id', newTask.task_list_id);
  
      // Adicionar o arquivo apenas se existir
      if (newTask.file) {
        formData.append('file', newTask.file);
      }
  
      // Fazer a requisição com o FormData
      await axios.post('http://localhost:3000/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Garantir que o tipo de conteúdo seja multipart
        },
      });
  
      fetchTasks(); // Atualizar tarefas após a criação
      setShowNewTaskModal(false); // Fechar modal de nova tarefa
    } catch (error) {
      console.error('Erro ao criar nova tarefa:', error);
    }
  };
  

  useEffect(() => {
    fetchTasks();
    fetchCategories();
    fetchListTask();
    fetchUsers();
  }, []);

  // Função para renderizar as colunas de acordo com o `task_list_name`
  const renderColumns = (status) => {
    return tasks
      .filter(task => task.task_list_name === status)
      .map(task => (
        <div key={task.id} className="task-card" onClick={() => fetchTaskDetails(task.id)}>
          <h3>{task.title}</h3>
          <div className="container-due_date-usuario">
          <p className="relatorio-due-date">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"  stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0  1 18 0Z" />
            </svg>
            {new Date(task.due_date).toLocaleDateString()}
          </p>
          <img src={`http://localhost:3000/users/${task.user_id}/image`} alt={`${task.user_photo}`} className='user-photo'/>
          </div>

          <div className="container-categoria-e-prioridade">
                    <p>
                      <span className={`prioridade ${
                        task.priority === "low"
                          ? "prioridade-low"
                          : task.priority === "medium"
                          ? "prioridade-medium"
                          : task.priority === "high"
                          ? "prioridade-high"
                          : ""
                      }`}>{task.priority}</span>
                    </p>
                    <p>
                      <span
                        className={`categoria ${
                          categories.find((category) => category.name === task.category_name)
                            ? `categoria-${task.category_name.toLowerCase()}`
                            : ""
                        }`}
                      >
                        {task.category_name}
                      </span>
                    </p>

                    </div>
          
        </div>
      ));
  };

  return (
    <>
    <div className="kanban-board">

      {/* Colunas */}
      {listTask.map((listTaskName) => (
        <div className="kanban-column" key={listTaskName.name}>
                <div className="column-header">
                <h2 value={listTaskName.name}>
                  {listTaskName.name} <span>{(tasks.filter(tarefa => tarefa.task_list_name === `${listTaskName.name}`)).length}</span>
                </h2>
                <button className="add-task-button" onClick={() => setShowNewTaskModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#333333'><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                </button>
                </div>
                {renderColumns(`${listTaskName.name}`)}
        </div>
              ))}

      {/* Modal para visualizar tarefa existente */}
      {showTaskModal && selectedTask && (
        <div className="modal">
          <div className="modal-content">
            {isEditing ? (
              <>
                <h2>Editar Tarefa</h2>
                <label>Título</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                />
                
                <label>Descrição</label>
                <textarea
                  value={selectedTask.description}
                  onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                />

                <label>Data de Entrega</label>
                <input
                  type="date"
                  value={new Date(selectedTask.due_date).toISOString().substr(0, 10)}
                  onChange={(e) => setSelectedTask({ ...selectedTask, due_date: e.target.value })}
                />

                <label>Status</label>
                <select
                  value={selectedTask.task_list_id}
                  onChange={(e) => setSelectedTask({ ...selectedTask, task_list_id: e.target.value })}
                >
                  <option value="Para Fazer">Para Fazer</option>
                  <option value="Em Progresso">Em Progresso</option>
                  <option value="Concluído">Concluído</option>
                </select>

                <label>Prioridade</label>
                <select
                  value={selectedTask.priority}
                  onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>

                <label>Responsável</label>
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={selectedTask.user_id}
                  onChange={handleUserInput}
                  placeholder="Digite o nome do usuário"
                />
                {suggestions.length > 0 && (
                  <ul style={{ position: 'absolute',
                    top: '100%', // Posicionar logo abaixo do input
                    left: 0,
                    width: '100%',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    listStyleType: 'none',
                    padding: '0',
                    margin: '0',
                    zIndex: 1000}}>
                    {suggestions.map((user) => (
                      <li
                        key={user.id}
                        style={{ padding: '8px', cursor: 'pointer' }}
                        onClick={() => handleSuggestionClick(user)} className="sugestoes-users"
                      >
                        <img src={`http://localhost:3000/users/${user.id}/image`}
                        alt={`${user.user_photo}`} className="user-photo"/>
                        <p>{user.name}</p>
                      </li>
                    ))}
                  </ul>
                )}

                </div>

                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <label>Categoria</label>
                  <input
                    type="text"
                    value={selectedTask.category_id}
                    onChange={handleCategoryInput}
                    placeholder="Digite a categoria"
                  />

                  {/* Mostrar sugestões de categorias */}
                  {categorySuggestions.length > 0 && (
                    <ul style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      border: '1px solid #ccc',
                      backgroundColor: '#fff',
                      listStyleType: 'none',
                      padding: '0',
                      margin: '0',
                      zIndex: 1000
                    }}>
                      {categorySuggestions.map((category) => (
                        <li
                          key={category.id}
                          style={{ padding: '8px', cursor: 'pointer'}}
                          onClick={() => handleCategorySuggestionClick(category)} className="sugestoes-users"
                        >
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <label>Arquivo</label>
                <input
                  type="file"
                  onChange={(e) => setSelectedTask({ ...selectedTask, file: e.target.files[0] })}
                />
                <button onClick={editTask}>Salvar Alterações</button>
              </>
            ) : (
              <>
                <label>Título</label>
                <p>{selectedTask.title}</p>
                <label>Descrição</label>
                <p>{selectedTask.description}</p>

                <label>Data da Entrega</label>
                <p>Data de Entrega: {new Date(selectedTask.due_date).toLocaleDateString()}</p>
                <label>Status</label>
                <p>Status: {selectedTask.task_list_id}</p>
                <label>Prioridade</label>
                <p>Prioridade: {selectedTask.priority}</p>
                <label>Responsável</label>
                <p>Responsável: {selectedTask.user_id}</p>
                <label>Categoria</label>
                <p>Categoria: {selectedTask.category_id}</p>
                <label>Arquivo</label>
                <p>Arquivo: {selectedTask.file_path}</p>
              </>
            )}

            <button onClick={() => setShowTaskModal(false)}>Fechar</button>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancelar Edição' : 'Editar Tarefa'}
            </button>
            {!isEditing && <button onClick={() => deleteTask(selectedTask.id)}>Apagar Tarefa</button>}
            <label>Data da Criação</label>
            <p>Data de Criação: {new Date(selectedTask.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* Modal para criar nova tarefa */}
      {showNewTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Criar Nova Tarefa</h2>
            <label>Título</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <label>Descrição</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <label>Data de Entrega</label>
            <input
              type="date"
              value={newTask.due_date}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
            />
            <label>Status</label>
            <select
              value={newTask.task_list_id}
              onChange={(e) => setNewTask({ ...newTask, task_list_id: e.target.value })}
            >
              <option value="Para Fazer">Para Fazer</option>
              <option value="Em Progresso">Em Progresso</option>
              <option value="Concluído">Concluído</option>
            </select>
            <label>Prioridade</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>

            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <label>Responsável</label>
              <input
                type="text"
                value={newTask.user_id} // Usando o valor de newTask
                onChange={handleUserInput} // Chama a função de mudança do input
                placeholder="Digite o nome do usuário"
              />

              {/* Mostrar sugestões de usuários */}
              {suggestions.length > 0 && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  listStyleType: 'none',
                  padding: '0',
                  margin: '0',
                  zIndex: 1000 // Sobrepor a outros elementos
                }}>
                  {suggestions.map((user) => (
                    <li
                      key={user.id}
                      style={{ padding: '8px', cursor: 'pointer'}}
                      onClick={() => handleSuggestionClick(user)} className="sugestoes-users"
                    >
                      <img src={`http://localhost:3000/users/${user.id}/image`}
                        alt={`${user.user_photo}`} className="user-photo"/>
                        <p>{user.name}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <label>Categoria</label>
              <input
                type="text"
                value={newTask.category_id} // Usando o valor de newTask
                onChange={handleCategoryInput} // Chama a função de mudança do input
                placeholder="Digite a categoria"
              />

              {/* Mostrar sugestões de categorias */}
              {categorySuggestions.length > 0 && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  listStyleType: 'none',
                  padding: '0',
                  margin: '0',
                  zIndex: 1000 // Sobrepor a outros elementos
                }}>
                  {categorySuggestions.map((category) => (
                    <li
                      key={category.id}
                      style={{ padding: '8px', cursor: 'pointer'}}
                      onClick={() => handleCategorySuggestionClick(category)} className="sugestoes-users"
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label>Arquivo</label>
            <input
              type="file"
              onChange={(e) => setNewTask({ ...newTask, file: e.target.files[0] })}
            />
            <button onClick={createTask}>Criar Tarefa</button>
            <button onClick={() => setShowNewTaskModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Boards;
