//Componente que muestra los datos del usuario
/**
 * @param {object} profileData - objeto con los datos del usuario 
 */
const ProfileComponente = ({profileData}) => {
    return (
        <div className="container">
            <h1 className="display-4">Profile</h1>
            <div className="card">
                <h2 className="card-title">User Information</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Nombre: {profileData.name}</li>
                    <li className="list-group-item">Apellido: {profileData.lastName}</li>
                    <li className="list-group-item">Email: {profileData.email}</li>
                    <li className="list-group-item">Genero: {profileData.sex}</li>
                    <li className="list-group-item">Edad: {profileData.gear}</li>
                </ul>
            </div>
        </div>
    )
} 
export default ProfileComponente;