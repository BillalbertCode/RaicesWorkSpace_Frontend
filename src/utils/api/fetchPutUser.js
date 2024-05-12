//fetchPut Modifica los datos del Usuario
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * 
 * @param {object} dataSend - objeto con los datos a modificar 
 * @param {string} token - token de validacion de usuario 
 * @param {function} action - funciones adicionales que hacer si el put se manda correctamente 
 */
export const fetchPut = async (dataSend, token, action) => {
    try {
        const response = await fetch('http://localhost:5000/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify(dataSend)
        })
        const data = await response.json()
        if (!response.ok) {
            return (data.error)
        }

        if (action) {
            action()
        }
    } catch (error) {
        console.error(error)
    }
}