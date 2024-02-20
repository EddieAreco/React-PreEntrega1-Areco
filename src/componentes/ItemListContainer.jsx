import React, { useState, useEffect, useContext } from "react";
import { Cartas } from "./Cartas.jsx";
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/cartContext.jsx';
import { Loading } from './Loading.jsx';

import { getDocs, getFirestore, collection, where, query } from 'firebase/firestore';

export default function ItemListContainer() {

    const [productos, setProductos] = useState([]);

    const [loading, setLoading] = useState(false);

    const [titulo, setTitulo] = useState("Todos nuestros productos");

    const { producto_categoria } = useParams();

    useEffect(() => {

        const db = getFirestore();

        const productsCollection = collection(db, 'Item')

        getDocs(productsCollection)
            .then (snapshot => {

                const dataExtraida = snapshot.docs.map( datos => datos.data())
                setProductos( dataExtraida );

            })
            .finally(
                setTimeout(() => {
                    setLoading(false);
                }, 1500)
            );
    }, [])
    

    useEffect(() => {
        setLoading(true);
        const obtenerProductos = async () => {
            const db = getFirestore();
            let q = collection(db, 'Item');;
            
            if (!producto_categoria || producto_categoria === "todas") {
                q = collection(db, 'Item');
                setTitulo("Todos nuestros productos")
            } else {
                q = query(collection(db, 'Item'), where('categoria', '==', producto_categoria));
                setTitulo(`Productos de la categoría ${producto_categoria}`);
            }
            
            const snapshot = await getDocs(q);
            const productos = snapshot.docs.map(doc => doc.data());
            setProductos(productos);
            setLoading(false);
        };
        obtenerProductos();
    }, [producto_categoria]);
    
    
    return loading ? (
        <Loading />

    ) : (

        <>
        <h1 className="text-white text-5xl my-3">{ titulo }</h1>

        <div
                className="gap-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-5"
            >
                
        {
            productos.map( producto => (
                 <Cartas key= {producto.id} products={producto} descripcion={false} link={true} />
            )) 
        }

        </div>
        </>
    )
}