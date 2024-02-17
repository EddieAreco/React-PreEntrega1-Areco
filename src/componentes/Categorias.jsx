import { useState, useContext, useEffect } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { CartContext } from "../context/cartContext";
import { getDocs, getFirestore, query, where, collection } from "firebase/firestore";
import { Cartas } from "./Cartas";

export default function Categorias() {

  const [categoria, setCategoria] = useState([]);
  const [productos, setProductos] = useState([]);
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

useEffect(() => {
  const obtenerProductos = async () => {
    const db = getFirestore();
    let q;
    if (categoriaSeleccionada === "Todas") {
      q = collection(db, "Item");
    } else {
      q = query(collection(db, "Item"), where("categoria", "==", categoriaSeleccionada));
    }
    const snapshot = await getDocs(q);
    const productos = snapshot.docs.map(doc => doc.data());
    setProductos(productos);
  };

  obtenerProductos();
}, [categoriaSeleccionada]);

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
          <DropdownItem key={category} onClick={ () => handleCategory(category) }>{category}</DropdownItem>
        ))}
      </DropdownMenu>

      <Cartas products={ productos } descripcion={false} link={true}/>

    </Dropdown>
  );
}
