// Este Componente muestra la informacion del articulo
import ArticleConfig from "./ArticleConfig/ArticleConfig";
import formateDate from "@/utils/formateDate"; //Convierte la hora
import Link from "next/link";
/**
 * @param {object} article - objeto de articulo con todos sus datos
 */
// Acepta un objeto article como prop
const ArticleCard = ({ article }) => {

    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://th.bing.com/th/id/OIG1.qgdQ.k4SM9tOiXSWI2Jw?w=1024&h=1024&rs=1&pid=ImgDetMain" className="img-fluid rounded-start" alt={article.title || article.content} />
                </div>
                <div className="col-md-8">
                    <div className="card-body ">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.content}</p>
                        <Link href={`/profile/${article.author._id}`}>
                            <p className="card-text">
                                <small className="text-body-secondary">
                                    {` ${article.author.name} ${article.author.lastName}`}
                                </small>
                            </p>
                        </Link>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                Fecha de publicacion: {formateDate(article.createAt)}
                            </small>
                        </p>
                        {/* Botones de configuracion del article usuario con privilegios sobre el articulo */}
                        <ArticleConfig article={article}></ArticleConfig>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ArticleCard;