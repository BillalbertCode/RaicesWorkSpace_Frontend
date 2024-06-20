// Formulario de registro
import { useState, useContext } from "react";
import Image from "next/image";
// Context
import { TokenContext } from "@/contexts/TokenContext";
// Api && fetch
import { fetchPostRegister } from "@/utils/api/fetchPostRegister";
// Hooks
import { useValidateFields } from "@/utils/hooks/useValidateFields";
// funciones
import { handleChange } from "@/utils/handleChange"
import { verifyPassword } from "@/utils/verifyPassword";
import { validateFieldText } from "@/utils/validateFieldText";
import { requireAge } from "@/utils/requireAge";
// Estilos
import styles from "@/styles/register.module.css"

const RegisterForm = () => {
    const { loginInit, loginStatus } = useContext(TokenContext)

    //Manejo del input de los datos
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        name: '',
        lastName: '',
        password: '',
        birthDate: '',
        sex: '',
        profileIconUrl: ''
    })
    const iconsUrl = [
        { id: 1, name: 'icono1', url: "/images/icons/icono1.jpg" },
        { id: 2, name: 'icono2', url: "/images/icons/icono2.jpg" },
        { id: 3, name: 'icono3', url: "/images/icons/icono3.jpg" },
        { id: 4, name: 'icono4', url: "/images/icons/icono4.jpg" },
        { id: 5, name: 'icono5', url: "/images/icons/icono5.jpg" },
        { id: 6, name: 'icono6', url: "/images/icons/icono6.jpg" },
        { id: 7, name: 'icono7', url: "/images/icons/icono7.jpg" },
        { id: 8, name: 'icono8', url: "/images/icons/icono8.jpg" },
        { id: 9, name: 'icono9', url: "/images/icons/icono9.jpg" },
        { id: 10, name: 'icono10', url: "/images/icons/icono10.jpg" },
        { id: 11, name: 'icono11', url: "/images/icons/icono11.jpg" },
        { id: 12, name: 'icono12', url: "/images/icons/icono12.jpg" }
    ]
    const [activeIcon, setActiveIcon] = useState(null);

    const handleIconClick = (icon) => {
        setActiveIcon(icon.id);
        setUserData((prevUserData) => ({ ...prevUserData, profileIconUrl: icon.url }));
    };


    // Este control solo habilita el boton de enviar al aceptar los terminos y condiciones
    const [acceptTerminos, setAcceptTerminos] = useState(false)

    const validateLocal = () => {
        // Funcion de contraseña segura
        // devuelve, si es segura o no, y el mensaje de error
        const validPassword = verifyPassword(userData.password)

        // Funcion de Validacion de los campos
        const validateErrors = {
            username: validateFieldText(userData, 'username', 4, 32),
            password: validPassword.valid === false ? validPassword.message : 'valid',
            email: validateFieldText(userData, 'email', 6, 254, /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/),
            name: validateFieldText(userData, 'name', 1, 32),
            lastName: validateFieldText(userData, 'lastName', 1, 32),
            // Validacion de la edad sea mayor a 12 años
            birthDate: userData.birthDate ? requireAge(userData.birthDate, 12) : 'Coloque su fecha de Nacimiento',
            sex: userData.sex.length != 0 ? 'valid' : 'Elija alguna Opcion',
            profileIconUrl: userData.profileIconUrl.length != 0 ? 'valid' : 'Elija alguna Opcion'
        }

        return validateErrors
    }
    const actionUserRegister = (dataToken) => {
        loginInit(dataToken)
    }
    // Hook de validacion de campos
    const { validate, formValidation } = useValidateFields(validateLocal, () => fetchPostRegister(userData, actionUserRegister))

    const handleSubmit = (e) => {
        validate(e)
    }

    return (
        //Peticion de registro
        // Mewing
        <div className="row justify-content-center ">
            {
                loginStatus ? <p className="text-white">Usted ya a iniciado sesion, que hace aqui? 😡 </p> :
                    <div className="col-md-6 mb-5 " >
                        <div className={`card ${styles.registerForm}`} >
                            <div className="card-header bg-primary text-light">
                                <h2>Raices - Registro</h2>
                            </div>

                            <div className="card-body">
                                <form noValidate onSubmit={handleSubmit}>
                                    {/* Campo Username */}
                                    <div className="input-group mb-3">
                                        <label
                                            htmlFor="floatingUsername"
                                            // Modificacion del label segun el estatus del formulario
                                            className={`input-group-text  
                                    ${formValidation.username === 'valid'
                                                    ? 'bg-success-subtle'
                                                    : formValidation.username
                                                        ? 'bg-danger-subtle' : 'bg-primary-subtle'} `} >@</label>

                                        <div
                                            title="ejemplo de username (agricultor123)"
                                            // Validacion para el mensaje del label
                                            className={`form-floating 
                                            ${formValidation.username === 'valid'
                                                    ? 'is-valid'
                                                    : formValidation.username && 'is-invalid'}`}>

                                            <input type="text"
                                                // Validacion del formulario con 3 estados default, valid e invalid
                                                className={`form-control 
                                        ${formValidation.username === 'valid'
                                                        ? 'is-valid rounded-end'
                                                        : formValidation.username && 'is-invalid rounded-end'}`}
                                                id="floatingUsername"
                                                name="username"
                                                placeholder="username"
                                                value={userData.username}
                                                minLength={4}
                                                maxLength={32}
                                                onChange={(e) => handleChange(e, userData, setUserData)}
                                                required />
                                            <label htmlFor="floatingUsername" >Username</label>
                                        </div>
                                        {/* Mensaje segun su estado de validacion */}
                                        {formValidation.username === 'valid'
                                            ? <div className="valid-feedback"> Se ve bien!</div>
                                            : formValidation.username && <div className="invalid-feedback">{formValidation.username}</div>}
                                    </div>

                                    {/* Campo Password */}
                                    <div className="input-group mb-3">

                                        <label
                                            htmlFor="floatingPassword"
                                            // Modificacion del label segun el estatus del formulario
                                            className={`input-group-text  
                                    ${formValidation.password === 'valid'
                                                    ? 'bg-success-subtle'
                                                    : formValidation.password
                                                        ? 'bg-danger-subtle' : 'bg-primary-subtle'} `}>#</label>
                                        <div
                                            // Validacion para el mensaje del label
                                            className={`form-floating  
                                    ${formValidation.password === 'valid'
                                                    ? 'is-valid'
                                                    : formValidation.password && 'is-invalid'}`}>
                                            <input type="password"
                                                // Validacion del formulario con 3 estados default, valid e invalid
                                                className={`form-control 
                                        ${formValidation.password === 'valid'
                                                        ? 'is-valid rounded-end'
                                                        : formValidation.password && 'is-invalid rounded-end'}`}
                                                placeholder="Contraseña"
                                                id="floatingPassword"
                                                name="password"
                                                value={userData.password}
                                                minLength={8}
                                                maxLength={128}
                                                onChange={(e) => handleChange(e, userData, setUserData)}
                                                required />
                                            <label htmlFor="floatingPassword">Contraseña</label>
                                        </div>
                                        {/* Mensaje segun su estado de validacion */}
                                        {formValidation.password === 'valid'
                                            ? <div className="valid-feedback">Contraseña Segura!</div>
                                            : formValidation.password && <div className="invalid-feedback">{formValidation.password}</div>}
                                    </div>

                                    {/* Campo Nombre y Apellido */}
                                    <div className="row mb-3">
                                        <div className="col">

                                            <input type="text"
                                                // Validacion del formulario con 3 estados default, valid e invalid
                                                className={`form-control 
                                        ${formValidation.name === 'valid'
                                                        ? 'is-valid rounded'
                                                        : formValidation.name && 'is-invalid rounded'}`}
                                                placeholder="Nombre"
                                                id="name"
                                                name="name"
                                                minLength={1}
                                                maxLength={32}
                                                value={userData.name}
                                                onChange={(e) => handleChange(e, userData, setUserData)}
                                                required />

                                            {/* Mensaje segun su estado de validacion */}
                                            {formValidation.name === 'valid'
                                                ? <div className="valid-feedback">Perfecto!</div>
                                                : formValidation.name && <div className="invalid-feedback">{formValidation.name}</div>}

                                        </div>

                                        <div className="col">
                                            <input type="text"
                                                // Validacion del formulario con 3 estados default, valid e invalid
                                                className={`form-control 
                                        ${formValidation.lastName === 'valid'
                                                        ? 'is-valid rounded'
                                                        : formValidation.lastName && 'is-invalid rounded'}`}
                                                placeholder="Apellido"
                                                id="lastName"
                                                name="lastName"
                                                minLength={1}
                                                maxLength={32}
                                                value={userData.lastName}
                                                onChange={(e) => handleChange(e, userData, setUserData)}
                                                required />

                                            {/* Mensaje segun su estado de validacion */}
                                            {formValidation.lastName === 'valid'
                                                ? <div className="valid-feedback">Perfecto!</div>
                                                : formValidation.lastName && <div className="invalid-feedback">{formValidation.lastName}</div>}

                                        </div>
                                    </div>

                                    {/* Campo email */}
                                    <div className=" mb-3">
                                        <input type="email"
                                            // Validacion del formulario con 3 estados default, valid e invalid
                                            className={`form-control 
                                    ${formValidation.email === 'valid'
                                                    ? 'is-valid'
                                                    : formValidation.email && 'is-invalid rounded'}`}
                                            id="email"
                                            placeholder="Email"
                                            name="email"
                                            minLength={6}
                                            maxLength={254}
                                            value={userData.email}
                                            onChange={(e) => handleChange(e, userData, setUserData)}
                                            required />

                                        {/* Mensaje segun su estado de validacion */}
                                        {formValidation.email === 'valid'
                                            ? <div className="valid-feedback">Se ve bien!</div>
                                            : formValidation.email && <div className="invalid-feedback">{formValidation.email}</div>}
                                    </div>

                                    {/* Campo fecha de nacimiento */}
                                    <div className="input-group mb-3">
                                        <label
                                            htmlFor="birthDate"
                                            // Modificacion del label segun el estatus del formulario
                                            className={`input-group-text 
                                    ${formValidation.birthDate === 'valid'
                                                    ? 'bg-success-subtle'
                                                    : formValidation.birthDate
                                                        ? 'bg-danger-subtle'
                                                        : 'bg-primary-subtle'} `}>Fecha de Nacimiento </label>
                                        <input type="date"
                                            id="birthDate"
                                            // Validacion del formulario con 3 estados default, valid e invalid
                                            className={`form-control 
                                    ${formValidation.birthDate === 'valid'
                                                    ? 'is-valid rounded-end'
                                                    : formValidation.birthDate && 'is-invalid rounded-end'}`}
                                            name="birthDate"
                                            value={userData.birthDate}
                                            onChange={(e) => handleChange(e, userData, setUserData)}
                                            required />

                                        {/* Mensaje segun su estado de validacion */}
                                        {formValidation.birthDate === 'valid'
                                            ? <div className="valid-feedback">Perfecto!</div>
                                            : formValidation.birthDate && <div className="invalid-feedback">{formValidation.birthDate}</div>}

                                    </div>

                                    {/* Campo genero */}
                                    <div className="mb-3">

                                        <select
                                            id="sex"
                                            name="sex"
                                            // Validacion del formulario con 3 estados default, valid e invalid
                                            className={`form-select      
                                    ${formValidation.sex === 'valid'
                                                    ? 'is-valid rounded'
                                                    : formValidation.sex && 'is-invalid rounded'}`}
                                            value={userData.sex}
                                            onChange={(e) => handleChange(e, userData, setUserData)}
                                            required>
                                            <option value="" disabled>Genero</option>
                                            <option value="Hombre">Hombre</option>
                                            <option value="Mujer">Mujer</option>
                                            <option value="Arbol">Arbol</option>
                                            <option value="Plantita">Plantita..</option>
                                            <option value="Raiz">Raiz</option>
                                        </select>

                                        {/* Mensaje segun su estado de validacion */}
                                        {formValidation.sex === 'valid'
                                            ? <div className="valid-feedback">Perfecto! </div>
                                            : formValidation.sex && <div className="invalid-feedback">{formValidation.sex}</div>}

                                    </div>
                                    {/* Icons */}
                                    <div className='text-center mb-3'>
                                        <p>Elije un Icono de Perfil</p>
                                        {formValidation.profileIconUrl === 'valid'
                                            ? <div className="text-success">Buen icono! </div>
                                            : formValidation.profileIconUrl && <div className="text-danger">{formValidation.profileIconUrl}</div>}
                                        {iconsUrl.map((icon, index) => (
                                            <Image
                                                key={index}
                                                className={`col m-1 rounded-circle iconLink ${activeIcon === icon.id ? 'active border border-primary' : ''}`}
                                                style={{ width: '80px ', height: '80px ' }}
                                                src={icon.url}
                                                alt={icon.name}
                                                width={100}
                                                height={100}
                                                onClick={() => handleIconClick(icon)}
                                            />
                                        ))}
                                    </div>

                                    {/*  Checkbox de aceptar los terminos, controla el boton de disable*/}
                                    {/* esta informacion no se envia al backend, solo habilita el boton  */}
                                    <div style={{ height: "40px" }} className="form-check mb-3 mx-1">
                                        <input className="form-check-input"
                                            type="checkbox"
                                            name="condiciones"
                                            id="flexCheckDefault"
                                            checked={acceptTerminos}
                                            onChange={(e) => setAcceptTerminos(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Terminos y condiciones
                                        </label>
                                        <div className="form-text ">  {!acceptTerminos && "Accepta terminos y condiciones para continuar"}</div>

                                    </div>
                                    <button type="submit" className="btn btn-primary mx-2 my-4" disabled={!acceptTerminos} >Registrarse</button>
                                </form>
                            </div>
                        </div>
                    </div >
            }
        </div >
    )
}
export default RegisterForm;