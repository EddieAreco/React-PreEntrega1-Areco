import { useState, useEffect, useContext } from 'react';
import { doc, addDoc, getDocs, collection, getFirestore } from 'firebase/firestore';
import { Loading } from './Loading'
import { Image, Button } from '@nextui-org/react';
import { CartContext } from '../context/cartContext.jsx';
import { NavLink } from 'react-router-dom';
import { BsFillCartXFill, BsCartCheckFill } from "react-icons/bs";

export default function Carrito() {

    const { carrito, cantidadComprada, totalCompra } = useContext(CartContext)

    return (
        <>
            <div className='text-white font-bold mt-4 border-2 p-2'>
                <ul className='flex uppercase justify-between mx-auto'>
                    <li>producto</li>
                    <li>precio</li>
                    <li>cantidad</li>
                    <li>subtotal</li>
                    <li>total</li>
                </ul>
            </div>

            <div className='mx-auto mt-3 text-white'>

                {carrito.length > 0 ? (

                    carrito.map((item, index) => (
                        <div>
                            <div>
                                <div key={index} className="border-b-3 mb-2">
                                    <div className='flex justify-between items-center mt-3 border-b-4'>

                                        <div className="flex-column justify-center">

                                            <Image width={100} src={item.imagen} />
                                            <p>{item.nombre}</p>

                                        </div>

                                        <p>Precio: ${item.precio}</p>
                                        <p>Cantidad: {item.cantidad} unid.</p>
                                        <p>Sub total: $ {totalCompra}</p>
                                        <p>Total compra: ${totalCompra}</p>

                                    </div>
                                </div>

                                <div className='text-white flex justify-end'>
                                    <p>total a pagar: $ {totalCompra}</p>
                                </div>
                            </div>
                            <div>
                                <Button variant='shadow' color='primary' size='lg' className='text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs px-5 py-4 text-center uppercase mt-3'>
                                    <BsCartCheckFill style={{ fontSize: 25 }} />
                                    Realizar pedido
                                    <BsFillCartXFill />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (

                    <p className='mx-auto mt-3 text-white'>No hay productos en el carrito.
                        <NavLink to={'/'}>
                            <a className='ms-1'>
                                <strong>
                                    Agregue productos
                                </strong>
                            </a>
                        </NavLink>
                    </p>

                )}

            </div>

        </>
    )
}