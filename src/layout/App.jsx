import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { UserProvider } from "../context/UserContext.jsx"
import Sidebar from "./modules/Sidebar/Sidebar.jsx";
import Header from "./modules/Header/Header.jsx";
import Boards from "./pages/Boards/Boards.jsx";
import Equipes from "./pages/Equipes/Equipes.jsx";
import Relatorios from "./pages/Relatorios/Relatorios.jsx";
import Ajustes from "./pages/Ajustes/Ajustes.jsx";
import Welcome from "./pages/Welcome/Welcome.jsx"
import Help from "./pages/Help/Help.jsx";

function App() {
  const { id } = useParams();
  return (
    <>
      <UserProvider>
        <div className="app">
          <Sidebar id={id} />
          <div className="content">
            <Header userId={id} />
            <Routes>
              <Route path="/" element={<Welcome id={id} />} />
              <Route
                path="kanban/dashboard"
                element={<Boards myUserId={id} />}
              />
              <Route path="kanban/groups" element={<Equipes id={id} />} />
              <Route path="kanban/reports" element={<Relatorios id={id} />} />
              <Route
                path="kanban/myProfile"
                element={<Ajustes myUserId={id} />}
              />
              <Route path="kanban/help" element={<Help id={id} />} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
