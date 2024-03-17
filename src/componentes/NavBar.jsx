import { useState, useContext } from "react";
import Logo from "../componentes/Logo.jsx";
import Usuario from "../componentes/Avatar.jsx";
import Categorias from "../componentes/Categorias.jsx";
import { CartWidget } from "../componentes/CartWidget.jsx";
import { SearchIcon } from "./SearchIcon.jsx";

import { NavLink, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Input, DropdownTrigger, Dropdown, Tooltip } from "@nextui-org/react";

//ESTE COMPONENTE SE UBICA EN LA PARTE DE ARRIBA DEL SITIO Y DENTRO TIENE EL LOGO Y NOMBRE DE LA EMPRESA, UN BUSCADOR DE PRODUCTOS, UN APARTADO DE USUARIO PARA CUANDO EL MISMO SE LOGUEE, UN CARRITO QUE ALMACENA LOS PRODUCTOS COMPRADOS Y EL VALOR DE LA COMPRA TOTAL

export default function NavBar({ onSearchChange }) {

    const [searchTerm, setSearchTerm] = useState("");

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //CRREACION DE ARRAY DE LOS ITEMS DEL MENU DESPLEGABLE AL CUAL LUEGO LE VAMOS A HACER UN MAPEO
    const menuItems = [
        "Nosotros",
        <p className="ml-1"><Categorias /></p>,
        "Carrito",
        <Link to={'/login'} className="ml-5">
            Iniciar Sesión
        </Link>,
    ];

    //ESTA FUNCION VA A TOMAR EL VALOR DE CADA UNA DE LAS LETRAS INGRESADAS POR EL USUARIO EN EL INPUT DE BUSQUEDA Y SE VA A APLICAR A searchTerm PARA MODIFICAR EL ESTADO DE ESTE, LUEGO, EN BASE A ESTO, SE VA A PROCEDER A BUSCAR LOS PRODUCTOS
    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        onSearchChange(term); // LLAMA A LA FUNCION PROPORCIONADA POR LA PROP PARA PASAR EL TÉRMINO DE BÚSQUEDA AL PADRE
    };

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >

            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

                <NavbarBrand className="min-w-[100px]">

                    <NavLink to={`/`}>

                        <Logo />

                    </NavLink>

                </NavbarBrand>

            </NavbarContent>


            <NavbarBrand className="hidden md:flex">
                <Link className="flex" to={`/`}>
                    <Logo />
                    <p className="font-bold text-inherit my-auto">Emporio Areco</p>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="start">

                <NavbarContent className="hidden sm:flex gap-4" justify="center">

                    <NavbarItem>

                        <NavLink color="foreground" to={`/nosotros`}>
                            Nosotros
                        </NavLink>

                    </NavbarItem>

                    <NavbarItem isActive>

                        <Categorias />

                    </NavbarItem>

                    <NavbarItem>

                        <NavLink color="foreground" to={`/carrito`}>
                            Carrito
                        </NavLink>

                    </NavbarItem>

                </NavbarContent>

                {/* //ESTE ES EL MAPEO DEL ARRAY menuItems QUE SE VA A MOSTRAR EN VISUALIZACION MOBILE, TUVE QUE HACER UN CONDICIONAL PARA QUE AL HACER CLICK SOBRE CATEGORIAS, QUE ES UN COMPONENTE, NO SE ROMPIERA EL ENLACE Y FUNCIONARA BIEN EL RE DIRECCIONAMIENTO */}
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`} >
                            {typeof item === 'string' ? (
                                <NavLink
                                    to={`/${item}`}
                                    className="w-full ms-5"
                                    href="#"
                                    size="lg"
                                >
                                    {item}
                                </NavLink>
                            ) : (
                                item
                            )}

                        </NavbarMenuItem>
                    ))}

                </NavbarMenu>

            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">

                <Tooltip
                    showArrow={true}
                    placement="bottom"
                    offset={15}
                    content="Aquí puedes buscar tus productos">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[20rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        className="min-w-[100px]"
                        placeholder="Buscador"
                        size="sm"
                        startContent={<SearchIcon size={18} />}
                        type="search"

                        //EN ESTA PARTE LE ESTAMOS APLICANDO LA FUNCION PARA BUSCAR LOS PRODUCTOS Y LE ASIGNAMOS EN VALUE, EL VALOR QUE ESTAMOS OBTENIENDO DEL ESTADO searchTerm QUE SERIA CADA LETRA QUE INGREA EL USUARIO
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                </Tooltip>

                {/* //AQUI ESTA EL COMPONENTE USUARIO DE AVATAR */}
                <Usuario />

            </NavbarContent>

            <Dropdown placement="bottom-end">

                <DropdownTrigger>

                    {/* //AQUI ESTA EL COMPONENTE CartWidget */}
                    <CartWidget />

                </DropdownTrigger>
            </Dropdown>

        </Navbar>
    );
}
