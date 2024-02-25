import { Select, SelectItem, Button } from "@nextui-org/react";

//ESTE COMPONENTE TIENE LA FUNCIONALIDAD DE SER UN FILTRO QUE EL USUARIO PUEDA USAR PARA ORDENAR LOS PRODUCTOS
export const Filtros = ({ filtro, setFiltro, limpiarFiltro }) => {


    //CREO UN ARRAY DE OBJETOS QUE VOY A UTILIZAR PARA QUE SE VEAN LAS OPCIONES QUE TIENE EL USUARIO
    const opciones = [
        {label:"Ordenar de A a la Z", value: "AZ" },
        {label:"Ordenar de Z a la A", value: "ZA" },
        {label:"Ordenar de Precio mayor a menor", value: "+-" },
        {label:"Ordenar de Precio menor a mayor", value: "-+" }
    ]

    //ESTA FUNCIÓN VA A TOMAR EL VALOR DE CADA UNA DE LAS OPCIONES (SEGUN CUAL SE ELIJA) Y SE VA A APLICAR A FILTRO PARA MODIFICAR EL ESTADO DE ESTE, LUEGO, EN BASE A ESTO, EN OTRO COMPONENTE, SE VA A PROCEDER A REALIZAR OTRA FUNCIÓN EN LA CUAL SE APLICARAN LOS CRITERIOS PARA FILTRAR
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setFiltro(selectedValue);
    };

    return (

        <div className='w-full flex flex-col gap-4'>

            <div className='flex justify-center w-5/6 mx-auto gap-2'>

                <div className='flex w-3/4 items-center md:flex-nowrap mb-6 md:mb-0 gap-4'>

                    <Select
                        placeholder='Elija el tipo de filtro'
                        aria-label='Elija el tipo de filtro'
                        onChange={ handleSelectChange }
                    >
                        {opciones.map( (opcion, index) => (
                            <SelectItem key={index} value={opcion.value}>
                                {opcion.label}
                            </SelectItem>
                        ))}
                    </Select>

                </div>

                <Button className='min-h-[55px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 text-white uppercase'
                onClick={ limpiarFiltro }
                >
                    Limpiar Filtro
                </Button>


            </div>

        </div>

    )
}