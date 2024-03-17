import { useContext } from 'react';
import useUser from './useUser';
import { CartContext } from '../context/CartContext';

export const MisCompras = () => {

    //HOOK PARA MANEJAR LA AUTENTICACIÓN DEL USUARIO
    const { isLogged } = useUser();

    //TRAIGO LOS DATOS DEL PEDIDO QUE CONSIDERO IMPORTANTES
    const { pedidoId, totalPedido, fecha } = useContext(CartContext);

    return (

        <>

            <h1 className="text-white my-5 text-5xl">Registro de mis compras</h1>

{/*COMPRUEBO SI EL USUARIO TIENE SESIÓN INICIADA Y SI TIENE PEDIDOS CARGADOS*/}
            {
                pedidoId.length > 0 && isLogged ? (
                    <div>
                        {/*ITERO SOBRE LOS PEDIDOS CARGADOS Y MUESTRO LA FECHA, EL MONTO TOTAL Y EL ID */}
                        {pedidoId.map((id, index) => (

                            <ul className='gap-5 border-2 mb-3' key={index}>
                                <li className='text-white'>Fecha del pedido: <strong className='font-bold text-orange-500'> {fecha[index].toUTCString()}</strong></li>
                                <li className='text-white'>ID del pedido {index + 1}: <strong className='font-bold text-orange-500'> {id}</strong></li>
                                <li className='text-white' >compra total de <strong className='font-bold text-orange-500'> ${totalPedido[index]} </strong></li>
                            </ul>

                        ))}

                    </div>
                ) : (

                    //EN CASO DE QUE NO HAYA PEDIDO NADA O NO HAYA SESIÓN INICIADA, SE MUESTRA UN MENSAJE
                    <p className="text-white">No hay pedidos realizados aún, debes tener la sesión iniciada.</p>
                )
            }

        </>

    )
}