// Cotroladores de un input al oprimir alguna tecla
/**
 * @param {funtion} e - event object  
 * @param {object} data - data con el valor del Formulario 
 * @param {function} setData -  funccion para cambiar la informacion del usuario
 */
export const handleChange = (e, data, setData) => {
    const { name, value } = e.target
    setData({
        ...data,
        [name]: value
    })
}