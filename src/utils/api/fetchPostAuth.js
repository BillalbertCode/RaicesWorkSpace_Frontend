//Esta funcion se utiliza para enviar formularios
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * @param {object} e - event object 
 * @param {object} dataSend - datos a enviar 
 * @param {string} endpoint - endpoint del objeto a enviar 
 * @param {string} token - Autorization del usuario 
 * @param {function} action - Accion luego de enviar la informacion (opcional) 
 */
export const handleSubmit = async (e, dataSend, endpoint, token, action) => {
    e.preventDefault()
    try {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify(dataSend)
        })
        if (!response.ok) {
            throw new Error('Error en el Post')
        }
        //Accion del componente
        if(action){
            action()
        }
    } catch (error) {
        console.error(error)
    }
}