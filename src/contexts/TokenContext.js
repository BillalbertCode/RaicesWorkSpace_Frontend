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

    // Datos que recibe al iniciar sesion 
    const loginStatus = dataToken.login
    const tokenId = dataToken.id;
    const token = dataToken.token;

    // Cierra la sesion del usuario eliminando todo rastro de la sesion
    const closedSession = () =>{
            setDataToken({
                login: false,
                id: null,
                token: null
            })
            router.push('/')
    }
    useEffect(() => {
        
    }, [loginStatus]);

    return (
        <TokenContext.Provider value={{ token, tokenId, loginStatus, setDataToken, closedSession }}>
            {children}
        </TokenContext.Provider>
    )
}