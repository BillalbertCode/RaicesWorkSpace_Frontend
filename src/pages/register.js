import Head from "next/head"
import RegisterForm from "@/components/User/Forms/RegisteForm"
const Register = () => {

    return (
        <main data-bs-theme="dark">
            <Head>
                <title>Raices Registro</title>
            </Head>
            <div className="container mt-5">
                <RegisterForm ></RegisterForm>
            </div>
        </main>
    )
}

export default Register