import LoginForm from "../User/Forms/LoginForm";
const Layout = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ height: "500px" }}>
                    <div>
                        <h1 className="display-4">Raices</h1>
                        <img src="https://th.bing.com/th/id/OIG1.glJIctD5DwA61dYaMCDn?pid=ImgGn" alt="Image" className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-6">
                    <h2 className="h5">WorkSpace RedSocial</h2>
                    <p>
                        Raíces, una plataforma WorkSpace para compartir tus pensamientos y creaciones con la comunidad.
                        <br />
                        Crear una plataforma de espacio de trabajo totalmente intuitiva e interactiva donde puedas crear un proyecto con sus ramas e invitar a otras personas a participar en tu area de trabajo, convirtiendo una tarea tediosa en una tarea muy facil, sencilla y eficaz
                    </p>
                    <div className="card text-bg-light " style={{ width: "70%", margin: "auto" }} >
                        <div className="card-header d-flex justify-content-between align-items-center bg-primary text-light">
                            <h5 style={{}} >Iniciar Sesion</h5>
                        </div>
                        <div className="card-body px-4">
                            <LoginForm ></LoginForm>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Layout;