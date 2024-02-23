import { useState } from "react";
import './App.css';
import NavBar from "./componentes/NavBar.jsx";
import ItemListContainer from "./componentes/ItemListContainer";
import Nosotros from './componentes/Nosotros.jsx';
import ItemContainer from "./componentes/ItemContainer";
import Carrito from './componentes/Carrito.jsx'

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { CartProvider } from "./context/cartContext";

export default function App() {

  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Función para manejar el cambio en el término de búsqueda
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <CartProvider>

        <BrowserRouter>

          <NavBar onSearchChange={handleSearchChange}/>

          <Routes>

            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/" element={<ItemListContainer searchTerm={searchTerm}/>} />
            <Route path="/productos/categoria/:producto_categoria" element={<ItemListContainer searchTerm={searchTerm}/>} />
            <Route path="/productos/:producto_id" element={<ItemContainer />} />
            <Route path="/carrito" element={<Carrito />} />

          </Routes>

        </BrowserRouter>

      </CartProvider>
    </>
  );
}
