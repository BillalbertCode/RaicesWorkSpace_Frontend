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
        <div className={`text-bg-dark ${stylesProfile.cardProfileContainer} ${details && stylesProfile['active']}`}>
            <div className={stylesProfile.profileBackroundContainer}>
                <img className={stylesProfile.profileBackground} src="https://th.bing.com/th/id/OIG1.glJIctD5DwA61dYaMCDn?pid=ImgGn" alt="Profile" />
            </div>
            <div className={`m-3 ${stylesProfile.profileContent}`}>
                <div className="d-flex">
                    <Link href="/profile">
                        <img style={{ width: "70px", height: "auto" }} className="iconLink profileIcon" src="https://th.bing.com/th/id/OIG1.qgdQ.k4SM9tOiXSWI2Jw?w=1024&h=1024&rs=1&pid=ImgDetMain"></img>
                    </Link>
                    <div className="px-2 pt-1">
                        <h5 className="card-title">{profileData.name} {profileData.lastName}</h5>
                        <p className="card-text">@{profileData.username}</p>
                    </div>
                </div>
                {/* Details */}
                <div title="Informacion del usuario">
                    <svg onClick={() => setDetails(!details)} style={{ width: "30px" }} className='iconLink' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                    </svg>
                </div>

                <div className="d-flex mt-3 mx-2" >

                    <div className={`mx-4 ${details ? 'container' : 'd-none'} ${stylesProfile.containerList} `}>
                        <h3 >Informacion del usuario</h3>

                        {/* details campos */}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item p-1 pt-2 text-white bg-transparent border-0">
                                <p className="p-2 ps-4 m-0 text-white border w-50 rounded-pill bg-transparent"><span className="fw-bold me-2">Nombre:</span> {profileData.name}</p>
                            </li>
                            <li className="list-group-item p-1 pt-2 text-white bg-transparent border-0">
                                <p className="p-2 ps-4 m-0 text-white border w-50 rounded-pill bg-transparent"><span className="fw-bold me-2">Apellido:</span> {profileData.lastName}</p>
                            </li>

                            <li className="list-group-item p-1 pt-2 text-white bg-transparent border-0">
                                <p className="p-2 ps-4 m-0 text-white border w-50 rounded-pill bg-transparent"><span className="fw-bold me-2">Email:</span> {profileData.email}</p>
                            </li>
                            <li className="list-group-item p-1 pt-2 text-white bg-transparent border-0">
                                <p className="p-2 ps-4 m-0 text-white border w-50 rounded-pill bg-transparent"><span className="fw-bold me-2">Username:</span> @{profileData.username}</p>
                            </li>
                            <li className="list-group-item p-1 pt-2 text-white bg-transparent border-0">
                                <p className="p-2 ps-4 m-0 text-white border w-50 rounded-pill bg-transparent"> <span className="fw-bold me-2">Genero:</span> {profileData.sex}</p>
                            </li>
                            <li className="list-group-item p-1 pt-2 text-white bg-transparent border-0">
                                <p className="p-2 ps-4 m-0 text-white border w-50 rounded-pill bg-transparent">  <span className="fw-bold me-2">BirthDate:</span> {profileData.birthDate}</p>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileVisitComponent;