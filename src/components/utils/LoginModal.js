import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from "next/router";
import Link from "next/link";
import { TokenContext } from "@/contexts/TokenContext";
import { handleChange } from "@/utils/handleChange"
import { fetchLogin } from "@/utils/api/fetchLogin";

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
                    <form onSubmit={(e) => fetchLogin(e, userData, handleSubmit)}>

                        <div className="row mb-4">

                            <div className="col">
                                <div className="form-floating">
                                    <input type="text"
                                        placeholder="Username"
                                        className="form-control text-primary "
                                        id="FloatingUsername"
                                        value={userData.username}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                    />
                                    <label className="text-primary-emphasis" htmlFor="FloatingUsername">Username</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className=" form-floating ">
                                    <input type="email"
                                        placeholder="Email"
                                        className="form-control "
                                        id="FloatingEmail" name="email"
                                        value={userData.email}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                    />
                                    <label htmlFor="FloatingEmail" className="text-secondary">Email </label>
                                </div>
                            </div>

                        </div>

                        <div className="input-group input-group mb-3">

                            <input type="password"
                                placeholder="Contraseña"
                                className="form-control "
                                id="password"
                                name="password"
                                value={userData.password}
                                onChange={(e) => handleChange(e, userData, setUserData)}
                                required />
                            <button type="submit" className="btn btn-outline-primary ">Iniciar Sesion</button>

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