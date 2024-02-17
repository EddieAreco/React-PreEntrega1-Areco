import { FaCartShopping } from "react-icons/fa6";
import { Image, Badge } from '@nextui-org/react';
import { useState, useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function CartWidget() {

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

                {/*
AQUI QUIERO LOGRAR UN MENU QUE REFLEJE LO QUE VA COMPRANDO EL USUARIO CON NOMBRE, PRECIO Y TOTAL DE COMPRA, PERO QUE SE PUEDA VER SOLO CADA VEZ QUE EL USUARIO HAGA CLICK SOBRE EL CARRITO, TAL VEZ DEBA HACER UN COMPONENTE APARTE Y QUE EL MISMO TRAIGO DE CARTCONTEXT CARRITO, CANTIDAD COMPRADA Y TAL VEZ DEBA CREAR UNA NUEVA PROP QUE SEA TOTAL
*/}

            </Badge>

            <div className="flex flex-col ml-2">
                <p>Total:</p>
                <p>{`$ ${totalCompra}`}</p>
            </div>

            {showDropdown && (

                <div className="bg-white font-bold absolute right-0 mt-16 p-3 top-0">

                    {carrito.map((item, index) => (

                        <div key={index} className="border-b-3 mb-2">

                            <div className="flex items-center gap-2">

                                <div className="mr-5">

                                <Image width={100} src={item.imagen}/>
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
}