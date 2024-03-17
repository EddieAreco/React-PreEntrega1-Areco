import { useEffect, useState } from "react";

import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import useUser from "./useUser";

import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";

//ESTE COMPONENTE MUESTRA UN FORMULARIO QUE SIRVE PARA QUE EL USUARIO INICIE SESIÓN
export const Login = () => {

    //ESTADOS PARA MANEJAR EL NOMBRE DE USUARIO, LA CONTRASEÑA Y LOS ERRORES
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // HOKK DE ENRUTAMIENTO QUE SE USA PARA IR A OTRAS RUTAS
    const navigate = useNavigate();

    //HOOK PARA MANEJAR LA AUTENTICACIÓN DEL USUARIO
    const { logueo, isLogged } = useUser();

    //SI HAY UNA MODIFICACIÓN EN LA AUTENTICACIÓN DEL USUARIO, DIRIJO AL USUARIO A LA PÁGINA PRINCIPAL
    useEffect(() => {
        if (isLogged)
            navigate('/')
    }, [isLogged, navigate])

    //FUNCIÓN PARA MANEJAR EL FORMULARIO DE INICIO DE SESIÓN
    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === "" || password === "") {
            setError(true);
            return
        }

        if (password.length < 6 || !/d/.test(password) || !/[a-zA-Z]/.test(password)) {
            setErrorPassword(true);
            return
        }

        logueo({ username, password })
    }

    //FUNCIÓN PARA MOSTRAR O NO LA CONTRASEÑA
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (

        //FORMULARIO PARA INICIO DE SESIÓN
        <form onSubmit={handleSubmit} className="mt-5">

            <Input
                isClearable
                isInvalid={true}
                className="max-w-[300px] mx-auto mb-3"
                radius="full"
                placeholder="usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onClear={(e) => setUsername("")} //ACCIÓN QUE SIRVE PARA BORRAR TODO LO INGRESADO EN USUARIO
            />

            <Input
                isInvalid={true}
                className="max-w-[300px] mx-auto mb-3"
                radius="full"
                placeholder="contraseña"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}

                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }

            />

            <button className="text-white">Iniciar Sesión</button>

            {/*SI ALGUNOS DE LOS CAMPOS ESTA VACÍO, SE MUESTRA UN MENSAJE*/}
            {error && <p className="text-white"> Todos los campos son obligatorios </p>}

            {errorPassword && <p className="text-white"> La contraseña debe tener al menos 6 caracteres y contener al menos un número y una letra.</p>}

        </form>
    )
}
