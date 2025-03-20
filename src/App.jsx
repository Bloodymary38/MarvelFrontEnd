import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Persos from "./pages/Persos";
import Comics from "./pages/Comics";
import Comicsbyperso from "./pages/Comicsbyperso";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Persos" element={<Persos />} />
        <Route path="/Comics" element={<Comics />} />
        <Route path="/Comicsbyperso/:id" element={<Comicsbyperso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
