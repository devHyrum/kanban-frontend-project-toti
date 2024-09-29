import React, { useState, useEffect } from "react";
import LoaderRelatorios from "../loadings/LoaderRelatorios.jsx";
import "./Relatorios.css";
import axios from "axios";
import notFoundYourTask from './notFoundYourTask.svg'

export default function Relatorios() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState(""); // Filtro por categoria
  const [filterPriority, setFilterPriority] = useState(""); // Filtro por prioridade
  const [searchValue, setSearchValue] = useState(""); // Filtro por busca
  const [expandedTaskId, setExpandedTaskId] = useState(null); // Controla qual card está expandido

  // Função para buscar todas as tarefas
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      const tasksConcluidas = response.data.filter((task) => task.task_list_name === "Concluído");
      setTasks(tasksConcluidas);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/task-categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  // Função que aplica os filtros de categoria, prioridade e busca
  const filteredTasks = tasks.filter((task) => {
    // Filtro por categoria
    const matchesCategory = filterCategory
      ? task.category_name &&
        task.category_name.toLowerCase().includes(filterCategory.toLowerCase())
      : true;

    // Filtro por prioridade
    const matchesPriority = filterPriority
      ? task.priority &&
        task.priority.toLowerCase().includes(filterPriority.toLowerCase())
      : true;

    // Filtro de busca por título ou descrição
    const matchesSearch = searchValue
      ? (task.title &&
          task.title.toLowerCase().includes(searchValue.toLowerCase())) ||
        (task.description &&
          task.description.toLowerCase().includes(searchValue.toLowerCase()))
      : true;

    return matchesCategory && matchesPriority && matchesSearch;
  });

  // Função para limpar os filtros
  const clearFilters = () => {
    setFilterCategory("");
    setFilterPriority("");
    setSearchValue("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      fetchTasks();
      fetchCategories();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (taskId) => {
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId)); // Alterna a expansão
  };

  return (
<div>
      {loading ? (
        <LoaderRelatorios />
      ) : (
        <div className="relatorios-conteudo">
          {/* Contêiner de Filtros e Busca */}
          <div className="relatorios-filters">
            {/* Filtro por Categoria */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Todas Categorias</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Filtro por Prioridade */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Todas Prioridades</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>

            {/* Busca por Título ou Descrição */}
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar por título ou descrição"
            />

            {/* Botão de Limpar Filtros */}
            <button className="relatorios-clear-btn" onClick={clearFilters}>Limpar Filtros</button>
          </div>

          {/* Exibir tarefas filtradas ou mensagem de "Nenhuma tarefa encontrada" */}
          <div className="relatorios-container">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                  <div key={task.id} className="relatorios-card" onClick={() => handleCardClick(task.id)}>
                    <h3>{task.title}</h3>
                    {/* <p>{task.description}</p> */}
                    <div
                    className={`relatorios-description ${
                      expandedTaskId === task.id ? "show" : ""
                    }`}
                     >
                    <p>{task.description}</p>
                    </div>
                    <div className="container-due_date-usuario">
                      <p className="relatorio-due-date">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"  stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0  1 18 0Z" />
                      </svg>
                        {new Date(task.due_date).toLocaleDateString()}
                      </p>

                      <p className="relatorio-usuario">
                        <strong>{task.user_name}</strong>
                      {task.user_photo && (
                        <img
                        src={`http://localhost:3000/users/${task.user_id}/image`}
                        alt={`${task.user_photo}`}
                        className="user-photo"
                        />
                      )}
                      </p>
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
                ))
            ) : (
              <div className='notFoundYourTask-conteudo'>
                <img src={notFoundYourTask} alt="notFoundYourTask" />
                <div>
                  <h1>Não existe a tarefa</h1>
                  <p>Tem certeza da sua busca?</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
