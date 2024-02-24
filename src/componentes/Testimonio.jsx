import Estrellas from './Estrellas.jsx';

import { Image } from "@nextui-org/react";

//ESTE COMPONENTE CONTIENE EL TESTIMONIO DE CADA USUARIO, EL CUAL TIENE LA FOTO DE PERFIL, EL NOMBRE Y APELLIDO Y SU OPINION, ADEMAS TIENE UN CALIFICADOR DE ESTRELLAS QUE LO PUEDE HACER CADA USUARIO
export default function Testimonio(props) {
        return (

                <div className='m-4 mx-auto flex justify-center items-center rounded-xl bg-white w-5/6'>

                    <Image
                        className='size-60'
                        isZoomed
                        src={`../../public/Testimonio/${props.imagenNombre}.png`} 
                        alt={`Foto de ${props.nombre}`}
                    />

                    <div className='p-5 w-full'>

                            <Estrellas />
                        
                        <p className='fw-bolder h4 mt-3'>
                            <strong>{props.nombre}</strong>
                        </p>

                        <p className='fw-bold'> "{props.testimonio}"</p>

                    </div>
                </div>
        );
    }