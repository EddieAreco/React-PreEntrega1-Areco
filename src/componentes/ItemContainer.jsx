import { useEffect, useState } from 'react';
import { Cartapadre } from './Cartapadre.jsx';
import { Loading } from './Loading.jsx';

import { useParams, Link } from "react-router-dom";

import { getDocs, getFirestore, collection, where, query } from 'firebase/firestore';

//ESTE COMPONENTE ES EL QUE SE VA A UTILIZAR PARA MOSTRAR 1 SOLA TARJETA DE PRODUCTO CON LA INFORMACION COMPLETA DEL MISMO
export default function ItemContainer() {

    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(false);

    //SE UTILIZA EL USE PARAMS PARA PODER REDIRIGIR AL USUARIO A UN NUEVO ENLACE DONDE APAREZCA EL ID DEL PRODUCTO Y SOLO SE MUESTRE AQUEL CON TENGA UN ID QUE COINCIDA CON CON EL USE PARAMS
    const { producto_id } = useParams();

    //EN ESTE USE EFFECT, LO QUE BUSCO ES QUE SE HAGA UNA SOLICITUD PARA UNA LECTURA DE LA COLECCION LLAMADA ITEM QUE SE ENCUENTRA EN FIREBASE A TRAVES DE LA INSTANCIA getFirestore
    useEffect(() => {

        const db = getFirestore();

        const consulta = query(
            collection(db, "Item"),
            where('id', '==', producto_id)
        )
        //REALIZO UNA CONSULTA A TRAVES DE LA KEY QUERY PARA LUEGO PASAR LOS PARAMETRO DENTRO DE LA KEY WHERE. BUSCO QUE LA CONSULTA SE BASE EN RELACION AL ID DEL PRODUCTO QUE SEA EXACTAMENTE IGUAL AL PARAMETRO PRODUCT_ID

        getDocs(consulta)
            .then(snapshot => {

                const dataExtraida = snapshot.docs.map(datos => datos.data())
                //EN BASE AL PRODUCTO QUE SE HAYA ENCONTRADO QUE SEA COINCIDENTE EN ID CON PRODUCT_ID, SE GUARDA EN LA VARIABLE dataExtraida Y DE LA MISMA VAMOS A PEDIR EL PRIMER ELEMENTO Y SE LO VAMOS A ASIGNAR AL ESTADO PRODUCT
                setProducts(dataExtraida[0]);
                console.log("el producto encontrado es:", dataExtraida)

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

                {/* LUEGO, EN EL CASO QUE PRODUCTS SEA TRUE, SE VA A LLAMAR AL COMPONENTE CARTAPADRE PARA QUE MUESTRE EL PRODUCTO ENCONTRADO EN BASE AL ID QUE HAYA COINCIDIDO CON PRODUCT_ID */}
                {
                    products && <Cartapadre products={products} descripcion={true} link={false} />
                }

            </div>
        </>

    )

}