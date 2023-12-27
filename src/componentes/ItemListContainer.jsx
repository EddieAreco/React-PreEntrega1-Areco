import React from "react";
import Cards from "../componentes/Cards.jsx";

export default function ItemListContainer() {
    return (
        <>

            <div
                className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-5"
            >
                <Cards

                    nombre="Fanta"
                    imagenNombre="../imagenes/fantanaranja.jpg"
                    precio="20"

                />
                <Cards

                    nombre="Skyy"
                    imagenNombre="../imagenes/skyyanana.jpg"
                    precio="50"

                />
                <Cards

                    nombre="Trumpeter"
                    imagenNombre="../imagenes/vinomalbectrumpeter.jpg"
                    precio="33"

                />
                <Cards

                    nombre="Trumpeter"
                    imagenNombre="../imagenes/vinomalbectrumpeter.jpg"
                    precio="33"

                />

                <Cards

                    nombre="Fanta"
                    imagenNombre="../imagenes/fantanaranja.jpg"
                    precio="20"

                />
                <Cards

                    nombre="Skyy"
                    imagenNombre="../imagenes/skyyanana.jpg"
                    precio="50"

                />
                <Cards

                    nombre="Trumpeter"
                    imagenNombre="../imagenes/vinomalbectrumpeter.jpg"
                    precio="33"

                />
                <Cards

                    nombre="Trumpeter"
                    imagenNombre="../imagenes/vinomalbectrumpeter.jpg"
                    precio="33"

                />

            </div>
        </>
    )
}