import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Boards.css'

const Boards = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa selecionada para exibição
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null); // Dados da tarefa em edição
  const [isEditing, setIsEditing] = useState(false); // Define se o usuário está em modo de edição
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
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
        const response = await axios.put(`http://localhost:3000/tasks/11/tasks/${selectedTask.id}`, selectedTask);
        setSelectedTask(response.data); // Atualizar tarefa selecionada com as mudanças
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
  }, []);

  // Função para renderizar as colunas de acordo com o `task_list_name`
  const renderColumns = (status) => {
    return tasks
      .filter(task => task.task_list_name === status)
      .map(task => (
        <div key={task.id} className="task-card" onClick={() => fetchTaskDetails(task.id)}>
          <h3>{task.title}</h3>
          <p>Responsável: {task.user_name}</p>
          <p>Prioridade: {task.priority}</p>
        </div>
      ));
  };

  return (
    <div className="kanban-board">
      <div className="kanban-column">
        <div className="column-header">
          <h2>Para Fazer</h2>
          <button className="add-task-button" onClick={() => setShowNewTaskModal(true)}>+</button>
        </div>
        {renderColumns('Para fazer')}
      </div>
      <div className="kanban-column">
        <div className="column-header">
          <h2>Em Progresso</h2>
          <button className="add-task-button" onClick={() => setShowNewTaskModal(true)}>+</button>
        </div>
        {renderColumns('Em progresso')}
      </div>
      <div className="kanban-column">
        <div className="column-header">
          <h2>Concluído</h2>
          <button className="add-task-button" onClick={() => setShowNewTaskModal(true)}>+</button>
        </div>
        {renderColumns('Concluído')}
      </div>

      {/* Modal para visualizar tarefa existente */}
      {showTaskModal && selectedTask && (
        <div className="modal">
          <div className="modal-content">
            {isEditing ? (
              <>
                <h2>Editar Tarefa</h2>
      
      {/* Campo de título */}
      <label>Título</label>
      <input
        type="text"
        value={selectedTask.title}
        onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
      />
      
      {/* Campo de descrição */}
      <label>Descrição</label>
      <textarea
        value={selectedTask.description}
        onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
      />

      {/* Campo de data de entrega */}
      <label>Data de Entrega</label>
      <input
        type="date"
        value={new Date(selectedTask.due_date).toISOString().substr(0, 10)}
        onChange={(e) => setSelectedTask({ ...selectedTask, due_date: e.target.value })}
      />

      {/* Campo de status */}
      <label>Status</label>
      <select
        value={selectedTask.task_list_id}
        onChange={(e) => setSelectedTask({ ...selectedTask, task_list_id: e.target.value })}
      >
        <option value="Para Fazer">Para Fazer</option>
        <option value="Em Progresso">Em Progresso</option>
        <option value="Concluído">Concluído</option>
      </select>

      {/* Campo de prioridade */}
      <label>Prioridade</label>
      <select
        value={selectedTask.priority}
        onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
      >
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      {/* Campo de responsável */}
      <label>Responsável</label>
      <input
        type="text"
        value={selectedTask.user_id}
        onChange={(e) => setSelectedTask({ ...selectedTask, user_id: e.target.value })}
      />

      {/* Campo de categoria */}
      <label>Categoria</label>
      <input
        type="text"
        value={selectedTask.category_id}
        onChange={(e) => setSelectedTask({ ...selectedTask, category_id: e.target.value })}
      />
                <button onClick={editTask}>Salvar Alterações</button>
              </>
            ) : (
              <>
                <h2>{selectedTask.title}</h2>
                <p>{selectedTask.description}</p>
                <p>Data de Criação: {new Date(selectedTask.created_at).toLocaleDateString()}</p>
                <p>Data de Entrega: {new Date(selectedTask.due_date).toLocaleDateString()}</p>
                <p>Status: {selectedTask.status}</p>
                <p>Prioridade: {selectedTask.task_list_id}</p>
                <p>Responsável: {selectedTask.user_id}</p>
                <p>Categoria: {selectedTask.category_id}</p>
                <p>Arquivo: {selectedTask.file_path}</p>
              </>
            )}

            <button onClick={() => setShowTaskModal(false)}>Fechar</button>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancelar Edição' : 'Editar Tarefa'}
            </button>
            {!isEditing && <button onClick={() => deleteTask(selectedTask.id)}>Apagar Tarefa</button>}
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
            <label>Responsável</label>
            <input
              type="text"
              value={newTask.user_id}
              onChange={(e) => setNewTask({ ...newTask, user_id: e.target.value })}
            />
            <label>Categoria</label>
            <input
              type="text"
              value={newTask.category_id}
              onChange={(e) => setNewTask({ ...newTask, category_id: e.target.value })}
            />
            <label>Prioridade</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
            <label>Lista de tarea</label>
            <select
              value={newTask.task_list_id}
              onChange={(e) => setNewTask({ ...newTask, task_list_id: e.target.value })}
            >
              <option value="Para Fazer">Para Fazer</option>
              <option value="Em Progresso">Em Progresso</option>
              <option value="Concluído">Concluído</option>
            </select>
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
  );
};

export default Boards;
