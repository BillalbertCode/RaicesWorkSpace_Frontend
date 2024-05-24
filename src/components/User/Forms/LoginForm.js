// Formulario del Login que provee el token
import { useContext, useState } from "react";
import Link from "next/link";
// Contextos
import { TokenContext } from "@/contexts/TokenContext";
// Funciones
import { handleChange } from "@/utils/handleChange"
import { validateFieldText } from "@/utils/validateFieldText";
// Custom Hooks
import { useValidateFields } from "@/utils/hooks/useValidateFields";
// Perticiones
import { fetchLogin } from "@/utils/api/fetchLogin";

const LoginForm = () => {
    //Contexto para cambiar el token e iniciar sesion
    const { loginInit } = useContext(TokenContext)

    //Manejo del imput
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    // Validacion requerida de los campos (exclusivo de este componente)
    const validateLocal = () => {
        const validateErrors = {
            email: validateFieldText(userData, 'email', 6, 254, /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/),
            password: validateFieldText(userData, 'password', 8, 128)
        }
        return validateErrors
    }
    // Hook de validacion de campos
    const { validate, formValidation } = useValidateFields(validateLocal, () => fetchLogin(userData, (dataToken) => loginInit(dataToken)))

    const handleSubmit = (e) => {
        validate(e)
    }

    return (
        <div className="card border-primary bg-transparent " style={{ width: "80%"}} >
            <div className="card-header bg-metallic-animation text-light">
                <h5 className="h5 m-0">Iniciar Sesion</h5>
            </div>
            <div className="card-body px-4"> 
                <form noValidate onSubmit={handleSubmit}>

                    <div className="input-group input-group-sm mb-2">
                        <label htmlFor="emailgrop" className="input-group-text bg-metallic text-light">Email </label>
                        <input type="email"
                            placeholder="email@example.com"
                            className={`form-control ${(formValidation.email && formValidation.email !== 'valid') && 'is-invalid'}`}
                            id="emailgrop" name="email"
                            value={userData.email}
                            minLength={6}
                            maxLength={254}
                            onChange={(e) => handleChange(e, userData, setUserData)}
                            required />
                        {(formValidation.email && formValidation.email !== 'valid') && <div className="invalid-feedback"> {formValidation.email} </div>}
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <label htmlFor="password" className="input-group-text bg-metallic text-light bg-primary-subtle">Password</label>
                        <input type="password"
                            placeholder="contraseña1234"
                            className={`form-control ${(formValidation.password && formValidation.password !== 'valid') && 'is-invalid'}`}
                            id="password"
                            name="password"
                            minLength={8}
                            maxLength={128}
                            value={userData.password}
                            onChange={(e) => handleChange(e, userData, setUserData)}
                            required />
                        {(formValidation.password && formValidation.password !== 'valid') && <div className="invalid-feedback"> {formValidation.password} </div>}

                    </div>
                    <div className="row ">
                        <button type="submit" className="col-12 col-md-6 btn btn-outline-primary btn-sm mb-2">Iniciar Sesion</button>

                        <Link href="/register" className="col-12 col-md-6 justify-content-md-end icon-link icon-link-hover link-body-emphasis link-underline-opacity-0 mb-2">
                            Registrarse
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default LoginForm;