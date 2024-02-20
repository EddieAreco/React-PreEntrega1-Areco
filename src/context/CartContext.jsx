import { addDoc, getFirestore, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useState, useEffect, useReducer } from "react";
import { CartReducer, sumItems } from './cartReducer';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);

    const calcularSubtotal = (precio, cantidad) => {
        return precio * cantidad;
    };

    const calcularTotal = ( carrito ) => {
        let total = carrito.reduce((total, product) => total + product.precio * product.cantidad, 0);
        return total; 
    }

    const handleAdd = async (item, quantity) => {
        const subtotal = calcularSubtotal(item.precio, quantity);

        if (isInCart(item)) {

            const sumarCantidad = carrito.map((itemEnCarrito) =>
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

        // ESTO ESTA AGREGANDO PRODUCTOS AGREGADOS AL CARRITO, A LA COLECCION DE FIRESTONE LLAMADA "ORDENES", CHATGPT, SI VES LAS LINEAS SIGUIENTES QUE TENGO COMENTADAS EN MI CODIGO, IGNORALAS POR FAVR Y SOLO CONCENTRATE EN EL RESTO DEL CODIGO
        // const db = getFirestore();
        // const ordenesCollection = collection(db, 'ordenes');

        // const querySnapshot = await getDocs(ordenesCollection);
        // const existingProduct = querySnapshot.docs.find((doc) => doc.data().item.id === item.id);

        // if (existingProduct) {
        //     // Si el producto ya existe, actualiza el campo de cantidad
        //     const docRef = doc(db, 'ordenes', existingProduct.id);
        //     const existingQuantity = existingProduct.data().item.cantidad;
        //     const updatedQuantity = existingQuantity - existingQuantity + quantity;
        //     await updateDoc(docRef, { 'item.cantidad': updatedQuantity });
        // } else {
        //     // Si el producto no existe, agrégalo a Firestore
        //     item.cantidad += quantity;
        //     await addDoc(ordenesCollection, { item: { ...item, cantidad: quantity } });

        // }
    };

    const actualizarCantidadItemCarrito = (item, quantity) => {
        const renuevoCarrito = carrito.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, cantidad: cartItem.cantidad + quantity } : cartItem
        );
        setCarrito(renuevoCarrito);
    };

    // Operaciones relacionadas con Firebase Firestore
    const agregarEnFirestore = async (item, quantity) => {
        // Agrega el item al carrito en Firestore
        setCarrito([...carrito, { ...item, cantidad: quantity }]);

        // Obtiene la instancia de Firestore
        const db = getFirestore();

        // Obtiene la colección de "ordenes" en Firestore
        const ordenesCollection = collection(db, 'ordenes');

        // Agrega el item y su cantidad a la colección de "ordenes" en Firestore
        await addDoc(ordenesCollection, { item, cantidad: quantity });
    };

    const removeItem = (itemId) => {
        const extraerProductoCarrito = carrito.filter(item => item.id !== itemId);

        const nuevoTotal = calcularSubtotal(extraerProductoCarrito);

        setCarrito(extraerProductoCarrito);
        setTotalCompra(nuevoTotal)
    };

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

    useEffect(() => {
        console.log(carrito);
    }, [carrito])

    const contextValues = {
        carrito,
        setCarrito,
        handleAdd,
        cantidadComprada,
        removeItem,
        clear,
        totalCompra,
        calcularSubtotal,
        calcularTotal,
    }

    return (

        <CartContext.Provider value={contextValues} >

            {children}

        </CartContext.Provider>
    );

}