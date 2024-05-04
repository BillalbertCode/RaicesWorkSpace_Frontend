//Login del   usuario este metodo concede el token
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * @param {object} e - event object
 * @param {object} dataSend - datos a enviar 
 * @param {function} action - Solo esta accion espera los datos del token para setearlo
 */
export const fetchLogin = async (e, dataSend, action) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })

        if (!response.ok) {
            throw new Error('Ocurrio un error al registrarse')
        }

        const data = await response.json()

        console.log('Inicio de secion exitoso')
        //pasarle el token a la accion
        action(data)
    } catch (error) {
        console.error(error)
    }
}