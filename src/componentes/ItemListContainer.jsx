import React, { useState } from "react";
import { Cartas } from "./Cartas.jsx";
import { data } from "../data.js";

export default function ItemListContainer() {

    return (
        <>

            <h1
                className="text-white font-semibold text-3xl"
            >
                Nuestros productos

            </h1>

            <ul>
                <li>
                    {data.map(producto =>
                        <button 
                        className="text-white m-1"
                        >{producto.categoria}</button>
                    )}
                </li>
            </ul>

            <div
                className="gap-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-5"
            >

                <Cartas />

            </div>
        </>
    )
}