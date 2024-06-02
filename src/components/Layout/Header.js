import Link from "next/link";
// hooks
import { useState, useEffect } from "react";
// Context
import { useContext } from "react";
import { TokenContext } from "@/contexts/TokenContext";
// Componets
import LoginModal from "../utils/LoginModal";
// Styles
import stylesNavbar from "../../styles/navbar.module.css"



const Header = () => {
  const { loginStatus, closedSession } = useContext(TokenContext)


  return (
    <nav className="navbar navbar-expand-lg bg-transparent position-relative overflow-hidden">
      <div className={`${stylesNavbar.bgAnimated}`}></div>
      <div className="container-fluid ">
      <button className="btn btn-success" onClick={createCuadro}>Crear cuadro</button>
        <Link href="/" className="navbar-brand" >Raices</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
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
      </div>
    </nav>
  );
}

export default Header