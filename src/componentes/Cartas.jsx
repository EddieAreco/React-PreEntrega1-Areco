import React, { useEffect, useState } from "react";
import { data } from "../data.js";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import BotonesCards from './BotonesCards.jsx';
import { Link } from "react-router-dom";

// import { Item } from './Item.jsx';

// export const Cartas = ({ products }) => products.map(( product, index ) => <Item key={index} item={product} />)

export const Cartas = () => {

  const [products, setProducts] = useState([])
  // poner un useEffect acá que tenga fetch
  useEffect(() => {

    fetch('https://65bd501ab51f9b29e9334a3e.mockapi.io/bebidas/products/')
      .then((response) => response.json())
      .then((response_json) => setProducts(response_json))

  }, []
  );

  const [sinStock, setSinStock] = useState(false);

  const [error, setError] = useState({});

  function handlerQuantity(productId, newQuantity) {

    // Busco el producto en base al ID
    const productosPorId = products.find((prod) => prod.id === productId);

    // Verifico si existe el producto que busque por el id
    if (!productosPorId) {
      setError(true);
      return;
    }

    // Verifico si la nueva cantidad es válida en términos de stock y mayor que cero
    if (newQuantity <= productosPorId.stock && newQuantity >= 0) {

      // Actualizo la cantidad del producto en el estado
      const actualizacionProductos = products.map((prod) =>
        prod.id === productId ? { ...prod, cantidad: newQuantity } : prod
      );

      // Actualizo el valor del estado de products que seria la informacion traida de data, con los productos actualizados
      setProducts(actualizacionProductos);

      // Quito el mensaje de error una vez que la cantidad sea menor al stock
      setSinStock((prevSinStock) => ({ ...prevSinStock, [productId]: false }));

    } else {

      // Muestro mensaje de error si la cantidad no es válida
      setSinStock((prevSinStock) => ({ ...prevSinStock, [productId]: true }));
    }
  }

  return (
    <>

      {products.map(productos => (

        <Card key={productos.id}>

          <CardBody className="overflow-visible p-0">

            <Image
              isBlurred
              shadow="lg"
              radius="lg"
              width="100%"
              alt={productos.nombre}
              className="w-full object-cover h-[350px] p-5"
              src={productos.imagen}
            />

          </CardBody>

          <CardBody className="text-large justify-between">
            <b className="text-black">{productos.nombre}</b>
            <p className="font-semibold"> Precio ${productos.precio} </p>
            <p className="font-semibold"> Stock {productos.stock} </p>
          </CardBody>

          <CardFooter className="bg-black">

            <BotonesCards

              // A la prop product le asigno productos
              product={productos}

              // A handlerQuantity le paso como parametros el id del producto y la cantidad
              handlerQuantity={(id, quantity) => handlerQuantity(id, quantity)}

            />
          </CardFooter>

          <Link 
          className="text-blue-600/75 text-xl font-bold"
          to={`/productos/${productos.id}`}
          >
            Ver mas
            </Link>

          {sinStock[productos.id] && <p className="text-white bg-red-700"> Sin stock </p>}

        </Card>

      ))}

    </>
  )
}