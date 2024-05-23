//Componente que muestra los datos del usuario
import Link from "next/link";
import { useState } from "react";
// Funciones
import { handleChange } from "@/utils/handleChange";
import { useValidateFields } from "@/utils/hooks/useValidateFields";
import { validateFieldText } from "@/utils/validateFieldText";
// Solicitud Fetch
import { fetchPut } from "@/utils/api/fetchPutUser";
// Estilos
import stylesInput from "@/styles/inputs.module.css"
import stylesProfile from "@/styles/profile.module.css"

import toast from "react-hot-toast";
import { useRouter } from "next/router";
/**
 * @param {object} profileData - objeto con los datos del usuario 
 */
const ProfileComponente = ({ token, profileData }) => {

    const router = useRouter()
    // Boton de detalles
    const [details, setDetails] = useState(false)
    // Boton de edicion de campos
    const [edit, setEdit] = useState({
        name: false,
        lastName: false,
        email: false
    })
    // funcion toogleEdit field, recibe un string como parametro
    const handleEdit = (field) => {
        setEdit({ ...edit, [field]: !edit[field] })
    }

    const [inputData, setInputData] = useState({
        name: '',
        lastName: '',
        email: ''
    })

    const validateField = (fieldName) => {
        const validateErrors = {}
        switch (fieldName) {
            case 'name':
                validateErrors.name = validateFieldText(inputData, 'name', 1, 32)
                return validateErrors
            case 'lastName':
                validateErrors.lastName = validateFieldText(inputData, 'lastName', 1, 32)
                return validateErrors

            case 'email':
                validateErrors.email = validateFieldText(inputData, 'email', 6, 254, /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)
                return validateErrors

            default:
                break;
        }
        return validateErrors
    }

    // Notificacion de modificacion del Usuario
    const toastFetch = (field) => {
        const info = toast.promise(fetchPut({ [field]: inputData[field] }, token, () => handleEdit(field)),
            {
                loading: 'Modificando Usuario...',
                success: <div>Modificacion Exitosa<br />
                    <small>Reniciar para ver los cambios</small>
                    <button className="btn btn-sm btn-secondary mx-1" onClick={() => router.push('../')}>
                        Reset
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg>
                    </button>
                </div>,
                error: 'Error al tratar de Modificar el usuario',
            }, {
            success: {
                duration: 10000
            }
        }).catch(error => {
            console.log(error)
            return error
        })
        return info
    }

    //  vailidacion de errores con hook
    const validacionName = useValidateFields(() => validateField('name'), () => toastFetch('name'))
    const validacionLastName = useValidateFields(() => validateField('lastName'), () => toastFetch('lastName'))
    const validacionEmail = useValidateFields(() => validateField('email'), () => toastFetch('email'))


    const handleSubmit = (e, field) => {
        switch (field) {
            case 'name':
                validacionName.validate(e)
                break;
            case 'lastName':
                validacionLastName.validate(e)
                break;
            case 'email':
                validacionEmail.validate(e)
                break;
            default:
                break;
        }
    }
    // Hook de validacion de campos
    return (
        <>
            <div class={`card text-bg-dark ${stylesProfile.headerProfileContainer} ${details && stylesProfile['active']}`}>
                <div class={stylesProfile.profileBackroundContainer}>
                    <img className={stylesProfile.profileBackground} src="https://th.bing.com/th/id/OIG1.glJIctD5DwA61dYaMCDn?pid=ImgGn" alt="Profile" />
                </div>
                <div class={`m-3 ${stylesProfile.profileContent}`}>
                    <div className="d-flex">
                        <Link href="/profile">
                            <img style={{ width: "70px", height: "auto" }} className="iconLink profileIcon" src="https://th.bing.com/th/id/OIG1.qgdQ.k4SM9tOiXSWI2Jw?w=1024&h=1024&rs=1&pid=ImgDetMain"></img>
                        </Link>
                        <div className="px-2 pt-1">
                            <h5 class="card-title">{profileData.name} {profileData.lastName}</h5>
                            <p class="card-text">@{profileData.username}</p>
                        </div>
                    </div>
                    {/* Details */}
                    <div className="d-flex mt-3 mx-2" >
                        <div title="Informacion del usuario">
                            <svg onClick={() => setDetails(!details)} style={{ width: "30px" }} className='iconLink' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                            </svg>
                        </div>

                        <div className={`mx-4 ${details ? 'container' : 'd-none'} `}>
                            <h3 >Informacion del usuario</h3>

                            {/* details campos */}
                            <ul className="list-group list-group-flush">

                                {/* Nombre */}
                                <EditField
                                    label="Nombre"
                                    fieldName={'name'}
                                    onEdit={edit}
                                    value={inputData}
                                    profileData={profileData}
                                    toogleEdit={() => handleEdit('name')}
                                    handleSubmit={(e) => handleSubmit(e, 'name')}
                                    onChange={(e) => handleChange(e, inputData, setInputData)}
                                    error={validacionName.formValidation.name}
                                >
                                </EditField>

                                {/* Apellido */}
                                <EditField
                                    label="Apellido"
                                    fieldName={'lastName'}
                                    onEdit={edit}
                                    value={inputData}
                                    profileData={profileData}
                                    toogleEdit={() => handleEdit('lastName')}
                                    handleSubmit={(e) => handleSubmit(e, 'lastName')}
                                    onChange={(e) => handleChange(e, inputData, setInputData)}
                                    error={validacionLastName.formValidation.lastName}
                                >
                                </EditField>
                                {/* Email */}
                                <EditField
                                    label="Email"
                                    fieldName={'email'}
                                    onEdit={edit}
                                    value={inputData}
                                    profileData={profileData}
                                    toogleEdit={() => handleEdit('email')}
                                    handleSubmit={(e) => handleSubmit(e, 'email')}
                                    onChange={(e) => handleChange(e, inputData, setInputData)}
                                    error={validacionEmail.formValidation.email}
                                >

                                </EditField>
                                <li className="list-group-item p-1 pt-2 text-white bg-transparent border-0">
                                    <p className="p-2 ps-4 m-0 text-white border w-50 rounded-pill bg-transparent"><span className="fw-bold me-2">Username:</span> @{profileData.username}</p>

                                </li>
                                <li className="list-group-item p-1 pt-2 text-white bg-transparent border-0">
                                    <p className="p-2 ps-4 m-0 text-white border w-50 rounded-pill bg-transparent"><span className="fw-bold me-2">Genero:</span> {profileData.sex}</p>
                                </li>
                                <li className="list-group-item p-1 pt-2  text-white bg-transparent border-0">
                                    <p className="p-2 ps-4 text-white border w-50 rounded-pill bg-transparent"> <span className="fw-bold me-2">BirthDate:</span> {profileData.birthDate}</p>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const EditField = ({
    label,
    value,
    onChange,
    onEdit,
    toogleEdit,
    fieldName,
    error,
    profileData,
    handleSubmit
}) => {
    return (
        <li className="list-group-item border-0  text-white bg-transparent">
            <div className="row">
                <div className="col d-flex flex-row border rounded-pill align-items-center input-group">
                    <label className="input-group-text text-white border-0 bg-transparent fw-bold">{label}:</label>
                    {onEdit[fieldName] ?
                        (
                            <>
                                <form className="d-flex "  onSubmit={handleSubmit}>
                                    <input className={`form-control form-control-sm text-white  border-0 bg-transparent ${stylesInput.inputTransparent}`}
                                        type="text"
                                        id={fieldName}
                                        name={fieldName}
                                        value={value[fieldName]}
                                        onChange={onChange}
                                        placeholder={label}
                                    >
                                    </input>
                                    <button title="Confirmar cambios" className="btn text-white" type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
                                            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
                                        </svg>
                                    </button>
                                </form>

                            </>

                        )
                        : <div>{profileData[fieldName]}</div>}
                    <button title={onEdit[fieldName] ? 'Cerrar edicion' : 'Editar'} onClick={toogleEdit} className="btn text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                    </button>
                </div>
                <div className="col d-flex align-items-center gap-2 text-danger">
                    {
                        (error && error !== 'valid') &&
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                            </svg>
                            {error}
                        </>
                    }
                </div>
            </div>
        </li>
    )
}

export default ProfileComponente;