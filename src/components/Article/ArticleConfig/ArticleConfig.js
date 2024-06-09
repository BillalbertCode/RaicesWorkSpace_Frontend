// Configuracion del articulo de forma publica y privada
// Methodos disponibles: Delete
import { useContext } from "react";
// Contextos
import { TokenContext } from "@/contexts/TokenContext";
import { ArticleContext } from "@/contexts/ArticleContext";
// Solicitud fetch
import { fetchDeleteArticle } from "@/utils/api/fetchDeleteArticle";
import toast from "react-hot-toast";
/**
 * @param {object} article - Modificacion de dicho article
 */
const ArticleConfig = ({ article }) => {
    //Contexto de token para saber si el usuario tiene los privilegios necesarios
    const { loginStatus, tokenId, token } = useContext(TokenContext);
    //Contexto del articulo para renderizarlo
    const { toogleRender } = useContext(ArticleContext)

    // Notificacion status + solicitud delete
    const toastFetch = () => {
        const info = toast.promise(fetchDeleteArticle(article._id, token, toogleRender),
            {
                loading: 'Eliminando articulo...',
                success: 'Articulo eliminado con exito',
                error: 'Error al tratar de eliminar el articulo',
            }).catch(error => {
                console.log(error)
                return error
            })
        return info
    }

    return (
        <>
            {/* Funciones con privilegios de modificacion */}
            {loginStatus && article.author._id === tokenId && (
                <div>
                    {/* Button editar y mas proximo */}
                    {/* <button className="btn btn-primary mr-2">Editar</button> */}
                    {/* Funcion de eliminacion */}
                    <button className="btn" onClick={toastFetch}>
                        <div className="d-flex align-items-center gap-2">
                            Eliminar
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </div>
                    </button>
                </div>
            )}

        </>
    )
}
export default ArticleConfig;