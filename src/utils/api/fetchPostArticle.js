//Esta funcion se utiliza para enviar formularios
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * @param {object} dataSend - datos a enviar 
 * @param {string} token - Autorization del usuario 
 * @param {function} action - Accion luego de enviar la informacion (opcional) 
 */
export const fetchPostArticle = async (dataSend, token, action) => {
    try {
        const response = await fetch(`http://localhost:5000/article`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify(dataSend)
        })
        const data = await response.json()
        if (!response.ok) {
            const error = new Error
            error.message = data.error

            throw error.message
        }
        //Alguna accion adicional que quieras hacer con el componente
        if (action) {
            action()
        }
    } catch (error) {
        console.error(error)
        throw error
    }

}