import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";

function Rotas() {

  return (
    <>
    <Routes>
      <Route path="/:id/*" element={<App />} />
    </Routes>
    </>
  );
}

export default Rotas;
