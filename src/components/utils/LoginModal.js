import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Link from "next/link";
import { TokenContext } from "@/contexts/TokenContext";
import { handleChange } from "@/utils/handleChange"
import { fetchLogin } from "@/utils/api/fetchLogin";
import { validateFieldText } from '@/utils/validateFieldText';
import { useValidateFields } from '@/utils/hooks/useValidateFields';

const LoginModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Contexto para cambiar el token e iniciar sesion
    const { loginInit } = useContext(TokenContext)

    //Manejo del imput
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })
    // Validacion requerida de los campos (exclusivo de este componente)
    const validateLocal = () => {
        // perdi la cordura help
        const validateErrors = {
            username: (userData.email.length == 0 && userData.username.length != 0 || userData.username.length != 0 && userData.email.length != 0 || userData.username.length == 0 && userData.email.length == 0) ? validateFieldText(userData, 'username', 4, 32) : "valid",
            email: (userData.username.length == 0 && userData.email.length != 0 || userData.username.length != 0 && userData.email.length != 0) ? validateFieldText(userData, 'email', 0, 254, /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/) : "valid",
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
        <>
            {/* Boton a cambiar pasar solo la funcion al padre para que controle el evento de click con un boton propio  */}
            <Button variant='outline-light' onClick={handleShow}>
                Iniciar Sesion
            </Button>

            <Modal data-bs-theme="dark" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar Sesion</Modal.Title>
                </Modal.Header>

                <Modal.Body className=" pt-1">

                    <div className="form-text m-2">Puedes Iniciar sesion con Username o el Email</div>
                    <form noValidate onSubmit={handleSubmit}>

                        <div className="row mb-4">

                            <div className="col">
                                <div className="form-floating">
                                    <input type="text"
                                        placeholder="Username"
                                        className={`form-control border-primary text-primary ${(formValidation.username && formValidation.username !== 'valid') && 'is-invalid'}`}
                                        name='username'
                                        id="FloatingUsername"
                                        value={userData.username}
                                        minLength={4}
                                        maxLength={32}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                    />
                                    <label className="text-primary" htmlFor="FloatingUsername">Username</label>
                                    {(formValidation.username && formValidation.username !== 'valid') && <div className='invalid-feedback mx-2'>{formValidation.username}</div>}
                                </div>

                            </div>

                            <div className="col">
                                <div className=" form-floating ">
                                    <input type="email"
                                        placeholder="Email"
                                        className={`form-control text-light ${(formValidation.email && formValidation.email !== 'valid') && 'is-invalid'}`}
                                        id="FloatingEmail" name="email"
                                        value={userData.email}
                                        minLength={6}
                                        maxLength={254}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                    />
                                    <label htmlFor="FloatingEmail" className='text-light'>Email </label>
                                    {(formValidation.email && formValidation.email !== 'valid') && <div className='invalid-feedback mx-2'>{formValidation.email}</div>}

                                </div>
                            </div>

                        </div>

                        <div className="input-group input-group mb-3" >

                            <input type="password"
                                placeholder="Contraseña"
                                className={`form-control ${(formValidation.password && formValidation.password !== 'valid') && 'is-invalid'}`}
                                id="password"
                                name="password"
                                value={userData.password}
                                minLength={8}
                                maxLength={128}
                                onChange={(e) => handleChange(e, userData, setUserData)}
                                required />

                            <button type="submit" className="btn btn-outline-primary rounded-end">Iniciar Sesion</button>

                            {(formValidation.password && formValidation.password !== 'valid') && <div className='invalid-feedback mx-2'>{formValidation.password}</div>}
                        </div>

                        <div className="d-flex justify-content-center">

                            <Link href="/register" className="icon-link icon-link-hover link-body-emphasis link-underline-opacity-0 mb-2">Registrarse
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg>
                            </Link>

                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default LoginModal;