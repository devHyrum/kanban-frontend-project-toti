import React, { useState, useEffect } from 'react';
import LoaderRelatorios from '../loadings/LoaderRelatorios.jsx';
import './Relatorios.css'
import axios from 'axios';

export default function Relatorios() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

    // Função para buscar todas as tarefas
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      fetchTasks();
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div>
      {loading ? (
        <LoaderRelatorios />
      ) : (
        <div>
          <h1>Relatórios</h1>
          <p>Esta é a página de Relatórios!</p>

          {/* Exibir tarefas em três quadros */}
          <div className="relatorios-container">
            {tasks.filter(task => task.task_list_name === 'Concluído').map((task) => (
              <div key={task.id} className="relatorios-card">
                <h3>{task.title}</h3>
                <p><strong>Data de conclusão:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Prioridade:</strong> {task.priority}</p>
                <p><strong>Usuário:</strong> {task.user_name}</p>
                {task.user_photo && (
                  <img
                    src={`/path/to/images/${task.user_photo}`}
                    alt={`${task.user_name}`}
                    className="user-photo"
                  />
                )}
                <p><strong>Categoria:</strong> {task.category_name}</p>
                <p><strong>Lista de tarefas:</strong> {task.task_list_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
