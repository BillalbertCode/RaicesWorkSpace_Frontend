import { createContext, useState } from "react";
// Contexto Para el estado de la lista de articulos
export const ArticleContext = createContext()

export const ArticleProvider = ({ children }) => {
    // Lista de articles mostrada
    const [articles, setArticles] = useState([]);
    
    return (
        <ArticleContext.Provider value={{ articles, setArticles }}>
            {children}
        </ArticleContext.Provider>
    )
}