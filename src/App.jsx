import React, { createContext, useState } from "react";
import './App.css';
import NavBar from "./componentes/NavBar.jsx";
import ItemListContainer from "./componentes/ItemListContainer";
import Nosotros from './componentes/Nosotros.jsx';
import ItemContainer from "./componentes/ItemContainer";
import Carrito from './componentes/Carrito.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CartProvider } from "./context/cartContext";

export default function App() {

  return (

    <CartProvider>
    <>
        <BrowserRouter>

          <NavBar />

          <Routes>

            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/productos/categoria/:producto_categoria" element={<ItemListContainer />} />
            <Route path="/productos/:producto_id" element={<ItemContainer />} />
            <Route path="/carrito" element={<Carrito />} />

          </Routes>

        </BrowserRouter>

    </>

    </CartProvider>
  );
}
