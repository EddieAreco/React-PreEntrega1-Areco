import React, { useState } from "react";
import Cards from "../componentes/Cards.jsx";
import { PruebaCartas } from "./PruebaCartas.jsx";
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
                className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-5"
            >
                {/* <Cards

                    nombre="Fanta"
                    imagenNombre="fantanaranja"
                    precio="20"

                />
                <Cards

                    nombre="Skyy"
                    imagenNombre="skyyanana"
                    precio="50"

                />
                <Cards

                    nombre="Trumpeter"
                    imagenNombre="vinomalbectrumpeter"
                    precio="33"

                />
                <Cards

                    nombre="Andes Roja"
                    imagenNombre="andesroja473"
                    precio="33"

                />

                <Cards

                    nombre="Heineken"
                    imagenNombre="heineken"
                    precio="20"

                />
                <Cards

                    nombre="Quilmes Negra"
                    imagenNombre="quilmesnegra330"
                    precio="50"

                />
                <Cards

                    nombre="Sprite"
                    imagenNombre="spritelimonada"
                    precio="33"

                />
                <Cards

                    nombre="Dada"
                    imagenNombre="vinodadamaracuya"
                    precio="33"

                /> */}

                <PruebaCartas />

            </div>
        </>
    )
}