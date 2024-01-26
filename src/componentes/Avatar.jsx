import React from "react";
import { Avatar, Badge, DropdownMenu, DropdownItem, DropdownTrigger, Dropdown } from '@nextui-org/react';
import { NotificationIcon } from "../componentes/NotificationIcon.jsx";
import '../css/Usuario.css';


export default function Usuario() {

    return (

        <>
            <Dropdown placement="bottom-end">

                <DropdownTrigger>

                    <Badge
                        color="danger"
                        content={<NotificationIcon size={16} />}
                        placement="top-left"
                    >

                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="sucess"
                            name="Jason Hughes"
                            size="md"
                            radius= "sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />

                    </Badge>
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

        </>
    )
}