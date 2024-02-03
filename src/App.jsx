import React, { useState } from "react";
import './App.css';
import NavBar from "./componentes/NavBar.jsx";
import ItemListContainer from "./componentes/ItemListContainer";
import Nosotros from './componentes/Nosotros.jsx';
import ItemContainer from "./componentes/ItemContainer";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

export default function App() {

  return (
    <>

      <BrowserRouter>
      
      <NavBar />

        <Routes>

          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/productos/:producto_id" element={<ItemContainer />} />

        </Routes>
        
      </BrowserRouter>
    </>
  );
}
