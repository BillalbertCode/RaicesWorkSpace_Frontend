import { useState, useEffect, useContext } from "react";
import { TokenContext } from "@/contexts/TokenContext";
import ProfileComponente from "@/components/User/ProfileComponente";
import ArticlesAll from "@/components/Article/ArticlesAll";
import ProfileForm from "@/components/User/Forms/ProfileForm";
import ConexionError from "@/components/Layout/ConexionError";
import { fetchDeleteUser } from "@/utils/api/fetchDeleteUser";

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
            <ProfileComponente profileData={userProfile}></ProfileComponente>
            <ProfileForm token={token} set={setUserProfile}></ProfileForm>
            <button className="btn btn-danger" onClick={() => {
                fetchDeleteUser('/user/profile/', token, closedSession)
            }}>Eliminar Usuario</button>
            <ArticlesAll endpoint={`/article/user/${userProfile._id}`} ></ArticlesAll>
        </div >
    )
}
export default Profile;