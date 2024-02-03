import React from 'react';
import Estrellas from './Estrellas.jsx';
import '../css/Testimonio.css'

export default function Testimonio(props) {
        return (

            <div className='d-flex justify-content-center bg-white'>

                <div className='contenedor-testimonio flex justify-center align-items-center bg-light w-75'>

                    <img
                        className='imagen-testimonio mx-auto d-block align-items-start'
                        src={`../Testimonio/${props.imagenNombre}.png`} 
                        // ARREGLAR CUESTION DE IMAGEN, USAR REQUIRED PERO NO FUNCIONA, EVALUAR OTRAS OPCIONES O VER DONDE PONER LA IMAGEN PARA QUE FUNCIONE
                        alt={`Foto de ${props.nombre}`}
                    />

                    <div className='contenedor-texto-testimonio p-5'>

                            <Estrellas />
                        
                        <p className='fw-bolder h4 mt-3'>
                            <strong>{props.nombre}</strong>
                        </p>

                        <p className='texto-testimonio fw-bold'> "{props.testimonio}"</p>

                    </div>
                </div>
            </div>
        );
    }