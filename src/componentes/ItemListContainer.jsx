import React, { useState, useEffect } from "react";
import { Cartas } from "./Cartas.jsx";
import { data } from "../data.js";
import { NavLink, useParams } from 'react-router-dom'

export default function ItemListContainer() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const { producto_categoria } = useParams();

    useEffect(() => {
        
        fetch('https://65bd501ab51f9b29e9334a3e.mockapi.io/bebidas/products/')
            .then(response => response.json())
            .then(data => {

                const uniqueCategories = [...new Set(data.map(product => product.categoria))];

                setCategories(uniqueCategories);
                setProducts(data);
                setFilteredProducts(data); 

            });
    }, []);

     useEffect(() => {
         console.log ( products.filter(product => product.categoria === producto_categoria) )

         producto_categoria
         ? setFilteredProducts( products.filter(product => product.categoria === producto_categoria) )
         : setFilteredProducts ( products );

         setSelectedCategory( producto_categoria );
     }, [producto_categoria])

    return (
        <>

            <h1
                className="text-white font-semibold text-3xl"
            >
                Nuestros productos

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

                <Cartas products={filteredProducts} descripcion={false} link={true}/>

            </div>
        </>
    )
}