import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import BotonesCards from '../componentes/BotonesCards.jsx';
import fantaNaranja from '/imagenes/fantanaranja.jpg';

export default function Cards(props) {
    return(
        <>
        
        <Card>
            
          <CardBody className="overflow-visible p-0">

            <Image
            isBlurred
              shadow="lg"
              radius="lg"
              width="100%"
              alt={props.nombre}
              className="w-full object-cover h-[350px] p-5"
              src = {`/imagenes/${props.imagenNombre}.jpg`}
            />

          </CardBody>

          <CardBody className="text-large justify-between">
            <b  className="text-black">{props.nombre}</b>
            <p className="font-semibold"> Precio ${props.precio} </p>
          </CardBody>

          <CardFooter className="bg-black">

            <BotonesCards />

          </CardFooter>
          
        </Card>
        
        </>
    )
}