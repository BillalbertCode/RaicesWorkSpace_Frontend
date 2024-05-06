//Metodo Post para crear un usuario nuevo
//No necesita token
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * @param {object} dataSend - datos a enviar 
 * @param {function} action - Accion luego de enviar la informacion en este caso devuelve tokne 
 */
export const fetchPostRegister = async (dataSend, action) => {
    try {
        const response = await fetch(`http://localhost:5000/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
        const data = await response.json()
        if (!response.ok) {
            return (data.error)
        }

        console.log('registro exitoso')
        //pasarle el token e iniciar sesion
        action(data)
        console.log('datos enviados', dataSend)
    } catch (error) {
        console.error(error)
    }
}