// Creacion de Article
import { useContext, useState } from "react"
import { TokenContext } from "@/contexts/TokenContext"
import { ArticleContext } from "@/contexts/ArticleContext"
//Controladores del formulario
import { handleChange } from "@/utils/handleChange"
import { handleSubmit } from "@/utils/api/fetchPostAuth"

const ArticleForm = () => {
    const { token } = useContext(TokenContext)
    const { toogleRender } = useContext(ArticleContext)
    // Estados del article
    const [articleData, setArticleData] = useState({
        title: '',
        content: ''
    })

    return (
        <div className="container mt-4">
            <h2>Crear un nuevo artículo</h2>
            <form onSubmit={(e) => handleSubmit(
                e,
                articleData,
                '/article',
                token,
                () => {
                    toogleRender(), setArticleData({
                        title: '',
                        content: ''
                    })
                }
            )
            }>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" className="form-control"
                        id="title"
                        name="title"
                        value={articleData.title}
                        onChange={
                            (e) => handleChange(e, articleData, setArticleData)
                        }
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenido</label>
                    <textarea className="form-control"
                        id="content"
                        name="content"
                        value={articleData.content}
                        onChange={
                            (e) => handleChange(e, articleData, setArticleData)
                        }
                        rows="5"
                        required>
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary">Publicar</button>
            </form>
        </div>
    )
}
export default ArticleForm