import Head from "next/head"
import RegisterForm from "@/components/User/Forms/RegisteForm"
import styles from "@/styles/register.module.css"
const Register = () => {

    return (
        <div className={styles.registerBackground}>
            <Head>
                <title>Raices Registro</title>
            </Head>
            <div className="container mt-5">
                <RegisterForm ></RegisterForm>
            </div>
        </div>
    )
}

export default Register