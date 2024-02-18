import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Cartas } from './Cartas.jsx';
import { Loading } from './Loading.jsx';

import { getDocs, getFirestore, collection, where, query } from 'firebase/firestore';

export default function ItemContainer() {

    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(false);
    const { producto_id } = useParams();

    useEffect(() => {
        
        console.log(typeof producto_id); 

        const db = getFirestore();

        const consulta = query(
            collection (db, "Item"),
            where('id', '==', producto_id)
        )

        getDocs(consulta)
            .then (snapshot => {

                const dataExtraida = snapshot.docs.map( datos => datos.data())
                setProducts( dataExtraida[0] );
                console.log( "el producto encontrado es:", dataExtraida)

            })
            .finally(
                setTimeout(() => {
                    setLoading(false);
                }, 1500)
            );
    }, [producto_id])

    
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

                {
                    products && <Cartas products={products} descripcion={true} link={false} />
                }

            </div>
        </>

    )

}