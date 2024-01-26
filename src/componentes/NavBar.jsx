import React from "react";
import { useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon.jsx";
import Categorias from "../componentes/Categorias.jsx";
import Logo from "../componentes/Logo.jsx";
import Usuario from "../componentes/Avatar.jsx";
import CartWidget from "../componentes/CartWidget.jsx";

export default function NavBar() {

    const [active, setActive] = useState(false)

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Nosotros",
        <Categorias />,
        "Ubicación",
        "Iniciar Sesión",
    ];

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >

            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

                <NavbarBrand>
                    <Logo />
                    <p className="font-bold text-inherit">Emporio Areco</p>
                </NavbarBrand>
            </NavbarContent>


            <NavbarBrand className="hidden md:flex">
                <Logo />
                <p className="font-bold text-inherit">Emporio Areco</p>
            </NavbarBrand>
            <NavbarContent justify="start">

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Nosotros
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Categorias />
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Ubicacion
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu className="mt-5">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full ms-5"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>

            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">

                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[20rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Buscador"
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                />

                <Usuario />

            </NavbarContent>

            <Dropdown placement="bottom-end">

                <DropdownTrigger>

                    <CartWidget />
                </DropdownTrigger>

                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">zoey@example.com</p>
                    </DropdownItem>
                    <DropdownItem key="compras">Mis compras</DropdownItem>
                    <DropdownItem key="configuraciones">Configuraciones</DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        Cerrar Sesión
                    </DropdownItem>

                </DropdownMenu>

            </Dropdown>

        </Navbar>
    );
}
