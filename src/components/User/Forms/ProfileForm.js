// Componente de formulario 
// Este componente Envia un put para cambiar el valor del componente
import { fetchPut } from "@/utils/api/fetchPutUser"
import { handleChange } from "@/utils/handleChange"
import { useState } from "react"
/**
 * @param {string} token - token del usuario
 * @param {function} set - set para renderizacion del componente padre
 */
const ProfileForm = ({ token, set }) => {
    // Datos editables del form
    const [profileData, setProfileData] = useState({
        name: '',
        lastName: '',
        email: '',
        sex: '',
        birthDate: ''
    })
    return (
        <div className="container">
            <h2>Edit Profile</h2>
            <form className="mb-5"
                onSubmit={
                    (e) => fetchPut
                        (e,
                            profileData,
                            '/user/profile/',
                            token,
                            () => set(profileData)
                        )
                }>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Nombre:</label>
                    <input className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={(e) => handleChange(e, profileData, setProfileData)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name:</label>
                    <input className="form-control"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleChange(e, profileData, setProfileData)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={(e) => handleChange(e, profileData, setProfileData)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="sex">Sex:</label>
                    <input className="form-control"
                        type="text"
                        id="sex"
                        name="sex"
                        value={profileData.sex}
                        onChange={(e) => handleChange(e, profileData, setProfileData)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="birthDate">birthDate:</label>
                    <input className="form-control"
                        type="text"
                        id="birthDate"
                        name="birthDate"
                        value={profileData.birthDate}
                        onChange={(e) => handleChange(e, profileData, setProfileData)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
        </div>
    )
}
export default ProfileForm;