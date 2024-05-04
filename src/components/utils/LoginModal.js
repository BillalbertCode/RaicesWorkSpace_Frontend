import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from "next/router";
import Link from "next/link";
import { TokenContext } from "@/contexts/TokenContext";
import { handleChange } from "@/utils/handleChange"
import { fetchLogin } from "@/utils/api/fetchLogin";
import { validateFieldText } from '@/utils/validateFieldText';

const LoginModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //  Codigo Usado dos veces, se puede refactorizar

    //Contexto para cambiar el token
    const { setDataToken } = useContext(TokenContext)
    const router = useRouter()

    //Manejo del imput
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [formValidation, setFormValidation] = useState(false)

    const validate = () => {
        const validateErrors = {
            username: validateFieldText(userData, 'username', 4, 32),
            email: validateFieldText(userData, 'email', 6, 254, /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/),
            password: validateFieldText(userData, 'password', 8, 128)
        }

        // Comprobamos si todas los valores del objeto son iguales
        const invalidFields = Object.values(validateErrors).some(value => value !== 'valid')
        //si todos los campos son correctos enviamos true para proseguir con el formulario
        if (invalidFields) {
            setFormValidation(validateErrors)
            return (false)
        } else {
            setFormValidation(validateErrors)
            return (true)
        }
    }

    //Accion esperada de fetchLogin
    const handleSubmit = (token) => {
        //Guardamos el token en el contexto
        setDataToken(token)
        //Mandamos al inicion despues de logearnos
        router.push('/')
    }
    return (
        <>
            {/* Boton a cambiar pasar solo la funcion al padre para que controle el evento de click con un boton propio  */}
            <Button variant='none' onClick={handleShow}>
                Iniciar Sesion
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="bg-dark text-light" closeButton>
                    <Modal.Title>Iniciar Sesion</Modal.Title>
                </Modal.Header>

                <Modal.Body className="pt-1">

                    <div className="form-text m-2">Puedes Iniciar sesion con Username o el Email</div>
                    <form noValidate onSubmit={(e) => {
                        e.preventDefault()
                        if (validate()) {
                            fetchLogin(e, userData, handleSubmit)
                        }
                    }}>

                        <div className="row mb-4">

                            <div className="col">
                                <div className="form-floating">
                                    <input type="text"
                                        placeholder="Username"
                                        className={`form-control text-primary ${(formValidation.username && formValidation.username !== 'valid') && 'is-invalid'}`}
                                        name='username'
                                        id="FloatingUsername"
                                        value={userData.username}
                                        minLength={4}
                                        maxLength={32}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                    />
                                    <label className="text-primary-emphasis" htmlFor="FloatingUsername">Username</label>
                                    {(formValidation.username && formValidation.username !== 'valid') && <div className='invalid-feedback mx-2'>{formValidation.username}</div>}
                                </div>

                            </div>

                            <div className="col">
                                <div className=" form-floating ">
                                    <input type="email"
                                        placeholder="Email"
                                        className={`form-control ${(formValidation.email && formValidation.email !== 'valid') && 'is-invalid'}`}
                                        id="FloatingEmail" name="email"
                                        value={userData.email}
                                        minLength={6}
                                        maxLength={254}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                    />
                                    <label htmlFor="FloatingEmail" className="text-secondary">Email </label>
                                    {(formValidation.email && formValidation.email !== 'valid') && <div className='invalid-feedback mx-2'>{formValidation.email}</div>}

                                </div>
                            </div>

                        </div>

                        <div className="input-group input-group mb-3">

                            <input type="password"
                                placeholder="Contraseña"
                                className={`form-control  ${(formValidation.password && formValidation.password !== 'valid') && 'is-invalid'}`}
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
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
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