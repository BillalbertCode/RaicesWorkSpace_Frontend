import Link from "next/link";
// hooks
import { useRef } from "react";
import { useContext } from "react";
// Context
import { TokenContext } from "@/contexts/TokenContext";
// Componets
import LoginModal from "../utils/LoginModal";
import CuadroAnimation from "../utils/CuadroAnimation";
// Components Botstrap
import { Container, Navbar, Nav } from "react-bootstrap";
// styles
import stylesNavbar from "@/styles/navbar.module.css"

const Header = () => {
  const { loginStatus, closedSession } = useContext(TokenContext)

  const navbarRef = useRef(null)
  return (
    <Navbar ref={navbarRef} expand="lg" className="bg-transparent position-relative overflow-hidden">

      <Container fluid >
        {/* animcacion de cuadros */}
        <CuadroAnimation containerRef={navbarRef}></CuadroAnimation>

        <Navbar.Brand className="z-1" >
          <Link className="link-dark link-underline link-underline-opacity-0" href="/">Raices</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " className={stylesNavbar.toogleNav} >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </Navbar.Toggle>
        <Navbar.Collapse  id="basic-navbar-nav">
          <Nav className="container-fluid d-flex justify-content-end " >
            <div className={`z-1 d-flex align-items-center ${stylesNavbar.navContainer}`}>
              <span >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={stylesNavbar.navIcons} viewBox="0 0 16 16">
                  <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507" />
                </svg>
              </span>
              <Link className="link-dark link-underline link-underline-opacity-0" href="/">Home</Link>
            </div>

            {/* Accion segun el estatus de inicio de sesion */}
            {loginStatus
              ? (<>
                <div className={`z-1 d-flex align-items-center ${stylesNavbar.navContainer}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={stylesNavbar.navIcons} viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                  </svg>
                  <Link className="link-dark link-underline link-underline-opacity-0" href="/profile"> Profile</Link>
                </div>
                <div className={`z-1 d-flex align-items-center ${stylesNavbar.navContainer}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={stylesNavbar.navIcons} viewBox="0 0 16 16">
                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                  </svg>
                  <button className="btn btn-dark btn-sm" onClick={() => closedSession()}>Cerrar Sesion</button>
                </div>
              </>)
              :
              <div className={`z-1 d-flex align-items-center ${stylesNavbar.navContainer}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={stylesNavbar.navIcons} viewBox="0 0 16 16">
                  <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z" />
                  <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                </svg>
                <LoginModal />
              </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Header