import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import BotonesCards from './BotonesCards.jsx';
import { Link } from "react-router-dom";
export const Cartas = ({ products, descripcion, link }) => {

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
            {descripcion && <p className='font-semibold text-amber-900'>Descripción: {productos.descripcion}</p>}
          </CardBody>

          <CardFooter className="bg-black">

            <BotonesCards

              // A la prop product le asigno productos
              product={productos}

              stock={productos.stock}

              initial={0}

              // onAdd={(quantity) => console.log(quantity)}

            />
          </CardFooter>

          {link && <Link
            className="text-blue-600/75 text-xl font-bold"
            to={`/productos/${productos.id}`}
          >
            Ver mas
          </Link>}

        </Card>

      ))}

    </>
  )
}