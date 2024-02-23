import { addDoc, getFirestore, collection } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);

    const [cartItems, setCartItems] = useState([]);

    // const incrementarCantidad = (productId) => {
    //     setCartItems(prevCartItems => {
    //         return prevCartItems.map(item => {
    //             if (item.id === productId && item.quantity < item.stock) {
    //                 return { ...item, quantity: item.quantity + 1 };
    //             }
    //             return item;
    //         });
    //     });
    // };

    // const disminuirCantidad = (productId) => {
    //     setCartItems(prevCartItems => {
    //         return prevCartItems.map(item => {
    //             if (item.id === productId && item.quantity > 0) {
    //                 return { ...item, quantity: item.quantity - 1 };
    //             }
    //             return item;
    //         });
    //     });
    // };

    const calcularSubtotal = (precio, cantidad) => {
        return precio * cantidad;
    };

    const calcularTotal = (carrito) => {
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
    };

    // Operaciones relacionadas con Firebase Firestore
    const agregarEnFirestore = async () => {
        // Obtiene la instancia de Firestore
        const db = getFirestore();

        // Obtiene la colección de "ordenes" en Firestore
        const ordenesCollection = collection(db, 'ordenes');

        // Itera sobre cada elemento del carrito
        // Construye el objeto de pedido que contiene todos los productos del carrito
        const pedido = {
            productos: carrito.map(item => {
                const { cantidad, ...producto } = item; // Elimina la propiedad "cantidad" del producto
                return { producto, cantidad }; // Retorna el producto y su cantidad como un objeto
            })
        };

        // Agrega el pedido completo a la colección "ordenes" en Firestore
        await addDoc(ordenesCollection, pedido);
    };

    const removeItem = (itemId) => {
        // Encuentra el producto que se va a eliminar
        const productoAEliminar = carrito.find(item => item.id === itemId);

        // Calcula el subtotal del producto que se va a eliminar
        const subtotalProductoAEliminar = calcularSubtotal(productoAEliminar.precio, productoAEliminar.cantidad);

        // Filtra el carrito para eliminar el producto
        const nuevoCarrito = carrito.filter(item => item.id !== itemId);

        // Calcula el nuevo total de la compra restando el subtotal del producto eliminado
        const nuevoTotalCompra = totalCompra - subtotalProductoAEliminar;

        // Actualiza el estado del carrito y el total de la compra
        setCarrito(nuevoCarrito);
        setTotalCompra(nuevoTotalCompra);
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
        handleAdd,
        cantidadComprada,
        removeItem,
        clear,
        totalCompra,
        calcularSubtotal,
        calcularTotal,
        agregarEnFirestore,
        // incrementarCantidad,
        // disminuirCantidad,
    }

    return (

        <CartContext.Provider value={contextValues} >

            {children}

        </CartContext.Provider>
    );

}