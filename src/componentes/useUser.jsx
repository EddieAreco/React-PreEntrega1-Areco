import {useCallback, useContext} from 'react';
import { CartContext } from '../context/CartContext';


//ESTE COMPONENTE SIRVE PARA MANEJAR LA AUTENTICACION DE USUARIO Y SI ES NECESARIO PARA USARLA PARA UNA BASE DE DATOS DE USUARIOS
export default function useUser () {

    const {jwt, setJWT} = useContext(CartContext);

    const logueo = useCallback(({ username, password}) => {
        setJWT('testeo')
    }, [setJWT])

    const logOut = useCallback(() => {
        setJWT(null)
    }, [setJWT])

    return{
        isLogged: Boolean(jwt),
        logueo,
        logOut
    }
}