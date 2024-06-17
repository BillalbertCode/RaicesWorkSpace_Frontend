//Login del   usuario este metodo concede el token
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * @param {object} dataSend - datos a enviar 
 * @param {function} action - Solo esta accion espera los datos del token para setearlo
 */
export const fetchLogin = async (dataSend, action) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
        const response = await fetch(`${apiUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
        const data = await response.json()

        if (!response.ok) {
            return(data.error)
        }

        //pasarle el token e iniciar sesion
        action(data)
    } catch (error) {
        console.error(error)
        return error
    }
}