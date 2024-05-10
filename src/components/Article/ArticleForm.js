// Creacion de Article
import { useContext, useState, useEffect, useRef } from "react"
import { TokenContext } from "@/contexts/TokenContext"
import { ArticleContext } from "@/contexts/ArticleContext"
//Controladores del formulario
import { handleChange } from "@/utils/handleChange"
import { fetchPostArticle } from "@/utils/api/fetchPostArticle"
// Utilidades para la validacion del formulario
import { useValidateFields } from "@/utils/hooks/useValidateFields"
import { validateFieldText } from "@/utils/validateFieldText"
import Link from "next/link"
const ArticleForm = ({data}) => {
    const { token } = useContext(TokenContext)
    const { toogleRender } = useContext(ArticleContext)
    // Estados del article
    const [articleData, setArticleData] = useState({
        title: '',
        content: ''
    })
    const [dataUser, setDataUser] = useState(localStorage.getItem('dataProfile') || { name: 'Loading...', username: 'Loading...' })
    const preventDataUser = useRef(localStorage.getItem('dataProfile') !== null)
  
    useEffect(() => {

      if (localStorage.getItem('dataProfile') && localStorage.getItem('dataProfile') !== 'undefined') {
        setDataUser(JSON.parse(localStorage.getItem('dataProfile')))
        console.log("hecho")
      }
    }, [localStorage.getItem('dataProfile')])

    // Validacion requerida de los campos (exclusivo de este componente)
    const validateLocal = () => {
        const validateErrors = {}
        if (articleData.title.length < 1 && articleData.content.length < 1) {
            validateErrors.title = 'No puede dejar ambos campos vacios'
            validateErrors.content = 'No puedes dejar ambos campos vacios'

        } else {
            validateErrors.title = articleData.title.length !== 0 ? validateFieldText(articleData, 'title', 0, 60) : "valid"
            validateErrors.content = articleData.content.length !== 0 ? validateFieldText(articleData, 'content', 0, 260) : "valid"
        }
        return validateErrors
    }
    // Funcion para vaciar el input y renderizar
    const action = () => {
        toogleRender()
        setArticleData({
            title: '',
            content: ''
        })
    }

    // Hook de validacion de campos
    const { validate, formValidation } = useValidateFields(validateLocal, () => fetchPostArticle(articleData, token, action))

    const handleSubmit = (e) => {
        validate(e)
    }

    return (
        <div style={{ width: "60%" }} className="container-sm m-4">
            <div className=" d-flex " >
                <Link href="/profile">
                    <img className="iconLink profile" src="https://th.bing.com/th/id/OIG1.qgdQ.k4SM9tOiXSWI2Jw?w=1024&h=1024&rs=1&pid=ImgDetMain"></img>
                </Link>
                <Link className=" mx-3 link-dark link-offset-2 link-underline link-underline-opacity-0" href="/profile">
                    <p className="h6 pt-2">{dataUser.name}</p>
                    <p >@{dataUser.username}</p>
                </Link>

            </div>
            <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className={`form-control rounded-pill ${(formValidation.title && formValidation.title !== 'valid') && 'is-invalid'}`}
                        id="title"
                        name="title"
                        placeholder="Título del articulo"
                        value={articleData.title}
                        onChange={
                            (e) => handleChange(e, articleData, setArticleData)
                        }
                        required />
                    {(formValidation.title && formValidation.title !== 'valid') && <div className="invalid-feedback"> {formValidation.title} </div>}
                </div>
                <div className="form-floating mb-3">
                    <textarea className={`form-control textareaArticle ${(formValidation.content && formValidation.content !== 'valid') && 'is-invalid'}`}
                        id="content"
                        name="content"
                        placeholder="Tu descripcion"
                        value={articleData.content}
                        onChange={
                            (e) => handleChange(e, articleData, setArticleData)
                        }
                        rows="3"
                        required>
                    </textarea>
                    <label htmlFor="content" className="text-body-secondary">Descripcion del articulo</label>
                    {(formValidation.content && formValidation.content !== 'valid') && <div className="invalid-feedback"> {formValidation.content} </div>}
                </div>
                <button type="submit" className="btn btn-outline-secondary">Publicar</button>
            </form>
        </div >
    )
}
export default ArticleForm