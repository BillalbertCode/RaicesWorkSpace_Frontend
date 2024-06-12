import { createContext, useState } from "react";
// Contexto Para el estado de la lista de articulos
export const ArticleContext = createContext()

export const ArticleProvider = ({ children }) => {
    // Lista de articles mostrada
    const [articles, setArticles] = useState([]);
    
    // mejorar control de estado de los articles 
    const [articlesChanges, setArticlesChanges] = useState({})

    // Funcion para agregar articulos
    const addArticle = (article) => {
        setArticles((prevArticles) => [article, ...prevArticles])
        setArticlesChanges((prevChanges) => ({ ...prevChanges, [article._id]: 'added' }))
    }

    // Eliminacion de Un article
    const deleteArticle = (article) => {
        setArticles((prevArticles) => prevArticles.filter((a) => a._id !== article._id));
        setArticlesChanges((prevChanges) => ({ ...prevChanges, [article._id]: 'removed' }));
    }
    return (
        <ArticleContext.Provider value={{ articles,setArticles, articlesChanges, addArticle, deleteArticle }}>
            {children}
        </ArticleContext.Provider>
    )
}