import { useContext, useState } from "react";
import { CartContext } from '../context/cartContext';

import { TbShoppingCartPlus, TbShoppingCartMinus } from "react-icons/tb";
import { Button } from "@nextui-org/react";

export default function BotonesCards({ product, stock, initial }) {

    product.cantidad = typeof (product.cantidad) !== 'undefined' ? product.cantidad : 0;

    const [cantidad, setCantidad] = useState(initial)
    const [sinStock, setSinStock] = useState(false);

    const { handleAdd } = useContext(CartContext)

    const restarCantidad = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
            setSinStock(false)
        } 
    }

    const sumarCantidad = () => {
        if (cantidad < product.stock) {
            setCantidad(cantidad + 1);;
            setSinStock(false);
        } else {
            setSinStock(true);
        }
    };

    const addProducts = () => {
        handleAdd(product, cantidad);
    }

    return (

        <>
            <div className="w-full mx-auto">

                {sinStock && <p className="text-white bg-red-700 mb-2"> Sin stock </p>}

                <div className="flex justify-between w-64 mx-auto">
                    <Button isIconOnly
                        size="md"
                        color="primary"
                        className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs text-center"
                        onClick={restarCantidad} >
                        <TbShoppingCartMinus style={{ fontSize: 20 }}/>
                    </Button>

                    <p className="font-semibold text-white my-auto"> {cantidad} </p>

                    <Button isIconOnly
                        size="md"
                        color="primary"
                        className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs text-center"
                        onClick={sumarCantidad}>
                        <TbShoppingCartPlus style={{ fontSize: 20 }}/>
                    </Button>
                </div>

                <div className="flex justify-center mt-2">
                    <Button
                        color="primary"
                        className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs px-5 py-4 text-center uppercase w-full"
                        onClick={addProducts}
                        disabled={!stock}
                    >
                        Agregar al carrito
                    </Button>
                </div>
            </div>

        </>
    );
}