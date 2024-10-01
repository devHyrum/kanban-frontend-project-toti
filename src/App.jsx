import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Boards from "./components/Boards/Boards.jsx";
import Equipes from "./components//Equipes/Equipes.jsx";
import Relatorios from "./components/Relatorios/Relatorios.jsx";
import Ajustes from "./components/Ajustes/Ajustes.jsx";
import Header from "./components/Header/Header.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import Help from "./components/Help/Help.jsx";
import { UserProvider } from './context/UserContext.jsx';

function App() {
  const { id } = useParams()
  return (
    <>
    <UserProvider>

      <div className="app">
        <Sidebar id={id}/>
        <div className="content">
          <Header userId={id}/>
          <Routes>
            <Route path="/" element={<Welcome id={id}/>} />
            <Route path="kanban/dashboard" element={<Boards myUserId={id}/>} />
            <Route path="kanban/groups" element={<Equipes id={id}/>} />
            <Route path="kanban/reports" element={<Relatorios id={id}/>} />
            <Route path="kanban/myProfile" element={<Ajustes myUserId={id}/>} />
            <Route path="kanban/help" element={<Help id={id}/>} />
          </Routes>
        </div>
      </div>
    </UserProvider>
    </>
  );
}

export default App;
