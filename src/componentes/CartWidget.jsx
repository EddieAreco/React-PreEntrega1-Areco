import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

import { FaCartShopping } from "react-icons/fa6";

import { Image, Badge, Tooltip } from '@nextui-org/react';

//EN ESTE COMPONENTE ENCONTRAMOS EL CARRITO QUE SE UBICA EN EL NAVBAR, EL MISMO CONTIENE UN MENU QUE VISUALIZA UN RESUMEN DE LA COMPRA DEL USUARIO A TRAVES DE UN MAP DE CARRITO TRAIDO DESDE CARTCONTEXT, EL CUAL TIENE ALMACENADA LA INFORMACION DE LOS PRODUCTOS QUE COMPRA EL USUARIO Y TAMBIEN TRAEMOS LA INFORMACION DEL TOTAL DE LA COMPRA PARA QUE EL USUARIO LO VISUALICE SIEMPRE

export const CartWidget = React.forwardRef((props, ref) => {

    const [conteo, setConteo] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);

    const { carrito, cantidadComprada, totalCompra } = useContext(CartContext);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleClick = () => {
        setConteo(conteo + 1);
    }

    return (

        <>
            <Tooltip 
            showArrow={true} 
            placement="bottom" 
            content="haz click aqui para pre visualizar tus productos del carrito">

                <Badge
                    color="danger"
                    content={cantidadComprada()}
                    shape="circle"
                    placement="bottom-right"
                    onClick={toggleDropdown}
                >


                    <FaCartShopping
                        style={{ fontSize: 30 }}
                        onClick={handleClick}
                        role="button"
                    />

                </Badge>
                
            </Tooltip>

            <div className="flex flex-col ml-2">
                <p>Total:</p>
                <p>{`$ ${totalCompra}`}</p>
            </div>

            {/* ESTE CONDICIONAL LO USO PARA QUE EL RESUMEN SE VISUALICE O NO SEGUN SI EL CLIENTE HACE CLICK SOBRE EL CARRITO A TRAVES DE UNA FUNCION LLAMADA HANDLECLICK QUE MODIFICA EL ESTADO DE SHOWDROPDOWN */}
            {showDropdown && (

                <div className="bg-white font-bold absolute right-0 mt-16 p-3 top-0 border border-orange-600 border-t-0 border-b-4 border-l-4 border-r-4">

                    {carrito.map((item, index) => (

                        <div key={index} className="border border-orange-600 border-x-0 border-t-0 border-b-3 mb-2">

                            <div className="flex justify-between items-center gap-2 max-h-24">

                                <div className="mr-5 w-3/6 grid grid-cols-1 justify-items-center">

                                    <Image width={50} height={10} src={item.imagen}/>
                                    <p>{item.nombre}</p>

                                </div>

                                <p>Precio: ${item.precio}</p>
                                <p>Cantidad: {item.cantidad} unid.</p>

                            </div>
                        </div>
                    ))}

                    <div>
                        <p>Total: ${totalCompra}</p>
                    </div>

                </div>
            )}

        </>
    )
});