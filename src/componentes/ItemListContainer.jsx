import { useState, useEffect } from "react";
import { Cartas } from "./Cartas.jsx";
import { Loading } from './Loading.jsx';
import { Filtros } from "./Filtros.jsx";

import { NavLink, useParams } from 'react-router-dom';

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { getDocs, getFirestore, collection, where, query } from 'firebase/firestore';

export default function ItemListContainer({ searchTerm }) {

    const [filtro, setFiltro] = useState(null);

    const [productos, setProductos] = useState([]);

    const [loading, setLoading] = useState(false);

    const [titulo, setTitulo] = useState("Todos nuestros productos");

    const { producto_categoria } = useParams();

    const eleccionDeFiltro  = (e) => {
        const selectedValue = event.target.value;
        setFiltro(selectedValue);
    };

    const limpiezaDeFiltros = () => {
        setFiltro(null)
    }

    useEffect(() => {

        const db = getFirestore();

        const productsCollection = collection(db, 'Item')

        getDocs(productsCollection)
            .then(snapshot => {

                const dataExtraida = snapshot.docs.map(datos => datos.data())
                setProductos(dataExtraida);

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

            // Filtra los productos según el término de búsqueda
            const productosFiltrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );

            switch (filtro) {
                case "0":
                    productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                    break;
                case "1":
                    productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                    break;
                case "2":
                    productosFiltrados.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
                    break;
                case "3":
                    productosFiltrados.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
                    break;
                default:
                    break;
            }

            setProductos(productosFiltrados);
            setLoading(false);
        };
        obtenerProductos();
    }, [producto_categoria, searchTerm, filtro]);

    return loading ? (
        <Loading />

    ) : (

        <>
            <h1 className="text-white text-5xl my-3">{titulo}</h1>

            <Filtros filtro={ filtro } setFiltro={ setFiltro } limpiarFiltro= {limpiezaDeFiltros}/>

            {producto_categoria &&
                <Breadcrumbs
                    underline="hover"
                    classNames={{ list: "bg-gradient-to-br from-orange-500 to-yellow-500 shadow-small mt-3" }}
                    itemClasses={{
                        item: "text-white/60 data-[current=true]:text-white",
                        separator: "text-white/40",
                    }}
                    variant="solid"
                >
                    <BreadcrumbItem >
                        <NavLink to={"/"}>
                            Productos
                        </NavLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem >
                        Categoria
                    </BreadcrumbItem>

                    <BreadcrumbItem >
                        {producto_categoria}
                    </BreadcrumbItem>
                </Breadcrumbs>
            }

            <div
                className="gap-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-5"
            >

                {
                    productos.map(producto => (
                        <Cartas key={producto.id} products={producto} descripcion={false} link={true} />
                    ))
                }

            </div>
        </>
    )
}