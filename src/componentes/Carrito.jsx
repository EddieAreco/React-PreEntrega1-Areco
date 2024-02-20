import { useState, useEffect, useContext } from 'react';
import { doc, addDoc, getDocs, collection, getFirestore } from 'firebase/firestore';
import { Loading } from './Loading'
import { Image, Button } from '@nextui-org/react';
import { CartContext } from '../context/cartContext.jsx';
import { NavLink } from 'react-router-dom';
import { BsFillCartXFill, BsCartCheckFill, CiFaceFrown  } from "react-icons/bs";

export default function Carrito() {

    const { carrito, clear, removeItem, totalCompra, calcularSubtotal } = useContext(CartContext)

    const quitarItem = (itemId) => {
        removeItem (itemId)
    }

    // Función para calcular el subtotal de un producto
const subTotalCarrito = (precio, cantidad) => {
    return calcularSubtotal(precio, cantidad);
};

    return (
        <>
            <div className='text-white font-bold mt-4 border-2 p-2'>
                <ul className='flex uppercase justify-between w-5/6'>
                    <li className='me-5'>producto</li>
                    <li className='me-3'>precio</li>
                    <li className='me-3'>cantidad</li>
                    <li className='me-3'>subtotal</li>
                </ul>
            </div>

            <div className='mx-auto mt-3 text-white'>

                {carrito.length > 0 ? (

                    carrito.map((item, index) => (
                        
                            
                                <div key={index} className="border-b-3 mb-2">
                                    <div className='flex justify-between items-center mt-3 border-b-4'>

                                        <div className="flex-column justify-center">

                                            <Image width={100} src={item.imagen} />
                                            <p>{item.nombre}</p>

                                        </div>

                                        <p>Precio: ${item.precio}</p>
                                        <p>Cantidad: {item.cantidad} unid.</p>
                                        <p>Sub total: $ {subTotalCarrito(item.precio, item.cantidad)}</p>
                                        <button onClick={ () => quitarItem(item.id) }><BsFillCartXFill style={{ fontSize: 20 }}/></button>
                                    </div>
                                </div>
                    ))
                    
                ) : (

                    <p className='mx-auto mt-3 text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg shadow-amber-500/50 dark:shadow-lg dark:shadow-amber-800/80 p-5'>
                        No hay productos en el carrito
                        
                        .
                        <NavLink to={'/'}>
                            <a className='ms-1'>
                                <strong>
                                    Agregue productos
                                </strong>
                            </a>
                        </NavLink>
                    </p>

                )}
                {carrito.length > 0 && (
                    <div>
                        
                        <div className='text-white flex justify-end'>
                                    <p>total a pagar: $ {totalCompra}</p>
                                </div>
                        <Button
                            variant='shadow'
                            color='primary'
                            size='lg'
                            className='text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs px-5 py-4 text-center uppercase mt-5'
                        >
                            <BsCartCheckFill style={{ fontSize: 25 }} />
                            Realizar pedido
                            <BsFillCartXFill />
                        </Button>
                    </div>
                )}

            </div>

        </>
    )
}