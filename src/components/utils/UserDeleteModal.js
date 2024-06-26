import { useState } from "react"
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"

import { fetchDeleteUser } from "@/utils/api/fetchDeleteUser"

const UserDeleteModal = ({ token, action }) => {
    const [show, setShow] = useState(false)
    
    const handleClose = () => { setShow(false) }
    const handleShow = () => { setShow(true) }

    const deleteUser = () => {
        fetchDeleteUser(token, () => {
            handleClose()
            action()
        })
    }
    return (
        <>
            <Button variant="none" className="btn btn-outline-danger mt-2" onClick={handleShow}>
                Eliminar Usuario
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x" viewBox="0 0 16 16">
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                </svg>
            </Button>

            <Modal data-bs-theme="dark" show={show} onHide={handleClose} animation={true}>
                <Modal.Header className="bg-danger text-white" closeButton>
                    <Modal.Title   >Eliminacion de usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta eliminacion es permanente!, seguro que quieres continuar?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteUser}>
                        Eliminar Usuario
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                        </svg>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserDeleteModal