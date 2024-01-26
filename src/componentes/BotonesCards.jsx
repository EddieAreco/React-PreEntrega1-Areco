import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";
import { data } from "../data.js";

export default function BotonesCards(props) {

    const { productos, handleQuantity } = props;

    console.log(data)

    // const [conteo, setConteo] = useState(0);

    const [ texto, setTexto ] = useState();

    // const sumaConteo = () => {

    //     if ( conteo < data.stock ){
    //         setConteo ( conteo + 1);
    //         } else{
    //             setTexto ( "no hay stock" );
    //         }
    // };

    // const restaConteo = () => {

    //     if (conteo != 0) {
    //         setConteo(conteo - 1)
    //     };
    // };

    return (
        
        <>
        <div className="flex flex-wrap gap-4 justify-between w-full">
            <Button isIconOnly
                radius="full"
                size="sm"
                color="primary"
                className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 px-2 py-2.5">
                <CgMathMinus
                    color="primary"
                    onClick={() => { props.handleQuantity ( productos.cantidad - 1 )}}
                    style={{ fontSize: 15 }}
                />

            </Button>

            <p className="font-semibold text-white"> {productos.cantidad} </p>
            <Button 
                color="primary"
                className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <button
                    color="primary"
                    onClick={() => { props.handleQuantity ( productos.cantidad + 1 )}}
                    className="px-4 uppercase text-xs"
                > comprar
                    </button>
            </Button>
        </div>

        <p className="text-white">{texto}</p>

        </>
    );
}