import React, { useState, useContext } from "react";
import { CartContext } from "../context/cartContext";

import { FaCartShopping } from "react-icons/fa6";

import { Image, Badge, Tooltip } from '@nextui-org/react';

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

            {showDropdown && (

                <div className="bg-white font-bold absolute right-0 mt-16 p-3 top-0">

                    {carrito.map((item, index) => (

                        <div key={index} className="border-b-3 mb-2">

                            <div className="flex justify-between items-center gap-2">

                                <div className="mr-5">

                                    <Image width={100} src={item.imagen} />
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