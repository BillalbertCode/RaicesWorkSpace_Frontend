import { useState, useEffect, useContext } from "react";
import Head from "next/head";
// Contextos
import { TokenContext } from "@/contexts/TokenContext";
// Componentes
import ProfileComponente from "@/components/User/ProfileComponente";
import ArticlesAll from "@/components/Article/ArticlesAll";
import ArticleForm from "@/components/Article/ArticleForm";
import ConexionError from "@/components/Layout/ConexionError";
// Funciones Utiles
import UserDeleteModal from "@/components/utils/UserDeleteModal";
// Styles
import styleProfile from "@/styles/profile.module.css"


const Profile = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const { token, closedSession } = useContext(TokenContext)

    //Datos renderizados del usuario
    const [userProfile, setUserProfile] = useState(null)

    const [errorController, setErrorController] = useState({
        controll: false,
        message: '',
        status: ''
    })
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${apiUrl}/user/profile/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `${token}`
                    },
                })

                if (!response.ok) {
                    if (response.status === 401) {
                        const error = new Error('Aun no has iniciado sesion')
                        error.status = response.status
                        throw error
                    }
                }
                console.log(token)
                const profileData = await response.json();
                setUserProfile(profileData)
                setErrorController({
                    controll: false,
                    message: '',
                    status: ''
                })
            } catch (error) {
                setErrorController({
                    controll: true,
                    status: error.status,
                    message: error.message
                })
                console.error(error)
            }
        })();

    }, [token]);

    if (errorController.controll) {
        return (<ConexionError statusError={errorController.status} message={errorController.message} ></ConexionError>)
    }

    if (userProfile === null) {
        return <div>Loading...</div>;
    }

    return (
        <main data-bs-theme="dark" className="d-flex flex-column ">
            <Head>
                <title>Raices Perfil</title>
            </Head>
            <header className={`container mb-3 ${styleProfile.header}`}>
                <ProfileComponente token={token} profileData={userProfile}></ProfileComponente>
                <UserDeleteModal token={token} action={() => closedSession()}></UserDeleteModal>
            </header>

            <section className="container-fluid p-0 d-flex flex-column align-items-center">
                <ArticleForm ></ArticleForm>
                <ArticlesAll endpoint={`/article/user/${userProfile._id}`} ></ArticlesAll>
            </section>
        </main >
    )
}
export default Profile;