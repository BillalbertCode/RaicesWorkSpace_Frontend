import { createContext, useState } from "react";
// Contexto Para el estado de la pagina de articulos
export const ArticleContext = createContext()

export const ArticleProvider = ({ children }) => {
    const [articleStatus, setArticleStatus] = useState(false);

    // Funcion de renderizacion de articulos
    const toogleRender = () => {
        setArticleStatus(!articleStatus)
    }

    return (
        <ArticleContext.Provider value={{ articleStatus, toogleRender }}>
            {children}
        </ArticleContext.Provider>
    )
}