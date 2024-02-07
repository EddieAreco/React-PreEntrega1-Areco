import React, { useEffect, useState } from 'react';
import { data } from "../data.js";
import { useParams, Link } from "react-router-dom";
import { Cartas } from './Cartas.jsx';

export default function ItemContainer() {

    const [products, setProducts] = useState([])
    const { producto_id } = useParams();

    useEffect(() => {

        fetch(`https://65bd501ab51f9b29e9334a3e.mockapi.io/bebidas/products/${producto_id}`)
            .then((response) => response.json())
            .then((response_json) => {

                if ('id' in response_json) {
                    setProducts([response_json]);

                }
            });

    }, [producto_id]);

    // const [sinStock, setSinStock] = useState(false);

    // const [error, setError] = useState({});

    // function handlerQuantity(productId, newQuantity) {

    //     // Busco el producto en base al ID
    //     const productosPorId = products.find((prod) => prod.id === productId);

    //     // Verifico si existe el producto que busque por el id
    //     if (!productosPorId) {
    //         setError(true);
    //         return;
    //     }

    //     // Verifico si la nueva cantidad es válida en términos de stock y mayor que cero
    //     if (newQuantity <= productosPorId.stock && newQuantity >= 0) {

    //         // Actualizo la cantidad del producto en el estado
    //         const actualizacionProductos = products.map((prod) =>
    //             prod.id === productId ? { ...prod, cantidad: newQuantity } : prod
    //         );

    //         // Actualizo el valor del estado de products que seria la informacion traida de data, con los productos actualizados
    //         setProducts(actualizacionProductos);

    //         // Quito el mensaje de error una vez que la cantidad sea menor al stock
    //         setSinStock((prevSinStock) => ({ ...prevSinStock, [productId]: false }));

    //     } else {

    //         // Muestro mensaje de error si la cantidad no es válida
    //         setSinStock((prevSinStock) => ({ ...prevSinStock, [productId]: true }));
    //     }
    // }

    return (

        <>

            <h1 className='text-white text-5xl m-5'>Detalle del producto</h1>

                <div className="flex items-center justify-center">
                    
                    <Cartas products= {products}>
                    <Link className="text-blue-600/75 text-xl font-bold"
          to={`/`}
          >
            Volver
            </Link>
                        </Cartas>

                </div>
        </>

    )

}