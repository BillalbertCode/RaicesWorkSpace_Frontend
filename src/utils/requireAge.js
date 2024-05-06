// Funcion de validacion de campo de edad
/**
 * 
 * @param {String} birth - Fecha de nacimiento
 * @param {Number} requireAge - Edad esperada 
 * @returns 
 */
export const requireAge = (birth, requireAge) =>{
        const today = new Date()
        const birthDate = new Date(birth)
        let age = today.getFullYear() - birthDate.getFullYear()
        let month = today.getMonth() - birthDate.getMonth()
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < requireAge) {
            return `Debes ser mayor de ${requireAge} años`
        } else {
            return 'valid'
        }
}