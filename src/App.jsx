import React, { useState } from "react";
import './App.css';
import NavBar from "./componentes/NavBar.jsx";
import ItemListContainer from "./componentes/ItemListContainer";

export default function App() {

  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [contadorProductos, setContadorProductos] = useState(0);

  return (
    <>
    
    <NavBar 
    todosLosProductos={todosLosProductos}
    setTodosLosProductos={setTodosLosProductos}
    total={total}
    setTotal={setTotal}
    contadorProductos={contadorProductos}
    setContadorProductos={setContadorProductos}
     />

    <ItemListContainer 
    todosLosProductos={todosLosProductos}
    setTodosLosProductos={setTodosLosProductos}
    total={total}
    setTotal={setTotal}
    contadorProductos={contadorProductos}
    setContadorProductos={setContadorProductos}
     />

    </>
  );
}
