import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Boards from './components/Boards.jsx';
import Equipes from './components/Equipes.jsx';
import Relatorios from './components/Relatorios.jsx';
import Ajustes from './components/Ajustes.jsx';

function App() {

  return (
    <>
      <Routes>
        <div className="app">
          <Sidebar/>
    <div>hola</div>
          <div className="content">
            <Route path="/kanban/dashboard" element={<Boards />} />
            <Route path="/kanban/groups" element={<Equipes />} />
            <Route path="/kanban/reports" element={<Relatorios />} />
            <Route path="/kanban/myProfile" element={<Ajustes />} />
          </div>
        </div>
      </Routes>
    </>
  )
}

export default App
