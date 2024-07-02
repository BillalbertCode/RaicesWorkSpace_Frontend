//  Funcion para eliminar el usuario 
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * 
 * @param {string} token - Autroizacion si el usuario es correcto
 * @param {function} action - Accion si la peticion fue exitosa
 */
export const fetchDeleteUser = async (token, action) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    try {
        const response = await fetch(`${apiUrl}/user/profile/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        })
        if (!response.ok) {
            throw new Error('eliminacion fallida')
        }
        if (action) {
            action()
        }
    } catch (error) {
        console.error(error)
    }
}