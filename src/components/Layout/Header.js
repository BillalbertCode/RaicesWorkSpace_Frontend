import Link from "next/link";
// hooks
import { useState, useRef, useEffect } from "react";
// Context
import { useContext } from "react";
import { TokenContext } from "@/contexts/TokenContext";
// Componets
import LoginModal from "../utils/LoginModal";
// Styles
import stylesNavbar from "../../styles/navbar.module.css"



const Header = () => {
  const { loginStatus, closedSession } = useContext(TokenContext)

  // Cuadrados del fondo del navbar
  const [cuadrosBg, setCuadrosBg] = useState([])
  const navbarRef = useRef(null)

  // Me gustaria que esta funsion sea un objeto pero ya me e vuelto loco 
  const createCuadroBg = () => {
    // Tiempo para terminar la animacion
    const id = Math.random().toString(36).substr(2, 9);
    const tempoTranslateMin = 8
    const tempoTranslateMax = 15

    // Velocidad de rotacion que va a ser relativa a la velocidad de desplazamiento del cuadro 
    const rotateVelocimetroMin = 0.01 // porcentaje
    const rotateVelocimetroMax = 0.05 // porcentaje
    // tomamamos como referencia el ancho del contenedor
    const distancia = navbarRef.current.offsetWidth
    const alturaMin = 0
    const alturaMax = 100

    // Iniciamos con el objeto
    const altura = Math.floor(Math.random() * (alturaMax - alturaMin + 1) + alturaMin)
    const tempoTranslate = Math.floor(Math.random() * (tempoTranslateMax - tempoTranslateMin + 1) + tempoTranslateMin)
    const rotateVelocimetro = Math.random() * (rotateVelocimetroMax - rotateVelocimetroMin) + rotateVelocimetroMin
    // allamos la velocidad
    const velocidad = distancia / tempoTranslate
    const rotacion = velocidad * rotateVelocimetro

    // creamos los estilos para que el elemento pueda hacer las fisicas mensionadas
    const stylesCuadros = {
      bottom: `${altura}%`,
      'animation-duration': `${tempoTranslate}s`,
      transform: `rotate(${rotacion}turn)`
    }
    const removeCuadro = () => {
      setCuadrosBg((prevCuadrosBg) => prevCuadrosBg.filter((cuadro) => cuadro.key !== id))

    }
    // creamos el elemento
    setCuadrosBg((prevCuadrosBg) => [...prevCuadrosBg,
    <div
      style={stylesCuadros}
      className={stylesNavbar.bgAnimated}
      key={id}
      onClick={removeCuadro}
      onAnimationEnd={removeCuadro}
    >
    </div>

    ])
  }

  return (
    <nav ref={navbarRef} className="navbar navbar-expand-lg bg-transparent position-relative overflow-hidden">

      <div className="container-fluid ">
        {cuadrosBg}
        <button className="btn btn-success z-1 " onClick={createCuadroBg}>cuadro</button>
        <Link href="/" className="navbar-brand z-1" >Raices</Link>
        <button className="navbar-toggler z-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav z-1">
            <Link href="/" className="nav-link ">Home</Link>

            {/* Accion segun el estatus de inicio de sesion */}

            {loginStatus
              ? (<>
                <Link href="/profile" className="nav-link"> Profile</Link>
                <button className="btn btn-dark btn-sm" onClick={() => closedSession()}>Cerrar Sesion</button>
              </>)
              : <LoginModal></LoginModal>}
          </div>

          {/* Proximo */}
          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>
        {/* Cuadrados del fondo del navbar */}

      </div>
    </nav>
  );
}

export default Header