//  Funcion para eliminar el article y renderizar la pantalla
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * 
 * @param {string} articleId - Encontrar article  
 * @param {string} token - Autorization de eliminacion del articulo si eres propietario
 * @param {function} action - funcion de respuesta despues de que sea exitosa la peticion 
 */
export const fetchDeleteArticle = async (articleId, token, action) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
        const response = await fetch(`${apiUrl}/article/${articleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        })
        const data = await response.json()
        if (!response.ok) {
            const error = new Error
            error.message = data.error

            throw error.message
        }
        console.log('Eliminacion del Articulo exitosa')
        // Accion esperada del articulo
        if (action) {
            action()
        }
        
    } catch (error) {
        console.error(error)
        throw error
    }
}