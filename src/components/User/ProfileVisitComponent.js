//Componente que muestra los datos del usuario
import Link from "next/link";
import { useState } from "react";
// Estilos
import stylesProfile from "@/styles/profile.module.css"
/**
 * @param {object} profileData - objeto con los datos del usuario 
 */
const ProfileVisitComponent = ({ profileData }) => {
    // Boton de detalles
    const [details, setDetails] = useState(false)

    return (
        <>
            <div class={`text-bg-dark ${stylesProfile.headerProfileContainer} ${details && stylesProfile['active']}`}>
                <div class={stylesProfile.profileBackroundContainer}>
                    <img className={stylesProfile.profileBackground} src="https://th.bing.com/th/id/OIG1.glJIctD5DwA61dYaMCDn?pid=ImgGn" alt="Profile" />
                </div>
                <div class={`m-3 ${stylesProfile.profileContent}`}>
                    <div className="d-flex">
                        <Link href="/profile">
                            <img style={{ width: "70px", height: "auto" }} className="iconLink profileIcon" src="https://th.bing.com/th/id/OIG1.qgdQ.k4SM9tOiXSWI2Jw?w=1024&h=1024&rs=1&pid=ImgDetMain"></img>
                        </Link>
                        <div className="px-2 pt-1">
                            <h5 class="card-title">{profileData.name} {profileData.lastName}</h5>
                            <p class="card-text">@{profileData.username}</p>
                        </div>
                    </div>
                    {/* Details */}
                    <div className="d-flex mt-3 mx-2" >
                        <svg onClick={() => setDetails(!details)} style={{ width: "30px" }} className={`iconLink ${details && 'text-info'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                        </svg>

                        <div className={`mx-4 ${details ? 'container' : 'd-none'} `}>
                            <h3 >Informacion del usuario</h3>

                            {/* details campos */}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-white bg-transparent">
                                    <label className="input-group-text text-white border-0 bg-transparent">Nombre: {profileData.name}</label>
                                </li>
                                <li className="list-group-item text-white bg-transparent">
                                    <label className="input-group-text text-white border-0 bg-transparent">Apellido: {profileData.lastName}</label>
                                </li>

                                <li className="list-group-item text-white bg-transparent">
                                    <label className="input-group-text text-white border-0 bg-transparent">Email: {profileData.email}</label>
                                </li>
                                <li className="list-group-item text-white bg-transparent">
                                    <label className="input-group-text text-white border-0 bg-transparent">Username: @{profileData.username}</label>
                                </li>
                                <li className="list-group-item text-white bg-transparent">
                                    <label className="input-group-text text-white border-0 bg-transparent"> Genero: {profileData.sex}</label>
                                </li>
                                <li className="list-group-item text-white bg-transparent">
                                    <label className="input-group-text text-white border-0 bg-transparent">  BirthDate: {profileData.birthDate}</label>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileVisitComponent;