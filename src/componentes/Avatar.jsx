import { NotificationIcon } from "../componentes/NotificationIcon.jsx";
import useUser from "./useUser";

import { Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { Avatar, Badge, DropdownMenu, DropdownItem, DropdownTrigger, Dropdown, Tooltip } from '@nextui-org/react';

//ESTE COMPONENTE CONTIENE EL AVATAR DEL USUARIO QUE SE LOGUEA CON UN MENU DE OPCIONES PARA PODER ACCEDER A OTRAS PARTES DEL SITIO
export default function Usuario() {

    const { isLogged, logOut } = useUser()

    return (

        <>

            {
                isLogged ?

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
                                    color="sucess"
                                    name="Jason Hughes"
                                    size="md"
                                    radius="sm"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />

                            </Badge>
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="compras">

                                <Link to={'/miscompras'}>
                                    Mis compras
                                </Link>

                            </DropdownItem>
                            <DropdownItem key="configuraciones">Configuraciones</DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                onClick={logOut}
                            >
                                Cerrar Sesión
                            </DropdownItem>

                        </DropdownMenu>

                    </Dropdown> :

                    <Tooltip
                        showArrow={true}
                        placement="bottom"
                        offset={15}
                        content="Clickeando aquí puedes iniciar sesión"
                    >
                        <Link to='/login'>
                            <FaUser
                                style={{ fontSize: 30 }}
                            />
                        </Link>
                    </Tooltip>
            }

        </>
    )
}