// Este Componente muestra la informacion del articulo
import { useState } from "react";
import ArticleConfig from "./ArticleConfig/ArticleConfig";
import formateDate from "@/utils/formateDate"; //Convierte la hora
import Link from "next/link";
import stylesArticle from "@/styles/article.module.css"
/**
 * @param {object} article - objeto de articulo con todos sus datos
 */
// Acepta un objeto article como prop
const ArticleCard = ({ article }) => {

    // Usado en el diseño responsivo para activar el filtro con una clase
    // imgCardContent
    const [imgFilter, setImageFilter] = useState(false)
    const toogleImageFilter = () =>{
        setImageFilter(!imgFilter)
    }

    return (
        <div className={`card overflow-hidden ${stylesArticle.containerCard}`} >
            <div className={`card-header p-0 ps-2 ${stylesArticle.bgMetallicFormArticle}`}>
                <div className=" d-flex p-2 " >
                    <Link href="/profile">
                        <img className="iconLink profileIcon " src="https://th.bing.com/th/id/OIG1.qgdQ.k4SM9tOiXSWI2Jw?w=1024&h=1024&rs=1&pid=ImgDetMain"></img>
                    </Link>
                    <Link className=" mx-3 text-start link-dark link-offset-2 link-underline link-underline-opacity-0" href={`/profile/${article.author._id}`}>
                        <p className="h6 pt-2">{article.author.name} {article.author.lastName} </p>
                        <p className="text-secondary m-0" >@{article.author.username}</p>
                    </Link>
                </div>
            </div>
            <div className="row g-0" >
                <div className={`col-md-4 d-flex ${stylesArticle.imgCardContent} ${imgFilter && stylesArticle['active'] } `} >
                    <img className="object-fit-cover img-fluid" src="https://th.bing.com/th/id/OIG1.qgdQ.k4SM9tOiXSWI2Jw?w=1024&h=1024&rs=1&pid=ImgDetMain" title={article.title || article.content} />
                </div>
                <div className="col-md-8 ">
                    <div className="card-body h-100 d-flex flex-column justify-content-between position-relative ">
                        <div onClick={toogleImageFilter} className={`position-absolute top-1 ${stylesArticle.imgArticle}`} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-blockquote-left" viewBox="0 0 16 16">
                                <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm.79-5.373q.168-.117.444-.275L3.524 6q-.183.111-.452.287-.27.176-.51.428a2.4 2.4 0 0 0-.398.562Q2 7.587 2 7.969q0 .54.217.873.217.328.72.328.322 0 .504-.211a.7.7 0 0 0 .188-.463q0-.345-.211-.521-.205-.182-.568-.182h-.282q.036-.305.123-.498a1.4 1.4 0 0 1 .252-.37 2 2 0 0 1 .346-.298zm2.167 0q.17-.117.445-.275L5.692 6q-.183.111-.452.287-.27.176-.51.428a2.4 2.4 0 0 0-.398.562q-.165.31-.164.692 0 .54.217.873.217.328.72.328.322 0 .504-.211a.7.7 0 0 0 .188-.463q0-.345-.211-.521-.205-.182-.568-.182h-.282a1.8 1.8 0 0 1 .118-.492q.087-.194.257-.375a2 2 0 0 1 .346-.3z" />
                            </svg>
                        </div>
                        <h5 className="card-title mt-1 display-6">{article.title || <small className="text-secondary">Sin Titulo</small>}</h5>
                        <p className="card-text">{article.content || <small className="text-secondary">Sin descripcion..</small>}</p>

                        <Link className=" link-dark link-offset-2 link-underline link-underline-opacity-0" href={`/profile/${article.author._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                            <small className="text-body-secondary ms-1">
                                {`@${article.author.username} `}
                            </small>
                        </Link>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                {formateDate(article.createAt)}
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