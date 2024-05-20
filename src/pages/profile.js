import { useState, useEffect, useContext } from "react";
// Contextos
import { TokenContext } from "@/contexts/TokenContext";
// Componentes
import ProfileComponente from "@/components/User/ProfileComponente";
import ArticlesAll from "@/components/Article/ArticlesAll";
import ConexionError from "@/components/Layout/ConexionError";
// Funciones Utiles
import { fetchDeleteUser } from "@/utils/api/fetchDeleteUser";
import UserDeleteModal from "@/components/utils/UserDeleteModal";

const Profile = () => {
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
                const response = await fetch(`http://localhost:5000/user/profile/`, {
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

        <div className="container">
            <ProfileComponente token={token} profileData={userProfile}></ProfileComponente>
            <UserDeleteModal token={token} action={() => closedSession()}></UserDeleteModal>
            <ArticlesAll endpoint={`/article/user/${userProfile._id}`} ></ArticlesAll>
        </div >
    )
}
export default Profile;