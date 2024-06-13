// Mostrar Una lista de articles General o Individual
// recibe como promp el endpoint y renderiza cada articulo que llega del endpoint
// los endpoints esperados son: los articulos de un usuario o todos los articulos general
// Los Endpoints Esperados son de tipo paginacion
import { useContext, useEffect, useState } from "react"
import { ArticleContext } from "@/contexts/ArticleContext";
import ArticleCard from "./ArticleCard";
/**
 * @param {string} endpoint - endpoint del array de los objetos articles
 */
const ArticlesAll = ({ endpoint }) => {
    // Lista de articles del contexto
    const { articles, setArticles } = useContext(ArticleContext)

    //Estado para la paginacion
    const [page, setPage] = useState(1)
    const [morePage, setMorePage] = useState(true)

    // Manejo de estados
    const [loading, setloading] = useState(true);
    const [estateErrors, setEstateErrors] = useState(false)

    useEffect(() => {
        // Peticion de la lista de articles con paginacion de 5
        // Y actualizacion de la lista del contexto
        (async () => {
            try {
                const response = await fetch(`http://localhost:5000${endpoint}?page=${page}&limit=5`)

                if (!response.ok) {
                    // Si no hay mas articles que mostrar en concatenacion
                    if (response.status === 404 && articles.length >= 1) {
                        setMorePage(false)
                        return
                        }
                    // Si el usuario no tiene articulos para mostrar general
                    if (response.status === 404) {
                        setArticles(null)
                        return
                    }
                    throw new Error('Error en el fetch')
                }

                const data = await response.json()
                // Concatenador
                if (page > 1) {
                    setArticles(prevArticles => [...prevArticles, ...data])
                } else {
                    setArticles(data)
                }
                setloading(false)
                setMorePage(data.length > 0)
            } catch (error) {
                console.error('error:', error)
                setEstateErrors(true)
            }
        })();

    }, [page]);

    const loadMoreArticles = () => {
        setPage(prevPage => prevPage + 1);
    };

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
                ? (<p>loading</p>)
                // Mapeo de los articulos
                : (<ul className="d-flex flex-column align-items-center p-0 gap-4">{
                    articles.map((article, index) => {
                        return (
                            <ArticleCard style={{ '--index': index }} key={article._id} article={article} > </ArticleCard>
                        )
                    })
                }</ul>)
            }
            {morePage && !loading && (
                <button className="mb-4 btn btn-outline-secondary" onClick={loadMoreArticles}>
                    Load More...
                </button>
            )}
        </div>
    )
}

export default ArticlesAll;