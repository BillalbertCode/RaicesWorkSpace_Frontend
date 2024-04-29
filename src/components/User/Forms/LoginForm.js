// Formulario del Login que provee el token
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TokenContext } from "@/contexts/TokenContext";
import { handleChange } from "@/utils/handleChange"
import { fetchLogin } from "@/utils/api/fetchLogin";

const LoginForm = () => {
    //Contexto para cambiar el token
    const { setDataToken } = useContext(TokenContext)
    const router = useRouter()

    //Manejo del imput
    const [userData, setUserData] = useState({
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
        <form onSubmit={(e) => fetchLogin(e, userData, handleSubmit)}>
            <div className="input-group input-group-sm mb-2">
                <label htmlFor="emailgrop" className="pointer input-group-text bg-primary-subtle">Email </label>
                <input type="email"
                    placeholder="email@example.com"
                    className="form-control "
                    id="emailgrop" name="email"
                    value={userData.email}
                    onChange={(e) => handleChange(e, userData, setUserData)}
                    required />
            </div>
            <div className="input-group input-group-sm mb-3">
                <label htmlFor="password" className="input-group-text bg-primary-subtle">Password</label>
                <input type="password"
                    placeholder="contraseña1234"
                    className="form-control form-control-sm"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={(e) => handleChange(e, userData, setUserData)}
                    required />
            </div>
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary btn-sm mb-2">Iniciar Sesion</button>

                <Link href="/register" className="icon-link icon-link-hover link-body-emphasis link-underline-opacity-0 mb-2">Registrarse
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg>
                </Link>
            </div>
        </form>
    )
}

export default LoginForm;