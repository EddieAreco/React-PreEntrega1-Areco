import { useState, useEffect } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { NavLink } from "react-router-dom";

export default function Categorias() {

  const [categoria, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");


  useEffect( () => {

    const obtenerCategorias = async () => {
      const db = getFirestore();
      const q = collection(db, "Item");
      const snapshot = await getDocs(q);
      const categorias = snapshot.docs.map(doc => doc.data().categoria);
      const categoriasUnicas = [...new Set(categorias)];
      setCategoria(categoriasUnicas);
    };

    obtenerCategorias();

}, [])

const handleCategory = (categoria) => {
  setCategoriaSeleccionada(categoria);
  console.log("Categoría seleccionada:", categoria);
}

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light" 
        >
          Categorias
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
      {categoria.map(category => (
          <DropdownItem key={category}>
            <NavLink to={`/productos/categoria/${category}`} onClick={ () => handleCategory(category) }>
            {category}
            </NavLink>
            </DropdownItem>
        ))}
      </DropdownMenu>

    </Dropdown>
  );
}
