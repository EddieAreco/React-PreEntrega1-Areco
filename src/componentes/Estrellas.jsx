import React from 'react';
import { useState } from 'react';
import { FaStarHalfAlt } from 'react-icons/fa';
import { BsFillStarFill, BsStar } from 'react-icons/bs';

function Estrellas() {

    const [star, setStar] = useState(null);

    //Busco que al hacer click, se haga un recorrirdo del array para ver si la posicion ya tiene una estrella vacia, si ya la tiene y hago click, que coloque una estrella llena, si ya tiene una estrella llena, que no haga nada

    return (
        <div>

        <p className='fw-bolder'>Calificación :</p>

        <div className='flex justify-center'>
                {[...Array(5)].map((rating, index)=> {
                    const number = index + 1;
                    return(
                        <label>
                            <input 
                            className= "d-none"
                            name='star'
                            value= {number} 
                            onClick={() => setStar(number)} 
                            />

                            <span key={index} className='estrellas text-warning h3 ms-1'>

                            {star >= index +1 ? (<BsFillStarFill role="button" />) 
                            :
                            (<BsStar role="button" />
                            )}
                            
                            </span>
                        </label>
                    ); 
                })}
                </div>

                <p className='fw-bolder mt-1'>Tu puntuacion es: {star}</p>
        </div>
    );
};

export default Estrellas;