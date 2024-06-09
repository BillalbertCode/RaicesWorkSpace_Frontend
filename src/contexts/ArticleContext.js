import { createContext, useState } from "react";
// Contexto Para el estado de la pagina de articulos
export const ArticleContext = createContext()

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    
    return (
        <ArticleContext.Provider value={{ articles, setArticles }}>
            {children}
        </ArticleContext.Provider>
    )
}