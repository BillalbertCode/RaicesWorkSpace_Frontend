// Hook de validacion de formularios
// Este hook principalmente es para MOSTRAR!! los campos validos y no validos
// tambien sirve como puente de validacion para hacer la solicitud fetch
// Esto MUESTRA!!! la validacion local del formulario que es la funcion que pasara!!, y si todo  es 'valid', hace la validacion fetch
import { useState } from "react"
/**
 * 
 * @param {function} validations - objeto con las validaciones de cada campo,
 *     esta funcion es una validacion local del campo y los parametros que va a validar
 *     osea recibe una funcion con un objeto que tiene una funcion especifica de ese campo que va a devolver si es 'valid' o el error que enviara
 *     Para enteder mejor su funcionamiento cualquier otro formulario 
 * @param {function} solicitudFetch - funccion de llamada 
 * @returns 
 */
export const useValidateFields = (validations, solicitudFetch) => {
    const [formValidation, setFormValidation] = useState(false)

    const validate = async (e) => {
        e.preventDefault()

        // Validaciones de ese formulario
        const validateErrors = validations()

        // Comprovamos que todas las validaciones sean igual a Valid
        const invalidFields = Object.values(validateErrors).some(value => value !== 'valid')

        // si los campos son correctos se hace la solicitud fetch
        if (!invalidFields) {
            const errorManager = await solicitudFetch()

            // Si encuentra algun error lo guarda
            // Se ve cual es el error para mostrarlo en su campo respectivo
            if (errorManager) {
                Object.keys(errorManager).forEach(key => {
                    validateErrors[key] = errorManager[key]
                })
            }
        }
        setFormValidation(validateErrors);
    }

    // validate = function
    // validate es la funcion que validara los campos y hara de pasarela para hacer la solicitud fetch
    // esto es la accion que hara el submit solo necesita el evento como parametro (e)

    // formValidation = objeto
    // formValidation es el objeto que contiene los errores de cada campo y si son validos o no
    // Esto es para el manejo de tus clases de validacion
    // Uso: formValidation.property && formValidation.property === 'valid'? 'este campo es valido' : formValidation.property
    // Todo esto para manejar 3 estados default, valid y error(con su mensaje de error que puede provenir del backend o del front)
    return { validate, formValidation }

    // es algo complicado si pero facilita bastante al hacer la validaciones y mostrar el mensaje de error  
}

