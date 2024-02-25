import { createContext, useState, useEffect } from "react";

import { addDoc, getFirestore, collection } from "firebase/firestore";

export const CartContext = createContext()

//ESTE COMPONENTE ES UN PROVEEDOR DE CONTEXTO PARA MANEJAR EL ESTADO DEL CARRITO DE COMPRAS. USA EL CONTEXTO DE REACT PARA PROPORCIONAR FUNCIONAR Y DATOS RELACIONES ENTRE CARRITO Y LOS COMPONENTES HIJOS
export const CartProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);

    //FUNCION PARA CALCULAR EL SUB TOTAL EN BASE AL PRECIO Y CANTIDAD DEL PRODUCTO
    const calcularSubtotal = (precio, cantidad) => {
        return precio * cantidad;
    };

    //FUNCION PARA CALCULAR EL TOTAL DE LA COMPRA USANDO LA FUNCION REDUCE
    const calcularTotal = (carrito) => {
        let total = carrito.reduce((total, product) => total + product.precio * product.cantidad, 0);
        return total;
    }

    //ESTA FUNCION SE USA PARA AGREGAR EL PRODUCTO AL CARRITO. SI YA ESTA EN EL MISMO, SÓLO SE ACTUALIZA LA CANTIDAD, CASO CONTRARIO, DEBE AGREGARLO, SI SE AGREGA UN NUEVO PRODUCTO, EL TOTAL SE DEBE RE CALCULAR PARA TOMAR UN NUEVO VALOR
    const handleAdd = async (item, quantity) => {

        if (isInCart(item)) {

            const sumarCantidad = carrito.map((itemEnCarrito) =>

            //SI EL ID DEL ITEM AGREGADO COINCIDE CON EL ID DEL ITEM QUE YA ESTA EN EL CARRITO, TRAIGO TODO LOS ATRIBUTOS DE itemEnCarrito Y AL ATRIBUTO CANTIDAD, LE DEFINO DE NUEVO EL VALOR PARA QUE SEA LA CANTIDAD QUE QUIERE COMPRAR EL USUARIO 
                itemEnCarrito.id === item.id ? { ...itemEnCarrito, cantidad: quantity } : itemEnCarrito)

            setCarrito(sumarCantidad);

        } else {

            setCarrito([...carrito, { ...item, cantidad: quantity }]);

        }

        setCarrito((prevCarrito) => {
            const total = calcularTotal(prevCarrito);
            setTotalCompra(total);
            return prevCarrito;
        });
    };

    //FUNCIÓN PARA AGREGAR LOS PRODUCTOS QUE EL USUARIO SE DECIDE A COMPRAR, A UNA COLECCIÓN QUE SE ENCUENTRA EN FIRESTORE QUE SE LLAMA ordenes. DICHO PEDIDO, SE AGREGA COMO UN OBJETO YA QUE SINO, AL HABER MAS DE 1 PRODUCTO COMPRADO, SE CREABAN 2 ÓRDENES DE COMPRA
    const agregarEnFirestore = async () => {
        //OBTIENE LA INSTANCIA DE FIRESTORE
        const db = getFirestore();

        //OBTIENE LA COLECCIÓN DE "ORDENES" DE FIRESTORE
        const ordenesCollection = collection(db, 'ordenes');

        //CONSTRUYO EL OBJETO DE PEDIDO QUE CONTIENE TODOS LOS PRODUCTOS DE CARRITO
        const pedido = {
            productos: carrito.map(item => {
                const { cantidad, ...producto } = item; 
                return { producto, cantidad }; 
            })
        };

        //AQUI AGREGO EL PEDIDO A FIRESTORE
        await addDoc(ordenesCollection, pedido);
    };

    //FUNCIÓN QUE USO PARA REMOVER 1 PRODUCTO
    const removeItem = (itemId) => {
        // BUSCA EL PRODUCTO A ELIMINAR EN BASE AL ID
        const productoAEliminar = carrito.find(item => item.id === itemId);

        // CALCULO DE NUEVO EL SUB TOTAL DEL PRODUCTO QUE SE ELIMINAR PARA LUEGO DESCONTARLO DEL TOTAL
        const subtotalProductoAEliminar = calcularSubtotal(productoAEliminar.precio, productoAEliminar.cantidad);

        // FILTRO EL CARRITO PARA QUE QUEDEN SOLAMENTE LOS PRODUCTOS QUE NO COINCIDAN CON EL ID DEL PRODUCTO ELIMINADO
        const nuevoCarrito = carrito.filter(item => item.id !== itemId);

        // CALCULO EL TOTAL DE NUEVO, DESCONTANDO DEL MISMO, EL SUB TOTAL OBTENIDO ANTES
        const nuevoTotalCompra = totalCompra - subtotalProductoAEliminar;

        // ACTUALIZO EL TOTAL Y EL CARRITO
        setCarrito(nuevoCarrito);
        setTotalCompra(nuevoTotalCompra);
    };

    //FUNCIÓN PARA VACIAR TOTALMENTE EL CARRITO DEVOLVIENDO UN ARRAY VACÍO
    const clear = () => {

        if (carrito.length > 0) {
            const carritoVacio = [];
            setCarrito(carritoVacio);
            setTotalCompra(0);
        }
    }

    const isInCart = (item) => {
        return carrito.some((items) => items.id === item.id);

    }

    const cantidadComprada = () => {
        return carrito.length;
    };

    //ESTE USE EFFECT LO USO COMO CONTROLADOR PARA VERIFICAR EL ESTADO DE CARRITO CADA VEZ QUE EL MISMO SE MODIFICA
    useEffect(() => {
        console.log(carrito);
    }, [carrito])

    //CREO UN OBJETO QUE VA A CONTENER TODOS LOS VALORES Y FUNCIONES QUE LUEGO SERÁN PROPORCIONADAS AL CONTEXTO 
    const contextValues = {
        carrito,
        handleAdd,
        cantidadComprada,
        removeItem,
        clear,
        totalCompra,
        calcularSubtotal,
        calcularTotal,
        agregarEnFirestore,
    }

    return (

        <CartContext.Provider value={contextValues} >

            {children}

        </CartContext.Provider>
    );

}