import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { Button } from "@nextui-org/react";
import { TbShoppingCartPlus, TbShoppingCartMinus } from "react-icons/tb";

export const BotonesSumaResta = ({ product }) => {

    const [sinStock, setSinStock] = useState(false);

    const { incrementarCantidad, disminuirCantidad } = useContext( CartContext )

    const restarCantidad = () => {
        if (product.cantidad > 0) {
            disminuirCantidad(product.id);
        }
    }

    const sumarCantidad = () => {
        if (product.cantidad < product.stock) {
            incrementarCantidad(product.id);
            setSinStock(false);
        } else {
            setSinStock(true);
        }
    };

    return (
        <>

            {sinStock && <p className="text-white bg-red-700 mb-2"> Sin stock </p>}

            <div className="flex justify-between w-64 mx-auto">
                <Button isIconOnly
                    size="md"
                    color="primary"
                    className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs text-center"
                    onClick={restarCantidad} >
                    <TbShoppingCartMinus style={{ fontSize: 20 }} />
                </Button>

                <p className="font-semibold text-white my-auto"> {product.cantidad} </p>

                <Button isIconOnly
                    size="md"
                    color="primary"
                    className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-xs text-center"
                    onClick={sumarCantidad}>
                    <TbShoppingCartPlus style={{ fontSize: 20 }} />
                </Button>
            </div>

        </>
    )
}