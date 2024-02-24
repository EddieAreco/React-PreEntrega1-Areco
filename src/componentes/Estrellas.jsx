import React, { useState } from 'react';

import { BsFillStarFill, BsStar } from 'react-icons/bs';

//ESTE COMPONENTE SIRVE COMO UN CALIFICADOR DE PARTE DEL USUARIO EN EL CUAL, TAMBIEN SE VA A MOSTRAR EL PUNTAJE NUMERICO, ADEMAS DE HACERLO A TRAVES DE ESTRELLAS
function Estrellas() {

    //DEFINO EL ESTADO STAR QUE VOY A USAR COMO PARAMETRO
    const [star, setStar] = useState(null);

    //Busco que al hacer click, se haga un recorrirdo del array para ver si la posicion ya tiene una estrella vacia, si ya la tiene y hago click, que coloque una estrella llena, si ya tiene una estrella llena, que no haga nada

    return (
        <div>


<p className='fw-bolder'>Calificación :</p>

        <div className='flex justify-center align-center w-1/2 mx-auto'>

                {/* //GENERO UN ARRAY DE 5 POSICIONES QUE VAN A SER LA CANTIDAD DE ESTRELLAS */}
                {[...Array(5)].map((rating, index)=> {

                    //DEFINO UNA VARIABLE QUE VA A SER EL VALOR PARA CADA ESTRELLA
                    const number = index + 1;

                    return(
                        <label className='w-24 flex justify-center m-2'>
                            <input 
                            className= "hidden w-24"
                            name='star'
                            value= {number} 

                            //EN LA FUNCION DEFINO QUE LA FUNCION SETSTAR TOME EL VALOR DE LA VARIABLE NUMBER CADA QUE SE HAGA CLICK SOBRE EL INPUT
                            onClick={() => setStar(number)} 
                            />

                            <span key={index} className='text-warning h3'>

                            {/* //AL HACER CLICK SE VA A HACER UN RECORRIDO PARA VER SI LA POSICION YA TIENE UNA ESTRELLA VACIA, SI YA LA TIENE Y HAGO CLICK, LA VA A REEMPLAZAR POR UNA ESTRELLA LLENA, SI NO, NO */}
                            {star >= index +1 ? (<BsFillStarFill role="button" />) 
                            :
                            (<BsStar role="button" />
                            )}
                            
                            </span>
                        </label>
                    ); 
                })}
                </div>

                {/* //AQUI SE VERA REFLEJADO NUMERICAMENTE EL VALOR DEL ESTADO STAR */}
                <p className='fw-bolder mt-1'>Tu puntuacion es: {star}</p>
        </div>
    );
};

export default Estrellas;