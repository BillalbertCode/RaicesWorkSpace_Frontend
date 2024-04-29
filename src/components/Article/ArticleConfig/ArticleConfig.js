// Configuracion del articulo de forma publica y privada
// Methodos disponibles: Delete
import { useContext } from "react";
import { TokenContext } from "@/contexts/TokenContext";
import { ArticleContext } from "@/contexts/ArticleContext";
import { fetchDeleteArticle } from "@/utils/api/fetchDeleteArticle";
/**
 * @param {object} article - Modificacion de dicho article
 */
const ArticleConfig = ({ article }) => {
    //Contexto de token para saber si el usuario tiene los privilegios necesarios
    const { loginStatus, tokenId, token } = useContext(TokenContext);
    //Contexto del articulo para renderizarlo
    const { toogleRender } = useContext(ArticleContext)

    return (
        <div>
            {/* Funciones con privilegios de modificacion */}
            {loginStatus && article.author._id === tokenId && (
                <div>
                    <button className="btn btn-primary mr-2">Editar</button>
                    {/* Funcion de eliminacion */}
                    <button className="btn btn-danger" onClick={() =>
                        fetchDeleteArticle(
                            article._id,
                            token,
                            toogleRender
                        )
                    }>Eliminar</button>
                </div>
            )}
        </div>
    )
}
export default ArticleConfig;