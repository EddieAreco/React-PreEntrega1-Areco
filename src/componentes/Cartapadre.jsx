import BotonesCards from './BotonesCards.jsx';
import { Link } from "react-router-dom";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

//EN ESTE COMPONENTE SE ENCUENTRA UN MAP QUE SIRVA PARA RE UTILIZAR EN OTROS COMPONENTES EN EL CUAL SE MUESTRE UNA TARJETA DE UN PRODUCTO CON INFORMACION, DENTRO DEL MISMO, ENCONTRAMOS PROPS PARA DESPUES USAR CON EL FIN QUE HAYA INFORMACION QUE SE MUESTRE O NO 
export const Cartapadre = ({ products, descripcion, link }) => {

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
                <p className='font-semibold text-amber-900'>Categoria: {products.categoria}</p>
                <p className='font-semibold text-amber-900'>ID del Producto: {products.id}</p>
                <p className='font-semibold text-amber-900'><strong>Descripción:</strong> {products.descripcion}</p>
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