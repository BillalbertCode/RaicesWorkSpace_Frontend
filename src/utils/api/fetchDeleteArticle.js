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
    try {
        const response = await fetch(`http://localhost:5000/article/${articleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        })
        if (!response.ok) {
            throw new Error('Eliminacion del articulo fallida')
        }
        console.log('Eliminacion del Articulo exitosa')
        // Accion esperada del articulo
        if (action) {
            action()
        }
        
    } catch (error) {
        console.error(error)
    }
}