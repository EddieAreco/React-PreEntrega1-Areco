import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";

export default function CartWidget(){

    const [conteo, setConteo] = useState(0);

    const handleClick = () => {
        setConteo(conteo + 1);
    }

    return(

        <>
        
        <FaCartShopping 
        style={{ fontSize: 30 }}
        onClick={handleClick}
        role="button"
        />

        <p>{conteo}</p>
        
        </>
    )
}