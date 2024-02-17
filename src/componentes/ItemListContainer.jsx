import React, { useState, useEffect, useContext } from "react";
import { Cartas } from "./Cartas.jsx";
import { NavLink, useParams } from 'react-router-dom';
import { CartContext } from '../context/cartContext.jsx';
import { Loading } from './Loading.jsx';

import { getDocs, getFirestore, collection, where, query } from 'firebase/firestore';

export default function ItemListContainer() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [ categoria, setCategoria ] = useState("todas")

    const [loading, setLoading] = useState(false);

    const { producto_categoria } = useParams();

    const { ejemplo, clear } = useContext(CartContext)

    const [ prueba, setPrueba ]= useState([]);

    useEffect(() => {

        const db = getFirestore();

        const productsCollection = collection(db, 'Item')

        const consulta = query(
            collection (db, "Item"),
            where('precio', '<=', 100)
        )

        getDocs(productsCollection)
            .then (snapshot => {

                const dataExtraida = snapshot.docs.map( datos => datos.data())
                setPrueba( dataExtraida );

            })
            .finally(
                setTimeout(() => {
                    setLoading(false);
                }, 1500)
            );
    }, [])

    useEffect(() => {

        setLoading(true);

        fetch('https://65bd501ab51f9b29e9334a3e.mockapi.io/bebidas/products/')
            .then(response => response.json())
            .then(data => {

                const uniqueCategories = [...new Set(data.map(product => product.categoria))];

                setCategories(uniqueCategories);
                setProducts(data);
                setFilteredProducts(data);

            })
            .finally(
                setTimeout(() => {
                    setLoading(false);
                }, 1500)
            );
    }, []);

    useEffect(() => {
        // console.log(products.filter(product => product.categoria === producto_categoria))

        producto_categoria
            ? setFilteredProducts(products.filter(product => product.categoria === producto_categoria))
            : setFilteredProducts(products);

        setSelectedCategory(producto_categoria);
    }, [producto_categoria])



    useEffect( () => {

        const db = getFirestore();

        var q = ( categoria == "todas" ) ? query ( collection (db, 'Item') ) : query ( collection (db, 'Item'), where ( 'categoria', '==', categoria) );

        getDocs (q)
        .then (snapshot => {

            const dataExtraida = snapshot.docs.map( datos => datos.data())
            setPrueba( dataExtraida );

        })

    }, [ categoria ])
    

    const handleCategory = (event) => {
        setCategoria(event.target.value);
    }

    return loading ? (
        <Loading />

    ) : (

        <>

        <button onClick={ clear } className="text-white">
            limpiar carrito
        </button>

        <select name="categorias" id="categorias" value={ categoria } onChange={ handleCategory }>
            <option value="todas"> Todas </option>
            <option value="aguas"> aguas </option>
            <option value="vinos"> vinos </option>
            <option value="gaseosas"> gaseosas </option>
        </select>
        
        <div
                className="gap-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-5"
            >
        <Cartas products={prueba} descripcion={false} link={true} />
        </div>

            <h1
                className="text-white font-semibold text-3xl mt-3"
            >
                {ejemplo}

            </h1>

            <h3 className="text-white">Categorias de productos</h3>

            <ul className="flex justify-center gap-5">
                {categories.map(category => (
                    <li key={category} className="text-white">
                        <NavLink to={`/productos/categoria/${category}`} >
                            {category}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div
                className="gap-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-5"
            >

                <Cartas products={filteredProducts} descripcion={false} link={true} />

            </div>
        </>
    )
}