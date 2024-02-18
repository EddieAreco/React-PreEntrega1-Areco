import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import BotonesCards from './BotonesCards.jsx';
import { Link } from "react-router-dom";
export const Cartas = ({ products, descripcion, link }) => {

  return (
    <>
      {
        <Card key={products.id}>

          <CardBody className="overflow-visible p-0">

            <Image
              isBlurred
              shadow="lg"
              radius="lg"
              width="100%"
              alt={products.nombre}
              className="w-full object-cover h-[350px] p-5"
              src={products.imagen}
            />

          </CardBody>

          <CardBody className="text-large justify-between">
            <b className="text-black">{products.nombre}</b>
            <p className="font-semibold"> Precio ${products.precio} </p>
            <p className="font-semibold"> Stock {products.stock} </p>

            {descripcion && (
              <div>
            <p className='font-semibold text-amber-900'>Descripción: {products.descripcion}</p>
            <p className='font-semibold text-amber-900'>Categoria: {products.categoria}</p>
            <p className='font-semibold text-amber-900'>ID del Producto: {products.id}</p>
            </div>
            )
            
            }
          </CardBody>

          <CardFooter className="bg-black">

            <BotonesCards

              // A la prop product le asigno products
              product={products}

              stock={products.stock}

              initial={0}

            // onAdd={(quantity) => console.log(quantity)}

            />
          </CardFooter>

          {link && <Link
            className="text-blue-600/75 text-xl font-bold"
            to={`/productos/${products.id}`}
          >
            Ver mas
          </Link>}

        </Card>
      }

    </>
  )
}