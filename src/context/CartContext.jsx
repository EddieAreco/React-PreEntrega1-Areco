import { addDoc, getFirestore, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useState, useEffect, useReducer } from "react";
import { CartReducer, sumItems } from './cartReducer';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);

    const handleAdd = async (item, quantity) => {

        if (isInCart(item)) {

            const sumarCantidad = carrito.map((itemEnCarrito) =>
                itemEnCarrito.id === item.id ? { ...itemEnCarrito, cantidad: quantity } : itemEnCarrito)

            setCarrito(sumarCantidad);

        } else {

            setCarrito([...carrito, { ...item, cantidad: quantity }]);

        }

        const subtotal = item.precio * quantity;
        setTotalCompra(totalCompra + subtotal);

        const db = getFirestore();
        const ordenesCollection = collection(db, 'ordenes');

        const querySnapshot = await getDocs(ordenesCollection);
        const existingProduct = querySnapshot.docs.find((doc) => doc.data().item.id === item.id);

        if (existingProduct) {
            // Si el producto ya existe, actualiza el campo de cantidad
            const docRef = doc(db, 'ordenes', existingProduct.id);
            const existingQuantity = existingProduct.data().item.cantidad;
            const updatedQuantity = existingQuantity - existingQuantity + quantity;
            await updateDoc(docRef, { 'item.cantidad': updatedQuantity });
        } else {
            // Si el producto no existe, agrégalo a Firestore
            item.cantidad += quantity;
            await addDoc(ordenesCollection, { item: { ...item, cantidad: quantity } });
            
        }

        // addDoc(ordenesCollection, { item, cantidad: quantity })
        //     .then(() => console.log('Producto agregado a Firestore'))
        //     .catch((error) => console.error('Error al agregar producto a Firestore:', error));
        //CREO QUE EN ESTA FUNCION DEBERIA LOGRAR QUE AL SUMAR AL HACER CLICK SOBRE "AGREGAR CARRITO", NO SOLO SE SUME AL CARRO SINO QUE TAMBIEN SE AGREGUE A LA LISTA DE ORDENES DE MI FIREBASE, TAL VEZ DEBA USAR AQUI DENTRO LO SIGUIENTE:

        // const db = getFirestore();
        // const agregarDentroDeOrdenes = collection (db, 'ordenes')

        // addDoc( agregarDentroDeOrdenes, item)
        // .then ( ( {id} ) => setCarrito( [...carrito, {item, cantidad: quantity} ]) )
    };

    const actualizarCantidadCarrito = (item, quantity) => {
        const renuevoCarrito = carrito.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, cantidad: cartItem.cantidad + quantity } : cartItem
        );
        setCarrito(renuevoCarrito);
    };

    const agregarEnFirestore = async (item, quantity) => {
        setCarrito([...carrito, { ...item, cantidad: quantity }]);
    
        const db = getFirestore();
        const ordenesCollection = collection(db, 'ordenes');
        await addDoc(ordenesCollection, { item, cantidad: quantity });
    };

    const removeItem = (itemId) => { };

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

    return (

        <CartContext.Provider value={{
            carrito,
            setCarrito,
            handleAdd,
            cantidadComprada,
            clear,
            totalCompra 
        }} >

            {children}

        </CartContext.Provider>
    );

}