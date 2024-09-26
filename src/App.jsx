import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Boards from "./components/Boards/Boards.jsx";
import Equipes from "./components//Equipes/Equipes.jsx";
import Relatorios from "./components/Relatorios/Relatorios.jsx";
import Ajustes from "./components/Ajustes/Ajustes.jsx";
import Header from "./components/Header/Header.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import Help from "./components/Help/Help.jsx";

function App() {
  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Header />
          <Routes>
            <Route path="/:id" element={<Welcome />} />
            <Route path="/:id/kanban/dashboard" element={<Boards />} />
            <Route path="/:id/kanban/groups" element={<Equipes />} />
            <Route path="/:id/kanban/reports" element={<Relatorios />} />
            <Route path="/:id/kanban/myProfile" element={<Ajustes />} />
            <Route path="/:id/kanban/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
