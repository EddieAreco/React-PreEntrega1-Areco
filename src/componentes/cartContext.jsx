import React, { createContext, useState } from "react";

export const Contexto = createContext([])

export const CartProvider = ( { children }) =>{

    const [carrito, setCarrito] = useState();

    const ejemplo = "Mi carrito"

    const handleAdd = (item, quantity) => {
        setCarrito( [ ...carrito, { ...item, cantidad:quantity } ] );
    };

    useEffect( () =>{
        console.log(carrito);
    }, [carrito])

    return <Contexto.Provider value ={{ ejemplo, carrito, setCarrito, handleAdd }}>

{children}

    </Contexto.Provider>

}