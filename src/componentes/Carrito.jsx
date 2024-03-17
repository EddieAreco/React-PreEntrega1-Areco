import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import useUser from './useUser.jsx';

import { BsFillCartXFill, BsCartCheckFill } from "react-icons/bs";
import { CiFaceFrown, CiFaceSmile } from "react-icons/ci";
import { NavLink } from 'react-router-dom';

import { Image, Button, BreadcrumbItem, Breadcrumbs, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';

//ESTE COMPONENTE ES EL QUE REFLEJA LOS PRODUCTOS CARGADOS POR EL USUARIO EN EL CARRITO CON SU IMAGEN, NOMBRE, CANTIDAD, PRECIO Y SUB TOTAL. ADEMAS TAMBIEN TENEMOS EL TOTAL DE LA COMPRA, EL ELEMENTO "MIGAJAS", SE HACE EL CHECK OUT PARA VER SI EL USUARIO ESTA LOGUEADO O NO Y LA ALTERNATIVA DE QUE EL USUARIO PUEDA BORRAR TODOS LOS PRODUCTOS DEL CARRITO, EN CUYO CASO, SI ESTÁ VACÍO, SE MUESTRE UN MENSAJE
export default function Carrito() {

    const [modalPedido, setModalPedido] = useState(false)

    const { isLogged } = useUser()

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { carrito, clear, removeItem, totalCompra, calcularSubtotal, agregarEnFirestore, pedidoId } = useContext(CartContext)

    //EN ESTA FUNCIÓN, UTILIZAMOS LA FUNCIÓN removeItem PARA DARLE LA UTILIDAD CORRESPONDIENTE
    const quitarItem = (itemId) => {
        removeItem(itemId)
    }

    // FUNCIÓN PARA CALCULAR EL SUB TOTAL DE UN PRODUCTO
    const subTotalCarrito = (precio, cantidad) => {
        return calcularSubtotal(precio, cantidad);
    };


    //EN ESTA FUNCIÓN, UTILIZAMOS LA FUNCIÓN agregarEnFirestore, SE TRAE EL ID DEL PEDIDO, EL MENSAJE DEL PEDIDO SE PASA A true Y LUEGO clear PARA VACIAR EL CARRITO Y SE PUEDA PROCEDER A UN NUEVO PEDIDO
    const pedidoRealizado = async () => {
        if (isLogged) {
            const pedido = await agregarEnFirestore();
            setModalPedido(true);
            clear()
        } else {
            onOpen();
        }
    }

    return (
        <>
            {/* //SI EL CARRITO TIENE PRODUCTOS, AGREGO EL ELEMENTO "MIGAJAS" */}
            {carrito.length > 0 && (
                <div>

                    <Breadcrumbs
                        underline="hover"
                        className='mt-5'
                        classNames={{ list: "bg-gradient-to-br from-yellow-500 to-orange-500 shadow-small" }}
                        itemClasses={{
                            item: "text-white/60 data-[current=true]:text-white",
                            separator: "text-white/40",
                        }}
                        variant="solid"
                    >
                        <BreadcrumbItem>
                            <NavLink to={"/"}>
                                Productos
                            </NavLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            Carrito
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            Checkout
                        </BreadcrumbItem>
                    </Breadcrumbs>

                    <div className='text-white font-bold mt-4 border-2 p-2'>
                        <ul className='flex uppercase justify-between w-5/6'>
                            <li className='me-5'>producto</li>
                            <li className='me-3'>precio</li>
                            <li className='me-3'>cantidad</li>
                            <li className='me-3'>subtotal</li>
                        </ul>
                    </div>
                </div>
            )}

            <div className='mx-auto mt-3 text-white'>

                {/* //SI EL CARRITO TIENE PRODUCTOS, REALIZO UN MAP PARA QUE SE REFLEJEN LOS MISMOS EN UNA TABLA, CASO CONTRARIO, APARECE UN MENSAJE QUE LE INDICA AL USUARIO QUE EL CARRITO ESTÁ VACÍO */}
                {carrito.length > 0 ? (

                    carrito.map((item, index) => (


                        <div key={index} className="border-b-3 mb-2">
                            <div className='flex justify-between items-center mt-3 border-b-4'>

                                <div className="flex-column justify-center">

                                    <Image width={100} src={item.imagen} />
                                    <p>{item.nombre}</p>

                                </div>

                                <p>${item.precio}</p>
                                <p>Cantidad: {item.cantidad} unid.</p>
                                <p>$ {subTotalCarrito(item.precio, item.cantidad)}</p>
                                <button onClick={() => quitarItem(item.id)}><BsFillCartXFill style={{ fontSize: 20 }} /></button>
                            </div>
                        </div>
                    ))

                ) : (

                    <p className='mx-auto mt-3 text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg shadow-amber-500/50 dark:shadow-lg dark:shadow-amber-800/80 p-5'>
                        No hay productos en el carrito  <CiFaceFrown className='inline' style={{ fontSize: 25 }} />.
                        <NavLink to={'/'} className='ms-1'>
                                <strong>
                                    Agregue productos
                                </strong>
                        </NavLink>
                    </p>

                )}

                {/* //SI EL CARRITO TIENE PRODUCTOS, INCORPORO EL BOTÓN PARA VACIAR EL CARRITO, MUESTRO EL TOTAL DE LA COMPRA Y EL BOTÓN PARA REALIZAR EL PEDIDO PARA FINALIZAR LA COMPRA */}
                {carrito.length > 0 && (
                    <div>

                        <div className='text-white flex justify-between'>

                            <Button onClick={clear} className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs px-5 py-4 text-center uppercase mt-5">
                                vaciar carrito
                            </Button>

                            <Button variant='light' className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs px-5 py-4 text-center uppercase mt-5">
                                total a pagar: $ {totalCompra}
                            </Button>

                        </div>

                        <Button
                            variant='shadow'
                            color='primary'
                            size='lg'
                            className='text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs px-5 py-4 text-center uppercase mt-5'
                            onClick={pedidoRealizado}
                        >
                            <BsCartCheckFill style={{ fontSize: 25 }} />
                            Realizar pedido
                        </Button>
                    </div>
                )}

                {/* //SI EL USUARIO NO ESTÁ LOGUEADO Y EL CARRITO TIENE PRODUCTOS, NO SE PERMITE REALIZAR EL PEDIDO PARA FINALIZAR LA COMPRA Y APARECE UN MENSAJE PARA QUE VAYA A INICIAR SESIÓN*/}
                {!isLogged && carrito.length > 0 &&

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>

                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Aclaración</ModalHeader>
                                    <ModalBody>
                                        <p>
                                            Para poder finalizar el pedido, debes iniciar sesión. Para esto, haz click sobre el ícono de usuario que se encuentra arriba, en la barra de navegación
                                        </p>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                }

                {/* //SI EL PEDIDO SE FINALIZA, APARECE UN MENSAJE DONDE SE LE OTORGA EL ID AL USUARIO*/}
                {pedidoId.length > 0 &&

                    <Modal isOpen={modalPedido} onOpenChange={setModalPedido} placement='center'>

                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">ID de pedido</ModalHeader>
                                    <ModalBody>
                                        <p>
                                            Gracias por su compra! <CiFaceSmile className='inline' style={{ fontSize: 25 }} /> El identificador de su compra es: <strong className='font-bold inline'>{pedidoId[pedidoId.length-1]}</strong>
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                }

            </div>

        </>
    )
}