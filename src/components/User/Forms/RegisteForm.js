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
        <div className="row justify-content-center ">
            <div className="col-md-6 mb-5 " >
                <div className="card shadow">
                    <div className="card-header bg-primary text-light">
                        <h2>Raices - Registro</h2>
                    </div>

                    <div className="card-body">
                        <form onSubmit={
                            (e) => fetchPostRegister
                                (e,
                                    userData,
                                    '/user/register',
                                    () => set(true)
                                )
                        }>
                            {/* Campo Username */}
                            <div className="input-group mb-3">
                                <label htmlFor="floatingUsername" className="input-group-text bg-primary-subtle">@</label>

                                <div className="form-floating " title="ejemplo de username (agricultor123)">
                                    <input type="text"
                                        className="form-control"
                                        id="floatingUsername"
                                        name="username"
                                        placeholder="username"
                                        value={userData.username}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                        required />
                                    <label htmlFor="floatingUsername" >Username</label>
                                </div>
                            </div>

                            {/* Campo Password */}
                            <div className="input-group mb-3">
                                <label htmlFor="floatingPassword" className="input-group-text bg-primary-subtle">#</label>

                                <div className="form-floating">
                                    <input type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        id="floatingPassword"
                                        name="password"
                                        value={userData.password}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                        required />
                                    <label htmlFor="floatingPassword">Contraseña</label>
                                </div>
                            </div>

                            {/* Campo Nombre y Apellido */}
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        id="name"
                                        name="name"
                                        value={userData.name}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                        required />
                                </div>

                                <div className="col">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Apellido"
                                        id="lastName"
                                        name="lastName"
                                        value={userData.lastName}
                                        onChange={(e) => handleChange(e, userData, setUserData)}
                                        required />
                                </div>
                            </div>

                            {/* Campo email */}
                            <div className=" mb-3">
                                <input type="email"
                                    className="form-control "
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    value={userData.email}
                                    onChange={(e) => handleChange(e, userData, setUserData)}
                                    required />
                            </div>

                            {/* Campo fecha de nacimiento */}
                            <div className="input-group mb-3">
                                <label htmlFor="gear" className="input-group-text bg-primary-subtle">Fecha de Nacimiento </label>
                                <input type="date"
                                    id="gear"
                                    className="form-control"
                                    name="gear"
                                    value={userData.gear}
                                    onChange={(e) => handleChange(e, userData, setUserData)}
                                    required />
                            </div>

                            {/* Campo genero */}
                            <select className="form-select  mb-3"
                                id="sex"
                                name="sex"
                                value={userData.sex}
                                onChange={(e) => handleChange(e, userData, setUserData)} 
                                required>
                                <option value="" disabled>Genero</option>
                                <option value="Hombre">Hombre</option>
                                <option value="Mujer">Mujer</option>
                                <option value="Arbol">Arbol</option>
                                <option value="Plantita">Plantita..</option>
                                <option value="Raiz">Raiz</option>
                            </select>
                            <div className="form-check mb-3 mx-1">
                                <input className="form-check-input" 
                                type="checkbox"
                                name="condiciones" 
                                id="flexCheckDefault"
                                 />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Terminos y condiciones
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary mx-1">Registrarse</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    )
}
export default RegisterForm;