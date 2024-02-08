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

    return (

        <>
            <h1 className='text-white text-3xl m-5'>Detalle del producto</h1>

<Link 
className="text-white text-xl font-bold"
to={`/`}
>
  Volver
  </Link>

                <div className="flex items-center justify-center">
                    
                    <Cartas products= {products} descripcion={true} link={false}/>

                </div>
        </>

    )

}