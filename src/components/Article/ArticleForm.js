// Creacion de un Article
// Este modulo contiene: 
//  Formulario y su diseño
//  Validacion del mismo
//  Notificacion si fue exitoso
//  Renderizacion del article en la lista

import { useContext, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
// Contexts
import { TokenContext } from "@/contexts/TokenContext"
import { ArticleContext } from "@/contexts/ArticleContext"
//Controladores del formulario
import { handleChange } from "@/utils/handleChange"
import { fetchPostArticle } from "@/utils/api/fetchPostArticle"
// Utilidades para la validacion del formulario
import { useValidateFields } from "@/utils/hooks/useValidateFields"
import { validateFieldText } from "@/utils/validateFieldText"
// Estilos
import inputStyle from "@/styles/inputs.module.css"
// Libreria de Notificaciones/Toast
import toast from "react-hot-toast"
const ArticleForm = () => {

    const { token } = useContext(TokenContext)
    const { addArticle } = useContext(ArticleContext)

    // Renderizacion de la data del usuario
    const [dataUser, setDataUser] = useState(localStorage.getItem('dataProfile') || { name: 'Loading...', username: 'Loading...' })

    useEffect(() => {
        if (localStorage.getItem('dataProfile') && localStorage.getItem('dataProfile') !== 'undefined') {
            setDataUser(JSON.parse(localStorage.getItem('dataProfile')))
        }
    }, [localStorage.getItem('dataProfile')])

    // Estados del formulario
    const [articleData, setArticleData] = useState({
        title: '',
        content: ''
    })

    // Validacion requerida de los campos (exclusivo de este componente)
    const validateLocal = () => {
        const validateErrors = {}
        if (articleData.title.length < 1 && articleData.content.length < 1) {
            validateErrors.title = 'No puede dejar ambos campos vacios'
            validateErrors.content = 'No puedes dejar ambos campos vacios'

        } else {
            validateErrors.title = articleData.title.length !== 0 ? validateFieldText(articleData, 'title', 0, 20) : "valid"
            validateErrors.content = articleData.content.length !== 0 ? validateFieldText(articleData, 'content', 0, 260) : "valid"
        }
        return validateErrors
    }

    // Creacion e implementacion de un nuevo article en el contexto
    // Esto es para Optimizar la vizualizacion de un nuevo article sin necesidad de un fetch
    const createArticle = () => {
        // datos para renderizar la lista de articulos
        // Este formato es el formato esperado por el componente ArticleCard
        // le falta solo el id del article que se obtiene en la base de datos
        const newArticle = {
            title: articleData.title,
            content: articleData.content,
            _id: Math.random(),
            author: {
                _id: dataUser._id,
                name: dataUser.name,
                lastName: dataUser.lastName,
                username: dataUser.username,
                profileIconUrl: dataUser.profileIconUrl
            },
            createAt: Date.now()
        };
        addArticle(newArticle)
    }

    // Funcion para vaciar el input y renderizar cuando se halla mandado exitosamente el post
    const action = () => {
        createArticle()
        setArticleData({
            title: '',
            content: ''
        })
    }

    // Promesa con la Notificacion del formulario + solicitud fetch
    const toastFetch = () => {
        const info = toast.promise(fetchPostArticle(articleData, token, action),
            {
                loading: 'Creando Articulo.. ',
                success: 'Articulo Creado',
                error: 'Problema al crear el articulo',
            }).catch(error => {
                console.error(error)
                return error
            })
        return info
    }

    // Hook de validacion de campos
    const { validate, formValidation } = useValidateFields(validateLocal, toastFetch)

    const handleSubmit = (e) => {
        validate(e)
    }

    return (
        <div className={`container-sm m-4 ${inputStyle.containerFormArticle}`}>
            <div className=" d-flex " >
                <Link href="/profile">
                    <Image width={60} height={60} className="iconLink profileIcon" src={dataUser.profileIconUrl || "/images/banner1.jfif"}/>
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
                        maxLength={20}
                        value={articleData.title}
                        onChange={
                            (e) => handleChange(e, articleData, setArticleData)
                        }
                        required />
                    {(formValidation.title && formValidation.title !== 'valid') && <div className="invalid-feedback"> {formValidation.title} </div>}
                </div>
                <div className="form-floating mb-3">
                    <textarea className={`form-control ${inputStyle.textareaArticle} ${(formValidation.content && formValidation.content !== 'valid') && 'is-invalid'}`}
                        id="content"
                        name="content"
                        placeholder="Tu descripcion"
                        maxLength={260}
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