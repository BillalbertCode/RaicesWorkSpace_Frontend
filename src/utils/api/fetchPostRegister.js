//Metodo Post para crear un usuario nuevo
//No necesita token
// Recibe un objeto con los datos del formularo como dataSend
// action es la accion que va a realizar pasale una funcion
/**
 * @param {object} e - event object 
 * @param {object} dataSend - datos a enviar 
 * @param {string} endpoint - endpoint del objeto a enviar 
 * @param {function} action - Accion luego de enviar la informacion (opcional) 
 */
export const fetchPostRegister = async (e, dataSend, endpoint, action) => {
    e.preventDefault()
    try {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error( data.error )
        }

        console.log('registro exitoso')
        if(action){
            action()
        }
        console.log('datos enviados', dataSend)
    } catch (error) {
        console.error(error)
    }
}