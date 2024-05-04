//  Funcion para la validacion de formularios tipo text
/**
 * 
 * @param {object} data - objeto con los datos del usuario 
 * @param {string} fieldName - nombre del valor a acceder 
 * @param {number} minLength 
 * @param {number} maxLength 
 * @param {regex} regex - regex esperado del campo
 * @returns
 */
export const validateFieldText = (data, fieldName, minLength, maxLength, regex) => {

    const value = data[fieldName]

    // validacion segun los caracteres
    if (!value || value.length < minLength || value.length > maxLength) {
        return value.length < minLength
            ? `${fieldName} debe tener al menos ${minLength} caracteres`
            : `${fieldName} debe tener como maximo ${maxLength} caracteres`
    }
    // validacion segun el formato regex que le hallamos creado
    else if (regex && !value.match(regex)) {
        return `${fieldName} no tiene un formato valido`
    } else {
        return 'valid'
    }
}