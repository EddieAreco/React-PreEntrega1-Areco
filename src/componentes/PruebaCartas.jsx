import React, { useState } from "react";
import { data } from "../data.js";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import BotonesCards from '../componentes/BotonesCards.jsx';
import fantaNaranja from '/imagenes/fantanaranja.jpg';

export const PruebaCartas = ({todosLosProductos, setTodosLosProductos}) => {

    const [product, setProduct] = useState({data})

    function handleQuantity(newQuantity){

        if(newQuantity <= product.stock && newQuantity > 0){

            product.cantidad = newQuantity;
            setQuantity(newQuantity);
        }else{
            alert ("no hay stock")
        }
    }
    // poner un useEffect acá

    return(
        <>
        
        {data.map(productos => (

        <Card key={productos.id}>
            
          <CardBody className="overflow-visible p-0">

            <Image
            isBlurred
              shadow="lg"
              radius="lg"
              width="100%"
              alt={productos.nombre}
              className="w-full object-cover h-[350px] p-5"
              src = {productos.imagen}
            />

          </CardBody>

          <CardBody className="text-large justify-between">
            <b  className="text-black">{productos.nombre}</b>
            <p className="font-semibold"> Precio ${productos.precio} </p>
            <p className="font-semibold"> Stock {productos.stock} </p>
          </CardBody>

          <CardFooter className="bg-black">

            <BotonesCards 
            
            product = {product}
            handleQuantity = { handleQuantity}
            
            />

          </CardFooter>
          
        </Card>

        ))}
        
        </>
    )
}