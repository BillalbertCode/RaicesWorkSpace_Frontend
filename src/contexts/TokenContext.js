import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
// Contexto para el estado del token y el login del usuario
export const TokenContext = createContext()

export const TokenProvider = ({ children }) => {

    const router = useRouter()

    const [dataToken, setDataToken] = useState({
        login: false,
        id: null,
        token: null
    })

    useEffect(() => {
        // Guardamos la sesion en el storage del usuario en el cache
        const storageSession = JSON.parse(localStorage.getItem('token'))

        if (storageSession) {
            setDataToken(storageSession)
        }
    }, []);


    const loginInit = (data) => {
        setDataToken(data)
        // Almacenamos los datos en la cache
        const jsonString = JSON.stringify(data)
        localStorage.setItem('token', jsonString)

        router.push('/')
    }

    // Datos que recibe al iniciar sesion 
    const loginStatus = dataToken.login
    const tokenId = dataToken.id;
    const token = dataToken.token;

    // Cierra la sesion del usuario eliminando todo rastro de la sesion
    const closedSession = () => {
        setDataToken({
            login: false,
            id: null,
            token: null
        })
        router.push('/')

        localStorage.removeItem('token')
        localStorage.removeItem('dataProfile')
    }

    // Si existe un token en el localstorage lo cargamos


    return (
        <TokenContext.Provider value={{ token, tokenId, loginStatus, loginInit, closedSession }}>
            {children}
        </TokenContext.Provider>
    )
}