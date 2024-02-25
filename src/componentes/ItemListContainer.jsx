import { useState, useEffect } from "react";
import { Cartapadre } from './Cartapadre';
import { Loading } from './Loading.jsx';
import { Filtros } from "./Filtros.jsx";

import { NavLink, useParams } from 'react-router-dom';

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { getDocs, getFirestore, collection, where, query } from 'firebase/firestore';

//ESTE COMPONENTE TIENE LA LISTA DE PRODUCTOS Y UN FILTRO PARA QUE EL USUARIO PUEDA ORDENAR LOS PRODUCTOS SEGUN 4 CRITERIOS Y A TRAVES DE LA PROP searchTerm PUEDA BUSCAR PRODUCTOS
export default function ItemListContainer({ searchTerm }) {

    //ESTE ESTADO SE VA A USAR PARA FILTRAR LOS PRODUCTOS SEGUN 4 CRITERIOS
    const [filtro, setFiltro] = useState(null);

    //ESTE ESTADO VA A ALMACENAR LOS PRODUCTOS QUE TRAIGAMOS DE FIREBASE
    const [productos, setProductos] = useState([]);

    //USO ESTE ESTADO PARA QUE APAREZCA SI LA PAGINA ESTA CARGANDO
    const [loading, setLoading] = useState(false);

    //USO ESTE ESTADO PARA MODIFICAR EL TITULO PRINCIPAL
    const [titulo, setTitulo] = useState("Todos nuestros productos");

    //PARAMETRO PARA LA URL QUE VOY A USAR PARA MOSTRAR LA CATEGORIA SELECCIONADA
    const { producto_categoria } = useParams();

    //ESTA FUNCIÓN VA A TOMAR EL CRITERIO DE FILTRADO ELEGIDO POR EL USUARIO Y LO VA A GUARDAR EN LA VARIABLE selectedValue PARA MODIFICAR EL VALOR DE filtro
    const eleccionDeFiltro = (e) => {
        const selectedValue = event.target.value;
        setFiltro(selectedValue);
    };

    //ESTA FUNCIÓN TIENE EL PROPOSITO DE MODIFICAR EL VALOR DE filtro PARA RE ESTABLECERLO POR DEFECTO PARA QUE SE MUESTREN TODOS LO PRODUCTOS DE NUEVO SIN NINGUN FILTRADO, A ESTA FUNCIÓN LUEGO SE LA VA USAR PARA DEFINIR LA PROP limpiarFiltro DEL COMPONENTE FILTROS
    const limpiezaDeFiltros = () => {
        setFiltro(null)
    }

    //ESTE USE EFFECT VA A HACER EL LLAMADO PARA OBTENER TODOS LOS PRODUCTOS DE LA COLECCION ITEM DE LA BASE DE DATOS DE FIREBASE Y LO GUARDO DENTRO DEL ESTADO products
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


    //ESTE USE EFFECT ES EL QUE VA A MANEJAR LA LOGICA PARA EL FILTRADO, LA BUSQUEDA Y LA CATEGORIZACION DE LOS PRODUCTOS
    useEffect(() => {
        setLoading(true);
        const obtenerProductos = async () => {

            const db = getFirestore();
            let q = collection(db, 'Item');
            //AQUI HAGO EL LLAMADO A TRAVES DE getFirestore Y LUEGO ALMACENO LA INFORMACION A TRAVES DE LA KEY collection, EN LA VARIABLE q, LA CUAL SE VA USAR POSTERIORMENTE PARA APLICAR SEGMENTACION

            //SI LA CATEGORIA DE PRODUCTOS NO ESTA DEFINIDA, LA VARIABLE q VA A SEGUIR TENIENDO EL VALOR DE LA COLECCION Y EL ESTADO DEL TITULO PRINCIPAL SE MANTIENE COMO ESTABA PRE DEFINIDO, SI SE DEFINE LA CATEGORIA, EL VALOR DE q SE MODIFICA PARA QUE TOME LOS PRODUCTOS QUE EN SU CATEGORIA, COINCIDAN CON EL PARAMETRO producto_categoria Y ADEMAS MODIFICO EL ESTADO DE titulo  
            if (!producto_categoria || producto_categoria === "todas") {
                setTitulo("Todos nuestros productos")
            } else {
                q = query(collection(db, 'Item'), where('categoria', '==', producto_categoria));
                setTitulo(`Productos de la categoría ${producto_categoria}`);
            }

            const snapshot = await getDocs(q);
            const productos = snapshot.docs.map(doc => doc.data());

            // AQUI SE BUSCAN LOS PRODUCTOS SEGUN EL VALOR QUE ESTE ALMACENADO EN searchTerm
            const productosFiltrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );

            //AQUI SE FILTRAN LOS PRODUCTOS SEGÚN EL TÉRMINO DE BÚSQUEDA ELEGIDO POR EL USUARIO, UTILIZANDO LA VARIABLE productosFiltrados, LOGRO QUE INCLUSO SI EL CLIENTE ESTA POSICIONADO SOBRE UNA CATEGORIA, EL FILTRO SE APLIQUE SOBRE LOS MISMOS, EN LUGAR DE USAR q YA QUE SE MOSTRARIAN TODOS LOS PRODUCTOS, CUANDO EL USUARIO MUCHAS VECES NO BUSCA ESO, POR ENDE, CREO QUE ESTO ES MAS EFICIENTE
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

            {/* //COMPONENTE PARA FILTRAR */}
            <Filtros filtro={filtro} setFiltro={setFiltro} limpiarFiltro={limpiezaDeFiltros} />

            {/* //SI LA CATEGORIA SE DEFINE, SE ACTIVA UN ELEMENTO DENOMINADO "MIGAJAS" PARA ORIENTAR AL USUARIO, DENTRO DEL MISMO, APLICO UN ENLACE POR SI QUIERE REGRESAR AL INICIO */}
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
                        <Cartapadre key={producto.id} products={producto} descripcion={false} link={true} />
                    ))
                }

            </div>
        </>
    )
}