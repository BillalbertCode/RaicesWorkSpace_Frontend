//fetchPut Modifica los datos del Usuario
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * 
 * @param {object} e - event object 
 * @param {object} dataSend - objeto con los datos a modificar 
 * @param {string} endpoint - endpoint necesario para la modificacion 
 * @param {string} token - token de validacion de usuario 
 * @param {function} action - funciones adicionales que hacer si el put se manda correctamente 
 */
export const fetchPut = async (e, dataSend, endpoint, token, action) => {
    e.preventDefault()
    try {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify(dataSend)
        })
        if (!response.ok) {
            throw new Error('Error en la modificacion')
        }

        if (action) {
            action()
        }
    } catch (error) {
        console.error(error)
    }
}