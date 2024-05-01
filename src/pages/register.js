import { useState } from "react"
import Link from "next/link"
import RegisterForm from "@/components/User/Forms/RegisteForm"
import styles from "@/styles/register.module.css"
const Register = () => {

    const [userEstado, setUserEstado] = useState(false)

    return (
        <div className={styles.registerBackground}>
            <div className={"container mt-5"}>
                {userEstado
                    ? (
                        <div>
                            <p>Registrado exitosamente, Bienvenido</p>
                            <Link href="/login"><p>Accede aqui</p></Link>
                        </div>
                    )
                    : (<RegisterForm set={setUserEstado}></RegisterForm>)}
            </div>
        </div>
    )
}

export default Register