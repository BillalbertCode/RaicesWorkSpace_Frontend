// recibe como promp el endpoint y renderiza cada articulo que llega del endpoint
// los endpoints esperados son: los articulos de un usuario o todos los articulos general

import {useContext, useEffect, useState } from "react"
import { ArticleContext } from "@/contexts/ArticleContext";
import ArticleCard from "./ArticleCard";
/**
 * @param {string} endpoint - endpoint del array de los objetos articles
 */
const ArticlesAll = ({ endpoint }) => {
    const { articles, setArticles } = useContext(ArticleContext)
    // Manejo de estados
    const [loading, setloading] = useState(true);
    const [estateErrors, setEstateErrors] = useState(false)

    useEffect(() => {
        // funcion anonima autocombocada
        (async () => {
            try {
                const response = await fetch(`http://localhost:5000${endpoint}`)

                if (!response.ok) {
                    if (response.status === 404) {
                        setArticles(null)
                        return
                    }
                    throw new Error('Error en el fetch')
                }

                const data = await response.json()
                setArticles(data)
                setloading(false)

            } catch (error) {
                console.error('error:', error)
                setEstateErrors(true)
            }
        })();

    }, []);

    if (articles === null) {
        return (
            <div className="container-fluid text-center">
                <p>Este usuario no tiene articulos disponibles...</p>
            </div>
        )
    }

    if (estateErrors) {
        return (
            <div className="container-fluid text-center">
                <p>Error de conexion</p>
            </div>
        )
    }

    return (
        <div className="container-fluid text-center mt-5">
            {loading
                ? ( <p>loading</p>)
                // Mapeo de los articulos
                : (<ul className="d-flex flex-column align-items-center p-0 gap-4">{
                    articles.map((article) => {
                        return (
                            <ArticleCard key={article._id} article={article}> </ArticleCard>
                        )
                    })
                }</ul>)
            }
        </div>
    )
}

export default ArticlesAll;