import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { getDocs, getFirestore, collection } from "firebase/firestore";

//ESTE COMPONENTE SE VA A ENCARGAR DE MOSTRAR LAS CATEGORIAS DE LOS PRODUCTOS EN UN MENU DESPLEGABLE
export default function Categorias() {

  const [categoria, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  //EN ESTE USE EFFECT, LO QUE BUSCO ES QUE SE HAGA UNA SOLICITUD PARA UNA LECTURA DE LA COLECCION LLAMADA ITEM QUE SE ENCUENTRA EN FIREBASE A TRAVES DE LA INSTANCIA getFirestore
  useEffect(() => {

    const obtenerCategorias = async () => {
      const db = getFirestore();
      const q = collection(db, "Item");
      const snapshot = await getDocs(q);
      const categorias = snapshot.docs.map(doc => doc.data().categoria);
      // ACCEDO A DOCS DE SNAPSHOT Y SE OBTIENE UNA MATRIZ DE TODAS LAS CATEGORIAS DE LOS DOCUMENTOS DE SNAPSHOT, LUEGO, CON UN MAP DE DOC.DATA PUEDO EXTRAER LAS CATEGORIAS DE CADA DOCUMENTO

      const categoriasUnicas = [...new Set(categorias)];

      // ELIMINO LOS CATEGORIAS DUPLICADAS USANDO SET Y LUEGO LAS VUELVO A CONVERTIR EN UN ARRAY USANDO ... PARA OBTENER UNA MATRIZ DE LAS CATEGORIAS QUE VOY A UTILIZAR PARA HACER UN MAP POSTERIORMENTE QUE MUESTRE TODAS LAS CATEGORIAS QUE ENCONTRO EN LA COLECCION DE FIREBASE
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

        {/* //AQUI SE ENCUENTRA EL MAP DE CADA UNA DE LAS CATEGORIAS */}
        {categoria.map(category => (
          <DropdownItem key={category}>

            {/* //AL HACER CLICK OBRE UNA CATEGORIA, REACT ME VA A ENVIAR EN OTRO SITIO CON UN ENLACE QUE TENGA LA CATEGORIA SELECCIONADA DONDE SOLO SE MUESTREN LOS PRODUCTOS DE LA MISMA */}
            <NavLink to={`/productos/categoria/${category}`} onClick={() => handleCategory(category)}>
              {category}
            </NavLink>
          </DropdownItem>
        ))}
      </DropdownMenu>

    </Dropdown>
  );
}
