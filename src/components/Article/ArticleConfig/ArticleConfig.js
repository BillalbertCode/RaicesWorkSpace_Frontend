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
        <div>
            {/* Funciones con privilegios de modificacion */}
            {loginStatus && article.author._id === tokenId && (
                <div>
                    <button className="btn btn-primary mr-2">Editar</button>
                    {/* Funcion de eliminacion */}
                    <button className="btn btn-danger" onClick={toastFetch}>Eliminar</button>
                
                </div>
            )}
            
        </div>
    )
}
export default ArticleConfig;