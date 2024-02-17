import React, { useEffect, useState } from 'react';
import { data } from "../data.js";
import { useParams, Link } from "react-router-dom";
import { Cartas } from './Cartas.jsx';
import { Loading } from './Loading.jsx';

import { getDocs, getFirestore, collection, where, query } from 'firebase/firestore';

export default function ItemContainer() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { producto_id } = useParams();

    useEffect(() => {

        setLoading(true)

        fetch(`https://65bd501ab51f9b29e9334a3e.mockapi.io/bebidas/products/${producto_id}`)
            .then((response) => response.json())
            .then((response_json) => {

                if ('id' in response_json) {
                    setProducts([response_json]);

                }
            })
            .finally(
                setTimeout(() => {
                    setLoading(false);
                }, 3000)
            );
    }, [producto_id]);

    return loading ? (

        <Loading />

    ) : (

        <>
            <h1 className='text-white text-3xl m-5'>Detalle del producto</h1>

            <Link
                className="text-white text-xl font-bold"
                to={`/`}
            >
                Volver
            </Link>

            <div className="flex items-center justify-center w-96 mx-auto">

                <Cartas products={products} descripcion={true} link={false} />

            </div>
        </>

    )

}