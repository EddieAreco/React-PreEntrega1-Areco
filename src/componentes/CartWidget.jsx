import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Badge, Dropdown, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useState } from "react";

export default function CartWidget(props){

    const [conteo, setConteo] = useState(0);

    const handleClick = () => {
        setConteo(conteo + 1);
    }

    return(

        <>

        <Badge 
        color="danger" 
        content={conteo} 
        shape="circle"
        placement="bottom-right"
        >
        
        <FaCartShopping 
        style={{ fontSize: 30 }}
        onClick={handleClick}
        role="button"
        />
        
        {props.children}
                
        </Badge>
        
        </>
    )
}