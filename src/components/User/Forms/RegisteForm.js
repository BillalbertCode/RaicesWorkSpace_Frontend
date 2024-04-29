// Formulario de registro
import { useState } from "react";
import { fetchPostRegister } from "@/utils/api/fetchPostRegister";
import { handleChange } from "@/utils/handleChange"
/**
 * 
 * @param {function} set - para setear el estado del padre 
 */
const RegisterForm = ({ set }) => {
    //Manejo del input de los datos
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        name: '',
        lastName: '',
        password: '',
        gear: '',
        sex: ''
    })
    return (
        //Peticion de registro
        <form onSubmit={
            (e) => fetchPostRegister
                (e,
                    userData,
                    '/user/register',
                    () => set(true)
                )
        }>
            <div className="mb-3">
                <h2>Registro</h2>
                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                <input type="text"
                    className="form-control"
                    id="username" name="username"
                    value={userData.username}
                    onChange={(e) => handleChange(e, userData, setUserData)}
                    required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={(e) => handleChange(e, userData, setUserData)}
                    required />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={(e) => handleChange(e, userData, setUserData)}
                    required />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Apellido</label>
                <input type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={(e) => handleChange(e, userData, setUserData)}
                    required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={(e) => handleChange(e, userData, setUserData)}
                    required />
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="gear">Gear</label>
                <input type="text"
                    id="gear"
                    className="form-control"
                    name="gear"
                    value={userData.gear}
                    onChange={(e) => handleChange(e, userData, setUserData)}
                    required />
            </div>
            <div className="form-outline mb-4">
                <select className="form-control"
                    id="sex"
                    name="sex"
                    value={userData.sex}
                    onChange={(e) => handleChange(e, userData, setUserData)} required>
                    <option value="" disabled>Select your option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label className="form-label" htmlFor="sex">Sex</label>
            </div>
            <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
    )
}
export default RegisterForm;