// Hook de validacion de formularios
// Este hook principalmente es para MOSTRAR los campos validos y no validos
// tambien sirve como puente de validacion para hacer la solicitud fetch
import { useState } from "react"
/**
 * 
 * @param {object} validations - objeto con las validaciones de cada campo
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
    
    // validate es la funcion que validara que validara los campos y hara de pasarela para hacer la solicitud fetch
    // validate = function

    // formValidation = objeto
    // formValidation es el objeto que contiene los errores de cada campo y si son validos o no
    return { validate, formValidation }
}

