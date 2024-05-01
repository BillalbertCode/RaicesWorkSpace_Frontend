/**
 * @param {Number} statusError - Codigo de error
 * @param {string} message - Mensaje de error
 */
const ConexionError = ({ statusError, message }) => {
    return (
        <div className="alert alert-danger " role="alert">
            <h4 className="alert-heading">Error de conexión! {statusError}</h4>
            <p>No se pudo conectar al servidor.</p>
            <div className="d-flex align-items-center">
                
                <div className="p-3 text-primary-emphasis bg-warning-subtle border border-warning-subtle rounded-3 d-flex align-items-center" >
                <svg width={20} xmlns="http://www.w3.org/2000/svg" className="bi flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Danger:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                    {message}
                </div>
            </div>
            <hr />
            <p className="mb-0">Si el problema persiste, ponte en contacto con el administrador del sistema.</p>
        </div>)
}

export default ConexionError;