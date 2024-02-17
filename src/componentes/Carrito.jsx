import { useState, useEffect, useContext } from 'react';
import { doc, addDoc, getDocs, collection, getFirestore } from 'firebase/firestore';
import { Loading } from './Loading'
import { Image } from '@nextui-org/react';
import { CartContext } from '../context/cartContext.jsx';

export default function Carrito() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);

    const { totalCompra } = useContext(CartContext)

    useEffect(() => {

        setLoading(true);

        const db = getFirestore();

        const productosOrden = collection(db, 'ordenes')

        getDocs(productosOrden)
            .then(snapshot => {

                const dataExtraida = snapshot.docs.map(datos => datos.data())
                setProducts(dataExtraida);

            })
            .finally(
                setTimeout(() => {
                    setLoading(false);
                }, 4000)
            );

    }, [])

    return loading ? (
        <Loading />

    ) : (
        <>
            <div className='text-white font-bold mt-4 border-2 p-2'>
                <ul className='flex uppercase justify-between mx-auto'>
                    <li className='me-12'>producto</li>
                    <li>precio</li>
                    <li>cantidad</li>
                    <li>subtotal</li>
                    <li>total</li>
                </ul>
            </div>

            <div className='mx-auto mt-3 '>
                {products.map(productos => (

                    <div key={productos.id}>

                        {/* <div className='flex justify-between'>
                            <p className='text-blue-700'>Comprador: {productos.comprador.nombre}</p>
                            <p className='text-blue-700'>Email: {productos.comprador.email}</p>
                            <p className='text-blue-700'>Teléfono: {productos.comprador.telefono}</p>
                        </div> */}

                        <div className='flex justify-between mt-3 border-b-4'>

                            {productos.item ? (

                                <ul className='flex text-white uppercase justify-between items-center w-full mx-auto my-3'>
                                    <li>
                                        <Image
                                            shadow="sm"
                                            radius="sm"
                                            alt={productos.item.nombre}
                                            className="object-cover h-[80px] w-24"
                                            src={productos.item.imagen}
                                        />

                                        {productos.item.nombre}
                                    </li>
                                    <li>
                                        $ {productos.item.precio}
                                    </li>
                                    <li>
                                        {productos.item.cantidad}
                                    </li>
                                    <li>
                                        $ 100
                                    </li>
                                    <li>
                                        { totalCompra }
                                    </li>
                                </ul>
                            ) : (
                                <p>No hay ítems</p>
                            )}

                        </div>

                    </div>

                ))}
            </div>

        </>
    )
}