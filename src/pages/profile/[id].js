import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ArticlesAll from "@/components/Article/ArticlesAll";
import ConexionError from "@/components/Layout/ConexionError";
import ProfileVisitComponent from "@/components/User/ProfileVisitComponent";

const Profile = () => {
    const router = useRouter()
    const { id } = router.query

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
                const response = await fetch(`http://localhost:5000/user/profile/${id}`)
                if (!response.ok) {
                    if (response.status === 404) {
                        const error = new Error('Usuario no encontrado')
                        error.status = response.status
                        throw error
                    }
                }
                const profileData = await response.json();
                setUserProfile(profileData)
            } catch (error) {
                setErrorController({
                    controll: true,
                    status: error.status,
                    message: error.message
                })
                console.error(error)
            }
        })();
    }, [id]);

    if (errorController.controll) {
        return (<ConexionError statusError={errorController.status} message={errorController.message} ></ConexionError>)
    }
    if (userProfile === null) {
        return <div>Loading...</div>;
    }
    return (
        <main>
            <header>
                <ProfileVisitComponent profileData={userProfile}></ProfileVisitComponent>
            </header>
            <section>
                <ArticlesAll endpoint={`/article/user/${id}`} ></ArticlesAll>
            </section>
        </main>
    )
}
export default Profile;
